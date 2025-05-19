import express from "express";
import cors from "cors";
import itemsMock from "../mocks/items.json" with { type: "json" };

const app = express();
const PORT = 3001;

app.use(cors());

const author = { name: "Juan", lastname: "Pérez" };
const categories = ["Accesorios", "Laptops", "Smartphones"];

app.get("/api/items", (req, res) => {
  const { q } = req.query;

  const filteredItems = itemsMock.filter(
    (item) =>
      item.title.toLowerCase().includes(q.toLowerCase()) ||
      item.category.toLowerCase().includes(q.toLowerCase())
  );

  res.json({
    author,
    categories,
    items: filteredItems.map(({ ...item }) => item),
  });
});

app.get("/api/items/:id", (req, res) => {
  const item = itemsMock.find((i) => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json({
    author,
    item,
  });
});

app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
});

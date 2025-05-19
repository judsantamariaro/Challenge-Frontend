import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import ProductDetail from "./ProductDetail";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const mockProduct = {
  id: "MLA111222",
  title: "iPhone 13 128GB",
  price: { currency: "ARS", amount: 800000, decimals: 0 },
  picture: "https://your-cdn.com/images/iphone13.jpg",
  condition: "Nuevo",
  free_shipping: true,
  sold_quantity: 23,
  description: "El nuevo iPhone 13 con increíble rendimiento y cámara.",
  category: "Celulares",
};

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ item: mockProduct }),
      })
    ) as unknown as typeof fetch
  );
});

describe("ProductDetail", () => {
  it("muestra los datos del producto correctamente", async () => {
    render(
      <MemoryRouter initialEntries={["/items/MLA111222"]}>
        <Routes>
          <Route path="/items/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Cargando producto/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/iPhone 13 128GB/i)).toBeInTheDocument();
      expect(screen.getByText(/Nuevo - 23 vendidos/i)).toBeInTheDocument();
      expect(screen.getByText(/ARS 800,000/i)).toBeInTheDocument();
      expect(screen.getByText(/Comprar/i)).toBeInTheDocument();
      expect(screen.getByText(/Envió Gratis/i)).toBeInTheDocument();
      expect(screen.getByText(/El nuevo iPhone 13/i)).toBeInTheDocument();
    });
  });
});

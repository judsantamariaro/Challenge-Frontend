import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, vi, beforeEach, it } from "vitest";
import "@testing-library/jest-dom";
import SearchResults from "./SearchResults";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// filepath: src/components/SearchResults.test.tsx

const mockItems = [
  {
    id: "MLA123",
    title: "Samsung Galaxy S21",
    price: { currency: "ARS", amount: 500000, decimals: 0 },
    picture: "https://your-cdn.com/images/s21.jpg",
    condition: "Nuevo",
    free_shipping: true,
  },
  {
    id: "MLA456",
    title: "Motorola G100",
    price: { currency: "ARS", amount: 250000, decimals: 0 },
    picture: "https://your-cdn.com/images/g100.jpg",
    condition: "Usado",
    free_shipping: false,
  },
];

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            items: mockItems,
            categories: ["Celulares", "Smartphones"],
          }),
      })
    ) as unknown as typeof fetch
  );
});

describe("SearchResults", () => {
  it("muestra los resultados de búsqueda correctamente", async () => {
    render(
      <MemoryRouter initialEntries={["/items?search=samsung"]}>
        <Routes>
          <Route path="/items" element={<SearchResults />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Samsung Galaxy S21/i)).toBeInTheDocument();
      expect(screen.getByText(/ARS 500,000/i)).toBeInTheDocument();
      expect(screen.getByText(/Gratis envío/i)).toBeInTheDocument();
      expect(screen.getByText(/Motorola G100/i)).toBeInTheDocument();
      expect(screen.getByText(/ARS 250,000/i)).toBeInTheDocument();
    });

    expect(
      screen.queryByText(/No se encontraron resultados/i)
    ).not.toBeInTheDocument();
  });

  it("muestra mensaje cuando no hay resultados", async () => {
    (fetch as unknown as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            items: [],
            categories: [],
          }),
      })
    );

    render(
      <MemoryRouter initialEntries={["/items?search=unknown"]}>
        <Routes>
          <Route path="/items" element={<SearchResults />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/No se encontraron resultados para unknown/i)
      ).toBeInTheDocument();
    });
  });
});

import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Breadcrumb from "./Breadcrumb";
import { MemoryRouter } from "react-router-dom";

describe("Breadcrumb", () => {
  it("muestra todas las categorías como enlaces con el texto y la referencia correctos", () => {
    const categories = ["Accesorios", "Laptops", "Smartphones"];
    render(
      <MemoryRouter>
        <Breadcrumb categories={categories} />
      </MemoryRouter>
    );
    categories.forEach((category) => {
      const link = screen.getByText(category);
      expect(link).not.toBeNull();
      expect(link.getAttribute("href")).toBe(
        `/items?search=${encodeURIComponent(category)}`
      );
    });
  });

  it("no muestra ningún elemento de la lista cuando las categorías están vacías", () => {
    render(
      <MemoryRouter>
        <Breadcrumb categories={[]} />
      </MemoryRouter>
    );
    expect(screen.queryAllByRole("listitem").length).toBe(0);
  });

  it("renderiza correctamente una sola categoría", () => {
    const categories = ["Única"];
    render(
      <MemoryRouter>
        <Breadcrumb categories={categories} />
      </MemoryRouter>
    );
    const link = screen.getByText("Única");
    expect(link).not.toBeNull();
    expect(link.getAttribute("href")).toBe(
      `/items?search=${encodeURIComponent("Única")}`
    );
  });
});

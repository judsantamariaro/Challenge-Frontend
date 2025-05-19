import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, vi, beforeEach, it, expect } from "vitest";
import "@testing-library/jest-dom";
import SearchBox from "./SearchBox";
import { MemoryRouter } from "react-router-dom";

// filepath: src/components/SearchBox.test.tsx

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("SearchBox", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("Renderiza el input con el placeholder y el aria-label correctos", () => {
    render(
      <MemoryRouter>
        <SearchBox />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText("Busca tu producto...");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-label", "Buscar producto");
  });

  it("Actualiza el valor del input al escribir", () => {
    render(
      <MemoryRouter>
        <SearchBox />
      </MemoryRouter>
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "samsung" } });
    expect(input).toHaveValue("samsung");
  });

  it("Navega a /items?search=query al enviar el formulario con una consulta no vacía", () => {
    render(
      <MemoryRouter>
        <SearchBox />
      </MemoryRouter>
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "motorola" } });
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith("/items?search=motorola");
  });

  it("No navega al enviar el formulario si la consulta está vacía o contiene solo espacios en blanco", () => {
    render(
      <MemoryRouter>
        <SearchBox />
      </MemoryRouter>
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "   " } });
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});

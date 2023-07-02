import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import Menu from "../src/pages/Menu";

describe("Menu page tests", () => {
  render(
    <BrowserRouter>
      <Menu />
    </BrowserRouter>
  );

  test("my view clicked should navigate to my view page", () => {
    const button = screen.getByText("View");
    fireEvent.click(button);
    expect(window.location.href).toBe("http://localhost:3000/viewpage");
  });
});


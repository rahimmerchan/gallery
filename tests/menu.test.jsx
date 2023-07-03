import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Menu from "../src/pages/Menu";

describe("Menu page tests", () => {
  test("my view clicked should navigate to my view page", () => {
    render(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    );
    const button = screen.getByText("View");
    fireEvent.click(button);
    expect(window.location.href).toBe("http://localhost:3000/viewpage");
  });

  test("upload button exists and opens popup when clicked", () => {
    render(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    );
    // upload button exists
    const upload = screen.getByTestId("upload-button");
    expect(upload).toBeInTheDocument();
    // before clicking upload, popup doesn't exist
    let popup = screen.findByTestId("popup");
    expect(popup).toBeUndefined;
    // after clicking upload, popup exists and is visible
    fireEvent.click(upload);
    popup = screen.getByTestId("popup");
    expect(popup).toBeVisible();
  });

  test("popup should have correct buttons and input fields", () => {
    render(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    );
    // opening popup
    fireEvent.click(screen.getByTestId("upload-button"));
    const popup = screen.getByTestId("popup");
    // counting buttons
    const buttons = popup.querySelectorAll("button");
    expect(buttons.length).toEqual(3);
    // counting input fields
    const inputFields = popup.querySelectorAll("input");
    expect(inputFields.length).toEqual(3);
    // closing popup with cancel button
    fireEvent.click(screen.getByText("Cancel"));
    expect(popup).not.toBeVisible();
  });

  // screen.debug();
});

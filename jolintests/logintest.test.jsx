import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it } from "vitest";
import Login from "../src/components/login";
import { MemoryRouter, BrowserRouter } from "react-router-dom";

describe("Login", () => {
  it("renders Login form", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
  );
    
    // Assert that the sign-in form elements are present
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log In" })).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    // Simulate entering values in the form fields
    fireEvent.change(screen.getByText("Email"), { target: { value: "test" } });
    fireEvent.change(screen.getByText("Password"), { target: { value: "Password123" } });

    // Simulate submitting the form
    fireEvent.click(screen.getByRole("button", { name: "Log In" }));

    // Assert that the form submission was successful
    expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();
  });
});

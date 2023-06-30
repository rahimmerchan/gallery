import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it } from "vitest";
import SignUp from "../src/components/SIgnUpPage";
import { MemoryRouter, BrowserRouter } from "react-router-dom";

describe("Login", () => {
  it("renders Login form", () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
  );
    
    // Assert that the sign-in form elements are present
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
    
    // Simulate entering values in the form fields
    fireEvent.change(screen.getByText("Email"), { target: { value: "test" } });
    fireEvent.change(screen.getByText("Password"), { target: { value: "Password123" } });

    // Simulate submitting the form
    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    // Assert that the form submission was successful
    expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();
  });
});

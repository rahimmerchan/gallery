import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it } from "vitest";
import App from "../src/App";
import { MemoryRouter, BrowserRouter } from "react-router-dom";


test('get started clicked should navigate to gallery page', () => {
    render(
        <BrowserRouter>
            <App/>
        </BrowserRouter>
        );
    const button = screen.getByText('Get Started');
    fireEvent.click(button);
    expect(window.location.href).toBe("http://localhost:3000/menu")
});
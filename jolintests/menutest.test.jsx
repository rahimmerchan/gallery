import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it } from "vitest";
import Menu from "../src/pages/Menu";
import { MemoryRouter, BrowserRouter } from "react-router-dom";


test('my view clicked should navigate to my view page', () => {
    render(
        <BrowserRouter>
            <Menu/>
        </BrowserRouter>
        );
    const button = screen.getByText('View');
    fireEvent.click(button);
    expect(window.location.href).toBe("http://localhost:3000/viewpage")
});
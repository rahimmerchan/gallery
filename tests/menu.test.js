import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Menu from '../src/pages/Menu';

test('sign in clicked should navigate to login page', () => {
    render(<Menu/>);
    const button = screen.getByText('View');
    fireEvent.click(button);
    expect(window.location.href).toBe("http://localhost:5173/viewpage")
});
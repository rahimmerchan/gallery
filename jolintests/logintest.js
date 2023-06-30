import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

test('sign in clicked should navigate to login page', () => {
    render(<App/>);
    const button = screen.getByText('Login');
    fireEvent.click(button);
    expect(window.location.href).toBe("http://localhost:5173/login");
});

// TESTING INVALID EMAIL
test('should show email error', () => {
    render(<SignUp/>);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jolin@example' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password456' } });
    fireEvent.click(screen.getByRole('button', { name: 'Log in' }));
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
});

// TESTING INVALID PASSWORD
test('should show password error', () => {
    render(<SignUp/>);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jolin@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password456' } });
    fireEvent.click(screen.getByRole('button', { name: 'Log in' }));
    expect(screen.getByText('Please enter at least 8 characters including Uppercase, Lowercase, Number.')).toBeInTheDocument();
});
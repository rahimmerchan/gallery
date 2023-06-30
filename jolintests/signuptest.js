import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';
import SignUp from '../src/components/SIgnUpPage';

// TEST SIGNUP NAVIGATION
test('sign-uo clicked should navigate to sign-up page', () => {
    render(<App/>);
    const button = screen.getByText('Sign-up');
    fireEvent.click(button);
    expect(window.location.href).toBe("http://localhost:5173/signUp")
});

// TESTING INVALID EMAIL
test('', () => {
    render(<SignUp/>);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jolin@example' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password456' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
});

// TESTING INVALID PASSWORD
test('', () => {
    render(<SignUp/>);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jolin@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password456' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
    expect(screen.getByText('Please enter at least 8 characters including Uppercase, Lowercase, Number.')).toBeInTheDocument();
});
import {render, screen, fireEvent} from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import ViewPage from "../src/pages/ViewPage";
import {BrowserRouter as Router} from 'react-router-dom';
import userEvent from '@testing-library/user-event'


describe ("View page test", () => {
  test('If left arrow is initially disabled', () => {
    render(
      <Router>
        <ViewPage/>
      </Router>
    );
    const buttons = screen.queryAllByRole('button')
    expect(buttons[4]).toBeUndefined()
  });
  
  test('If gallery button navigates to gallery', () => {

    render(
      <Router>
        <ViewPage/>
      </Router>
    );

    const button = screen.getByText('My Gallery');
    fireEvent.click(button);
    expect(window.location.href).toBe("http://localhost:3000/menu")

  });
})

import {render, screen, fireEvent} from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import ViewPage from "../src/pages/ViewPage";
import {BrowserRouter as Router} from 'react-router-dom';

describe ("View page test", () => {
  test('Click My Gallery Button', () => {

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

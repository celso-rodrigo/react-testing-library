import React from 'react';
import { getByTitle, screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Tests of "notFound" component (Requisito 4)', () => {
  it('Should display a h2 with the text "Page requested not found 😭"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/invalid-url');

    const emoji = screen.getByLabelText(/crying emoji/i);
    const title = screen.getByRole('heading', { level: 2 });
    const expectedTitle = 'Page requested not found 😭';

    expect(emoji).toBeDefined();
    expect(emoji).toHaveTextContent('😭');
    expect(title).toBeDefined();
    expect(title).toHaveTextContent(expectedTitle);
  });

  it('Should display a correct gif', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/invalid-url');

    const altTxt = 'Pikachu crying because the page requested was not found';
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getByAltText(altTxt);

    expect(img).toBeDefined();
    expect(img.src).toBe(src);
    expect(img.getAttribute('alt')).toBe(altTxt);
  });
});

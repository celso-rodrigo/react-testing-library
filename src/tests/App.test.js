import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Tests of "App" component (Requisito 1)', () => {
  renderWithRouter(<App />);
  const homeLink = screen.getByRole('link', { name: /home/i });
  const aboutLink = screen.getByRole('link', { name: /about/i });
  const favPokeLink = screen.getByRole('link', { name: /favorite pokémons/i });

  it('Should exist 3 nav links on the header: Home, About and Favorite Pokémons.', () => {
    expect(homeLink).toBeDefined();
    expect(aboutLink).toBeDefined();
    expect(favPokeLink).toBeDefined();
  });

  it('Should have corresponding text in each link.', () => {
    expect(homeLink).toHaveTextContent(/home/i);
    expect(aboutLink).toHaveTextContent(/about/i);
    expect(favPokeLink).toHaveTextContent(/favorite pokémons/i);
  });
});

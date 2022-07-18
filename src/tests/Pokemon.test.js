import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Tests of "Pokemon" component (Requisito 6)', () => {
  it('Should display all correct pokemon info.', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByText(/Pikachu/i);
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByText(/Average weight: 6.0 kg/i);
    const pokemonImg = screen.getByAltText(/Pikachu sprite/i);
    const imgSrc = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(pokemonName).toBeDefined();
    expect(pokemonType).toBeDefined();
    expect(pokemonType.textContent).toBe('Electric');
    expect(pokemonWeight).toBeDefined();
    expect(pokemonImg).toBeDefined();
    expect(pokemonImg.src).toBe(imgSrc);
  });

  it('Should display a "More details" link on the pokemon info.', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: 'More details' });

    expect(moreDetails).toBeDefined();
  });

  it('Should display a favorit icon when a pokemon is marked as favorite.', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);
    const favCheckbox = screen.getByRole('checkbox');
    userEvent.click(favCheckbox);
    const backToHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(backToHome);
    const FavIcon = screen.getByAltText(/Pikachu is marked as favorite/i);

    expect(FavIcon).toBeDefined();
    expect(FavIcon.src).toBe('http://localhost/star-icon.svg');
  });
});

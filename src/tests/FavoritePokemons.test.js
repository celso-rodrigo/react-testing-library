import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';

describe('Tests of "FavoritePokemons" component (Requisito 3)', () => {
  it('Should display the corrent text when there is no favorited pokemon.', () => {
    renderWithRouter(<FavoritePokemons />);

    const expectedTxt = /No favorite pokemon found/i;
    const paragraph = screen.getByText(expectedTxt);

    expect(paragraph).toBeDefined();
    expect(paragraph).toHaveTextContent(expectedTxt);
  });

  it('Should display favorited pokemons, they info and a "More Details" link.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/4'); // Charmander
    const checkBox = screen.getByRole('checkbox');
    userEvent.click(checkBox);
    history.push('/favorites');
    const charmanderName = screen.getByText(/charmander/i);
    const charmanderType = screen.getByText(/fire/i);
    const charmanderWeight = screen.getByText(/average weight: 8.5 kg/i);
    const charmanderImg = screen.getByAltText(/Charmander sprite/i);
    const charmanderFavIcon = screen.getByAltText(/Charmander is marked as favorite/i);
    const moreDetails = screen.getByRole('link', { name: 'More details' });

    expect(charmanderName).toBeDefined();
    expect(charmanderType).toBeDefined();
    expect(charmanderWeight).toBeDefined();
    expect(charmanderImg).toBeDefined();
    expect(charmanderFavIcon).toBeDefined();
    expect(moreDetails).toBeDefined();

    userEvent.click(moreDetails);
    expect(history.location.pathname).toBe('/pokemons/4');
  });
});

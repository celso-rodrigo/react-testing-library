import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Tests of "PokemonDetails" component (Requisito 7)', () => {
  it('Should display the correct pokemon details in "More details".', () => {
    const { history } = renderWithRouter(<App />);
    history.push('pokemons/25'); // Pikachu

    const detailsTitle = screen.getByRole('heading',
      { name: 'Pikachu Details', level: 2 });
    const summaryTitle = screen.getByRole('heading',
      { name: 'Summary', level: 2 });
    const locationsTitle = screen.getByRole('heading',
      { name: 'Game Locations of Pikachu', level: 2 });
    const summary = 'This intelligent Pokémon roasts hard berries '
      + 'with electricity to make them tender enough to eat.';
    const pokemonSummary = screen.getByText(summary);

    expect(detailsTitle).toBeDefined();
    expect(summaryTitle).toBeDefined();
    expect(locationsTitle).toBeDefined();
    expect(pokemonSummary).toBeDefined();
  });

  it('Should exist images with all possible spawn locations of the pokemon.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('pokemons/25'); // Pikachu

    const imgOne = screen.getAllByAltText('Pikachu location')[0];
    const imgOneSrc = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const imgTwo = screen.getAllByAltText('Pikachu location')[1];
    const imgTwoSrc = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';

    expect(imgOne).toBeDefined();
    expect(imgOne.src).toBe(imgOneSrc);
    expect(imgTwo).toBeDefined();
    expect(imgTwo.src).toBe(imgTwoSrc);
  });

  it('Should be possible to favorite the pokemon.', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    const favCheckbox = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(favCheckbox);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    userEvent.click(homeLink);
    const favIcon = screen.getByAltText(/Pikachu is marked as favorite/i);
    const expectedSrc = 'http://localhost/star-icon.svg';

    expect(favIcon).toBeDefined();
    expect(favIcon.src).toBe(expectedSrc);
  });
});

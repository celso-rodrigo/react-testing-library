import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Tests of "Pokedex" component (Requisito 5)', () => {
  it('Should exist a h2 with the text "Encountered pokémons".', () => {
    renderWithRouter(<App />);

    const headerTxt = 'Encountered pokémons';
    const header = screen.getByRole('heading', { name: headerTxt, level: 2 });

    expect(header).toBeDefined();
    expect(header).toHaveTextContent(headerTxt);
  });

  it('Should loop between every pokemons on the list.', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    const allPokemons = [
      'Pikachu',
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
      'Pikachu', // Same as the first index
    ];

    // Make tests for every expected pokemon
    allPokemons.forEach((pokemon) => {
      const pokemonName = screen.getByText(pokemon);
      const pokemonImg = screen.getByAltText(`${pokemon} sprite`);

      expect(pokemonName).toBeDefined();
      expect(pokemonImg).toBeDefined();

      userEvent.click(nextButton);
    });
  });

  it('Should display only one pokemon at time.', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByText('Pikachu');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonAvergeWeight = screen.getByText('Average weight: 6.0 kg');
    const pokemonImg = screen.getByAltText('Pikachu sprite');
    const imgSrc = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const moreDetails = screen.getByRole('link', { name: 'More details' });

    expect(pokemonName).toBeDefined();
    expect(pokemonName).not.toBe('Charmander'); // Wrong name
    expect(pokemonType).toBeDefined();
    expect(pokemonType).not.toBe('Bug'); // Wrong Type
    expect(pokemonAvergeWeight).toBeDefined();
    expect(pokemonAvergeWeight).not.toBe('Average weight: 6.9 kg'); // Wrong weight
    expect(pokemonImg).toBeDefined();
    expect(pokemonImg).toHaveProperty('src', imgSrc);
    expect(moreDetails).toBeDefined();
  });

  it('Should exist all seven diferent filter buttons and a clear button.', () => {
    renderWithRouter(<App />);

    const testIdAtribute = 'data-testid';
    const dataTestId = 'pokemon-type-button';

    const electricFilter = screen.getByRole('button', { name: /electric/i });
    const fireFilter = screen.getByRole('button', { name: /fire/i });
    const bugFilter = screen.getByRole('button', { name: /bug/i });
    const poisonFilter = screen.getByRole('button', { name: /poison/i });
    const psychicFilter = screen.getByRole('button', { name: /psychic/i });
    const normalFilter = screen.getByRole('button', { name: /normal/i });
    const dragonFilter = screen.getByRole('button', { name: /dragon/i });
    const clearFilters = screen.getByRole('button', { name: /all/i });

    const specificFilters = [
      electricFilter,
      fireFilter,
      bugFilter,
      poisonFilter,
      psychicFilter,
      normalFilter,
      dragonFilter,
      clearFilters,
    ];

    specificFilters.forEach((filter) => {
      expect(filter).toBeDefined();
      if (filter !== clearFilters) {
        expect(filter).toHaveAttribute(testIdAtribute, dataTestId);
      }
      userEvent.click(filter);
    });
  });
});

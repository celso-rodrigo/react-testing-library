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

    expect(screen.getByText(/Pikachu/i)).toBeDefined(); // Pikachu
    expect(screen.getByAltText(/Pikachu sprite/i)).toBeDefined();
    userEvent.click(nextButton);

    expect(screen.getByText(/Charmander/i)).toBeDefined(); // Charmander
    expect(screen.getByAltText(/Charmander sprite/i)).toBeDefined();
    userEvent.click(nextButton);

    expect(screen.getByText(/Caterpie/i)).toBeDefined(); // Caterpie
    expect(screen.getByAltText(/Caterpie sprite/i)).toBeDefined();
    userEvent.click(nextButton);

    expect(screen.getByText(/Ekans/i)).toBeDefined(); // Ekans
    expect(screen.getByAltText(/Ekans sprite/i)).toBeDefined();
    userEvent.click(nextButton);

    expect(screen.getByText(/Alakazam/i)).toBeDefined(); // Alakazam
    expect(screen.getByAltText(/Alakazam sprite/i)).toBeDefined();
    userEvent.click(nextButton);

    expect(screen.getByText(/Mew/i)).toBeDefined(); // Mew
    expect(screen.getByAltText(/Mew sprite/i)).toBeDefined();
    userEvent.click(nextButton);

    expect(screen.getByText(/Rapidash/i)).toBeDefined(); // Rapidash
    expect(screen.getByAltText(/Rapidash sprite/i)).toBeDefined();
    userEvent.click(nextButton);

    expect(screen.getByText(/Snorlax/i)).toBeDefined(); // Snorlax
    expect(screen.getByAltText(/Snorlax sprite/i)).toBeDefined();
    userEvent.click(nextButton);

    expect(screen.getByText(/Dragonair/i)).toBeDefined(); // Dragonair
    expect(screen.getByAltText(/Dragonair sprite/i)).toBeDefined();
    userEvent.click(nextButton);

    expect(screen.getByText(/Pikachu/i)).toBeDefined(); // Pikachu
    expect(screen.getByAltText(/Pikachu sprite/i)).toBeDefined();
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
    expect(pokemonImg.src).toBe(imgSrc);
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

    expect(electricFilter).toBeDefined();
    expect(electricFilter.getAttribute(testIdAtribute)).toBe(dataTestId);
    userEvent.click(electricFilter);

    expect(fireFilter).toBeDefined();
    expect(fireFilter.getAttribute(testIdAtribute)).toBe(dataTestId);
    userEvent.click(fireFilter);

    expect(bugFilter).toBeDefined();
    expect(bugFilter.getAttribute(testIdAtribute)).toBe(dataTestId);
    userEvent.click(bugFilter);

    expect(poisonFilter).toBeDefined();
    expect(poisonFilter.getAttribute(testIdAtribute)).toBe(dataTestId);
    userEvent.click(poisonFilter);

    expect(psychicFilter).toBeDefined();
    expect(psychicFilter.getAttribute(testIdAtribute)).toBe(dataTestId);
    userEvent.click(psychicFilter);

    expect(normalFilter).toBeDefined();
    expect(normalFilter.getAttribute(testIdAtribute)).toBe(dataTestId);
    userEvent.click(normalFilter);

    expect(dragonFilter).toBeDefined();
    expect(dragonFilter.getAttribute(testIdAtribute)).toBe(dataTestId);
    userEvent.click(dragonFilter);

    expect(clearFilters).toBeDefined();
    userEvent.click(clearFilters);
  });
});

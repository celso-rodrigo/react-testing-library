import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import About from '../pages/About';

describe('Tests of component About (Requisito 2)', () => {
  it('Should exist two paragraphs with the pokedex info.', () => {
    renderWithRouter(<About />);

    const paragraphOneTxt = 'This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons';
    const paragraphTwoTxt = 'One can filter Pokémons by type,'
    + ' and see more details for each one of them';
    const paragraphOne = screen.getByText(paragraphOneTxt);
    const paragraphTwo = screen.getByText(paragraphTwoTxt);

    expect(paragraphOne).toBeDefined();
    expect(paragraphTwo).toBeDefined();
  });

  it('Should exist a h2 with the text "About Pokédex"', () => {
    renderWithRouter(<About />);

    const headingTxt = /about pokédex/i;
    const heading = screen.getByRole('heading', { name: headingTxt, level: 2 });

    expect(heading).toBeDefined();
    expect(heading).toHaveTextContent(headingTxt);
  });

  it('Should exist a pokedex image.', () => {
    renderWithRouter(<About />);

    const expectedSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByAltText(/Pokédex/i);

    expect(img).toBeDefined();
    expect(img.src).toBe(expectedSrc);
    expect(img.getAttribute('alt')).toBe('Pokédex');
  });
});

// client/src/tests/Countries.integration.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Countries from '../pages/Countries';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Mock fetch globally
global.fetch = vi.fn();

const mockCountry = {
  cca3: 'XYZ',
  name: { common: 'Xland', official: 'Republic of Xland' },
  flags: { svg: 'https://example.com/x.svg' },
  population: 12345,
  region: 'Europe',
  capital: ['Xcity'],
  languages: { eng: 'English' },
};

beforeEach(() => {
  fetch.mockImplementation((url) => {
    if (url.includes('/getfavorites')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true, favorites: [] }),
      });
    }

    if (url.includes('name')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([mockCountry]),
      });
    }

    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve([mockCountry]),
    });
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Countries Page', () => {
  it('renders a country and allows clicking + favoriting', async () => {
    render(
      <MemoryRouter>
        <Countries />
      </MemoryRouter>
    );

    // Wait for country name to appear
    const card = await screen.findByText('Xland');
    expect(card).toBeInTheDocument();

    // Click favorite button
    const favoriteBtn = screen.getByTitle('Add to favorites');
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, message: 'Added to favorites' }),
    });

    fireEvent.click(favoriteBtn);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/favorites'),
        expect.objectContaining({ method: 'POST' })
      );
    });

    // Type in search input and trigger search
    const input = screen.getByPlaceholderText(/search by country/i);
    fireEvent.change(input, { target: { value: 'Xland' } });

    // Wait for new results
    await waitFor(() => {
      expect(screen.getByText('Xland')).toBeInTheDocument();
    });
  });
});

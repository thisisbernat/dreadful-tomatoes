import { type FC, type ReactNode } from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import * as ReactQuery from '@tanstack/react-query'
import App from './App'

const queryClient = new ReactQuery.QueryClient()

interface providerProps {
  children: ReactNode
}

const Provider: FC<providerProps> = ({ children }) => {
  return <ReactQuery.QueryClientProvider client={queryClient}>{children}</ReactQuery.QueryClientProvider>
}

describe('App', () => {
  it('should render the page correctly', () => {
    render(
      <Provider>
        <App />
      </Provider>
    )
    expect(screen.getByTestId('main-logo')).toBeInTheDocument()
    expect(screen.getByText('Popular Movies')).toBeInTheDocument()
    expect(screen.getByText('© Copyright 2022 Dreadful Tomatoes. All rights reserved.')).toBeInTheDocument()
    expect(screen.getByTestId('app-store-button')).toBeInTheDocument()
    expect(screen.getByTestId('google-play-button')).toBeInTheDocument()
    expect(screen.getByTestId('google-play-button')).toBeInTheDocument()
  })

  it('should paginate movies correctly', async () => {
    render(
      <Provider>
        <App />
      </Provider>
    )

    await waitFor(
      async () => {
        expect(await screen.findAllByTestId('movie-card')).toHaveLength(10)
      },
      { timeout: 5000 }
    )

    await waitFor(() => {
      expect(screen.getByText('Avengers: Endgame')).toBeInTheDocument()
      expect(() => screen.getByText('Sin City')).toThrow()
    })

    await waitFor(
      async () => {
        const nextButton = await screen.findByTestId('pagination-next')
        nextButton.click()
        expect(await screen.findAllByTestId('movie-card')).toHaveLength(10)
      },
      { timeout: 5000 }
    )

    await waitFor(() => {
      expect(screen.getByText('Sin City')).toBeInTheDocument()
      expect(() => screen.getByText('Avengers: Endgame')).toThrow()
    })
  })

  it('should update search value and refetch movies on title search', async () => {
    render(
      <Provider>
        <App />
      </Provider>
    )

    await waitFor(async () => {
      expect(await screen.findAllByTestId('movie-card')).toHaveLength(10)
    })

    await waitFor(async () => {
      const searchInput = screen.getByTestId('search-input')
      expect(searchInput).toHaveAttribute('placeholder', 'Title')
      fireEvent.change(searchInput, { target: { value: 'wall' } })
      expect(searchInput).toHaveAttribute('value', 'wall')
      expect(await screen.findByText('The Wolf of Wall Street')).toBeInTheDocument()
    })
  })
})

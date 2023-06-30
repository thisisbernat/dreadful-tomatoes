import { type FC, type ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import * as ReactQuery from '@tanstack/react-query'
import App from '../App'
import { movies } from './movies.mock'

const queryClient = new ReactQuery.QueryClient()

interface providerProps {
  children: ReactNode
}

const Provider: FC<providerProps> = ({ children }) => {
  return <ReactQuery.QueryClientProvider client={queryClient}>{children}</ReactQuery.QueryClientProvider>
}

jest.mock('@tanstack/react-query', () => {
  const original: typeof ReactQuery = jest.requireActual('@tanstack/react-query')

  return {
    ...original,
    useQuery: jest.fn(),
  }
})

describe('App - useMovies', () => {
  const itemsPerPage = 2

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should fetch and display the movies correctly', async () => {
    const mockedUseQuery = ReactQuery.useQuery as jest.Mock
    mockedUseQuery.mockReturnValue({
      data: {
        movies: movies.slice(0, itemsPerPage),
        total: movies.length,
        pages: Math.ceil(movies.length / itemsPerPage),
      },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    })

    render(
      <Provider>
        <App />
      </Provider>
    )

    expect(await screen.findAllByTestId('movie-card')).toHaveLength(itemsPerPage)
  })

  it('should display the error message', async () => {
    const mockedUseQuery = ReactQuery.useQuery as jest.Mock
    mockedUseQuery.mockReturnValue({
      data: {
        movies: [],
        total: 0,
        pages: 0,
      },
      isLoading: false,
      isError: true,
      refetch: jest.fn(),
    })

    render(
      <Provider>
        <App />
      </Provider>
    )

    expect(screen.getByText('Sorry, the movie list could not be loaded.')).toBeInTheDocument()
  })

  it('should display the not found message', async () => {
    const mockedUseQuery = ReactQuery.useQuery as jest.Mock
    mockedUseQuery.mockReturnValue({
      data: {
        movies: [],
        total: 0,
        pages: 0,
      },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    })

    render(
      <Provider>
        <App />
      </Provider>
    )

    expect(screen.getByText('No movies found containing')).toBeInTheDocument()
  })
})

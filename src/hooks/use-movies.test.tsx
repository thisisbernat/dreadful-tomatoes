import { renderHook, act } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'
import { useMovies } from './use-movies'
import { movies } from '../tests/movies.mock'

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}))

describe('useMovies', () => {
  const itemsPerPage = 2

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should fetch movies correctly', async () => {
    const mockedUseQuery = useQuery as jest.Mock
    mockedUseQuery.mockReturnValue({
      data: {
        movies,
        total: movies.length,
        pages: Math.ceil(movies.length / itemsPerPage),
      },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    })

    const { result } = renderHook(() => useMovies(itemsPerPage))

    expect(result.current.data).toEqual({
      movies,
      total: movies.length,
      pages: Math.ceil(movies.length / itemsPerPage),
    })
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(false)
    expect(result.current.refetch).toBeDefined()
  })

  it('should update search value', async () => {
    const mockedUseQuery = useQuery as jest.Mock
    mockedUseQuery.mockReturnValue({
      data: {
        movies,
        total: movies.length,
        pages: Math.ceil(movies.length / itemsPerPage),
      },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    })

    const { result } = renderHook(() => useMovies(itemsPerPage))

    act(() => {
      result.current.search.set('wolf')
    })

    expect(result.current.search.value).toBe('wolf')
  })

  it('should update pagination page', async () => {
    const mockedUseQuery = useQuery as jest.Mock
    mockedUseQuery.mockReturnValue({
      data: {
        movies,
        total: movies.length,
        pages: Math.ceil(movies.length / itemsPerPage),
      },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    })

    const { result } = renderHook(() => useMovies(itemsPerPage))

    act(() => {
      result.current.pagination.next()
    })

    expect(result.current.pagination.active).toBe(2)
  })
})

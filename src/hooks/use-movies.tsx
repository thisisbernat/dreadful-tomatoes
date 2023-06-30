import { useQuery } from '@tanstack/react-query'
import { sortMoviesByDate, paginateMovies, searchMoviesByTitle } from '../utils'
import { usePagination, useDebouncedValue } from '@mantine/hooks'
import { useState } from 'react'
const MOVIES_URL = 'https://static.rviewer.io/challenges/datasets/dreadful-cherry-tomatoes/data.json'

export interface Movie {
  title: string
  description: string
  images: {
    posterArt: {
      url: string
      width: number
      height: number
    }
  }
  releaseYear: number
}

export interface PaginatedMovies {
  movies: Movie[] | undefined
  total: number | undefined
  pages: number
}

export const useMovies = (itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchedTitle, setSearchedTitle] = useState('')
  const [debouncedTitle] = useDebouncedValue(searchedTitle, 300)
  const handleTitleSearch = (input: string) => {
    setSearchedTitle(input)
  }

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['moviesQuery', currentPage, debouncedTitle],
    queryFn: async () => {
      const response = await (await fetch(MOVIES_URL)).json()
      const searchedMovies = searchMoviesByTitle(debouncedTitle, response?.entries)
      const sortedMovies = sortMoviesByDate(searchedMovies)
      return paginateMovies(sortedMovies, itemsPerPage, currentPage) as PaginatedMovies
    },
    keepPreviousData: true,
  })

  const pagination = usePagination({
    total: data?.pages ?? 0,
    onChange: page => {
      setCurrentPage(page)
    },
  })

  return {
    data,
    search: {
      value: searchedTitle,
      set: handleTitleSearch,
    },
    isLoading,
    isError,
    refetch,
    pagination,
  }
}

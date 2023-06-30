import { type Movie } from '../hooks'

export const sortMoviesByDate = (movies: Movie[] | undefined) => {
  return movies?.sort((a, b) => b.releaseYear - a.releaseYear)
}

export const paginateMovies = (movies: Movie[] | undefined, itemsPerPage: number, page: number) => {
  if (page <= 0) page = 1

  const totalItems = movies?.length
  const numOfPages = totalItems !== undefined ? Math.ceil(totalItems / itemsPerPage) : 0
  if (page >= numOfPages) page = numOfPages

  const start = (page - 1) * itemsPerPage
  const end = page * itemsPerPage

  return {
    movies: movies?.slice(start, end),
    total: totalItems,
    pages: numOfPages,
  }
}

export const searchMoviesByTitle = (searchedTitle: string, movies: Movie[] | undefined) => {
  return movies?.filter(movie => movie.title.toLowerCase().includes(searchedTitle.toLowerCase()))
}

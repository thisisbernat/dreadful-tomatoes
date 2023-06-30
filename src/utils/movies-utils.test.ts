import { sortMoviesByDate, paginateMovies, searchMoviesByTitle } from './movies-utils'
import { type Movie } from '../hooks'
import { movies } from '../tests/movies.mock'

describe('sortMoviesByDate', () => {
  it('should sort movies by release year in descending order', () => {
    const sortedMovies = sortMoviesByDate([...movies])

    expect(sortedMovies).toEqual([
      {
        title: 'Inception',
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
        images: {
          posterArt: {
            url: 'https://example.com/inception-poster.jpg',
            width: 800,
            height: 1200,
          },
        },
        releaseYear: 2010,
      },
      {
        title: 'The Dark Knight',
        description:
          'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        images: {
          posterArt: {
            url: 'https://example.com/dark-knight-poster.jpg',
            width: 800,
            height: 1200,
          },
        },
        releaseYear: 2008,
      },
      {
        title: 'Fight Club',
        description:
          'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.',
        images: {
          posterArt: {
            url: 'https://example.com/fight-club-poster.jpg',
            width: 800,
            height: 1200,
          },
        },
        releaseYear: 1999,
      },
      {
        title: 'Pulp Fiction',
        description:
          'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        images: {
          posterArt: {
            url: 'https://example.com/pulp-fiction-poster.jpg',
            width: 800,
            height: 1200,
          },
        },
        releaseYear: 1994,
      },
      {
        title: 'The Godfather',
        description:
          'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
        images: {
          posterArt: {
            url: 'https://example.com/godfather-poster.jpg',
            width: 800,
            height: 1200,
          },
        },
        releaseYear: 1972,
      },
    ])
  })

  it('should handle an empty movie array', () => {
    const movies: Movie[] = []
    const sortedMovies = sortMoviesByDate(movies)
    expect(sortedMovies).toEqual([])
  })

  it('should handle undefined movies', () => {
    const movies: Movie[] | undefined = undefined
    const sortedMovies = sortMoviesByDate(movies)
    expect(sortedMovies).toEqual(undefined)
  })
})

describe('paginateMovies', () => {
  it('should paginate movies correctly', () => {
    const itemsPerPage = 2
    const page = 1

    const result = paginateMovies(movies, itemsPerPage, page)

    expect(result).toEqual({
      movies: [
        {
          title: 'Inception',
          description: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
          images: {
            posterArt: {
              url: 'https://example.com/inception-poster.jpg',
              width: 800,
              height: 1200,
            },
          },
          releaseYear: 2010,
        },
        {
          title: 'The Godfather',
          description:
            'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
          images: {
            posterArt: {
              url: 'https://example.com/godfather-poster.jpg',
              width: 800,
              height: 1200,
            },
          },
          releaseYear: 1972,
        },
      ],
      total: 5,
      pages: 3,
    })
  })

  it('should handle an empty movie array', () => {
    const itemsPerPage = 3
    const page = 1
    const emptyMovies: Movie[] = []

    const result = paginateMovies(emptyMovies, itemsPerPage, page)

    expect(result).toEqual({
      movies: [],
      total: 0,
      pages: 0,
    })
  })

  it('should handle undefined movies', () => {
    const itemsPerPage = 4
    const page = 1
    const undefinedMovies: Movie[] | undefined = undefined

    const result = paginateMovies(undefinedMovies, itemsPerPage, page)

    expect(result).toEqual({
      movies: undefined,
      total: undefined,
      pages: 0,
    })
  })

  it('should handle an invalid page number and adjust it to the minimum valid value', () => {
    const itemsPerPage = 2
    const page = -1

    const result = paginateMovies(movies, itemsPerPage, page)

    expect(result).toEqual({
      movies: [
        {
          title: 'Inception',
          description: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
          images: {
            posterArt: {
              url: 'https://example.com/inception-poster.jpg',
              width: 800,
              height: 1200,
            },
          },
          releaseYear: 2010,
        },
        {
          title: 'The Godfather',
          description:
            'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
          images: {
            posterArt: {
              url: 'https://example.com/godfather-poster.jpg',
              width: 800,
              height: 1200,
            },
          },
          releaseYear: 1972,
        },
      ],
      total: 5,
      pages: 3,
    })
  })

  it('should handle an invalid page number and adjust it to the maximum valid value', () => {
    const itemsPerPage = 2
    const page = 3

    const result = paginateMovies(movies, itemsPerPage, page)

    expect(result).toEqual({
      movies: [
        {
          title: 'Fight Club',
          description:
            'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.',
          images: {
            posterArt: {
              url: 'https://example.com/fight-club-poster.jpg',
              width: 800,
              height: 1200,
            },
          },
          releaseYear: 1999,
        },
      ],
      total: 5,
      pages: 3,
    })
  })
})

describe('searchMoviesByTitle', () => {
  it('should return matching movies when the searched title exists', () => {
    const searchedTitle = 'The'
    const result = searchMoviesByTitle(searchedTitle, movies)
    expect(result).toEqual([
      {
        title: 'The Godfather',
        description:
          'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
        images: {
          posterArt: {
            url: 'https://example.com/godfather-poster.jpg',
            width: 800,
            height: 1200,
          },
        },
        releaseYear: 1972,
      },
      {
        title: 'The Dark Knight',
        description:
          'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        images: {
          posterArt: {
            url: 'https://example.com/dark-knight-poster.jpg',
            width: 800,
            height: 1200,
          },
        },
        releaseYear: 2008,
      },
    ])
  })

  it('should return an empty array when no movies match the searched title', () => {
    const searchedTitle = 'spider'
    const result = searchMoviesByTitle(searchedTitle, movies)
    expect(result).toEqual([])
  })

  it('should handle an empty movie array', () => {
    const searchedTitle = 'avengers'
    const emptyMovies: Movie[] = []
    const result = searchMoviesByTitle(searchedTitle, emptyMovies)
    expect(result).toEqual([])
  })

  it('should handle undefined movies', () => {
    const searchedTitle = 'Pulp'
    const undefinedMovies: Movie[] | undefined = undefined
    const result = searchMoviesByTitle(searchedTitle, undefinedMovies)
    expect(result).toEqual(undefined)
  })

  it('should handle case-insensitive searches', () => {
    const searchedTitle = 'fight'
    const result = searchMoviesByTitle(searchedTitle, movies)
    expect(result).toEqual([
      {
        title: 'Fight Club',
        description:
          'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.',
        images: {
          posterArt: {
            url: 'https://example.com/fight-club-poster.jpg',
            width: 800,
            height: 1200,
          },
        },
        releaseYear: 1999,
      },
    ])
  })
})

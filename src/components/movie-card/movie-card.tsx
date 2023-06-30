import { type FC } from 'react'
import { type Movie } from '../../hooks'
import styles from './movie-card.module.scss'

interface MovieCardProps {
  movie: Movie
}

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  return (
    <article className={styles.card} data-testid='movie-card'>
      <img src={movie.images.posterArt.url} alt={`Movie poster of ${movie.title}`} className={styles.poster} />
      <div className={styles.movieDetails}>
        <p className={styles.movieTitle} data-testid='movie-title'>
          {movie.title}
        </p>
        <p className={styles.movieReleaseYear} data-testid='movie-year'>
          {movie.releaseYear}
        </p>
        <p className={styles.movieDescription} data-testid='movie-description'>
          {movie.description}
        </p>
      </div>
    </article>
  )
}

export default MovieCard

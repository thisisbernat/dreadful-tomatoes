import { PaginationControl, Skeleton, SearchBar, MovieCard, Grid, Main, Footer, Header, Layout } from './components'
import { useMovies } from './hooks'
import { type FormEvent } from 'react'
import styles from './App.module.scss'

const ITEMS_PER_PAGE = 10

function App() {
  const { data, isLoading, isError, refetch, pagination, search } = useMovies(ITEMS_PER_PAGE)

  const handleTitleSearch = (e: FormEvent<HTMLInputElement>) => {
    search.set(e.currentTarget.value)
  }

  return (
    <Layout>
      <Header>
        <SearchBar value={search.value} onChange={handleTitleSearch} />
      </Header>
      <Main>
        {isError ? (
          <div className={styles.errorWrapper}>
            <p className={styles.errorMessage}>Sorry, the movie list could not be loaded.</p>
            <button onClick={() => refetch} className={styles.errorButton}>
              Try again
            </button>
          </div>
        ) : (
          <>
            {data?.movies != null && data?.movies?.length <= 0 && (
              <div className={styles.emptyWrapper}>
                <p className={styles.emptyMessage}>
                  No movies found containing <span className={styles.emptyValue}>{search.value}</span>
                </p>
              </div>
            )}
            <Grid>
              {isLoading &&
                Array.from(Array(ITEMS_PER_PAGE).keys()).map((skeleton, i) => <Skeleton key={`skeleton-${i}`} />)}
              {data?.movies?.map(movie => (
                <MovieCard key={movie.title} movie={movie} />
              ))}
            </Grid>
            <PaginationControl pagination={pagination} />
          </>
        )}
      </Main>
      <Footer />
    </Layout>
  )
}

export default App

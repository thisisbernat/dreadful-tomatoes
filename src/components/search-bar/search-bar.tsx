import { type FC, type FormEvent } from 'react'
import Container from '../container/container'
import styles from './search-bar.module.scss'

interface searchBarProps {
  value: string
  onChange: (e: FormEvent<HTMLInputElement>) => void
}

const SearchBar: FC<searchBarProps> = ({ value, onChange }) => {
  return (
    <div className={styles.box}>
      <Container>
        <div className={styles.inputWrapper}>
          <input
            type='text'
            name='movie-search'
            placeholder='Title'
            value={value}
            onChange={onChange}
            className={styles.input}
            data-testid='search-input'
          />
          <img src='/images/search.svg' alt='' className={styles.glass} />
        </div>
      </Container>
    </div>
  )
}

export default SearchBar

import { type FC, type ReactNode } from 'react'
import Container from '../container/container'
import styles from './main.module.scss'

interface mainProps {
  children: ReactNode
}

const Main: FC<mainProps> = ({ children }) => {
  return (
    <main className={styles.main}>
      <Container>
        <h1 className={styles.title}>Popular Movies</h1>
        {children}
      </Container>
    </main>
  )
}

export default Main

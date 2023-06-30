import { type FC, type ReactNode } from 'react'
import Container from '../container/container'
import styles from './header.module.scss'

interface headerProps {
  children: ReactNode
}

const Header: FC<headerProps> = ({ children }) => {
  return (
    <header className={styles.header}>
      <Container>
        <img
          src='/images/dreadful-cherry-tomatoes-logo.svg'
          alt='Dreadful Cherry Tomatoes Logo'
          className={styles.headerLogo}
          data-testid='main-logo'
        />
      </Container>
      {children}
    </header>
  )
}

export default Header

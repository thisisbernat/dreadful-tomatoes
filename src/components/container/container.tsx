import { type FC, type ReactNode } from 'react'
import styles from './container.module.scss'

interface containerProps {
  children: ReactNode
}

const Container: FC<containerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>
}

export default Container

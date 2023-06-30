import { type FC, type ReactNode } from 'react'
import styles from './grid.module.scss'

interface gridProps {
  children: ReactNode
}

const Grid: FC<gridProps> = ({ children }) => {
  return <div className={styles.grid}>{children}</div>
}

export default Grid

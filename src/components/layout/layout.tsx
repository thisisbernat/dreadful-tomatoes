import { type FC, type ReactNode } from 'react'
import styles from './layout.module.scss'

interface layoutProps {
  children: ReactNode
}

const Layout: FC<layoutProps> = ({ children }) => {
  return <div className={styles.layout}>{children}</div>
}

export default Layout

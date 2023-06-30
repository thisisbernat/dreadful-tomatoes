import { type FC } from 'react'
import styles from './pagination-control.module.scss'

interface PaginationControlProps {
  pagination: {
    range: Array<number | 'dots'>
    active: number
    setPage: (pageNumber: number) => void
    next: () => void
    previous: () => void
    first: () => void
    last: () => void
  }
}

interface PageButtonProps {
  children: number | 'dots'
  isActive: boolean
  onClick: (pageNumber: number) => void
}

const PaginationControl: FC<PaginationControlProps> = ({ pagination }) => {
  const showArrows = pagination.range.length > 0

  return (
    <div className={styles.pagination}>
      {showArrows && <PrevButton onClick={pagination.previous} />}
      {pagination.range.map((page, i) => (
        <PageButton key={`pagination-${i}`} isActive={page === pagination.active} onClick={pagination.setPage}>
          {page}
        </PageButton>
      ))}
      {showArrows && <NextButton onClick={pagination.next} />}
    </div>
  )
}

const PageButton: FC<PageButtonProps> = ({ children, isActive, onClick }) => {
  if (children === 'dots') {
    return (
      <div className={styles.dots} data-testid='pagination-dots'>
        …
      </div>
    )
  }

  const className = `
    ${styles.numberBtn as string}
    ${isActive ? (styles.active as string) : (styles.inactive as string)}
    `

  return (
    <button
      className={className}
      onClick={() => {
        onClick(children)
      }}
      data-testid='pagination-button'
    >
      {children}
    </button>
  )
}

const PrevButton: FC<{ onClick: () => void }> = ({ onClick }) => (
  <button className={styles.chevronBtn} title='Previous page' onClick={onClick} data-testid='pagination-prev'>
    <img src='/images/left-chevron.svg' alt='' className={styles.chevronImage} />
  </button>
)

const NextButton: FC<{ onClick: () => void }> = ({ onClick }) => (
  <button className={styles.chevronBtn} title='Next page' onClick={onClick} data-testid='pagination-next'>
    <img src='/images/right-chevron.svg' alt='' className={styles.chevronImage} />
  </button>
)

export default PaginationControl

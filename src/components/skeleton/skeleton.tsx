import styles from './skeleton.module.scss'

const Skeleton = () => (
  <div className={styles.skeletonWrapper} data-testid='skeleton-card'>
    <div className={styles.skeleton} />
  </div>
)

export default Skeleton

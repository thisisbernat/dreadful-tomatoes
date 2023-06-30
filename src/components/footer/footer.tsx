import { type FC } from 'react'
import styles from './footer.module.scss'

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <img
        src='/images/dreadful-cherry-tomatoes-logo.svg'
        alt='Dreadful Cherry Tomatoes Logo'
        width='256px'
        height='auto'
        data-testid='footer-logo'
      />
      <div className={styles.storesButtons}>
        <a href='https://apple.com/app-store' target='_blank' rel='noreferrer noopener'>
          <img
            src='/images/apple-app-store.png'
            alt='Available on the App Store'
            title='Available on the App Store'
            width='176px'
            height='auto'
            data-testid='app-store-button'
          />
        </a>
        <a href='https://play.google.com/store' target='_blank' rel='noreferrer noopener'>
          <img
            src='/images/google-play.png'
            alt='Get it on Google Play'
            title='Get it on Google Play'
            width='176px'
            height='auto'
            data-testid='google-play-button'
          />
        </a>
      </div>
      <p className={styles.copyright}>&copy; Copyright 2022 Dreadful Tomatoes. All rights reserved.</p>
    </footer>
  )
}

export default Footer

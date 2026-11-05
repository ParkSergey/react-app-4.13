import styles from './articleCard.module.css'
import image from '../../images/UserInfo.svg'

export default function ArticleCard() {
  return (
    <div className={styles.articleCard}>
      <img className={styles.image} src={image} alt="user info" />
      <p className={styles.text}>This is text</p>
      <p className={styles.description}>This is text</p>
    </div>
  )
}
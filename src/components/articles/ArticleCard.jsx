import styles from './articleCard.module.css';
import UserInfo from '../UserInfo/UserInfo.jsx';

export default function ArticleCard({ article }) {
  return (
    <div className={styles.articleCard}>
      <div className={styles.user}>
        <UserInfo
          author={article.author}
          image={article.image}
          date={article.createdAt} />
      </div>

      <p className={styles.text}>{article.title}</p>
      <p className={styles.description}>This is text</p>
    </div>
  );
}
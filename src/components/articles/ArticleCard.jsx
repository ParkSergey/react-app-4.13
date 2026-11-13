import styles from './articleCard.module.css';
import UserInfo from '../UserInfo/UserInfo.jsx';
import { Link } from 'react-router';
import Tags from '../tags/Tags.jsx';
export default function ArticleCard({ article }) {
  return (
    <div className={styles.articleCard}>
      <div className={styles.user}>
        <UserInfo
          author={article.author}
          image={article.image}
          date={article.createdAt}
        />
      </div>
      <h2 className={styles.title}>
        <Link className={styles.link} to={`/articles/${article.slug}`}>
          {article.slug}
        </Link>
      </h2>

      <p className={styles.description}>{article.body}</p>
      <Tags tagList={article.tagList} compact />
    </div>
  );
}
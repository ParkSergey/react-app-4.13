import styles from './articleCard.module.css';
import UserInfo from '../UserInfo/UserInfo.jsx';
import { Link } from 'react-router';

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

      <p className={styles.text}>{article.body}</p>
      <p className={styles.description}>{article.body}</p>
     <div className={styles.tags}>
                 {(article.tagList.length
                   ? article.tagList
                   : Array(9).fill('tag')
                 ).map((tag, i) => (
                   <span key={i}>{tag}</span>
                 ))}
               </div>
     
    </div>
  );
}
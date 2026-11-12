import styles from '../pages/ArticlePage.module.css';
import { Link } from 'react-router';
import image from '../../assets/images/pen.svg';
import { settings, smallIcon } from '../../assets/images';
function ArticleHeader({ author }) {
  return (
    <header className={styles.header}>
      <div className={styles.text}>Realworld Blog</div>
      <nav className={styles.url}>
        <Link to="/">Home</Link>
        <Link to="New Post">
          <img src={image} alt="new Post" /> New Post
        </Link>
        <Link to="/Settings">
          <img src={settings} alt="Settings" />
          Settings
        </Link>
        {author && (
          <Link className={styles.user} to="/profile">
            <img className={styles.avatar} src={author.image} alt="author" />
            <span className={styles.name}>{author.username}</span>
          </Link>
        )}
      </nav>
    </header>
  );
}
export default ArticleHeader;

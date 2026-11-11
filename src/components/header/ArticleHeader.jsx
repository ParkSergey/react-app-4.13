import styles from '../pages/ArticlePage.module.css';
import { Link } from 'react-router';
import image from '../../assets/images/pen.svg';
import { settings, smallIcon } from '../../assets/images';
function ArticleHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.text}>Realworld Blog</div>
      <nav className={styles.url}>
        <Link to="/">Home</Link>
        <Link to="New Post">
          <img src={image} alt="new Post" /> New Post
        </Link>
        <Link to="/sign-up">Sign Up</Link>
      </nav>
    </header>
  );
}
export default ArticleHeader;

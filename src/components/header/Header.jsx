import styles from './header.module.css';
import { Link } from 'react-router-dom';
import userIcon from '../../assets/images/Icon.svg';

function Header() {
  const username = localStorage.getItem('username');
  const userImage = localStorage.getItem('userImage');

  return (
    <header className={styles.header}>
      <div className={styles.text}>Realworld Blog</div>
      <nav className={styles.url}>
        <Link to="/">Home</Link>
        {username ? (
          <div className={styles.profile}>
            <span className={styles.username}>{username}</span>
            <img
              className={styles.avatar}
              src={userImage || userIcon}
              alt=""
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = userIcon;
              }}
            />
          </div>
        ) : (
          <>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/sign-up">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;

import { Link } from 'react-router-dom';
import styles from './header.module.css';
import newPostIcon from '../../assets/images/pen.svg';
import settingsIcon from '../../assets/images/settings.svg';
import userIcon from '../../assets/images/smallIcon.svg';
import { useAuth } from '../authentification/AuthContext.jsx'

function Header() {
  const { user } = useAuth()
 
  const isAuthenticated = Boolean(user);


  return (
    <header className={styles.header}>
      <div
        className={`${styles.container} ${
          isAuthenticated
            ? styles.authenticatedContainer
            : styles.guestContainer
        }`}
      >
        <Link className={styles.brand} to="/">
          Realworld Blog
        </Link>
        <nav className={styles.url}>
          <Link to="/">Home</Link>
          {isAuthenticated ? (
            <>
              <Link className={styles.navItem} to="/editor">
                <img src={newPostIcon} alt="" />
                New Post
              </Link>
              <Link className={styles.navItem} to="/settings">
                <img src={settingsIcon} alt="" />
                Settings
              </Link>
              <Link className={styles.navItem} to="/profile">
                <img src={userIcon} alt="" />
                {user.username || 'Profile'}
              </Link>
            </>
          ) : (
            <>
              <Link to="/sign-in">Sign In</Link>
              <Link to="/sign-up">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;

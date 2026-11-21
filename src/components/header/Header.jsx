import styles from './header.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userIcon from '../../assets/images/Icon.svg';

function Header() {
  const [username, setUsername] = useState(() =>
    localStorage.getItem('username'),
  );
  const [userImage, setUserImage] = useState(() =>
    localStorage.getItem('userImage'),
  );
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userImage');
    setUsername(null);
    setUserImage(null);
    navigate('/');
  }

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
            <button
              className={styles.logout}
              type="button"
              onClick={handleLogout}
            >
              Log out
            </button>
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

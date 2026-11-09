import styles from './header.module.css';

import { Link } from 'react-router-dom';
function Header() {
  const nav = ['Home', 'Sign In', 'Sign Up'];
  return (
    
      <header className={styles.header}>
        <div className={styles.text}>Realworld Blog</div>
        <nav className={styles.url}>
          <Link to="/">Home</Link>
       <Link to="/sign-in">Sign In</Link>  
        <Link to="/sign-up">Sign Up</Link>
        </nav>
        </header>
      
  );
}
export default Header;

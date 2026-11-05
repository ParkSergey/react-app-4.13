import styles from './header.module.css';

function Header() {
  return (
    <>
    <header className={styles.header}>
      <div className={styles.text}>Realworld Blog</div>
      <div className={styles.leftText}>Home sign In sign Up</div>
      
    </header>
      <div className={styles.greenBanner}></div>
      </>
  )
}
export default Header;
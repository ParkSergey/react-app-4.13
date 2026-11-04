import styles from './bannerDefault.module.css';
function Banner() {
  return (
    <div className={styles.greenBanner}>
      <h1 className={styles.title}>Realworld Blog</h1>
      <p className={styles.subtitle}>A place to share your knowledge.</p>
    </div>
  );
} 
export default Banner;
import styles from './bannerDefault.module.css';
function Banner() {
  return (
    <div className={styles.greenBanner}>
      <h2 className={styles.title}>Realworld Blog</h2>
      <p className={styles.subtitle}>A place to share your knowledge.</p>
    </div>
  );
} 
export default Banner;
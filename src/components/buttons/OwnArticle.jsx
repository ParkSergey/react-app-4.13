import styles from './Buttons.module.css';
function OwnArticle() {
  return (
    <div className={styles.buttons}>
      <button className={styles.green}>Edit</button>
      <button className={styles.red}>Delete</button>
    </div>
  );
}
export default OwnArticle;

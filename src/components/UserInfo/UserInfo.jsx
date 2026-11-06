import styles from './UserInfo.module.css';
import image from '../../images/icon.svg'
function UserInfo() {
  return (
    <div className={styles.userInfo}>
      <img className={styles.image} src={image} alt="info user" />
      <div className={styles.text}>
        <span className={styles.semiBold}>John Lobster</span>
        <span className={styles.regular}>01 january 2023</span>
      </div>
    </div>
  );
}
export default UserInfo;
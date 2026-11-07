import styles from './UserInfo.module.css';
import image from '../../assets/images/Icon.svg';
function UserInfo({ author, date }) {
  return (
    <div className={styles.userInfo}>
      <img className={styles.image}
        src={author.image || image}
        alt={author.username} />
      <div className={styles.text}>
        <span className={styles.semiBold}>{author.username}</span>
        <span className={styles.regular}>{new Date(date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long' ,
          year: 'numeric',
        })}
        </span>
      </div>
    </div>
  );
}
export default UserInfo;
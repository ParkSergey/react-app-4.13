import styles from './Buttons.module.css';
import image from '../../assets/images/heart.svg';
function Like() {
  return (
    <button className={styles.like}>
      <img src={image} alt="like" />
    </button>
  );
}
export default Like;

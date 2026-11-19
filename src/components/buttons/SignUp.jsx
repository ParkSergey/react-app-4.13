import styles from './Buttons.module.css';

function SignUp({ isSubmitting = false }) {
  return (
    <div className={styles.wrapbutton}>
      <button className={styles.signin} type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Please wait...' : ''}
        <span className={styles.signup}> Sign Up</span>
      </button>
    </div>
  );
}

export default SignUp;
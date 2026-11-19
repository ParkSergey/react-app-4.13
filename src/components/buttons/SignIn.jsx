import styles from './Buttons.module.css';

function SignIn({ isSubmitting = false }) {
  return (
    <div className={styles.wrapbutton}>
      <button className={styles.signin} type="submit" disabled={isSubmitting}>
        <span className={styles.entrance}>
          {isSubmitting ? 'Please wait...' : 'Sign In'}
        </span>
      </button>
    </div>
  );
}

export default SignIn
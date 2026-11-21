import styles from './Buttons.module.css';

function SignUp({ isSubmitting = false, agreeRegistration }) {
  return (
    <div className={styles.wrapbutton}>
      <input
        type="checkbox"
        id="agree"
        checked
        {...agreeRegistration}
      />
      <span className={styles.checkbox}>согласие на обработку <br></br>персональных данных</span>
      <button className={styles.signin} type="submit" disabled={isSubmitting}>
        <span className={styles.signup}>
  { 'Sign Up'}
        </span>
      </button>
    </div>
  );
}

export default SignUp;
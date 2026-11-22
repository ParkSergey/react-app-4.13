
import styles from './Input.module.css'
function Input({ name, register, rules, placeholder, type = 'text', errors, className = '', ...props }) {
  const error = errors?.[name]?.message;
  const classes = [styles.input,
  error && styles.invalid,
    className,
    
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <>
      <input
        className={classes}
        placeholder={placeholder}
        type={type}
        {...props}
        {...register(name, rules)}
      />

      {error && (
        <p className={styles.message} role='alert'>{error}
        </p>
      )}
    </>
  );
}

export default Input;

 

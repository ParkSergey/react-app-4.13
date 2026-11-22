import styles from './Buttons.module.css';

function Button({
  children,
  size = 'small',
  className = '',
  type = 'button',
  variant = 'filled',
  icon,
  ...props
}) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    className,
  ].filter(Boolean).join(' ');

  return (
    <button type={type} className={classes} {...props}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
} 
export default Button;
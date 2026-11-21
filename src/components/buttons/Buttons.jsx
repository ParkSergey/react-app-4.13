import styles from './Buttons.module.css';

function Button({
  children,
  size = 'small',
  className = '',
  type = 'button',
  variant = 'filled',
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
      {children}
    </button>
  );
} 
export default Button;
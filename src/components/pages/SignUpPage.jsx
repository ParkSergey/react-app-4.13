import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../header/Header.jsx';
import styles from './AuthForms.module.css';
import SignUp from '../buttons/SignUp.jsx';
const API_URL = 'https://realworld.habsida.net/api';

function SignUpPage() {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    const formData = new FormData(event.currentTarget);
    if (formData.get('password') !== formData.get('repeatPassword')) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
          },
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        const messages = data.errors
          ? Object.entries(data.errors)
              .map(
                ([field, details]) =>
                  `${field} ${Array.isArray(details) ? details.join(', ') : details}`,
              )
              .join('; ')
          : data.message;
        throw new Error(messages || 'Unable to submit the form. Please try again.');
      }

      if (data.user) {
        if (data.user.token) localStorage.setItem('token', data.user.token);
        if (data.user.username) {
          localStorage.setItem('username', data.user.username);
        } else {
          localStorage.removeItem('username');
        }
        if (data.user.image) {
          localStorage.setItem('userImage', data.user.image);
        } else {
          localStorage.removeItem('userImage');
        }
      }
      navigate('/articles');
    } catch (submitError) {
      setError(submitError.message || 'Unable to connect. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.card}>
          <h1 className={styles.title}>Create account</h1>
          <form
            className={`${styles.form} ${styles.signUpForm}`}
            onSubmit={handleSubmit}
            aria-busy={isSubmitting}
          >
            <label className={styles.field}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                aria-label="Username"
                autoComplete="username"
                required
              />
            </label>
            <label className={styles.field}>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                aria-label="Email"
                autoComplete="email"
                required
              />
            </label>
            <label className={styles.field}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                aria-label="Password"
                autoComplete="new-password"
                required
              />
            </label>
            <label className={styles.field}>
              <input
                type="password"
                name="repeatPassword"
                placeholder="Repeat password"
                aria-label="Repeat password"
                autoComplete="new-password"
                required
              />
            </label>
            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}
            <SignUp isSubmitting={isSubmitting} />
          
          </form>
          <p className={styles.switch}>
            Already have an account? <Link to="/sign-in">Sign in</Link>
          </p>
        </section>
      </main>
    </>
  );
}

export default SignUpPage;

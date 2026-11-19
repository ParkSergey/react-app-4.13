import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../header/Header.jsx';
import styles from './AuthForms.module.css';
import SignIn from '../buttons/SignIn.jsx';

const API_URL = 'https://realworld.habsida.net/api';

function SignInPage() {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: {
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
        throw new Error(messages || 'Unable to submit form. Please try again.');
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
          <h1 className={styles.title}>Sign In</h1>
          <form className={styles.form} onSubmit={handleSubmit} aria-busy={isSubmitting}>
            <label className={styles.field}>
              <input className={styles.username}
                type="email"
                name="email"
                placeholder="Username"

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
                autoComplete="current-password"
                required
              />
            </label>
            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}
            <SignIn isSubmitting={isSubmitting} />
          </form>
          <p className={styles.switch}>
            Don&apos;t have an account? <Link to="/sign-up">Sign up</Link>
          </p>
        </section>
      </main>
    </>
  );
}

export default SignInPage;

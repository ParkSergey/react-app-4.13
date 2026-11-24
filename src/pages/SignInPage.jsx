import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Header from '../components/header/Header.jsx';
import styles from './AuthForms.module.css';
import Button from '../components/buttons/Buttons.jsx';
import Input from '../components/input/Input.jsx';

const API_URL = 'https://realworld.habsida.net/api';

function SignInPage() {
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit({ email, password }) {
    setServerError('');

    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: { email, password },
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const messages = data.errors
          ? Object.entries(data.errors)
              .map(
                ([field, details]) =>
                  `${field} ${Array.isArray(details) ? details.join(', ') : details}`,
              )
              .join('; ')
          : data.message;
        throw new Error(
          messages || 'Ошибка ввода. Пожалуйста, попробуйте еще раз.',
        );
      }

      if (data.user?.token) {
        localStorage.setItem('token', data.user.token);
      } else {
        localStorage.removeItem('token');
      }
      if (data.user?.username) {
        localStorage.setItem('username', data.user.username);
      } else {
        localStorage.removeItem('username');
      }
      if (data.user?.image) {
        localStorage.setItem('userImage', data.user.image);
      } else {
        localStorage.removeItem('userImage');
      }

      navigate('/articles');
    } catch (submitError) {
      setServerError(
        submitError.message ||
          'Ошибка сервера. Пожалуйста, попробуйте еще раз.',
      );
    }
  }

  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.card}>
          <h1 className={styles.title}>Sign In</h1>

          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            aria-busy={isSubmitting}
            noValidate
          >
            <Input
              name="email"
              register={register}
              errors={errors}
              type="email"
              placeholder="Username"
              autoComplete="email"
              rules={{
                required: 'ВВедите email',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Неправильный email',
                },
              }}
            />

            <Input
              type="password"
              name="Password"
              register={register}
              errors={errors}
              placeholder="Password"
              autoComplete="password"
              rules={{
                required: 'Введите password',
              }}
            />

          
            <Button
              className={styles.submit}
              size="large"
              type="submit"
              variant="filled"
            >
              Sign In
            </Button>
          </form>
        </section>
      </main>
    </>
  );
}

export default SignInPage;

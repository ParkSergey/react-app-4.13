import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from './AuthForms.module.css';
import Button from '../components/buttons/Buttons.jsx';
import Input from '../components/input/Input.jsx';
import { useAuth } from '../components/authentification/AuthContext.jsx';

const API_URL = 'https://realworld.habsida.net/api';

function SignInPage() {
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
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
        if (!response.ok) {
          const isInvalidLogin =
            response.status === 401 ||
            response.status === 403 ||
            response.status === 422 ||
            data.errors?.['email or password'];

          if (isInvalidLogin) {
            throw new Error('Неверный email или пароль.');
          }

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

      login(data.user);

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
              placeholder="Email address"
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
              name="password"
              register={register}
              errors={errors}
              placeholder="Password"
              autoComplete="password"
              rules={{
                required: 'Введите password',
              }}
            />
            {serverError && (
              <p className={styles.error} role="alert">
                {serverError}
              </p>
            )}
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

import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header.jsx';
import styles from './AuthForms.module.css';
import SignUp from '../components/buttons/SignUp.jsx';
import { useForm } from 'react-hook-form';
const API_URL = 'https://realworld.habsida.net/api';

function SignUpPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  async function onSubmit(formData) {
    clearErrors('root.server');
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          },
        }),
      });
      const responseText = await response.text();
      let responseData;
      try {
        responseData = responseText ? JSON.parse(responseText) : null;
      } catch {
        responseData = { message: responseText };
      }

      if (!response.ok) {
        const serverErrors = responseData?.errors;
        const formMessages = [];
        const fieldNames = ['username', 'email', 'password'];
        let hasFieldErrors = false;
        const duplicateEmailPattern =
          /UNIQUE constraint failed:\s*users\.email/i;
        const isDuplicateEmail = duplicateEmailPattern.test(
          JSON.stringify(responseData) ?? '',
        );
        const responseMessage =
          typeof responseData === 'string'
            ? responseData
            : typeof responseData?.message === 'string'
              ? responseData.message
              : '';

        if (serverErrors && typeof serverErrors === 'object') {
          Object.entries(serverErrors).forEach(([field, details]) => {
            const message = Array.isArray(details)
              ? details.join(', ')
              : typeof details === 'string'
                ? details
                : JSON.stringify(details);
            if (isDuplicateEmail && duplicateEmailPattern.test(message)) {
              return;
            }
            if (fieldNames.includes(field)) {
              hasFieldErrors = true;
              setError(field, {
                type: 'server',
                message: `${field}: ${message}`,
              });
            } else {
              formMessages.push(`${field}: ${message}`);
            }
          });
        }

        if (isDuplicateEmail) {
          setError('email', {
            type: 'server',
            message: 'Этот email уже зарегистрирован.',
          });
          hasFieldErrors = true;
        } else if (responseMessage) {
          formMessages.push(responseMessage);
        }
        const formMessage =
          formMessages.join('; ') ||
          (!hasFieldErrors
            ? 'Не удалось создать аккаунт. Проверьте данные и попробуйте ещё раз.'
            : '');
        if (formMessage) {
          setError('root.server', { type: 'server', message: formMessage });
        }
        return;
      }

      if (!responseData?.user) {
        throw new Error('Сервер вернул некорректный ответ при регистрации.');
      }

      if (responseData.user) {
        if (responseData.user.token)
          localStorage.setItem('token', responseData.user.token);
        if (responseData.user.username) {
          localStorage.setItem('username', responseData.user.username);
        } else {
          localStorage.removeItem('username');
        }
        if (responseData.user.image) {
          localStorage.setItem('userImage', responseData.user.image);
        } else {
          localStorage.removeItem('userImage');
        }
      }
      navigate('/articles');
    } catch (submitError) {
      setError('root.server', {
        type: 'server',
        message:
          submitError.message ||
          'Не удалось подключиться к серверу. Пожалуйста, попробуйте ещё раз.',
      });
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
            onSubmit={handleSubmit(onSubmit)}
            aria-busy={isSubmitting}
            noValidate
          >
            <input
              {...register('username', {
                required: 'Введите имя пользователя',
                validate: (value) =>
                  value.trim().length > 0 ||
                  'Имя пользователя не может быть пустым',
                minLength: { value: 3, message: 'Минимум 3 символа' },
                maxLength: { value: 20, message: 'Максимум 20 символов' },
              })}
              className={styles.field}
              type="text"
              placeholder="Username"
              autoComplete="username"
            />
            {errors.username && (
              <p className={styles.error} role="alert">
                {errors.username.message}
              </p>
            )}
            <input
              {...register('email', {
                required: 'Введите email',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Неправильный email',
                },
              })}
              className={styles.field}
              type="email"
              placeholder="Email address"
              autoComplete="email"
            />
            {errors.email && (
              <p className={styles.error} role="alert">
                {errors.email.message}
              </p>
            )}
            <input
              {...register('password', {
                required: 'Введите пароль',
                minLength: { value: 6, message: 'Минимум 6 символов' },
                maxLength: { value: 40, message: 'Максимум 40 символов' },
                deps: 'repeatPassword',
              })}
              className={styles.field}
              type="password"
              placeholder="Password"
              autoComplete="new-password"
            />
            {errors.password && (
              <p className={styles.error} role="alert">
                {errors.password.message}
              </p>
            )}
            <input
              {...register('repeatPassword', {
                required: 'Повторите пароль',
                validate: (value) =>
                  value === getValues('password') || 'Пароли не совпадают',
              })}
              className={styles.field}
              type="password"
              placeholder="Repeat password"
              autoComplete="new-password"
            />
            {errors.repeatPassword && (
              <p className={styles.error} role="alert">
                {errors.repeatPassword.message}
              </p>
            )}

            <SignUp
              isSubmitting={isSubmitting}
              agreeRegistration={register('agree', {
                required:
                  'Необходимо согласие на обработку персональных данных',
              })}
            />
            {errors.agree && (
              <p className={styles.error} role="alert">
                {errors.agree.message}
              </p>
            )}
            {errors.root?.server && (
              <p className={styles.error} role="alert">
                {errors.root.server.message}
              </p>
            )}
          </form>
        </section>
      </main>
    </>
  );
}

export default SignUpPage;

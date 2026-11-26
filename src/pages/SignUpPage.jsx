import { useNavigate } from 'react-router-dom';
import styles from './AuthForms.module.css';
import Button from '../components/buttons/Buttons.jsx';
import Input from '../components/input/Input.jsx';
import { useForm } from 'react-hook-form';
import { useAuth } from '../components/authentification/AuthContext.jsx';
const API_URL = 'https://realworld.habsida.net/api';

function SignUpPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
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

      login(responseData.user);
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
      <main className={styles.page}>
        <section className={styles.card}>
          <h1 className={styles.title}>Create account</h1>
          <form
            className={`${styles.form} ${styles.signUpForm}`}
            onSubmit={handleSubmit(onSubmit)}
            aria-busy={isSubmitting}
            noValidate
          >
            <Input
              name="Username"
              register={register}
              errors={errors}
              type="username"
              placeholder="Username"
              autoComplete="email"
              rules={{
                required: 'ВВедите Username',
                minLength: { value: 3, message: 'Минимум 3 символа' },
                maxLength: { value: 20, message: 'Максимум 20 символов' },
              }}
            />
            <Input
              name="email"
              register={register}
              errors={errors}
              type="email"
              placeholder="email"
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
              name="password"
              register={register}
              errors={errors}
              type="password"
              placeholder="Password"
              autoComplete="password"
              rules={{
                required: 'Введите пароль',
                minLength: {
                  value: 6,
                  message: 'Пароль должен быть не меньше 6 сиволов',
                },
                maxLength: {
                  value: 40,
                  message: 'Пароль должен быть не больше 40 символов',
                },
              }}
            />
            <Input
              name="repeat password"
              register={register}
              errors={errors}
              type="password"
              placeholder="Repeat Password"
              autoComplete="new password"
              rules={{
                required: 'Повторите пароль',
                validate: (value) =>
                  value === getValues('password') || 'Пароли не совпадают',
              }}
            />

            <Button
              className={styles.signup}
              size="large"
              type="submit"
              variant="filled"
            >
              Sign Up
            </Button>
          </form>
        </section>
      </main>
    </>
  );
}

export default SignUpPage;

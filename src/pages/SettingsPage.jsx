import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Input from '../components/input/Input.jsx';
import Button from '../components/buttons/Buttons.jsx';
import styles from './AuthForms.module.css';
import { useAuth } from '../components/authentification/AuthContext.jsx';


const API_URL = 'https://realworld.habsida.net/api';

function SettingsPage() {
  const navigate = useNavigate();
  const { login, logout } = useAuth();
  const token = localStorage.getItem('token');

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onTouched' });


  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_URL}/user`, {
      headers: { Authorization: `Token ${token}` },
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Не удалось загрузить данные профиля.');
        return res.json();
      })
      .then((data) => {
        reset({
          username: data.user.username,
          email: data.user.email,
          image: data.user.image || '',
          password: '',
        });
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError('root.server', { type: 'server', message: err.message });
        }
      });

    return () => controller.abort();
  }, [token, reset, setError]);

  async function onSubmit({ username, email, password, image }) {
   
    const user = { username, email };
    if (password) user.password = password;
    if (image) user.image = image;

    try {
      const response = await fetch(`${API_URL}/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ user }),
      });

      const text = await response.text();
      let data;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = { message: text };
      }

      if (!response.ok) {
        const raw = JSON.stringify(data) ?? '';

        if (/UNIQUE constraint failed:\s*users\.username/i.test(raw)) {
          setError('username', {
            type: 'server',
            message: 'Это имя пользователя уже занято.',
          });
          return;
        }
        if (/UNIQUE constraint failed:\s*users\.email/i.test(raw)) {
          setError('email', {
            type: 'server',
            message: 'Этот email уже зарегистрирован.',
          });
          return;
        }

        const message = data?.errors
          ? Object.entries(data.errors)
              .map(
                ([field, details]) =>
                  `${field}: ${Array.isArray(details) ? details.join(', ') : details}`,
              )
              .join('; ')
          : data?.message;

        setError('root.server', {
          type: 'server',
          message:
            message || 'Не удалось сохранить изменения. Попробуйте ещё раз.',
        });
        return;
      }

     
      const updated = data?.user;
      login({
        token: updated?.token ?? token,
        username: updated?.username ?? username,
        image: updated?.image || '',
      });

      navigate('/articles');
    } catch {
      setError('root.server', {
        type: 'server',
        message: 'Не удалось подключиться к серверу. Попробуйте ещё раз.',
      });
    }
  }
  const handleLogout = () => {
    logout();
    navigate('/sign-in');

  }

  return (
    <>
      <main className={styles.page}>
        <section className={styles.card}>
          <h1 className={styles.title}>Edit Profile</h1>
          <form
            className={styles.settingsForm}
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
              className={styles.bio}
              name="bio"
              register={register}
              errors={errors}
              type="bio"
              placeholder="Input your bio"
            />

            <Input
              name="image"
              register={register}
              errors={errors}
              type="url"
              placeholder="Avatar image (URL)"
              autoComplete="off"
              rules={{
                pattern: {
                  value: /^https?:\/\/\S+$/i,
                  message: 'Введите корректную ссылку (http или https)',
                },
              }}
            />

            <Input
              className={styles.password}
              name="password"
              register={register}
              errors={errors}
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              rules={{
                minLength: { value: 6, message: 'Минимум 6 символов' },
                maxLength: { value: 40, message: 'Максимум 40 символов' },
              }}
            />

            {errors.root?.server && (
              <p className={styles.error} role="alert">
                {errors.root.server.message}
              </p>
            )}

            <Button
              className={styles.update}
              variant="filled"
              type="submit"
              size="large"
            >
              Update Settings
            </Button>
            <Button
              className={styles.logout}
              variant='outline'
              type="button"
            onClick={handleLogout}>Or click here to logout</Button>
          </form>
        </section>
      </main>
    </>
  );
}

export default SettingsPage;

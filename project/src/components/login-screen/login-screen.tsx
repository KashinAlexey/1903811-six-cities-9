import Logo from '../logo/logo';
import {Link, Navigate } from 'react-router-dom';
import {useRef, FormEvent} from 'react';
import {loginAction} from '../../store/api-actions';
import {AuthData} from '../../types/auth-data';
import { store } from '../../store';
import { isUserAuth } from '../../offers';
import { useAppSelector } from '../../hooks';
import { toast } from 'react-toastify';

function LoginScreen(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const {authorizationStatus} = useAppSelector(({USER}) => USER);

  const onSubmit = (authData: AuthData) => {
    store.dispatch(loginAction(authData));
    return (<Navigate to="/" />);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const login = loginRef.current !== null ? loginRef.current.value : '';
    const password = passwordRef.current !== null ? passwordRef.current.value : '';

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login)) {
      toast.error('Email is invalid');
      return;
    }

    if (!/[a-zA-Z]+[0-9]/.test(password) || !/\d/.test(password) || password.includes(' ')) {
      toast.error('Password is invalid');
      return;
    }

    onSubmit({
      login: login,
      password: password,
    });

  };

  if (isUserAuth(authorizationStatus)) {
    return (<Navigate to="/" />);
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={(evt: FormEvent<HTMLFormElement>) => {
                evt.preventDefault();
                handleSubmit(evt);
              }}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to="" className="locations__item-link">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;

const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
const AUTH_USER_MAIL = 'user-mail';

export type Token = string;
export type Mail = string;

export const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};

export const getMail = (): Mail => {
  const mail = localStorage.getItem(AUTH_USER_MAIL);
  return mail ?? '';
};

export const saveMail = (mail: Mail): void => {
  localStorage.setItem(AUTH_USER_MAIL, mail);
};

export const dropMail = (): void => {
  localStorage.removeItem(AUTH_USER_MAIL);
};


import {isCheckedAuth} from '../../offers';
import {useAppSelector} from '../../hooks/index';
import {Link} from 'react-router-dom';

function HeaderNav(): JSX.Element {
  const {authorizationStatus} = useAppSelector((state) => state);
  const isAuth = isCheckedAuth(authorizationStatus);

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user" hidden={!isAuth}>
          <a className="header__nav-link header__nav-link--profile" href="#section">
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
          </a>
        </li>
        <li className="header__nav-item">
          <Link to={isAuth ? '' : '/login'} className="header__nav-link">
            <span className="header__signout">{isAuth ? 'Sign out' : 'Sign in'}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNav;

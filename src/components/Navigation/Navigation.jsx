import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import clsx from 'clsx';

const linkStyle = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  return (
    <nav>
      <NavLink className={linkStyle} to="/">
        Home
      </NavLink>

      <NavLink className={linkStyle} to="/contacts">
        Contacts
      </NavLink>
    </nav>
  );
};

export default Navigation;

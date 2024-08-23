import React, { useEffect } from 'react';
import { ReactComponent as Sun } from '../../assets/img/Sun.svg';
import { ReactComponent as Moon } from '../../assets/img/Moon.svg';
import './DarkMode.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const DarkMode = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.darkMode);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Проверяем, находится ли пользователь на странице Notes или Info
  const isExcludedPage = pathname === '/notes' ||
                         pathname === '/info' ||
                         pathname === '/skins' ||
                         pathname === '/boost' ||
                         pathname === '/referral'||
                         pathname === '/kase';

  // Если это страница Notes или Info, не отображаем переключатель темы
  if (isExcludedPage) {
    return null;
  }

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        checked={darkMode}
        onChange={() => dispatch({ type: 'CHANGE_DARK' })}
      />
      <label
        className="dark_mode_label"
        htmlFor="darkmode-toggle"
      >
        <Sun className="sun" />
        <Moon className="moon" />
      </label>
    </div>
  );
};

export default DarkMode;

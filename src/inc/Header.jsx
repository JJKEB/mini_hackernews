import React, { useEffect } from 'react';
import Lnb from './Lnb';
import VisualBanner from '../components/VisualBanner';
import style from '../scss/header.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { Controller, Scene } from 'react-scrollmagic';
import logo from '../assets/logo.svg';
import icoThemeChange from '../assets/ico_theme_change.svg';
import icoQna from '../assets/ico_qna.svg';

const Header = ({ onChangeTheme, setPath }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    setPath(pathname);
  }, [pathname, setPath]);

  return (
    <>
      <Controller globalSceneOptions={{ triggerHook: 'onLeave' }}>
        <Scene offset={51} classToggle={style.active} pin>
          <header className={style.header}>
            <div className={style.bar}>
              <h1>
                <Link to="/">
                  <img src={logo} alt="" />
                  svelte Hacker news
                </Link>
              </h1>
              <div className={style.utils}>
                <button
                  className={style.theme}
                  onClick={onChangeTheme}
                  aria-label="테마컬러변경"
                >
                  <img src={icoThemeChange} alt="" />
                </button>
                <button className={style.qna} aria-label="Qna">
                  <img src={icoQna} alt="" />
                </button>
              </div>
            </div>
            <Lnb />
          </header>
        </Scene>
      </Controller>
      <VisualBanner path={pathname} />
    </>
  );
};

export default Header;

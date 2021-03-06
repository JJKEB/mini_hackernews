import React from 'react';
import useGetData from '../../lib/useGetData';
import { lastTime, txtSplit } from '../../lib/utils';
import style from '../../scss/home.module.scss';
import icoBy from '../../assets/ico_profile.svg';

const NewItem = ({ type, id, onAdd }) => {
  const [loading, resolved, error] = useGetData(type, id, onAdd);
  if (loading) return null;
  if (error) return console.log('에러발생');
  if (!resolved) return null;

  const { title, by, time, url } = resolved;

  return (
    <div className={style['new-item']}>
      <div className={style['new-item--inner']}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {time !== undefined && (
            <span className={style['new-item--time']}>{lastTime(time)}</span>
          )}
          <strong>{txtSplit(title, 'HN:')}</strong>
          <span className={style['new-itme--by']}>
            <img src={icoBy} alt="" />
            {by}
          </span>
        </a>
      </div>
    </div>
  );
};

export default React.memo(NewItem);

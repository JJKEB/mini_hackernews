import React from 'react';
import useGetData from '../../lib/useGetData';
import { lastTime } from '../../lib/utils';
import style from '../../scss/home.module.scss';
import icoTime from '../../assets/ico_time.svg';

const JobItem = ({ type, id, onAdd }) => {
  const [loading, resolved, error] = useGetData(type, id, onAdd);
  if (loading) return null;
  if (error) return console.log('에러발생');
  if (!resolved) return null;

  const { title, time, url } = resolved;

  return (
    <div className={style['job-item']}>
      <div className={style['job-item--inner']}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {/* {url && <span className={style['domain']}>{url}</span>} */}
          <strong className={style['job--title']}>{title}</strong>
          <div className={style['job--bottom']}>
            <div className={style['job--details']}>
              {time !== undefined && (
                <span className={style['job--time']}>
                  <img src={icoTime} alt="" />
                  {lastTime(time)}
                </span>
              )}
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default React.memo(JobItem);

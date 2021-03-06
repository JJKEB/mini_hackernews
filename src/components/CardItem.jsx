import React from 'react';
import useGetData from '../lib/useGetData';
import { txtSplit, lastTime, isDomain, getInnerHtml } from '../lib/utils';
import { Link } from 'react-router-dom';
import style from '../scss/cards.module.scss';

import icoBy from '../assets/ico_profile.svg';
import icoComment from '../assets/ico_comment.svg';
import icoTime from '../assets/ico_time.svg';
import icoPoint from '../assets/ico_point.svg';

const CardItem = ({
  type,
  id,
  onAdd,
  index,
  pageing,
  loadCompletion,
  viewPages,
}) => {
  const [loading, resolved, error] = useGetData(
    type,
    id,
    onAdd,
    loadCompletion,
  );
  if (loading) return null;
  if (error) return console.log('에러발생');
  if (!resolved) return null;

  const { title, text, by, time, score, descendants, url } = resolved;

  // 페이징 지정한 갯수만 랜더링
  if (index <= pageing) {
    return (
      <div className={style.cardItemWrap}>
        <div className={style.cardItem}>
          <div className={style.inner}>
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className={style.domain}
              >
                <span>{isDomain(url)}</span>
              </a>
            )}

            {viewPages === 'askstories' ? (
              <strong className={style.subject}>
                <Link to={`/ask/${id}`}>{txtSplit(title, 'HN:')}</Link>
              </strong>
            ) : (
              <strong className={style.subject}>
                {txtSplit(title, 'HN:')}
              </strong>
            )}

            {text && <div className={style.text}>{getInnerHtml(text)}</div>}
            <div className={style.infoWrap}>
              <div className={style.infos}>
                <Link className={style.by} to={`/user/${by}`}>
                  <img src={icoBy} alt="" />
                  {by}
                </Link>
                <div className={style.createInfo}>
                  <span className={style.score}>
                    <img src={icoPoint} alt="" /> {score} points
                  </span>
                  <span className={style.time}>
                    <img src={icoTime} alt="" />
                    {lastTime(time)}
                  </span>
                </div>
              </div>
              {descendants > 0 && (
                <div className={style.comment}>
                  <img src={icoComment} alt="" />
                  {descendants}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default React.memo(CardItem);

import React, { useState, useCallback } from 'react';
import style from '../../scss/home.module.scss';
import TopItem from './TopItem';
import { Link } from 'react-router-dom';
import useGetData from '../../lib/useGetData';
import Slider from 'react-slick';
import _ from 'lodash';
import icoClock from '../../assets/bx_bx-time.svg';

const Top = ({ type, id }) => {
  const [data, setData] = useState({
    limit: 15, // 랜더링할 갯수
    loaded: 0, // 랜더링한 갯수
    searchTime: 0, // api 조회한 시간
    dataAll: [], // 받은 데이터 전부
    showList: [], // 받은 데이터중 보여줄 데이터
    showItems: [], // 로드된 각 아이템 값들
  });

  const onAddList = useCallback((lists) => {
    setData((data) => {
      const newData = _.cloneDeep(data);
      newData.dataAll = lists;
      newData.searchTime = new Date().getHours();
      newData.showList = lists.slice(0, newData.limit);
      return newData;
    });
  }, []);

  const onAddItems = useCallback((item) => {
    setData((data) => {
      const newData = _.cloneDeep(data);
      newData.showItems = newData.showItems.concat(item);
      newData.loaded += 1;
      return newData;
    });
  }, []);

  const settings = {
    className: 'today-top-content',
    centerMode: true,
    infinite: false,
    arrows: false,
    centerPadding: '0',
    slidesToShow: 1,
    speed: 500,
    rows: 5,
    dots: true,
    slidesPerRow: 1,
    slidesToScroll: 1,
  };

  const [loading, resolved, error] = useGetData(type, id, onAddList);
  if (loading) return null;
  if (error) return console.log('에러발생');
  if (!resolved) return null;

  return (
    <section className={style.section}>
      <div className={style.head}>
        <h2>
          <Link to="/top">Today's top</Link>
        </h2>
        <span className={style.uptime}>
          <img src={icoClock} alt="" />
          {data.searchTime}:00
        </span>
      </div>
      <div className={style.contents}>
        <Slider {...settings}>
          {data.showList.map((id, i) => (
            <TopItem
              key={id}
              type={'item'}
              id={id}
              index={i}
              onAdd={onAddItems}
            />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default React.memo(Top);

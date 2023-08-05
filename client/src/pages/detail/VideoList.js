import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import tmdbApi from '../../api/tmdbApi';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import './video-list.scss';

SwiperCore.use([Navigation, Pagination, Autoplay]);

const VideoList = (props) => {
  const { category } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      const res = await tmdbApi.getVideos(category, props.id);
      setVideos(res.results.slice(0, 5));
    };
    getVideos();
  }, [category, props.id]);

  return (
    <div className='video-list'>
      <Swiper
        spaceBetween={30}
        navigation={true}
        draggable={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
      >
        {videos.map((item, i) => (
          <SwiperSlide key={i}>
            <Video item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const Video = (props) => {
  const item = props.item;

  const iframeRef = useRef(null);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px';
    iframeRef.current.setAttribute('height', height);
  }, []);

  return (
    <div className='video'>
      <div className='video__title'>
        <h2>{item.name}</h2>
      </div>
        <iframe
          className='iframe'
          src={`https://www.youtube.com/embed/${item.key}`}
          ref={iframeRef}
          width='100%'
          title='video'
        ></iframe>
    </div>
  );
};

export default VideoList;

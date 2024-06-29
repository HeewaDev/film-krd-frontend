/* eslint-disable */
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Slideshow.css';
import { useDispatch } from 'react-redux';

const Slideshow = () => {
  const dispatch = useDispatch(); // Move dispatch inside the component function

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, 
    
  };

  const slides = [
    { id: 1, image: 'link_to_image1', title: 'Slide 1', description: 'Description for slide 1' },
    { id: 2, image: 'link_to_image2', title: 'Slide 2', description: 'Description for slide 2' },
    { id: 3, image: 'link_to_image3', title: 'Slide 3', description: 'Description for slide 3' },
  ];

  return (
    <div className="slideshow-container">
      <Slider {...settings}>
        {slides.map(slide => (
          <div key={slide.id} className="slide">
            <img src={slide.image} alt={slide.title} />
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slideshow;

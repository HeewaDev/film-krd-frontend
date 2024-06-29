import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Slideshow.css'; // Ensure your slideshow styles are imported
import { useSelector } from 'react-redux';

const Slideshow = ({ slides }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true, // Enable fade effect for smooth transitions
    cssEase: 'linear', // Use linear easing for fade effect
  };

  return (
    <div className="slideshow-background">
      <Slider {...settings}>
        {slides.map(slide => (
          <div key={slide.id} className="slide">
            <img className="slide-img" src={slide.image} alt={slide.title} />
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

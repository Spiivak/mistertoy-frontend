import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import EndYear from '../../assets/img/slider/end-year.webp';
import FellingsDigital from '../../assets/img/slider/feelings-digital.jpg';
import PowerCard from '../../assets/img/slider/power-card.webp';
import Winter from '../../assets/img/slider/winter.jpg';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

export function ImageSlider() {
  const images = [EndYear, FellingsDigital, PowerCard, Winter];
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '150px',
    arrows: true,
  }

  return (
    <div className="image-slider-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className='image-slider'>
            <img src={image} alt={`slide-${index}`} style={{}}/>
          </div>
        ))}
      </Slider>
    </div>
  )
}

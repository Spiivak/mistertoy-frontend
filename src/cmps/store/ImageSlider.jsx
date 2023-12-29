import React, { useEffect, useState } from 'react';
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
  const [centerPadding, setCenterPadding] = useState('150px');
  const [isArrows, setArrows] = useState(true);

  const updateCenterPadding = () => {
    const windowWidth = window.innerWidth;
    const breakpoint = 768;

    if (windowWidth <= breakpoint) {
      setCenterPadding('0px');
      setArrows(false)
      
    } else {
      setCenterPadding('150px');
      setArrows(true)
    }
  };

  useEffect(() => {
    updateCenterPadding();
    window.addEventListener('resize', updateCenterPadding);

    return () => {
      window.removeEventListener('resize', updateCenterPadding);
    };
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: centerPadding,
    arrows: isArrows,
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

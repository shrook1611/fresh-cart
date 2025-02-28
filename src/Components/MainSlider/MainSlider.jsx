import React from 'react';
import styles from './MainSlider.module.css';
import sliderImg1 from'./../../assets/slider-image-1.jpeg'
import sliderImg2 from'./../../assets/slider-image-2.jpeg'
import sliderImg3 from'./../../assets/slider-image-3.jpeg'
import  Slider  from 'react-slick';
export default function MainSlider() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplayspeed:500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],



  };

  return (

    <div className='row mt-4'>

      <div className="lg:w-3/4 sm:w-full md:w-1/2">


      <Slider {...settings}>
      <div>
        <img src={sliderImg1}alt=""  className='w-full h-[500px]'/>
        </div>


        <div>
        <img src={sliderImg2} alt="" className='w-full h-[500px]' />        </div>


        <div>
        <img src={sliderImg3} alt="" className='w-full h-[500px]' />
        </div>


        </Slider>

      </div>

<div className='lg:w-1/4 sm:w-full md:w-1/2'>
<img src={sliderImg2} alt="" className='w-full h-[250px]' />
<img src={sliderImg3} alt="" className='w-full h-[250px]' />

</div>

    </div>
  )
}

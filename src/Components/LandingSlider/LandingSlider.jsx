import React from 'react';

import sliderImg1 from'./../../assets/portrait-curly-girl-with-red-lipstick-taking-notes-tablet-pink-background-with-dressees_197531-17620.avif'
import sliderImg2 from'./../../assets/woman-black-trousers-purple-blouse-laughs-leaning-stand-with-elegant-clothes-pink-background_197531-17614.avif'
import sliderImg3 from'./../../assets/modern-wardrobe-stylish-clothes-accessories-600nw-2470981667.webp'
import sliderImg4 from'./../../assets/shopping-portrait-shirt-happy-handsome_1098-4741.avif'


import  Slider  from 'react-slick';
export default function LandingSlider() {

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

      <div className="lg:w-full mx-auto sm:w-full md:w-1/2 h-full">


      <Slider {...settings}>
      <div>
        <img src={sliderImg1}alt=""  className='w-full h-[500px]'/>
        </div>


        <div>
        <img src={sliderImg3} alt="" className='w-full h-[500px]' />        </div>


        <div>
        <img src={sliderImg2} alt="" className='w-full h-[500px]' />
        </div>
        <div>
        <img src={sliderImg4} alt="" className='w-full h-[500px]' />
        </div>

        </Slider>

      </div>



    </div>
  )
}

import Carousel from 'react-bootstrap/Carousel';
import sliderImg1 from '../assets/slider_image_1.jpg';
import sliderImg2 from '../assets/slider_image_2.jpg';
import sliderImg3 from '../assets/slider_image_3.jpg';

function CarouselItem() {
  return (
    <Carousel>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src={sliderImg1}
          alt="First slide"
          height='350px'
        />
        <Carousel.Caption>
          <h3>Power of Nature's Remedies</h3>
          <p>Discover the power of nature's remedies at our herbal shop carousel!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src={sliderImg2}
          alt="Second slide"
          height='350px'
        />
        <Carousel.Caption>
          <h3>Fragrance and Beauty</h3>
          <p>Experience the fragrance and beauty of our hand-picked herbs on our carousel.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src={sliderImg3}
          alt="Third slide"
          height='350px'
        />
        <Carousel.Caption>
          <h3>Better Health and Wellness</h3>
          <p>
            Let our herbal carousel take you on a journey to better health and wellness.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselItem;
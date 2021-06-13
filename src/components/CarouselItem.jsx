// Libraries
import React from 'react';
import '../assets/styles/components/CarouselItem.scss'
// Images
import playIcon from '../assets/static/play.png';
import sumIcon from '../assets/static/sum.png';
import exampleImage from '../assets/static/mandarina.jpg';

const CarouselItem = ({children}) => (
    <div className="carousel-item">
        <img className="carousel-item__img" src={exampleImage} alt="Mandarinas" />
        <div className="carousel-item__details">
            <div>
                <img className="carousel-item__details--img" src={playIcon} alt="Play" />
                <img className="carousel-item__details--img" src={sumIcon} alt="Plus" />
            </div>
            <p className="carousel-item__details--title">Titulo descriptivo</p>
            <p className="carousel-item__details--subtitle">2020 16+ 114 minutos</p>
        </div>
    </div>

);

export default CarouselItem;
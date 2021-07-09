// Libraries
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { setFavorite, deleteFavorite } from '../actions';
import '../assets/styles/components/CarouselItem.scss'
// Images
import playIcon from '../assets/static/play.png';
import sumIcon from '../assets/static/sum.png';
import removeIcon from '../assets/static/remove.png';

const CarouselItem = (props) => {
    const { id, cover, title, year, contentRating, duration, isList } = props;

    const handleSetFavorite = () => {
        props.setFavorite({
            id,cover,title,year,contentRating,duration
        });
    };

    const handleDeleteFavorite = (itemId) => {
        props.deleteFavorite(itemId);
    };

    return (
        <div className="carousel-item">
            <img className="carousel-item__img" src={cover} alt={title} />
            <div className="carousel-item__details">
                <div>
                    <img 
                        className="carousel-item__details--img" 
                        src={playIcon} 
                        alt="Play" 
                    />

                    {isList ? 
                        <img 
                            className="carousel-item__details--img" 
                            src={removeIcon} 
                            alt="Remove"
                            onClick={() => handleDeleteFavorite(id)} 
                        />
                        :
                        <img 
                            className="carousel-item__details--img" 
                            src={sumIcon} 
                            alt="Plus"
                            onClick={handleSetFavorite} 
                        />
                        
                    }

                </div>
                <p className="carousel-item__details--title">{title}</p>
                <p className="carousel-item__details--subtitle">
                    {`${year} ${contentRating} ${duration}`}
                </p>
            </div>
        </div>
    );
}

CarouselItem.propTypes = {
    cover: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.number,
    contentRating: PropTypes.string,
    duration: PropTypes.number,
}

const mapDispatchToProps = {
    setFavorite,
    deleteFavorite,
}

export default connect(null, mapDispatchToProps)(CarouselItem)
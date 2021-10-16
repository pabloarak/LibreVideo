// Libraries
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addUserMovie, removeUserMovie } from '../actions';
import '../assets/styles/components/CarouselItem.scss';
// Images
import playIcon from '../assets/static/play.png';
import sumIcon from '../assets/static/sum.png';
import removeIcon from '../assets/static/remove.png';

const CarouselItem = (props) => {
  const { _id, cover, title, year, contentRating, duration, isList, myList } = props;

  const handleSetFavorite = () => {
    const movieExist = myList.find((movie) => movie._id === _id);
    if (!movieExist) {
      props.addUserMovie({ _id, cover, title, year, contentRating, duration });
    }
  };

  const handleDeleteFavorite = (itemId) => {
    props.removeUserMovie(itemId);
  };

  return (
    <div className='carousel-item'>
      <img className='carousel-item__img' src={cover} alt={title} />
      <div className='carousel-item__details'>
        <div>
          <Link to={`/player/${_id}`}>
            <img
              className='carousel-item__details--img'
              src={playIcon}
              alt='Play'
            />
          </Link>

          {isList ? (
            <img
              className='carousel-item__details--img'
              src={removeIcon}
              alt='Remove'
              onClick={() => handleDeleteFavorite(_id)}
            />
          ) : (
            <img
              className='carousel-item__details--img'
              src={sumIcon}
              alt='Plus'
              onClick={handleSetFavorite}
            />
          )}

        </div>
        <p className='carousel-item__details--title'>{title}</p>
        <p className='carousel-item__details--subtitle'>
          {`${year} ${contentRating} ${duration}`}
        </p>
      </div>
    </div>
  );
};

CarouselItem.propTypes = {
  cover: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    myList: state.myList,
  };
};

const mapDispatchToProps = {
  addUserMovie,
  removeUserMovie,
};

export default connect(mapStateToProps, mapDispatchToProps)(CarouselItem);

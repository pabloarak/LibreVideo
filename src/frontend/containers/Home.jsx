import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import '../assets/styles/App.scss';

const Home = ({ myList, trends, originals, searchVideo }) => {

  return (
    <>
      <Header />
      <Search isHome />

      {
        searchVideo.length > 0 && (

          <Categories title='Búsqueda'>
            <Carousel>
              {
                searchVideo.map((item) => <CarouselItem key={item.id} {...item} />)
              }
            </Carousel>
          </Categories>
        )
      }

      {
        myList.length > 0 && (
          <Categories title='Mi Lista'>
            <Carousel>
              {
                myList.map((item) => (
                  <CarouselItem
                    key={item.id}
                    {...item}
                    isList
                  />
                ))
              }
            </Carousel>
          </Categories>
        )
      }

      {
        trends.length > 0 && (
          <Categories title='Tendencias'>
            <Carousel>
              {
                trends.map((item) => <CarouselItem key={item.id} {...item} />)
              }
            </Carousel>
          </Categories>
        )
      }

      {
        originals.length > 0 && (
          <Categories title='Originales'>
            <Carousel>
              {
                originals.map((item) => <CarouselItem key={item.id} {...item} />)
              }
            </Carousel>
          </Categories>
        )
      }
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    myList: state.myList,
    trends: state.trends,
    originals: state.originals,
    searchVideo: state.searchVideo,
  };
};

export default connect(mapStateToProps, null)(Home);

import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import '../assets/styles/App.scss'

const App = () => {
    
    const [ videos, setVideos ] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/initialState')
            .then(response => response.json())
            .then(data => setVideos(data));
    }, []);

    console.log(videos)

    return (
        <div className="App">
            <Header/>
            <Search/>

            <Categories title="Frutas">
                <Carousel>
                    <CarouselItem/>
                    <CarouselItem/>
                    <CarouselItem/>
                    <CarouselItem/>
                </Carousel>
            </Categories>

            <Categories title="Verduras">
                <Carousel>
                    <CarouselItem/>
                    <CarouselItem/>
                </Carousel>
            </Categories>

            <Categories title="Otros">
                <Carousel>
                    <CarouselItem/>
                    <CarouselItem/>
                    <CarouselItem/>
                </Carousel>
            </Categories>

            <Footer/>
        </div>
    );
}

export default App;
import React from 'react';
import { connect } from 'react-redux';
import { searchVideo } from '../actions';
import classNames from 'classnames';
import '../assets/styles/components/Search.scss'

const Search = (props) => {

    const { isHome, searchVideo } = props;

    const inputStyle = classNames('input', {
        isHome
    });

    const handleInput = (event) => searchVideo(event.target.value);

    return (
        <section className="main">
            <h2 className="main__title">¿Qué quieres ver hoy?</h2>
            <input 
                className={inputStyle} 
                type="text" 
                placeholder="Buscar..."
                onChange={handleInput}
            />
        </section>
    )
};

const mapDispatchToProps = {
    searchVideo,
}

export default connect(null, mapDispatchToProps)(Search);
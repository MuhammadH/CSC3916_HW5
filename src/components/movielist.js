import React, { Component } from 'react';
import { fetchMovies } from "../actions/movieActions";
import { setMovie } from "../actions/movieActions";
import {connect} from 'react-redux';
import {Image, Nav} from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import { BsStarFill} from 'react-icons/bs'
import {LinkContainer} from 'react-router-bootstrap';

class MovieList extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchMovies());
    }

    handleSelect(selectedIndex, e) {
        const {dispatch} = this.props;
        dispatch(setMovie(this.props.movies[selectedIndex]));
    }

    handleClick = (movie) => {
        const {dispatch} = this.props;
        dispatch(setMovie(movie));
    }

    render() {
        const MovieListCarousel = ({movieList}) => {
            if (!movieList) {
                return <div>Loading....</div>
            }

            console.log(movieList);
            console.log('plz show anything here');
            let something = -100;
            if (movieList.length > 0) {
                something = movieList.length;
            } else {
                something = movieList.length;
            }

            return (
                <div>{something}</div>
                /*
                <Carousel onSelect={this.handleSelect}>
                    {movieList.map((movie) =>
                        <Carousel.Item key={movie._id}>
                            <div>
                                <LinkContainer to={'/movie/'+movie.title} onClick={()=>this.handleClick(movie)}>
                                    <Nav.Link><Image className="image" src={'https://upload.wikimedia.org/wikipedia/commons/1/14/LongArmSquid.jpg'} thumbnail /></Nav.Link>
                                </LinkContainer>
                            </div>
                            <Carousel.Caption>
                                <h3>title:</h3>
                                <h3>{movie.title}</h3>
                                <BsStarFill glyph={'star'} /> {movie.year} &nbsp;&nbsp; {movie.year}
                            </Carousel.Caption>
                        </Carousel.Item>
                    )}

                </Carousel>

                 */
            )
        }

        return (
            <MovieListCarousel movieList={this.props.movies} />
        )
    }
}

const mapStateToProps = state => {
    return {
        movies: state.movie.movies
    }
}

export default connect(mapStateToProps)(MovieList);

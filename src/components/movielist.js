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

            let avgRs = ['4.88/5 stars', '4.51/5 stars', '4.31/5 stars', '4.19/5 stars', '4.11/5 stars'];
            let links = ['https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg',
                'https://upload.wikimedia.org/wikipedia/en/1/1f/Knives_Out_poster.jpeg',
                'https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg',
                'https://upload.wikimedia.org/wikipedia/en/5/52/Good_Will_Hunting.png',
                'https://upload.wikimedia.org/wikipedia/en/9/98/John_Wick_TeaserPoster.jpg'];
            let i = 0;

            return (
                <Carousel onSelect={this.handleSelect}>
                    {movieList.map((movie) =>
                        <Carousel.Item key={movie._id}>
                            <div>
                                <LinkContainer to={'/movie/'+movie.title} onClick={()=>this.handleClick(movie)}>
                                    <Nav.Link><Image className="image" src={links[i]} thumbnail /></Nav.Link>
                                </LinkContainer>
                            </div>
                            <Carousel.Caption>
                                <h3>{movie.title}</h3>
                                <BsStarFill glyph={'star'} /> {avgRs[i]} &nbsp;&nbsp; {movie.year}
                            </Carousel.Caption>
                            {i = i+1}
                        </Carousel.Item>
                    )}

                </Carousel>


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


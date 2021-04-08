import React, { Component } from 'react';
import { fetchMovie } from "../actions/movieActions";
import {connect} from 'react-redux';
import {Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs'
import { Image } from 'react-bootstrap';
import runtimeEnv from '@mars/heroku-js-runtime-env'
import PostReview from './postReview';

class MovieDetail extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null) {
            dispatch(fetchMovie(this.props.title));
        }
    }

    render() {
        const DetailInfo = () => {
            if (!this.props.selectedMovie) {
                return <div>Loading....</div>
            } else {
                console.log("bobobobobbo");
                console.log(this.props.selectedMovie);
                console.log(this.props.selectedMovie.review);
                console.log(this.props.selectedMovie.rating);
                console.log(this.props.selectedMovie.reviewer_name);
                console.log("ryryryryryr");
            }

            let imgUrl = '';
            if (this.props.selectedMovie.title == "Avengers: Endgame") {
                imgUrl = 'https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg';
            }
            else if (this.props.selectedMovie.title == "Knives Out") {
                imgUrl = 'https://upload.wikimedia.org/wikipedia/en/1/1f/Knives_Out_poster.jpeg';
            }
            else if (this.props.selectedMovie.title == "Pulp Fiction") {
                imgUrl = 'https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg';
            }
            else if (this.props.selectedMovie.title == "Good Will Hunting") {
                imgUrl = 'https://upload.wikimedia.org/wikipedia/en/5/52/Good_Will_Hunting.png';
            }
            else if (this.props.selectedMovie.title == "John Wick") {
                imgUrl = 'https://upload.wikimedia.org/wikipedia/en/9/98/John_Wick_TeaserPoster.jpg';
            }

            return (
                <Card>
                    <Card.Header>Movie Detail</Card.Header>
                    <Card.Body>
                        <Image className="image" src={imgUrl} thumbnail />
                    </Card.Body>
                    <ListGroup>
                        <ListGroupItem>{this.props.selectedMovie.title}</ListGroupItem>
                        <ListGroupItem>
                            {this.props.selectedMovie.cast.map((actor, i) =>
                                <p key={i}>
                                    <b>{actor.actor}</b> {actor.character}
                                </p>)}
                        </ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <p>
                            <b>{this.props.selectedMovie.reviewer_name}</b>&nbsp; {this.props.selectedMovie.review}
                            &nbsp;  <BsStarFill /> {this.props.selectedMovie.rating}
                        </p>
                    </Card.Body>
                    <Card.Body>
                        <PostReview movie={this.props.selectedMovie}/>
                    </Card.Body>
                </Card>
            )
        }

        return (
            <DetailInfo />
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedMovie: state.movie.selectedMovie
    }
}

export default connect(mapStateToProps)(MovieDetail);


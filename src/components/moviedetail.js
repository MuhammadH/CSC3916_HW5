import React, { Component } from 'react';
import { fetchMovie } from "../actions/movieActions";
import {connect} from 'react-redux';
import {Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs'
import { Image } from 'react-bootstrap';
import runtimeEnv from '@mars/heroku-js-runtime-env'

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
            }

            let title = this.props.selectedMovie.title;
            let new_review = {};
            const env = runtimeEnv();
            fetch(`${env.REACT_APP_API_URL}/movies`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "movie": title,
                    "reviews": true
                },
                mode: 'cors'
            }).then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                new_review = response.reviews;
            }).then((res) => {
                // dispatch(movieFetched(res.movies));
            })
            this.props.selectedMovie.reviews = new_review;
            console.log("opppppppp")
            console.log("opppppppp")
            console.log(this.props.selectedMovie.reviews)
            console.log("opppppppp")

            return (
                <Card>
                    <Card.Header>Movie Detail</Card.Header>
                    <Card.Body>

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
                            <b>{this.props.selectedMovie.reviews.reviewer_name}</b>&nbsp; {this.props.selectedMovie.reviews.review}
                            &nbsp;  <BsStarFill /> {this.props.selectedMovie.reviews.rating}
                        </p>
                        {
                            /*
                            this.props.selectedMovie.reviews.map((review, i) =>
                            <p key={i}>
                                <b>{review.reviewer_name}</b>&nbsp; {review.review}
                                &nbsp;  <BsStarFill /> {review.rating}
                            </p>
                        )

                             */
                        }
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


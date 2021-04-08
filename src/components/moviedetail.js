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
            } else {
                console.log("bobobobobbo");
                console.log(this.props.selectedMovie);
                console.log(this.props.selectedMovie.reviews);
            }

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
                            <b>{this.props.selectedMovie.reviews[0]}</b>&nbsp; {this.props.selectedMovie.reviews[0]}
                            &nbsp;  <BsStarFill /> {this.props.selectedMovie.reviews[0]}
                        </p>
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


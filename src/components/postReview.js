import React, { Component } from 'react';
import {connect} from "react-redux";
import { Form, FormLabel, FormControl, FormGroup, Col, Button} from 'react-bootstrap';
// import { postNewReview } from '../actions/movieActions';

class PostReview extends Component {
    constructor(movieIn){
        super(movieIn);
        this.updateEvent = this.updateEvent.bind(this);
        this.review = this.review.bind(this);
        this.state = {
            reviewData:{
                movie: movieIn.movie.title,
                reviewer_name: 'default_test',
                review: '',
                rating: ''
            }
        };

    }

    updateEvent(event){
        let updateEvent = Object.assign({}, this.state.reviewData);

        if(event.target.id === 'rating_sec') {
            updateEvent.rating = event.target.value;
        }
        if(event.target.id === 'review_sec') {
            updateEvent.review = event.target.value;
        }

        this.setState({
            reviewData: updateEvent
        });
    }

    review() {
        // const {dispatch} = this.props;
        // dispatch(submitReview(this.state.reviewData, this.props.movie._id));
    }

    render() {
        return(
            <Form horizontal>
                <FormGroup controlId="rating_sec">
                    <Col componentClass={FormLabel}>
                        Enter a Rating:
                    </Col>
                    <Col>
                        <FormControl as="textarea" required onChange={this.updateEvent} value={this.state.reviewData.rating}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="review_sec">
                    <Col componentClass={FormLabel}>
                        Enter a Review
                    </Col>
                    <Col>
                        <FormControl as="textarea" required onChange={this.updateEvent} value={this.state.reviewData.review}/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col>
                        <Button onClick={this.review}>Post Your Review!</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }

}

const mapStateToProps = state => {
    return{}
};

export default connect(mapStateToProps)(PostReview);
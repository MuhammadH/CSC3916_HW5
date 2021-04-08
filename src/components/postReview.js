import React, { Component } from 'react';
import {connect} from "react-redux";
// import {submitReview} from '../actions/movieActions';
import { Form, Col, FormGroup, FormControl, Button, FormLabel} from 'react-bootstrap';


class Review extends Component {
    constructor(rev){
        super(rev);
        this.updateEvent = this.updateEvent.bind(this);
        this.review = this.review.bind(this);
        this.state = {
            details:{
                movie: rev.movie.title,
                review: '',
                reviewer_name: '',
                rating: ''
            }
        };

    }

    updateEvent(event){
        let updateEvent = Object.assign({}, this.state.details);

        if(event.target.id === 'rating_sec') {
            updateEvent.rating = event.target.value;
        }
        else {
            updateEvent[event.target.id] = event.target.value;
        }
        this.setState({
            details: updateEvent
        });
    }

    review() {
        // const {dispatch} = this.props;
        // dispatch(submitReview(this.state.details, this.props.movie._id));
    }

    render() {
        return(
            <Form horizontal>
                <FormGroup controlId="rating_sec">
                    <Col componentClass={FormLabel}>
                        Enter a Rating:
                    </Col>
                    <Col>
                        <FormControl as="textarea" required onChange={this.updateEvent} value={this.state.details.rating}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="review">
                    <Col componentClass={FormLabel}>
                        Enter a Review
                    </Col>
                    <Col>
                        <FormControl as="textarea" required onChange={this.updateEvent} value={this.state.details.review}/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col>
                        <Button onClick={this.review}>Post Review</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }

}

const mapStateToProps = state => {
    return{
    }
};

export default connect(mapStateToProps)(Review);
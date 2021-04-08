import actionTypes from '../constants/actionTypes';
import runtimeEnv from '@mars/heroku-js-runtime-env'


function moviesFetched(movies) {
    return {
        type: actionTypes.FETCH_MOVIES,
        movies: movies
    }
}

function movieFetched(movies) {
    return {
        type: actionTypes.FETCH_MOVIE,
        selectedMovie: movies
    }
}

function movieSet(movies) {
    return {
        type: actionTypes.SET_MOVIE,
        selectedMovie: movies
    }
}

export function setMovie(movie) {
    return dispatch => {
        dispatch(movieSet(movie));
    }
}

export function fetchMovie(title) {
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/movies`, {
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
            return response.json()
        }).then((res) => {
            let new_thing = res.movies;
            new_thing.reviewer_name = res.reviews.reviewer_name;
            new_thing.review = res.reviews.review;
            new_thing.rating = res.reviews.rating;
            //new_thing.reviews = res.reviews;

            // res.movies.reviews = res.reviews;
            // dispatch(movieFetched(res.movies));
            dispatch(movieFetched(new_thing));
        }).catch((e) => console.log(e));
    }
}


export function fetchMovies() {
    console.log("starting fetch movies");
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/movies`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'
        }).then((response) => {
            console.log("getting response");
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        }).then((res) => {
            dispatch(moviesFetched(res.movies));
        }).catch((e) => console.log(e));
    }
}
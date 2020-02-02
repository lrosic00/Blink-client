import {
	SET_BLINKS,
	LOADING_DATA,
	LIKE_BLINK,
	UNLIKE_BLINK,
	DELETE_BLINK,
	CLEAR_ERRORS,
	SET_ERRORS,
	POST_BLINK,
	LOADING_UI
} from "../types";
import axios from "axios";

//Get all blinks
export const getBlinks = () => dispatch => {
	dispatch({ type: LOADING_DATA });
	axios
		.get("/blinks")
		.then(res => {
			dispatch({
				type: SET_BLINKS,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch({
				type: SET_BLINKS,
				payload: []
			});
		});
};

//Post a blink
export const postBlink = newBlink => dispatch => {
	dispatch({ type: LOADING_UI });
	axios
		.post("/blink", newBlink)
		.then(res => {
			dispatch({ type: POST_BLINK, payload: res.data });
			dispatch({ type: CLEAR_ERRORS });
		})
		.catch(err => {
			dispatch({ type: SET_ERRORS, payload: err.response.data });
		});
};

//Like a blink
export const likeBlink = blinkId => dispatch => {
	axios
		.get(`/blink/${blinkId}/like`)
		.then(res => {
			console.log(res);
			dispatch({
				type: LIKE_BLINK,
				payload: res.data
			});
		})
		.catch(err => {
			console.log(err);
		});
};

//Unlike a blink
export const unlikeBlink = blinkId => dispatch => {
	axios
		.get(`/blink/${blinkId}/unlike`)
		.then(res => {
			dispatch({
				type: UNLIKE_BLINK,
				payload: res.data
			});
		})
		.catch(err => {
			console.log(err);
		});
};

//Delete a blink
export const deleteBlink = blinkId => dispatch => {
	axios
		.delete(`/blink/${blinkId}`)
		.then(() => {
			dispatch({ type: DELETE_BLINK, payload: blinkId });
		})
		.catch(err => console.log(err));
};

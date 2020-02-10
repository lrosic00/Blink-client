import {
	SET_BLINKS,
	LOADING_DATA,
	LIKE_BLINK,
	UNLIKE_BLINK,
	DELETE_BLINK,
	CLEAR_ERRORS,
	SET_ERRORS,
	POST_BLINK,
	LOADING_UI,
	SET_BLINK,
	STOP_LOADING_UI,
	SUBMIT_COMMENT
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
			dispatch(clearErrors());
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

//Submit a comment
export const submitComment = (blinkId, commentData) => dispatch => {
	axios
		.post(`/blink/${blinkId}/comment`, commentData)
		.then(res => {
			dispatch({ type: SUBMIT_COMMENT, payload: res.data });
			dispatch(clearErrors());
		})
		.catch(err => {
			dispatch({ type: SET_ERRORS, payload: err.response.data });
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

export const getBlink = blinkId => dispatch => {
	dispatch({ type: LOADING_UI });
	axios
		.get(`/blink/${blinkId}`)
		.then(res => {
			dispatch({ type: SET_BLINK, payload: res.data });
			dispatch({ type: STOP_LOADING_UI });
		})
		.catch(err => console.log(err));
};

export const getUserData = username => dispatch => {
	dispatch({ type: LOADING_DATA });
	axios
		.get(`/user/${username}`)
		.then(res => {
			dispatch({ type: SET_BLINKS, payload: res.data.blinks });
		})
		.catch(() => dispatch({ type: SET_BLINKS, payload: null }));
};

export const clearErrors = () => dispatch => {
	dispatch({ type: CLEAR_ERRORS });
};

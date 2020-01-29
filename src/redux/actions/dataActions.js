import { SET_BLINKS, LOADING_DATA, LIKE_BLINK, UNLIKE_BLINK } from "../types";
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

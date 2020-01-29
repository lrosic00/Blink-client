import { SET_BLINKS, LIKE_BLINK, UNLIKE_BLINK, LOADING_DATA } from "../types";

const initialState = {
	blinks: [],
	blink: {},
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case LOADING_DATA:
			return {
				...state,
				loading: true
			};

		case SET_BLINKS:
			return {
				...state,
				blinks: action.payload,
				loading: false
			};
		case LIKE_BLINK:
		case UNLIKE_BLINK:
			let index = state.blinks.findIndex(
				blink => blink.blinkId === action.payload.blinkId
			);
			state.blinks[index] = action.payload;
			return {
				...state
			};

		default:
			return state;
	}
}

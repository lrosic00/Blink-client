import {
	SET_BLINKS,
	LIKE_BLINK,
	UNLIKE_BLINK,
	LOADING_DATA,
	DELETE_BLINK,
	POST_BLINK
} from "../types";

const initialState = {
	blinks: [],
	blink: {},
	loading: false
};
let index = 0;
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
			index = state.blinks.findIndex(
				blink => blink.blinkId === action.payload.blinkId
			);
			state.blinks[index] = action.payload;
			return {
				...state
			};

		case DELETE_BLINK:
			index = state.blinks.findIndex(blink => blink.blinkId === action.payload);
			state.blinks.splice(index, 1);
			return {
				...state
			};
		case POST_BLINK:
			return {
				...state,
				blinks: [action.payload, ...state.blinks]
			};

		default:
			return state;
	}
}

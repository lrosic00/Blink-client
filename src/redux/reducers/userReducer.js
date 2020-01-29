import {
	SET_USER,
	SET_AUTHENTICATED,
	SET_UNAUTHENTICATED,
	LOADING_USER,
	LIKE_BLINK,
	UNLIKE_BLINK
} from "../types";

const initialState = {
	authenticated: false,
	loading: false,
	credentials: {},
	likes: [],
	notifications: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_AUTHENTICATED:
			return {
				...state,
				authenticated: true
			};
		case SET_UNAUTHENTICATED:
			return initialState;

		case SET_USER:
			return {
				authenticated: true,
				loading: false,
				...action.payload
			};
		case LOADING_USER:
			return {
				...state,
				loading: true
			};
		case LIKE_BLINK:
			return {
				...state,
				likes: [
					...state.likes,
					{
						username: state.credentials.username,
						blinkId: action.payload.blinkId
					}
				]
			};
		case UNLIKE_BLINK:
			return {
				...state,
				likes: state.likes.filter(
					like => like.blinkId !== action.payload.blinkId
				)
			};
		default:
			return state;
	}
}

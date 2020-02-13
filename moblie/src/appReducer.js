const initialState = {
 accessToken: null,
 days:null
}

export default (state = initialState, action) => {
 switch (action.type) {
	case 'SET_ACCESSTOKEN':
	 return { ...state, accessToken: action.payload }
	case 'SET_DAYS':
	 return { ...state, days: action.payload }
	default:
	 return state
 }
}

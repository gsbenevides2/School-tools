export default {
 setAccessToken(accessToken) {
	return { 
	 type: 'SET_ACCESSTOKEN',
	 payload: accessToken
	}
 },
 setDays(days){
	return { 
	 type: 'SET_DAYS',
	 payload: days
	}
 }
}

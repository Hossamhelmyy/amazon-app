import firebase from 'firebase/app';
// import data, { setData } from './data';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBqq6zkEQaFSYB3bhTw-H2rH_YC-WEyLQ8',
	authDomain: 'fir-4da20.firebaseapp.com',
	databaseURL:
		'https://fir-4da20-default-rtdb.firebaseio.com',
	projectId: 'fir-4da20',
	storageBucket: 'fir-4da20.appspot.com',
	messagingSenderId: '768119673590',
	appId: '1:768119673590:web:e74c4103c03964426bd2d7',
	measurementId: 'G-R2LT5EL7HY',
};

// Initialize Firebase
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}
export const db = firebase.firestore();
// setData(db);
export { firebase };

import * as firebase from "firebase";


var firebaseConfig = {
    apiKey: "AIzaSyAn1Jvu9qrlqayrHLoCYr2OvpblCkFAKYY",
    authDomain: "food-delivery-b222d.firebaseapp.com",
    databaseURL: "https://food-delivery-b222d.firebaseio.com",
    projectId: "food-delivery-b222d",
    storageBucket: "",
    messagingSenderId: "216510786586",
    appId: "1:216510786586:web:b3ea1f217578b3dccfb5a3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const firebaseLooper = (snapshot) => {

    let data = [];

    snapshot.forEach(childSnapshot => {
        data.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });


    return data;

}

export { firebase, firebaseLooper }
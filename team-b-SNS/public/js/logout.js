// Initialize Firebase
var config = {
  apiKey: "AIzaSyAxNVDXIAHlDF3VC_QGPzBCkqxZs3b_zHA",
  authDomain: "team-b-sns.firebaseapp.com",
  databaseURL: "https://team-b-sns.firebaseio.com",
  projectId: "team-b-sns",
  storageBucket: "team-b-sns.appspot.com",
  messagingSenderId: "895377669050"
};
firebase.initializeApp(config);


// var target = document.getElementById('logout');
// target.addEventListener('click', logout, false);
//
// function logout() {
//     console.log('logout');
// }
//
//
// firebase.auth().signOut().then(function() {
//   // Sign-out successful.
// }).catch(function(error) {
//   // An error happened.
// });


var logout = document.getElementById("logout-btn"); //ログアウトボタン

logout.addEventListener('click', function() {
  firebase.auth().signOut();
  location.replace('logout.html')
});

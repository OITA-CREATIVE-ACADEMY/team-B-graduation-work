// // Initialize Firebase
// var config = {
//   apiKey: "AIzaSyAxNVDXIAHlDF3VC_QGPzBCkqxZs3b_zHA",
//   authDomain: "team-b-sns.firebaseapp.com",
//   databaseURL: "https://team-b-sns.firebaseio.com",
//   projectId: "team-b-sns",
//   storageBucket: "team-b-sns.appspot.com",
//   messagingSenderId: "895377669050"
// };


// Initialize Firebase
// APIコンフィグ情報を取得する
var config = getApiConfing();
firebase.initializeApp(config);

var logout = document.getElementById("logout"); //ログアウトボタン

//ログアウト処理
logout.addEventListener('click', function() {
  firebase.auth().signOut();
  location.replace('logout.html')
});

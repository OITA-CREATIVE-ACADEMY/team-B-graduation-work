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


//DOM取得
  var userFirstName = document.getElementById("inputFirstName");    //名前(姓)
  var userSecondName = document.getElementById("inputSecondName");    //名前(姓)
  var displayName = document.getElementById("inputUserName");    //ユーザーネーム
  var email = document.getElementById("inputEmail");    // E-mail
  var password = document.getElementById("inputPassword");    //password
  var password2 = document.getElementById("inputConfirmationPassword");    //確認用password
  var passMessage = document.getElementById("passwordDisMatchMessage");    //パスワード不一致メッセージ
  var profileText = document.getElementById("exampleTextarea");    //自己紹介
  var profilePic = document.getElementById("");    //プロフィール画像
  var newuser= document.getElementById("newuser");    //登録ボタン

  //新規ユーザー登録処理
  newuser.addEventListener('click', function(e) {
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;

    console.log(email +"取得");

    firebase.auth().createUserWithEmailAndPassword(email, password)
  //エラー表示の指示
    .catch(function(error) {
      alert('登録できません (' + error.message + ')');
    });

//追加のユーザー情報
    function writeUserData(displayName) {
  firebase.database().ref('users/').push({
    displayName: name,
    console.log(name);
  });
}

  });

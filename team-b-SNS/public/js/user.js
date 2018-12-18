// Initialize Firebase
// APIコンフィグ情報を取得する
// var config = getApiConfing();
var config = {
  apiKey: "AIzaSyAxNVDXIAHlDF3VC_QGPzBCkqxZs3b_zHA",
  authDomain: "team-b-sns.firebaseapp.com",
  databaseURL: "https://team-b-sns.firebaseio.com",
  projectId: "team-b-sns",
  storageBucket: "team-b-sns.appspot.com",
  messagingSenderId: "895377669050"
};
firebase.initializeApp(config);

function creat() {
  // 認証情報の作成
  //DOM取得
  var userFirstName = document.getElementById("inputFirstName"); //名前(姓)
  var userSecondName = document.getElementById("inputSecondName"); //名前(姓)
  var displayName = document.getElementById("inputUserName"); //ユーザーネーム
  var email = document.getElementById("inputEmail"); // E-mail
  var password = document.getElementById("inputPassword"); //password
  var password2 = document.getElementById("inputConfirmationPassword"); //確認用password
  var passMessage = document.getElementById("passwordDisMatchMessage"); //パスワード不一致メッセージ
  var profileText = document.getElementById("exampleTextarea"); //自己紹介
  var profilePic = document.getElementById(""); //プロフィール画像
  var newuser = document.getElementById("newuser"); //登録ボタン

  newuser.addEventListener("click", function(e) {
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;
    console.log(email + "取得");
    try {
      // 認証情報の登録
      firebase.auth().createUserWithEmailAndPassword(email, password);
      // ユーザー情報の登録
      var usersRef = firebase.database().ref("/Users");
      messagesRef.push({
        firstname: userFirstName,
        secondname: userSecondName,
        displayname,
        e: displayName,
        email: email,
        password: password,
        profiletext: profileText,
        profilepic: profilePic
      });
    } catch {
      //エラー表示の指示
    }
  });
}

// function read(){

// }

// function update(){

// }

// function delete(){
// }

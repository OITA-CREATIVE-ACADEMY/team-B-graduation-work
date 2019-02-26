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
var inputarea = document.getElementById("input-area");//inputエリア全体
var newuser = document.getElementById("newuser");//新規登録ボタン
var login = document.getElementById("login");//ログインボタン
var logout = document.getElementById("logout");//ログアウトボタン
var info = document.getElementById("info");//infoエリア

//新規ユーザー登録処理
newuser.addEventListener('click', function(e) {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
//エラー表示の指示
  .catch(function(error) {
    alert('登録できません (' + error.message + ')');
  });
});

//ログイン処理
login.addEventListener('click', function(e) {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
  //指定したURLへ遷移する指示
  .catch(function(error) {
    alert('ログインできません (' + error.message +')');
  });
  //このままだと、エラーでもアラートの後に遷移する
    location.replace('timeline.html')
});

// ログアウト処理
logout.addEventListener('click', function(){
  firebase.auth().signOut();
});

//認証状態の確認(ログインしているユーザーを取得する)
firebase.auth().onAuthStateChanged(function(user) {
  if(user) {
    //ユーザーがログインしている状態
    loginDisplay();
  }
  else {
    //ユーザーがログインしていない状態
    logoutDisplay();
  }
});

function loginDisplay() {
  logout.classList.remove('hide');
  inputarea.classList.add('hide');

  info.textContent = "あなたはログイン中です";
}

function logoutDisplay() {
  logout.classList.add('hide');
  inputarea.classList.remove('hide');

  info.textContent = "ログインしていません";
}

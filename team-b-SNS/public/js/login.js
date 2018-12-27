// Initialize Firebase
// APIコンフィグ情報を取得する
var config = getApiConfing();
firebase.initializeApp(config);


//DOM取得
var inputarea = document.getElementById("input-area"); //inputエリア全体
var login = document.getElementById("login"); //ログインボタン
var logout = document.getElementById("logout"); //ログアウトボタン
var info = document.getElementById("info"); //infoエリア


function signIn() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(result) {
      alert("サインインが完了しました！お楽しみください(^^)");
      console.log("OK")

// タイムラインへ移動する
      // location.replace('timeline.html')
      // document.getElementById('log').innerText = 'サインイン成功';
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("サインインに失敗しました");
      console.log("NG")

      // document.getElementById('log').innerText = 'サインイン失敗: ' + errorCode + ', ' + errorMessage;
    });

    // 登録ボタン押下イベント
    $("#loginBtn").on("click", function() {
      signIn();
    });
}


//ログアウト処理
logout.addEventListener('click', function() {
  firebase.auth().signOut();
  location.replace('index.html')
});


//認証状態の確認(ログインしているユーザーを取得する)
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //ユーザーがログインしている状態
    loginDisplay();
    setTimeout(function(){
    window.location.href = 'timeline.html';
  }, 3*1000);
  } else {
    //ユーザーがログインしていない状態
    logoutDisplay();
  }
});

function loginDisplay() {
  logout.classList.remove('d-none');
  info.textContent = "あなたはログイン中です";
}



function logoutDisplay() {
  logout.classList.add('d-none');
 document.getElementById('info').innerText = 'サインインしてください';
}

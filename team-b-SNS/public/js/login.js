// Initialize Firebase
// APIコンフィグ情報を取得する
var config = getApiConfing();
firebase.initializeApp(config);


function signIn() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(result) {
      alert("サインインが完了しました！お楽しみください(^^)");
      // location.replace('timeline.html')
      // document.getElementById('log').innerText = 'サインイン成功';
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("サインインに失敗しました");
      // document.getElementById('log').innerText = 'サインイン失敗: ' + errorCode + ', ' + errorMessage;
    });

    // 登録ボタン押下イベント
    $("#loginBtn").on("click", function() {
      signIn();
    });
}

//認証状態の確認(ログインしているユーザーを取得する)
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //ユーザーがログインしている状態
    loginDisplay();
  } else {
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

// Initialize Firebase
// APIコンフィグ情報を取得する
// var config = getApiConfing();
var config = getApiConfig();
firebase.initializeApp(config);

function create() {
  // まず、ユーザ登録に必要なメール、パスワード情報をDOMから取得して定義しておく
  var email = document.getElementById("inputEmail").value;
  var password = document.getElementById("inputPassword").value;
  // ユーザーの登録
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function() {
      // ユーザ登録が成功した場合、登録したユーザーを取得する
      var user = firebase.auth().currentUser; // ※firebase.auth().currentUser　を使うと現在ログイン中のユーザが取得できる
      // 更新するパラメータはスコープの関係でここで取得する
      var displayName = document.getElementById("inputUserName").value; //ユーザーネーム
      var userFirstName = document.getElementById("inputFirstName").value; //名前(姓)
      var userSecondName = document.getElementById("inputSecondName").value; //名前(姓)
      var profileText = document.getElementById("exampleTextarea").value; //自己紹介
      var profilePic = document.getElementById("uploadFile").value; //プロフィール画像
      // user.updateProfileを使用してユーザ情報を更新する
      user
        .updateProfile({
          firstName: userFirstName,
          lastName: userSecondName,
          displayName: displayName,
          profiletext: profileText,
          photoURL: profilePic
        })
        .then(function() {
          // 登録成功時の処理
          alert("登録完了！");
        });
    })
    .catch(function(error) {
      console.log(error);
      // 登録失敗時の処理
      alert("登録失敗");
    });
}
function read() {
  // ユーザ情報取得処理を記述する
  return;
}

function update() {
  // ユーザ情報更新処理を記述する
  return;
}

function drop() {
  // ユーザ情報削除処理を記述する
  return;
}

// 登録ボタン押下イベント
$("#newuser").on("click", function() {
  create();
});






// ユーザー情報の更新の始まり
// function update() {
//   // まず、ユーザ登録に必要なメール、パスワード情報をDOMから取得して定義しておく
//   var email = document.getElementById("inputEmail").value;
//   var password = document.getElementById("inputPassword").value;
//
// // ユーザーの登録の更新
// firebase
//   .auth()
//   .onAuthStateChanged(email, password)
//   .then(function()  {
//     var user = firebase.auth().currentUser;
//     // ※firebase.auth().currentUser　を使うと現在ログイン中のユーザが取得できる
//     // 更新するパラメータはスコープの関係でここで取得する
//     var displayName = document.getElementById("inputUserName").value; //ユーザーネーム
//     var userFirstName = document.getElementById("inputFirstName").value; //名前(姓)
//     var userSecondName = document.getElementById("inputSecondName").value; //名前(姓)
//     var profileText = document.getElementById("exampleTextarea").value; //自己紹介
//     var profilePic = document.getElementById("uploadFile").value; //プロフィール画像
//
//     user
//     .updateProfile({
//       firstName: userFirstName,
//       lastName: userSecondName,
//       displayName: displayName,
//       profiletext: profileText,
//       photoURL: profilePic
//     })
//
// var user = firebase.auth().currentUser;
// var name, email, photoUrl, uid, emailVerified;
//
// if (user != null) {
//   name = user.displayName;
//   email = user.email;
//   photoUrl = user.photoURL;
//   emailVerified = user.emailVerified;
//   uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
//                    // this value to authenticate with your backend server, if
//                    // you have one. Use User.getToken() instead.
// }
//
// var user = firebase.auth().currentUser;
//
// .then(function() {
//   // Update successful.
//   alert("更新が完了しました！お楽しみください(^^)");
//
//   location.replace('timeline.html')
//
// })
// .catch(function(error) {
//   console.log(error);
//   // 失敗時の処理
//   alert("更新に失敗しました( ´△｀)");
//   // An error happened.
// })
//
// // ユーザー除法の更新の終わり
//
//
//
// function read() {
//   // ユーザ情報取得処理を記述する
//   return;
// }
//
// function update() {
//   // ユーザ情報更新処理を記述する
//   return;
// }
//
// function drop() {
//   // ユーザ情報削除処理を記述する
//   return;
// }
//
// // 登録ボタン押下イベント
// $("#newuser").on("click", function() {
//   create();
// });

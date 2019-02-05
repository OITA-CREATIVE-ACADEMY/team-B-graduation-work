// Initialize Firebase
// APIコンフィグ情報を取得する
var config = getApiConfing();
firebase.initializeApp(config);

// Createの始まり
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
      var profilePic = document.getElementById("file").value;
      console.log(profilePic); //プロフィール画像

      // RealTimeDatabase　にuidをキーとしてユーザー情報を登録する
      var uid = user.uid;
      firebase
        .database()
        .ref("users/" + uid)
        .set({
          firstName: userFirstName,
          secondName: userSecondName,
          username: displayName,
          comment: profileText,
          photoURL: profilePic,
        });

      //プロフィール画像の登録
      var storage = firebase.storage();
      var files = document.getElementById("file").files;
      var image = files[0];
      // fileの名前を取得
      var file_name = files[0].name;

      if (files[0].type.indexOf("image") >= 0) {
        var ref = storage.ref("profilePic/").child(file_name);
        ref.put(image).then(function(snapshot) {
          // alert('画像をアップロードしました！');
          alert("登録が完了しました！お楽しみください(^^)");
          location.replace("timeline.html");
          // ref.getDownloadURL().then(function(url){
          //   document.getElementById('image').src = url;
          // });
        });
      }

      // .then(function() {
      //       // 登録成功時の処理
      //       alert("登録が完了しました！お楽しみください(^^)");
      //       location.replace('timeline.html')
      //     });
    });
  //   .catch(function(error) {
  //   console.log(error);
  //   // 登録失敗時の処理
  //   alert("登録に失敗しました( ´△｀)");
  // })
}
// Createの終わり

function read() {

  console.log('Firebaseからデータ取得');
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        // console.log(user); // ユーザー情報をコンソール出力してデータが取得できていることを確認する
        console.log(user.uid);
        var uid = user.uid;
        console.log(uid);
        var userInfo = firebase
          .database()
          .ref("/users/" + user.uid)
          .once("value")
          .then(function(snapshot) {
            var firstName =
              (snapshot.val() && snapshot.val().firstName) || "Anonymous";
            var secondName =
              (snapshot.val() && snapshot.val().secondName) || "Anonymous";
            var username =
              (snapshot.val() && snapshot.val().username) || "Anonymous";

            var comment =
              (snapshot.val() && snapshot.val().comment) || "Anonymous";
            var photoURL =
              (snapshot.val() && snapshot.val().photoURL) || "Anonymous";

            var email = user.email;
            // ...
            document.getElementById("inputUserName").value = username;
            document.getElementById("inputFirstName").value = firstName;
            document.getElementById("inputSecondName").value = secondName;
            document.getElementById("exampleTextarea").value = comment;
            document.getElementById("inputEmail").value = email;
            // document.getElementById("photoURL").value = photoURL;
            // ...
          });
        console.log(userInfo); // ユーザー情報をコンソール出力してデータが取得できていることを確認する
      } else {
        // location.replace("logIn.html");
        // No user is signed in.
      }
    });
}



function databaseUpdate() {
  var firstName = document.getElementById("inputFirstName").value;
  var username = document.getElementById("inputUserName").value;
  var secondName = document.getElementById("inputSecondName").value;
  var comment = document.getElementById("exampleTextarea").value;

  var userid = firebase.auth().currentUser.uid;
  var updatesFirstName = {};
  updatesFirstName['users/' + userid + '/firstName'] = firstName;
  var updatesSecondName = {};
  updatesSecondName['users/' + userid + '/secondName'] = secondName;
  var updatesUsername = {};
  updatesUsername['users/' + userid + '/username'] = username;
  var updatesComment = {};
  updatesComment ['users/' + userid + '/comment'] = comment;

  firebase.database().ref().update(updatesFirstName);
  firebase.database().ref().update(updatesSecondName);
  firebase.database().ref().update(updatesUsername);
  firebase.database().ref().update(updatesComment);

  // firebase.database().ref('users/' + userid ).set({
  //   firstName: '1212'
  // });
}


function update() {

  console.log('アップデート処理実行');
  // ユーザ情報更新処理を記述する
  // ユーザーのプロフィールを更新する
  var usersInfoUpdate = firebase.auth().currentUser;

  user.updateProfile({
    displayName: username,
    // photoURL: 関数を入れる
  }).then(function() {
    // Update successful.
  }).catch(function(error) {
    // An error happened.
  });


  // ユーザーのメールアドレスを設定する
  var userEmailUpdate = firebase.auth().currentUser;

  user.updateEmail(email).then(function() {
    // Update successful.
  }).catch(function(error) {
    // An error happened.
  });


  // ユーザーに確認メールを送信する
  var userEmailSend = firebase.auth().currentUser;

  user.sendEmailVerification().then(function() {
    // Email sent.
  }).catch(function(error) {
    // An error happened.
  });


    // A post entry.
    var postData = {
      firstName: firstNameUpdate,
      secondName: userSecondNameUpdate,
      comment: profileTextUpdate,
      photoURL: profilePicUpdate,
    };


// emailの更新
  var updatesEmail = document.getElementById("inputEmail").value;
  var user = firebase.auth().currentUser;
  user.updateEmail(updatesEmail).then(function() {
  // Update successful.
}).catch(function(error) {
  // An error happened.
});

}


function drop() {
  // ユーザーを削除する
  var userDelete = firebase.auth().currentUser;

  user.delete().then(function() {
    // User deleted.
  }).catch(function(error) {
    // An error happened.
  });
  return;
}



function validation() {
  var password = $("#inputPassword").val();
  var confirmationPassword = $("#inputConfirmationPassword").val();

  // 入力されたパスワードと確認用のパスワードが同一かチェックする
  if (password != confirmationPassword) {
    // 同一でなかった場合、エラーメッセージを返して処理終了る（ユーザ登録処理まで進まないようにする）
    alert("パスワードと確認用パスワードが一致しません！");
    return false;
  }
}


// 登録ボタン押下イベント
$("#newuser").on("click", function() {
  if (!validation()) {
    return false;
  } // フォームに入力された値の整合性のチェックを行う
  create(); // 新規ユーザ登録処理
});

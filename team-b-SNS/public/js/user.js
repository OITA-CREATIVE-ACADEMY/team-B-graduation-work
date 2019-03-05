// Initialize Firebase
// APIコンフィグ情報を取得する
var config = getApiConfing();
firebase.initializeApp(config);
var storageRef = firebase.storage().ref();


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
      var userProfilePic = document.getElementById("file").value;
      console.log(userProfilePic); //プロフィール画像

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
          photoURL: userProfilePic
        });

      //プロフィール画像の登録
      var user = firebase.auth().currentUser; // ※firebase.auth().currentUser　を使うと現在ログイン中のユーザが取得できる
      var profPicId = user.uid;

      console.log("ユーザーID=" + profPicId)
      //画像名を変更する指示を書く



      var storage = firebase.storage();
      var files = document.getElementById("file").files;
      var image = files[0];
      // fileの名前を取得
      // var file_name = files[0].name;
      // fileの名前を取得
      // var file_name = files[0].name;

      //ここで画像のファイル名を投稿IDをベースに拡張子別に変更する。
      var newProfPicName =
        image.type.indexOf("png") !== -1
          ? `${profPicId}.png`
          : `${profPicId}.jpg`;
      console.log(newProfPicName); //この名前がuserIDに変更した画像名

      if (files[0].type.indexOf("image") >= 0) {


      var uploadTask = storageRef.child('profilePic/' + newProfPicName).put(image);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      //   switch (snapshot.state) {
      //     case firebase.storage.TaskState.PAUSED: // or 'paused'
      //       console.log('Upload is paused');
      //       break;
      //     case firebase.storage.TaskState.RUNNING: // or 'running'
      //       console.log('Upload is running');
      //       break;
      //   }
      }, function(error) {
        // Handle unsuccessful uploads
        alert("画像が選択されていません( ´△｀)");
      }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          var profPhotoUpdates = {};
          profPhotoUpdates['users/' + profPicId + '/photoURL'] = downloadURL;
          firebase.database().ref().update(profPhotoUpdates);
          alert('ファイアベースに画像登録できました。');
          location.replace('timeline.html');
        });
      });

    };
  });

}

// Createの終わり

function read() {
  console.log("Firebaseからデータ取得");
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
            document.getElementById("userPic").src = photoURL;
            // ...
          });
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
  var updatesusername = {};
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
  // まず、メールアドレスの更新処理から実施する
  var email = $("#inputEmail").val();
  var passwd = $("#inputPassword").val();
  var user = firebase.auth().currentUser;
  // メールアドレス・パスワードなどのセキュリティ情報を変更するには、クレデンシャルを発行する必要がある
  var credential = firebase.auth.EmailAuthProvider.credential(
    user.email,
    passwd
  );

  user
    .reauthenticateAndRetrieveDataWithCredential(credential) // クレデンシャルを利用してユーザを再認証する
    .then(function() {
      user.updateEmail(email).then(function() {
        // 続いて、usersテーブルの情報を更新する
        var usersRef = firebase.database().ref("users/" + user.uid);
        var firstName = $("#inputFirstName").val();
        var secondName = $("#inputSecondName").val();
        var username = $("#inputUserName").val();
        var comment = $("#exampleTextarea").val();

        usersRef
          .update({
            firstName: firstName,
            secondName: secondName,
            username: username,
            comment: comment
          })
          .then(function() {
            // 画像登録処理
            var files = document.getElementById("file").files;
            var image = files[0];
            var newFileName =
              image.type.indexOf("png") !== -1
                ? `${user.uid}.png`
                : `${user.uid}.jpg`;
            if (image.size > 0) {
              var storageRef = firebase.storage().ref();
              var uploadTask = storageRef
                .child("images/" + newFileName)
                .put(image);
              uploadTask.on(
                "state_changed",
                function(snapshot) {
                  var progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                },
                function(error) {
                  alert("画像が選択されていません( ´△｀)");
                },
                // プロフィール画像を更新
                function() {
                  uploadTask.snapshot.ref
                    .getDownloadURL()
                    .then(function(downloadURL) {
                      usersRef
                        .update({
                          photoURL: downloadURL // ダウンロードURLで更新する
                        })
                        .then(function() {
                          alert("更新成功");
                          location.replace("userInfoUpdate.html");
                        });
                    });
                }
              );
            }
          });
      });
    })
    .catch(function(error) {
      console.log(error.message);
    });
}

// // ユーザーのメールアドレスを設定する
// var userEmailUpdate = firebase.auth().currentUser;
//
// user.updateEmail(email).then(function() {
//   // Update successful.
// }).catch(function(error) {
//   // An error happened.
// });
//
//
// // ユーザーに確認メールを送信する
// var userEmailSend = firebase.auth().currentUser;
//
// user.sendEmailVerification().then(function() {
//   // Email sent.
// }).catch(function(error) {
//   // An error happened.
// });

function drop() {
  // ユーザーを削除する
  var userDelete = firebase.auth().currentUser;

  user
    .delete()
    .then(function() {
      // User deleted.
    })
    .catch(function(error) {
      // An error happened.
    });
  return;
}

function validation() {
  var firstName = $("#inputFirstName").val();
  if (firstName == "") {
    //alert("姓　が入力されていません!");
    $("#namenone").removeClass("d-none");
    return false;
  }

  var secondName = $("#inputSecondName").val();
  if (secondName == "") {
    // alert("名　が入力されていません!");
    $("#namenone").removeClass("d-none");
    return false;
  }

  var username = $("#inputUserName").val();
  if (username == "") {
    //alert("User Name　が入力されていません!");
    $("#usernamenone").removeClass("d-none");
    return false;
  }

  var email = $("#inputEmail").val();
  if (email == "") {
    //alert("E-mail　が入力されていません!");
    $("#emailnone").removeClass("d-none");
    return false;
  }

  var textarea = $("#exampleTextarea").val();
  if (textarea == "") {
    //alert("自己紹介　が入力されていません!");
    $("#textareanone").removeClass("d-none");
    return false;
  }

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
  // if (!validation()) {
  //   return false;
  // } // フォームに入力された値の整合性のチェックを行う
  create(); // 新規ユーザ登録処理
});

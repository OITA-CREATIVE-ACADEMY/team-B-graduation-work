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
          photoURL: userProfilePic,
        });

      //プロフィール画像の登録
      var user = firebase.auth().currentUser; // ※firebase.auth().currentUser　を使うと現在ログイン中のユーザが取得できる
      var profPicId = user.uid;
      console.log("ユーザーID=" + profPicId)


      var storage = firebase.storage();
      var files = document.getElementById("file").files;
      var image = files[0];
      // fileの名前を取得
      // var file_name = files[0].name;
      // fileの名前を取得
      // var file_name = files[0].name;

      //ここで画像のファイル名を投稿IDをベースに拡張子別に変更する。
      var newProfPicName = (image.type.indexOf('png') !== -1) ? `${profPicId}.png` : `${profPicId}.jpg`;
      console.log(newProfPicName); //この名前がuserIDに変更した画像名

      if (files[0].type.indexOf("image") >= 0) {
        var ref = storage.ref("profilePic/").child(newProfPicName); //ここでstorageに画像を登録
        ref.put(image).then(function(snapshot) {

          //画像の登録まで正常に終わったら、ユーザー登録が完了になる。画像が登録できない場合は、画像登録失敗時の処理のcatchに飛ぶ

          // ここに、photoURL　を update　で登録する
          console.log("変更後のプロフ画像名=" + newProfPicName)
          var profPhotoUpdates = {};
          profPhotoUpdates['users/' + profPicId + '/photoURL'] = newProfPicName;　 //ここでRDの画像名を書き換え
          firebase.database().ref().update(profPhotoUpdates);

          // 新規登録成功時の処理
          alert("おめでとうございます！ユーザー登録が完了しました！");
          // location.replace('timeline.html')
        }).catch(function(error) {
          console.log(error);
          // 画像登録失敗時の処理
          alert("画像が選択されていません( ´△｀)");
        });
      }
    });
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

          // 画像の読み込み


        });
      // ユーザー情報をコンソール出力してデータが取得できていることを確認する
    } else {
      // location.replace("logIn.html");
      // No user is signed in.
    }
  });
}




$(function() {
  read();
  // class="update" エレメントがクリックされたときに実行される
  $(".update").on("click", function() {
    // アップデートテスト関数
    // databaseUpdate();
    var userid = firebase.auth().currentUser.uid;

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
      updatesComment['users/' + userid + '/comment'] = comment;

      firebase.database().ref().update(updatesFirstName);
      firebase.database().ref().update(updatesSecondName);
      firebase.database().ref().update(updatesUsername);
      firebase.database().ref().update(updatesComment);


      // var photoURL ="123.png"
      // var updatesPotoUrl = {};
      // updatesPotoUrl['users/' + userid + '/photoURL'] = photoURL;
      // firebase.database().ref().update(updatesPotoUrl);




// 画像登録
// Initialize Firebase
// APIコンフィグ情報を取得する

var config = getApiConfing();
if (!firebase.apps.length) {
   firebase.initializeApp(config);
}

var storageRef = firebase.storage().ref();

//ログインしているユーザー情報の取得2
var userId = firebase.auth().currentUser.uid;
return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
  var uid = userId;
      console.log("こんにちは");

  firebase.database().ref('users')
    // アップデード
    .update({
      var updatesPotoUrl = {};
      updatesPotoUrl['users/' + userid + '/photoURL'] = updatesPotoUrl;
      firebase.database().ref().update(updatesPotoUrl);
    })


    //ここのthenは、update　の処理が正常に処理されたかどうかを判断するもの
    .update(function(data) { //引数で　data　をとってきて、投稿IDを次に取得する
      // ここで投稿IDをとる　そしてその投稿IDを使って画像名を変更することで、storage内の画像の上書きを防ぐ

      // ストレージにアップロード1
      //投稿画像の登録は、この上のthen　の処理が正常に行われたら走る

      var userPictId = userId;
      var storage = firebase.storage();
      var files = document.getElementById('file').files;

      var image = files[0];
      // fileの名前を取得
      // var file_name = files[0].name;

      //ここで画像のファイル名を投稿IDをベースに拡張子別に変更する。
      var newFileName = (image.type.indexOf('png') !== -1) ? `${userPictId}.png` : `${userPictId}.jpg`;


      if (files[0].type.indexOf('image') >= 0) {
        // var uploadTask = storageRef.child('images/' + newFileName).put(image);
        var uploadTask = storageRef.child('profilePic/' + newFileName).put(image);
        uploadTask.on('state_changed', function(snapshot) {

          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');

        }, function(error) {
          alert("画像が選択されていません( ´△｀)");
        }, function() {



          // ふぉとURLの記述

          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            alert('File available at', downloadURL);
            var profilePicUpdates = {};
            profilePicUpdates['users/' + userPictId] = downloadURL;
            firebase.database().ref().update(profilePicUpdates);
            alert('画像登録できました。');
            location.replace('timeline.html');
          });
        });
      }
    })
    //ここが投稿全体のエラーを返す
    .catch(function(error) {
      console.log(error);
      // 登録失敗時の処理
      alert("画像の登録に失敗しました( ´△｀)");
    })

});








      // var profilePicUpdate = $("").val();

      var emailUpdate = $("#inputEmail").val();
      console.log(emailUpdate);
      var user = firebase.auth().currentUser;
      if (user) {

        // EmailとPassの入力を求める ---------------------------------------
        // 入力ダイアログを表示 ＋ 入力内容を key に代入

        key = window.prompt("パスワードを入力してください", "");

        var email = user.email;
        var password = key;

        // ---------------------------------------

        var credential = firebase.auth.EmailAuthProvider.credential(
          email,
          password
        );

        // Prompt the user to re-provide their sign-in credentials

        user.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
          // User re-authenticated.
          user
            .updateEmail(emailUpdate)
            .then(function() {
              // Update successful.
            })
            .catch(function(error) {
              // An error happened.
              console.log(error);
              if (error.code == 'auth/requires-recent-login') {

              }
            });
        }).catch(function(error) {
          // An error happened.
        });


        var usersRef = firebase
          .database()
          .ref("users/" + userid)
        // var usersUpdate = usersRef.child("users");





        alert("登録処理実行！");
        console.log("登録処理実行！");
        return false;
      }


  });


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

    user.delete().then(function() {
      // User deleted.
    }).catch(function(error) {
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

    var userName = $("#inputUserName").val();
    if (userName == "") {
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
});

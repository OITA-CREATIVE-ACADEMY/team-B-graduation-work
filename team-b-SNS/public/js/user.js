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
          photoURL: profilePic
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

// function read() {
//   // ユーザ情報取得処理を記述する
//   // $(function(){// Initialize Firebase
// // APIコンフィグ情報を取得する
//
// // var user = select();
// firebase.auth().onAuthStateChanged(function(user) {
//  if (user) {
//    // User is signed in.
//    // console.log(user); // ユーザー情報をコンソール出力してデータが取得できていることを確認する
//    console.log(user);
//    console.log(user.email);
//    var userInfo = firebase
//      .database()
//      .ref(“/users/” + user.uid)
//      .once(“value”)
//      .then(function(snapshot) {
//        var firstName = (snapshot.val() && snapshot.val().firstName) || ‘Anonymous’;
//        var secondName = (snapshot.val() && snapshot.val().secondName) || ‘Anonymous’;
//        var username = (snapshot.val() && snapshot.val().username) || ‘Anonymous’;
//
//        var comment = (snapshot.val() && snapshot.val().comment) || ‘Anonymous’;
//        var photoURL = (snapshot.val() && snapshot.val().photoURL) || ‘Anonymous’;
//
//        var email = user.email;
//        // ...
//        document.getElementById( “inputUserName” ).value = username ;
//        document.getElementById( “inputFirstName” ).value = firstName ;
//        document.getElementById( “inputSecondName” ).value = secondName ;
//        document.getElementById( “exampleTextarea” ).value = comment ;
//        document.getElementById( “inputEmail” ).value = email ;
//      });
//    // console.log(userInfo); // ユーザー情報をコンソール出力してデータが取得できていることを確認する
//  } else {
//    // location.replace(“logIn.html”);
//    // No user is signed in.
//  }
// });
//   return;
// }

function update() {
  // ユーザ情報更新処理を記述する
  return;
}

function drop() {
  // ユーザ情報削除処理を記述する
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
  if (!validation()) {
    return false;
  } // フォームに入力された値の整合性のチェックを行う
  create(); // 新規ユーザ登録処理
});

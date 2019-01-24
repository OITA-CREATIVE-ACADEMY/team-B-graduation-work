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
      console.log(profilePic) //プロフィール画像



// RealTimeDatabase　にuidをキーとしてユーザー情報を登録する
      var uid = user.uid;
      firebase
       .database()
       .ref('users/' + uid)
           .set({
             firstName: userFirstName,
             secondName: userSecondName,
             username: displayName,
             comment: profileText,
             photoURL: profilePic,
           });

//プロフィール画像の登録
          var storage = firebase.storage();
          var files = document.getElementById('file').files;　
          var image = files[0];
          // fileの名前を取得
          var file_name = files[0].name;

          if(files[0].type.indexOf('image') >= 0) {　
              var ref = storage.ref('profilePic/').child(file_name);
              ref.put(image).then(function(snapshot) {
                // alert('画像をアップロードしました！');
              alert("登録が完了しました！お楽しみください(^^)");
              location.replace('timeline.html')
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

// Initialize Firebase
// APIコンフィグ情報を取得する
var config = getApiConfing();
firebase.initializeApp(config);


// Createの始まり
// RealTimeDatabase　にuidをキーとして　新規投稿　を登録する

function createNewPost() {
  // ユーザーの情報を取得
      // ログインしているユーザーを取得する
      var user = firebase.auth().currentUser; // ※firebase.auth().currentUser　を使うと現在ログイン中のユーザが取得できる
      //　投稿関係の
      var postComment = document.getElementById("exampleTextarea").value; //投稿コメント
      var postPic = document.getElementById("postPic").value;//投稿画像のURL
      var eventTitle = document.getElementById("eventSelected").value;//選択したイベント
      var tagTitle = document.getElementById("tagSelected").value;//選択したタグ
            //投稿日時 postDate の取得 を追加する

      var uid = user.uid;

      firebase
       .database()
      //  .ref('users/' + uid)
       .ref('post' + uid)
　       .push({
             event: eventTitle,
             tag: tagTitle,
             comment: postComment,
             photoURL: postPic,
            //  date: postDate,
           })

        .then(function() {
          // 新規投稿成功時の処理
          alert("投稿しました");
          location.replace('timeline.html')
        });
    // .catch(function(error) {
    //   console.log(error);
      // 登録失敗時の処理
    //   alert("投稿に失敗しました( ´△｀)");
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

// 新規投稿ボタン押下イベント
$("#postBtn").on("click", function() {
  createNewPost();
});

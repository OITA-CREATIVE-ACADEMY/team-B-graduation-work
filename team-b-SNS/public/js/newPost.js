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
      //　投稿関係の変数を登録
      var postComment = document.getElementById("exampleTextarea").value; //投稿コメント
      var postPic = document.getElementById("postPic").value;//投稿画像のURL
      var eventTitle = document.getElementById("eventSelected").innerHTML;//選択したイベント
      var tagTitle = document.getElementById("tagSelected").innerHTML;//選択したタグ
      var postTime = document.getElementById("DateTimeDisp").innerHTML;//投稿日時 postDate の取得 を追加する
      var uid = user.uid;

      //投稿した日付を取得
      function dateFunction6() {
        //日付オブジェクトを作成する
        var date6 = new Date();
        //日付オブジェクトから「年」を取得する
        var year = date6.getFullYear();
        console.log(year);
        // //段落タグの中身を"date6"で置き換える
        // var pelem006 = document.getElementById("date006");
        // pelem006.innerHTML = "今は" + year + "年です。";
        }




      console.log(uid);
      console.log(postComment);
      console.log(postPic);
      console.log(eventTitle);
      console.log(tagTitle);
      console.log(postTime);

      firebase
       .database()
      //  .ref('users/' + uid)
       .ref('post') 
　      .push({
          userID: uid,
          event: eventTitle,
          tag: tagTitle,
          comment: postComment,
          photoURL: postPic,
          date: postTime,
        })   
        .then(function() {　//ここのthenは、push　の処理が正常に処理されたかどうかを判断するもの

        //投稿画像の登録は、この上のthen　の処理が正常に行われたら走る

        var storage = firebase.storage();
        var files = document.getElementById('postPic').files;　
        // var files = document.getElementById('postPicCopy').files;　

        var image = files[0];
        // fileの名前を取得
        var file_name = files[0].name;

        if(files[0].type.indexOf('image') >= 0) {
          var ref = storage.ref('images/').child(file_name);
          ref.put(image).then(function(snapshot) {
           //画像の登録まで正常に終わったら、投稿が完了になる。画像が登録できない場合は、画像登録失敗時の処理のcatchに飛ぶ

            // 新規投稿成功時の処理
            alert("投稿しました");
            location.replace('timeline.html')
          }).catch(function(error) {
            console.log(error);
            // 画像登録失敗時の処理
            alert("画像が選択されていません( ´△｀)");
        });
      }
    }
        //ここが投稿全体のエラーを返す
    .catch(function(error) {
      console.log(error);
      登録失敗時の処理
      alert("投稿に失敗しました( ´△｀)");
    })
    );
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

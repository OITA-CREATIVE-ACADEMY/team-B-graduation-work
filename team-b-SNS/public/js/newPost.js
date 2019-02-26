// Initialize Firebase
// APIコンフィグ情報を取得する
var config = getApiConfing();
firebase.initializeApp(config);


// Createの始まり
// RealTimeDatabase　にuidをキーとして　新規投稿　を登録する

function createNewPost() {

      //ログインしているユーザー情報の取得
        var userId = firebase.auth().currentUser.uid;
        return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
        var postUserName = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        var postUserPic = (snapshot.val() && snapshot.val().photoURL) || 'Anonymous';
        console.log("投稿ユーザー名" + postUserName);
        console.log("投稿ユーザープロフィール画像" + postUserPic);


        //　投稿関係の変数を登録
      var postComment = document.getElementById("exampleTextarea").value; //投稿コメント
      var postPic = document.getElementById("postPic").value;//投稿画像のURL
      var eventTitle = document.getElementById("eventSelected").innerHTML;//ユーザーへの表示用：選択したイベント
      var tagTitle = document.getElementById("tagSelected").innerHTML;//ユーザーへの表示用：選択したタグ
      var postedEventTitle = document.getElementById("postedEvent").innerHTML;//RD登録用：選択したイベント
      var postedTagTitle = document.getElementById("postedtag").innerHTML;//RD登録用：選択したタグ

      // var postTime = document.getElementById("DateTimeDisp").innerHTML;//投稿日時 postDate の取得 を追加する
      var postDate =moment().format('YYYY年MM月DD日HH時MM分');

      // var likes =
      var uid = userId;

      console.log(uid);
      console.log(postComment);
      console.log(postPic);
      console.log(eventTitle);
      console.log(tagTitle);
      console.log(postedEventTitle);
      console.log(postedTagTitle);
      console.log(postDate);

      firebase
       .database()
      //  .ref('users/' + uid)
       .ref('post') 
　      .push({
          userID: uid,
          userName:postUserName,//テスト追加
          userPic:postUserPic,//テスト追加
          event: postedEventTitle,
          tag: postedTagTitle,
          comment: postComment,
          photoURL: postPic,
          date: postDate
        })  
        
       //ここのthenは、push　の処理が正常に処理されたかどうかを判断するもの
        .then(function(data) {  //引数で　data　をとってきて、投稿IDを次に取得する

          // ここで投稿IDをとる　そしてその投稿IDを使って画像名を変更することで、storage内の画像の上書きを防ぐ
          console.log(data);
          console.log(data.key);  //投稿IDを取得　data.key　全部！


        //投稿画像の登録は、この上のthen　の処理が正常に行われたら走る
        
        var newPostId = data.key;
        var storage = firebase.storage();
        var files = document.getElementById('postPic').files;　

        var image = files[0];
        // fileの名前を取得
        // var file_name = files[0].name;

        //ここで画像のファイル名を投稿IDをベースに拡張子別に変更する。
        var newFileName = (image.type.indexOf('png') !== -1) ? `${newPostId}.png`: `${newPostId}.jpg`;
        console.log(newFileName);

        if(files[0].type.indexOf('image') >= 0) {
          var ref = storage.ref('images/').child(newFileName);
          ref.put(image).then(function(snapshot) {
           //画像の登録まで正常に終わったら、投稿が完了になる。画像が登録できない場合は、画像登録失敗時の処理のcatchに飛ぶ

            // ここに、photoURL　を update　で登録する
              console.log('投稿写真のURLを　投稿ID + 拡張子　に変更');
              console.log(newFileName)
              var postPhotoUpdates = {};
              postPhotoUpdates['post/' + newPostId + '/photoURL'] = newFileName;
              firebase.database().ref().update(postPhotoUpdates);

            // 新規投稿成功時の処理
            alert("投稿しました");
            location.replace('timeline.html')
          }).catch(function(error) {
            console.log(error);
            // 画像登録失敗時の処理
            alert("画像が選択されていません( ´△｀)");
        });
      }
    })
        //ここが投稿全体のエラーを返す
    .catch(function(error) {
      console.log(error);
      // 登録失敗時の処理
      alert("投稿に失敗しました( ´△｀)");
    })

  });//ログインしているユーザー情報の取得終わり


  }
    // Createの終わり



function read() {
  // 投稿の取得

  // return;
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

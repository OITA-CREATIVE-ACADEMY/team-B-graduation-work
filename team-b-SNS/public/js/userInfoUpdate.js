

  // Initialize Firebase
  // APIコンフィグ情報を取得する
  var config = getApiConfing();
  firebase.initializeApp(config);
  var storageRef = firebase.storage().ref();

  //ログインしているユーザー情報の取得2
  var userId = firebase.auth().currentUser.uid;
  return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    var uid = userId;
        console.log("こんにちは");

    firebase.database().ref('users')
      // アップデード
      .update({
        photoURL: postPic,
      })

      //ここのthenは、update　の処理が正常に処理されたかどうかを判断するもの
      .then(function(data) { //引数で　data　をとってきて、投稿IDを次に取得する
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

  }); //ログインしているユーザー情報の取得終わり



// Createの終わり

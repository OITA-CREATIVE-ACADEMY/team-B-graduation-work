"use strict"

// プロフィール画像アップ
      // var storageRef = firebase.storage().ref();
      // var files = document.getElementById('file').files;
      // var image = files[0];
      //
      //   if(files[0].type.indexOf('image') >= 0) {
      //     ref = storageRef.child("profilePic/" + profilePic);
      //     ref.put(image).then(function(snapshot) {
      //       ref.getDownloadURL().then(function(url){
      //         alert('画像をアップロードしました！');
      //         document.getElementById('image').src = url;
      //       });
      //     });
      //   }

// こっちは元のコード、機能するがファイル名が入らないので１個しか登録できない
      // // プロフィール画像アップ
      // document.getElementById('profilePicUpload').addEventListener('click', function() {
      //       var storage = firebase.storage();
      //       var storageRef = storage.ref();
      //       var files = document.getElementById('file').files;　
      //       var image = files[0];

      //         if(files[0].type.indexOf('image') >= 0) {　

      //           var ref = storageRef.child("profilePic/" + files );

      //           ref.put(image).then(function(snapshot) {
      //             alert('画像をアップロードしました！');

      //             // ref.getDownloadURL().then(function(url){
      //             //   document.getElementById('image').src = url;
      //             // });
      //           });
      //         }
      //       });
      


 // 修正版　プロフィール画像アップ　ファイル名を取得できた！

      document.getElementById('profilePicUpload').addEventListener('click', function() {
        var storage = firebase.storage();
        var files = document.getElementById('file').files;　
        var image = files[0];
        // fileの名前を取得
        var file_name = files[0].name;

         if(files[0].type.indexOf('image') >= 0) {　
            var ref = storage.ref('profilePic/').child(file_name);
            ref.put(image).then(function(snapshot) {
              alert('画像をアップロードしました！');

              // ref.getDownloadURL().then(function(url){
              //   document.getElementById('image').src = url;
              // });
            });
          }
        });


      // document.getElementById('upload').addEventListener('click', function() {
      //       var files = document.getElementById('file').files;
      //       var image = files[0];
      //       var ref = firebase.storage().ref().child("profilePic/" + profilePic);
      //       ref.put(image).then(function(snapshot) {
      //         alert('アップロードしました');
      //       });
      //     });

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


      // // プロフィール画像アップ
      document.getElementById('upload').addEventListener('click', function() {
            var storage = firebase.storage();
            var storageRef = storage.ref();
            var files = document.getElementById('file').files;
            var image = files[0];

              if(files[0].type.indexOf('image') >= 0) {
                ref = storageRef.child("profilePic/" + profilePic);
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

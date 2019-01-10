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


      // プロフィール画像アップ
      document.getElementById('profilePicUpload').addEventListener('click', function() {
            var storageRef = firebase.storage().ref();
            var files = document.getElementById('file').files;
            var image = files[0];

              if(files[0].type.indexOf('image') >= 0) {
                ref = storageRef.child("profilePic/" + profilePic);
                ref.put(image).then(function(snapshot) {
                  ref.getDownloadURL().then(function(url){
                    alert('画像をアップロードしました！');
                    document.getElementById('image').src = url;
                  });
                });
              }
            });

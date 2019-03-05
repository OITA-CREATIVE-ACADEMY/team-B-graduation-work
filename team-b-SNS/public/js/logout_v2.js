

$(document).ready(function () {
  console.log(firebase);

  const fb = firebase;

  $(document).on('click', '#logout', function () {
    fb.auth().signOut().then(function() {
      console.log('ログアウト成功');
    }).catch(function(error) {
      console.log('ログアウト失敗');
    });
  });
});

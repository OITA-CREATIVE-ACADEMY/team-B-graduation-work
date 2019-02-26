// Initialize Firebase
// APIコンフィグ情報を取得する


$(document).load(function () {
  var logout = document.getElementById("logout"); //ログアウトボタン

  //ログアウト処理
  logout.addEventListener('click', function() {
    firebase.auth().signOut();
    location.replace('logout.html')
  });

});

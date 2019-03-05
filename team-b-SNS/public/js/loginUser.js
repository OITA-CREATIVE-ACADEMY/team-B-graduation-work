var config = getApiConfing();
firebase.initializeApp(config);
loginUser()


  function loginUser() {

    //location.replace('index.html')
    //});
    //認証状態の確認(ログインしているユーザーを取得する)
    firebase.auth().onAuthStateChanged(function(user) {

      var body = document.getElementById("body00");

      if (user) {
        body.classList.remove("d-none");
        //ユーザーがログインしている状態
        //loginDisplay();
        //setTimeout(function(){
        //window.location.href = 'timeline.html';
        //}, 3*1000);
      } else {
        //ユーザーがログインしていない状態
        logoutDisplay();
      }
    });

    //function loginDisplay() {
    //logout.classList.remove('d-none');
    //info.textContent = "あなたはログイン中です";
    //}

    function logoutDisplay() {
      //logout.classList.add('d-none');
      // location.replace('404.html')
      location.href = '/';
    }
}

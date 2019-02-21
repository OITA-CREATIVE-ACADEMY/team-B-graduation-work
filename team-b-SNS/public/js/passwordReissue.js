var config = getApiConfing();
firebase.initializeApp(config);

var emailSent = document.getElementById("emailSentBtn"); //メール送信ボタン

//メール処理
emailSent.addEventListener('click', function() {
    var auth = firebase.auth();
    var emailAddress = "user@example.com";
    
    auth.sendPasswordResetEmail(emailAddress).then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
    });
});

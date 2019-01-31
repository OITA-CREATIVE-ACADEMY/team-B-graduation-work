  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        // console.log(user); // ユーザー情報をコンソール出力してデータが取得できていることを確認する
        console.log(user);
        console.log(user.email);
        var userInfo = firebase
        .database()
        .ref(“/users/” + user.uid)
        .once(“value”)
        .then(function(snapshot) {
            var firstName = (snapshot.val() && snapshot.val().firstName) || ‘Anonymous’;
            var secondName = (snapshot.val() && snapshot.val().secondName) || ‘Anonymous’;
            var username = (snapshot.val() && snapshot.val().username) || ‘Anonymous’;

            var comment = (snapshot.val() && snapshot.val().comment) || ‘Anonymous’;
            var photoURL = (snapshot.val() && snapshot.val().photoURL) || ‘Anonymous’;

            var email = user.email;
            // ...
            document.getElementById( “inputUserName” ).value = username ;
            document.getElementById( “inputFirstName” ).value = firstName ;
            document.getElementById( “inputSecondName” ).value = secondName ;
            document.getElementById( “exampleTextarea” ).value = comment ;
            document.getElementById( “inputEmail” ).value = email ;
        });
        // console.log(userInfo); // ユーザー情報をコンソール出力してデータが取得できていることを確認する
    }
  });
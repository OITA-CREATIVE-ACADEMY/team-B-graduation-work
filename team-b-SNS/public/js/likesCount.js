// Initialize Firebase
// APIコンフィグ情報を取得する
var config = getApiConfing();
firebase.initializeApp(config);
var storageRef = firebase.storage().ref();

function likesCount() {
    // ログインしているユーザー情報の取得
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    var uid = userId;
    console.log("ログインしているユーザーID:" + uid )

$('whiteHeart').on('click',function(){
    //白ハートをクリックすると、imgが赤の下手ハートに変わる

        $('#whiteHeart').addClass('d-none');
        $('#redHeart').removeClass('d-none');
    })



    firebase.database().ref('post')
    .then(function(snapshot) { 
        var postId = snapshot.key; //投稿ID
        console.log(postId);  //投稿IDを取得　data.key　全部！
    


    firebase.database().ref('likes')
    　      .push({
              uid_,
            })
        })
    })
    
}

$("#whiteHeart").on("click", function() {
    likesCount();
    console.log("heartクリック")
  })
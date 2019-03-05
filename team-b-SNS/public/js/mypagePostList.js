
window.onload=
function readPostList() {
    //ログインしているユーザー情報の取得
    var userId = firebase.auth().currentUser;
    var uid = userId;


    var postRef = firebase.database().ref("post");
    postRef.on("child_added", function(snapshot) {
      console.log(snapshot.val());
      console.log('======================================================');

      // 一意のIDを取得(postIdは、newPost.jsの、newPostIdと同じ値)
      var postId = snapshot.key; //投稿ID
      var postDate = snapshot.val().date; //投稿した日時
      var postUserID = snapshot.val().userID; //投稿者のユーザーID
      var postUserName = snapshot.val().userName; //投稿者のユーザーID
      var postUserPic = snapshot.val().userPic; //投稿者のプロフ画像
      var eventTitle = snapshot.val().event; //投稿イベント名
      var tagTitle = snapshot.val().tag; //選択したタグ
      var postPic = snapshot.val().photoURL; //投稿した画像名
      var postComment = snapshot.val().comment; //投稿したコメント

      console.log("投稿ID=" + postId);
      console.log("投稿した日時=" + postDate);
      console.log("投稿者のユーザーID=" + postUserID);
      console.log("投稿者のプロフ画像" + postUserPic)
      console.log("投稿イベント名=" + eventTitle);
      console.log("選択した#タグ=" + tagTitle);
      console.log("投稿した画像名=" + postPic);
      console.log("投稿したコメント=" + postComment);


      //ログインユーザー（自分）の投稿のみを表示する
      var body = document.getElementById("myPost");

      if (userId == postUserID) {
        body.classList.remove("d-none");
        //ユーザーがログインしている状態
        //loginDisplay();
        //setTimeout(function(){
        //window.location.href = 'timeline.html';
        //}, 3*1000);
      } else {
        //ユーザーがログインしていない状態
      }





      const text = `<div class="mw-100 shadow-sm p-2 mx-2 my-3 ${eventTitle} ${tagTitle}" id="${postId}">

      <div id="myPost" class="row d-none">
        <!-- 投稿のbox -->

        <div class="col-md">
          <!-- 画像のbox ブレイクポイントはMedium（768px〜991px） -->
          <div class="mx-100">
            <div class="">
              <!-- 画像 --> <img class="mw-100 postImg" id="${postId}" src="${postPic}">

            </div>
          </div> <!-- 画像のbox ブレイクポイントはMedium（768px〜991px） 終わり-->
        </div>

        <div class="col-md mt-2">
          <!-- プロフ画像・投稿者名・投稿日・いいね！のbox -->

          <div class=" container-fluid">

            <div class="row">
              <!-- プロフ画像 のbox-->
              <div class="col-2 p-1 text-center">
                 <!-- プロフ画像 -->
                <img id="${postUserID}" class="rounded-circle bg-primary shadow" src="${postUserPic}" alt="" style="width: 50px; height: 50px;" />
              </div><!-- プロフ画像 のbox 終わり-->
              <div class="col-6 container-fluid">
                <!-- 投稿者名・投稿日 のbox -->
                <div class="row">
                  <!-- 投稿者名 のbox -->
                  <div class="col-xl">
                    <!-- 投稿者名 --> <small><span id="postUserName" class=" font-weight-bold">${postUserName}</span></small>
                  </div>
                </div><!-- 投稿者名 のbox 終わり-->
                <div class="row">
                  <!-- 投稿日 のbox -->
                  <div class="col-xl">
                    <!-- 投稿者名 --> <small><span id="postDate" class="">${postDate}</span></small>
                  </div>
                </div><!-- 投稿日 のbox 終わり-->
              </div><!-- 投稿者名・投稿日のbox 終わり-->

              <div class="col-2 p-0 text-right">
                <!-- ハート のbox -->
                <!-- 白ハート --> <img id="whiteHeart" class="" src="img/likes_heart_white.svg" alt="" style="width: 30px;height: 30px;" />
                 <!-- 赤ハート --> <img id="redHeart" class="d-none" src="img/likes_heart.svg" alt="" style="width: 30px; height: 30px;" />
              </div> <!-- ハート のbox 終わり-->
              <div id="likesNumber" class="col-2 p-0">
                <!-- いいねの数 のbox -->
                <!-- いいね！の数 -->
                <div class="mw-100 text-left" style="font-size:24px">110</div>
              </div> <!-- いいねの数 のbox 終わり-->
            </div><!-- プロフ画像・投稿者名・投稿日・いいね！のbox 終わり-->

            <div class="row">
              <!-- コメントのbox -->
              <!-- コメント -->
              <div class="col mw-100 p-1">
                <div class="mw-100 border border-light shadow-sm">
                  <span class="p-1">${postComment}</span>
                </div>
              </div>
            </div><!-- コメントのbox 終わり-->
          </div><!-- 投稿情報・コメントのbox 終わり-->
        </div><!-- プロフ画像・投稿者名・投稿日・いいね！のbox 終わり-->
      </div><!-- 投稿のbox 終わり-->
    </div>`;
      $(".myPostList").append(text);
    });
  };

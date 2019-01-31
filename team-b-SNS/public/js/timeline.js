
// Initialize Firebase
// APIコンフィグ情報を取得する
var config = getApiConfing();
firebase.initializeApp(config);


const text = 
<div class="container-fluid">
    <div class="mw-100 shadow-sm p-2 mx-2 my-3" id="postBox">

    <!-- タイムラインのbox -->
    <div class="row">
      <!-- 投稿のbox -->

      <div class="col-md">
        <!-- 画像のbox ブレイクポイントはMedium（768px〜991px） -->
        <div class="bg-primary mx-100">
          <div class="">
            <!-- 画像 --> <img class="mw-100" id="boxPic" src="img/img_sample1.jpg">
          </div>
        </div> <!-- 画像のbox ブレイクポイントはMedium（768px〜991px） 終わり-->
      </div>

      <div class="col-md mt-2">
        <!-- プロフ画像・投稿者名・投稿日・いいね！のbox -->

        <div class=" container-fluid bg-danger">

          <div class="row">
            <!-- プロフ画像 のbox-->
            <div class="col-2 p-1 text-center">
              <!-- プロフ画像 --> <img id="postUserPic" class="mw-100 rounded-circle bg-primary shadow" src="img/img_sample1.jpg" alt="" style="width: 50px;height: 50px;">
            </div><!-- プロフ画像 のbox 終わり-->
            <div class="col-6 container-fluid bg-success">
              <!-- 投稿者名・投稿日 のbox -->
              <div class="row">
                <!-- 投稿者名 のbox -->
                <div class="col-xl bg-info">
                  <!-- 投稿者名 --> <small><span id="postUserName" class=" font-weight-bold">ユーザー名</span></small>
                </div>
              </div><!-- 投稿者名 のbox 終わり-->
              <div class="row">
                <!-- 投稿日 のbox -->
                <div class="col-xl bg-warning">
                  <!-- 投稿者名 --> <small><span id="postDate" class="">2018年12月25日</span></small>
                </div>
              </div><!-- 投稿日 のbox 終わり-->
            </div><!-- 投稿者名・投稿日のbox 終わり-->

            <div class="col-2 bg-light p-0 text-right">
              <!-- ハート のbox -->
              <!-- ハート --> <img id="heartPic" class="h-50" src="img/likes_heart.svg" alt="" style="width: 50px;height: 50px;">
            </div> <!-- ハート のbox 終わり-->
            <div id="likesNumber" class="col-2 p-0 bg-dark">
              <!-- いいねの数 のbox -->
              <!-- いいね！の数 -->
              <div class="mw-100 text-left" style="font-size:24px">110</div>
            </div> <!-- いいねの数 のbox 終わり-->
          </div><!-- プロフ画像・投稿者名・投稿日・いいね！のbox 終わり-->

          <div class="row">
            <!-- コメントのbox -->
            <!-- コメント -->
            <div class="col mw-100 bg-primary p-1">
              <div class="mw-100 border">
                <span class="p-1">コメントコメントコメント</span>
              </div>
            </div>
          </div><!-- コメントのbox 終わり-->
        </div><!-- 投稿情報・コメントのbox 終わり-->
      </div><!-- プロフ画像・投稿者名・投稿日・いいね！のbox 終わり-->
    </div><!-- 投稿のbox 終わり-->
  </div>
  </div>
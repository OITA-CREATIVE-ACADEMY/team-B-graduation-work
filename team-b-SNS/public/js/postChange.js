// comments以下に追加 / 削除 / 変更があった時に発動
commentsRef.on('child_changed', function(data) {
    setCommentValues(data.val());
  });
  
  // comments以下に削除があった時に発動
  commentsRef.on('child_removed', function(data) {
    deleteComment(data.val());
  });
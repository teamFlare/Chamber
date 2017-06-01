//increment a like
export function increment(index) {
  return {
    type: 'INCREMENT_LIKES',
    index: index
  }
}

//add comment
export function addComment(postId, author, comment) {
  return {
    type: 'ADD_COMMENT',
    postId: postId,
    author: author,
    comment: comment
  }
}

//remove comment
export function removeComment(postId, index) {
  return {
    type: 'REMOVE_COMMENT',
    index: index,
    postId: postId
  }
}

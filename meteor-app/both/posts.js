Posts = new Mongo.Collection('posts');

Meteor.methods({  
  addPost() {
    Posts.insert({title: 'Post ' + Random.id()});
  },

  deletePost() {
    let post = Posts.findOne();
    if (post) {
      Posts.remove({_id: post._id});
    }
  },
});
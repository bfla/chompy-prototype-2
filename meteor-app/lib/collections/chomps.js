Chomps = new Mongo.Collection('chomps');

Meteor.methods({  
  createChomp() {
    Chomps.insert({title: 'Chomp ' + Random.id()});
  },

});
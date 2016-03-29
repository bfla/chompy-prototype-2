Meteor.publish('chomps', function() {  
  return Chomps.find();
});
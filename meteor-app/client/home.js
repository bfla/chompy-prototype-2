Template.home.onCreated(function() {  
  this.subscribe('chomps');
});

Template.home.helpers({  
  count() {
    return Chomps.find().count();
  }
});

Template.home.events({  
  'click #increment': function(e) {
    e.preventDefault();

    Meteor.call('createChomp');
  },
})
Meteor.startup(function() {  
  if (Chomps.find().count() === 0) {
    for (i = 1; i <= 10; i++) {
      Chomps.insert({title: 'Chomps ' + Random.id()});
    }
  }
});
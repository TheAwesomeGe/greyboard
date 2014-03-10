Lines = new Meteor.Collection('lines');

Meteor.methods({
  reset: function() {
    Lines.remove({});
  }
});

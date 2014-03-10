Lines = new Meteor.Collection('lines');

Meteor.methods({
	reset: function(channel) {
		Lines.remove({channel: channel});
	}
});

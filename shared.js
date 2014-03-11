Lines = new Meteor.Collection('lines');

Lines.allow({
	insert: function(userId, line) {
		return true;
	}
});

Meteor.methods({
	reset: function(channel) {
		Lines.remove({channel: channel});
	}
});

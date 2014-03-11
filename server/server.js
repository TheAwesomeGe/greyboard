Meteor.publish("lines", function (opts) {
  return Lines.find({channel: opts.channel});
});
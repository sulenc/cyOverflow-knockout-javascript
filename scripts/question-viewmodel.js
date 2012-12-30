App.ViewModels.Question = function(questionData) {
	var self = this;

	self.content = questionData.content;
	self.author = questionData.author;
	self.votes = ko.observableArray(questionData.votes || []);

	self.voteTally = ko.computed( function() {
		return self.votes().reduce( function(tally, vote) {
			return tally + vote.value;
		}, 0 );
	});

	self.addVote = function(voter,voteType) {
		var voteValue = voteType === 'up' ? 1 : -1;
		self.votes.push( {value: voteValue, voter: voter });
	}
}
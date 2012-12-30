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

	self.getExistingVote = function(voterName) {
		return _(self.votes()).find(function(vote) {
			return vote.voter === voterName;
		});
	}

	self.userVoted = function(voteValue) {
		var userVote = self.getExistingVote(overflowViewModel.userName());
		var userVoted = (userVote && userVote.value === voteValue);
		return userVoted;
	}

	self.userVotedUp = ko.computed( function() {
		return self.userVoted(1);
	});

	self.userVotedDown = ko.computed( function() {
		return self.userVoted(-1);
	});

	self.removeExistingVote = function(existingVote) {
		self.votes.remove( function(vote) {
			return vote.voter === existingVote.voter;
		});
	}

	self.addVote = function(voter,voteType) {
		var voteValue = voteType === 'up' ? 1 : -1;
		var existingVote = self.getExistingVote(voter);

		if(existingVote) {
			if(existingVote.value !== voteValue ){
				self.removeExistingVote(existingVote);
			}
		} else {
			self.votes.push({ value: voteValue, voter: voter });
		}
	}
}
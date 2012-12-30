App.ViewModels.Overflow = function() {
	var self = this;

	self.userName = ko.observable("");
	self.isLoggedIn = ko.observable(false);
	self.newQuestionText = ko.observable("");
	self.questions = ko.observableArray([]);

	self.loginUser = function() {
		self.isLoggedIn( self.userName != "");
	},

	self.addQuestion = function() {
		var questionData = { content: self.newQuestionText(), author: self.userName() };
		var questionViewModel = new App.ViewModels.Question(questionData);
		self.questions.push( questionViewModel );
		self.newQuestionText("");
  }
}
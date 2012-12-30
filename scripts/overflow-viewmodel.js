App.ViewModels.Overflow = function() {
	var self = this;

	self.userName = ko.observable("");
	self.isLoggedIn = ko.observable(false);

	self.loginUser = function() {
		self.isLoggedIn( self.userName != "");
	}
}
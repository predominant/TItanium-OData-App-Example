//A window object which will be associated with the stack of windows
exports.AppWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	
	var button = Ti.UI.createButton({
		height:44,
		width:200,
		title:L('openWindow'),
		top:20
	});
	self.add(button);
	
	button.addEventListener('click', function() {
		globals.tabs.currentTab.open(Ti.UI.createWindow({
			title: L('newWindow'),
			backgroundColor: 'white'
		}));
	});
	
	return self;
};

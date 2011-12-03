exports.AppTabGroup = function(tabs) {
	var self = Ti.UI.createTabGroup();
	
	var tabCount = 0;
	//loop through tab objects and add them to the tab group
	for (var name in tabs) {
		var tab = Ti.UI.createTab(tabs[name]);
		//on initialization, we track the current tab as the first one added
		if (tabCount === 0) {
			self.currentTab = tab;
		}
		self.addTab(tab);
		tabCount++;
	}
	
	//track the current tab for the tab group
	self.addEventListener('focus', function(e) {
		self.currentTab = e.tab;
	});
	
	return self;
};

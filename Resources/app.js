var ODataHelper = require('lib/ODataHelper').ODataHelper;
var globals = {
	tabs: null
};

(function() {
	var AppTabGroup = require('ui/AppTabGroup').AppTabGroup,
		AppWindow   = require('ui/AppWindow').AppWindow,
		ODataCollectionWindow = require('ui/ODataCollectionWindow').ODataCollectionWindow;
	
	Ti.API.addEventListener('odata_collections_loaded', function(data) {
		data = data.EntitySets;
		if (globals.tabs !== null) {
			globals.tabs.close();
		}
		var tabs = {};
		for (var i = 0; i < data.length; i++) {
			var name = data[i];
			tabs[name] = {
				title: L(name),
				icon: 'images/KS_nav_ui.png',
				window: new ODataCollectionWindow(
					{
						title: L(name),
						backgroundColor: 'white'
					},
					name
				)
			};
		}
		Ti.API.debug(tabs);
		globals.tabs = new AppTabGroup(tabs);
		globals.tabs.open();
	});
	
	var odata = new ODataHelper('http://odata.netflix.com/v2/Catalog/');
	odata.getCollections();
})();	

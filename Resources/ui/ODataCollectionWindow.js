var ODataCollectionWindow = function(args, collection) {
	var self = Ti.UI.createWindow(args);
	var eventName = 'odata_member_resources_loaded_' + collection;
	
	Ti.API.debug('Attaching event listener: ' + eventName);
	Ti.UI.addEventListener(eventName, function(data) {
		Ti.API.debug('Responding to event: ' + eventName);
		Ti.API.debug(data);
	});

	var odata = new ODataHelper('http://odata.netflix.com/v2/Catalog/' + collection);
	odata.getMemberResources(collection);
	return self;
};

exports.ODataCollectionWindow = ODataCollectionWindow;
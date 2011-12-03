var self, service = null;

var ODataHelper = function(s) {
	self = this;
	service = s;
	Ti.API.debug('[OData]: Using service ' + s);
	return self;
};

ODataHelper.prototype.getCollections = function() {
	Ti.API.debug('[OData]: Getting collections');
	
	self.createConnection({
		uri: service,
		error: function(e) {
			Ti.API.error('Something bad happened: ' + e);
		},
		fail: function(e) {
			Ti.API.error('Something TERRIBLE happened: ' + e);
		},
		success: function(result) {
			Ti.API.fireEvent('odata_collections_loaded', result);
		}
	});
};

ODataHelper.prototype.getMemberResources = function(collection) {
	Ti.API.debug('[OData]: Getting Member resources for collection: ' + collection);
	
	self.createConnection({
		uri: service,
		error: function(e) {
			Ti.API.error('Something bad happened: ' + e);
		},
		fail: function(e) {
			Ti.API.error('Something TERRIBLE happened: ' + e);
		},
		success: function(result) {
			Ti.API.debug('Firing event: ' + 'odata_member_resources_loaded_' + collection);
			Ti.API.fireEvent('odata_member_resources_loaded_' + collection, result);
		}
	});
};

ODataHelper.prototype.createConnection = function(data) {
	Ti.API.debug('[OData]: Creating connection');
	var conn = Ti.Network.createHTTPClient();
	conn.open('GET', data.uri);
	conn.setRequestHeader('accept', 'application/json');
	conn.onload = function() {
		data.success(JSON.parse(conn.responseText).d);
	};
	conn.onerror = data.error;
	Ti.API.debug('[OData]: Attempting connection');
	try {
		conn.send({});
		Ti.API.debug('[OData]: Connection success!');
	} catch (e) {
		Ti.API.debug('[OData]: Failed connection');
		data.fail(e);
	}
}

exports.ODataHelper = ODataHelper;
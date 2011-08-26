module.loadJSON = function(moduleName, name, url) {
	var defer = $.Deferred();

	$.getJSON(url + '?callback=?', function (data) {
		if (WM[moduleName] == undefined) {
			throw "not existing module";
		}

		WM[moduleName][name] = data

		defer.resolve();
	});

	return defer;
};

// Set data structure
module.Set = function () {
	var keywords = [];

	function isKeyword(item) {
		for (var i in keywords)
			if (keywords[i] === item)
				return true;
		return false;
	}

	this.add = function (item) {
		if (isKeyword(item)) {
			throw "the name {0} is not allowed".format(item);
		}
		this[item] = true;
	};

	this.toArray = function () {
		var arr = [];
		for (var item in this) {
			if (this.hasOwnProperty(item) && !isKeyword(item)) {
				arr.push(item);
			}
		}
	};

	for (var i in this) {
		if (this.hasOwnProperty(i) && typeof i == 'function') {
			keywords.push(i);
		}
	}
};
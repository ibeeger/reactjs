function createArray(num) {
	num = parseInt(num);

	var _ = new Array();
	for (var i = 1; i <= num; i++) {
		_.push(i);
	};

	_.sort(function() {
		return 0.5 - Math.random()
	});

	return _;
};


exports.create = createArray;
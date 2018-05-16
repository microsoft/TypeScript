var browserify = require('../');
var test = require('tap').test;
var vm = require('vm');

test('exclude array', function(t) {
	t.plan(2);

	var b = browserify();
	b.add(__dirname + '/exclude/array.js');
	b.exclude([
		__dirname + '/exclude/skip.js',
		__dirname + '/exclude/skip2.js'
	]);

	b.bundle(function (err, src) {
		if (err) {
			t.fail(err);
		}
		vm.runInNewContext(src, { t: t });
	});
});

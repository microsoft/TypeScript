var browserify = require('../');
var test = require('tap').test;
var vm = require('vm');
var path = require('path');

test('ignore', function (t) {
    t.plan(1);

    var b = browserify();
    b.add(__dirname + '/ignore/main.js');
    b.ignore(path.join(__dirname, 'ignore/skip.js'));

    b.bundle(function (err, src) {
        if (err) t.fail(err);
        vm.runInNewContext(src, { t: t });
    });
});

test('ignore array', function(t) {
	t.plan(2);

	var b = browserify();
	b.add(__dirname + '/ignore/array.js');
	b.ignore([
		path.join(__dirname, 'ignore/skip.js'),
		path.join(__dirname, 'ignore/skip2.js')
	]);

	b.bundle(function (err, src) {
		if (err) {
			t.fail(err);
		}
		vm.runInNewContext(src, { t: t });
	});
});

test('ignore by package or id', function (t) {
    t.plan(3);

    var b = browserify();
    b.add(__dirname + '/ignore/by-id.js');
    b.ignore('events');
    b.ignore('beep');
    b.ignore('bad id');

    b.bundle(function (err, src) {
        if (err) t.fail(err);
        vm.runInNewContext(src, { t: t });
    });
});

test('ignore files referenced by relative path', function (t) {
	// Change the current working directory relative to this file
	var cwd = process.cwd();
	process.chdir(__dirname);

	t.plan(1);

	var b = browserify();
	b.add(__dirname + '/ignore/by-relative.js');
	b.ignore('./ignore/ignored/skip.js');

	b.bundle(function (err, src) {
		if (err) t.fail(err);
		vm.runInNewContext(src, { t: t });
	});

	// Revert CWD
	process.chdir(cwd);
});

test('do not ignore files with relative paths that do not resolve', function (t) {
	// Change the current working directory to the ignore folder
	var cwd = process.cwd();
	process.chdir(__dirname + '/ignore');

	t.plan(2);

	var b = browserify();
	b.add(__dirname + '/ignore/double-skip.js');

	b.ignore('./skip.js');

	b.bundle(function (err, src) {
		if (err) t.fail(err);
		vm.runInNewContext(src, { t: t });
	});

	// Revert CWD
	process.chdir(cwd);
});

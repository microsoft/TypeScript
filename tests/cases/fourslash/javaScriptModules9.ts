///<reference path="fourslash.ts" />

// You can import multiple modules using the dependency array syntax,
// including when those modules mix and match things.

// This works even if you name your arguments 'reserved' names

// @allowNonTsExtensions: true
// @Filename: Foo.js
//// define('mod1', function() {
//// 	return { x: 10, y: 10 };
//// });
//// define('mod2', ['mod1', 'module'], function(m1, mod) {
//// 	mod.exports = { z: m1.x + m1.y }
//// });
//// define('mod3', ['exports'], function(ex) {
//// 	ex.foo = 'bar';
//// });
//// define(['mod1', 'mod2', 'mod3'], function (m1, m2, m3) {
//// 	m1/*a1*/;
//// 	m2/*a2*/;
//// 	m3/*a3*/;
//// });
//// define(['mod1', 'mod2', 'mod3'], function (require, exports, module) {
//// 	require/*b1*/;
//// 	exports/*b2*/;
//// 	module/*b3*/;
//// });

for(var pfx of ['a', 'b']) {
	goTo.marker(pfx + '1');
	edit.insert('.');
	verify.completionListContains("x", undefined, undefined, 'property');
	verify.completionListContains("y", undefined, undefined, 'property');
	edit.backspace();

	goTo.marker(pfx + '2');
	edit.insert('.');
	verify.completionListContains("z", undefined, undefined, 'property');
	edit.insert('z.');
	verify.completionListContains("toFixed", undefined, undefined, 'method');
	edit.backspace(3);

	goTo.marker(pfx + '3');
	edit.insert('.');
	verify.completionListContains("foo", undefined, undefined, 'property');
	edit.insert('foo.');
	verify.completionListContains("charCodeAt", undefined, undefined, 'method');
}


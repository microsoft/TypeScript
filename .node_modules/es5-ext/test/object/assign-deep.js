"use strict";

module.exports = function (t, a) {
	var o1 = { a: 1, b: 2 }, o2 = { b: 3, c: 4 };

	a(t(o1, o2), o1, "Returns self");
	a.deep(o1, { a: 1, b: 3, c: 4 }, "Single: content");

	a.deep(t({}, o1, o2), { a: 1, b: 3, c: 4 }, "Multi argument");

	var obj1 = { foo: { bar: 3, marko: true } }
	  , obj2 = { foo: { elo: 12, marko: false }, miszka: [23] };
	a.deep(t({}, obj1, obj2), { foo: { bar: 3, marko: false, elo: 12 }, miszka: [23] });
	a(t(true), true);
};

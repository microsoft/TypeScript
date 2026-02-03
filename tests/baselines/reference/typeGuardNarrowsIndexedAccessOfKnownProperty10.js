//// [tests/cases/compiler/typeGuardNarrowsIndexedAccessOfKnownProperty10.ts] ////

//// [typeGuardNarrowsIndexedAccessOfKnownProperty10.ts]
interface Foo { bar: any; }
const bar: { [id: string]: number } = {};

(foo: Foo) => {
	bar[id]++;
	const id = foo.bar;
}


//// [typeGuardNarrowsIndexedAccessOfKnownProperty10.js]
"use strict";
var bar = {};
(function (foo) {
    bar[id]++;
    var id = foo.bar;
});

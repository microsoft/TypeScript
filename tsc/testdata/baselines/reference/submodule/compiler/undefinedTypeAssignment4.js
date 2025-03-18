//// [tests/cases/compiler/undefinedTypeAssignment4.ts] ////

//// [undefinedTypeAssignment4.ts]
class undefined {
	foo: string;
}
interface undefined {
	member: number;
}
namespace undefined {
	export var x = 42;
}
var x: undefined;
var y: typeof undefined;


//// [undefinedTypeAssignment4.js]
class undefined {
    foo;
}
(function (undefined) {
    undefined.x = 42;
})(undefined || (undefined = {}));
var x;
var y;

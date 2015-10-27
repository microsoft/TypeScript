//// [tests/cases/compiler/undefinedTypeAssignment.ts] ////

//// [a.ts]
type undefined = string;
var undefined = void 0;
var undefined = null;
function p(undefined = 42) {
	return undefined;
}
//// [b.ts]
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
var x: typeof undefined;


//// [a.js]
var undefined = void 0;
var undefined = null;
function p(undefined) {
    if (undefined === void 0) { undefined = 42; }
    return undefined;
}
//// [b.js]
var undefined = (function () {
    function undefined() {
    }
    return undefined;
})();
var undefined;
(function (undefined) {
    undefined.x = 42;
})(undefined || (undefined = {}));
var x;
var x;

// @filename: a.ts
type undefined = string;
var undefined = void 0;
var undefined = null;
function p(undefined = 42) {
	return undefined;
}
// @filename: b.ts
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

//// [nonPrimitiveRhsSideOfInExpression.ts]
let o: object = {};

function f(): object {
	return {};
}

const b1 = "foo" in o;
const b2 = "bar" in f();

//// [nonPrimitiveRhsSideOfInExpression.js]
var o = {};
function f() {
    return {};
}
var b1 = "foo" in o;
var b2 = "bar" in f();

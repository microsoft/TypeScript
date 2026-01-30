//// [tests/cases/conformance/types/nonPrimitive/nonPrimitiveRhsSideOfInExpression.ts] ////

//// [nonPrimitiveRhsSideOfInExpression.ts]
let o: object = {};

function f(): object {
	return {};
}

const b1 = "foo" in o;
const b2 = "bar" in f();

//// [nonPrimitiveRhsSideOfInExpression.js]
let o = {};
function f() {
    return {};
}
const b1 = "foo" in o;
const b2 = "bar" in f();

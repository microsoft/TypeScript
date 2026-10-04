//// [tests/cases/conformance/es6/destructuring/destructuringObjectBindingPatternAndAssignment6.ts] ////

//// [destructuringObjectBindingPatternAndAssignment6.ts]
const a = "a";
const b = "b";

const { [a]: aVal, [b]: bVal } = (() => {
	return { [a]: 1, [b]: 1 };
})();
console.log(aVal, bVal);


//// [destructuringObjectBindingPatternAndAssignment6.js]
"use strict";
const a = "a";
const b = "b";
const { [a]: aVal, [b]: bVal } = (() => {
    return { [a]: 1, [b]: 1 };
})();
console.log(aVal, bVal);

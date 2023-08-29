//// [tests/cases/conformance/es6/destructuring/destructuringObjectBindingPatternAndAssignment8.ts] ////

//// [destructuringObjectBindingPatternAndAssignment8.ts]
const K = {
    a: "a",
    b: "b"
}
const { [K.a]: aVal, [K.b]: bVal } = (() => {
	return { [K.a]: 1, [K.b]: 1 };
})();
console.log(aVal, bVal);


//// [destructuringObjectBindingPatternAndAssignment8.js]
const K = {
    a: "a",
    b: "b"
};
const { [K.a]: aVal, [K.b]: bVal } = (() => {
    return { [K.a]: 1, [K.b]: 1 };
})();
console.log(aVal, bVal);

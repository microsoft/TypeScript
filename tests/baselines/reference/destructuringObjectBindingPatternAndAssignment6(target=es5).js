//// [destructuringObjectBindingPatternAndAssignment6.ts]
const a = "a";
const b = "b";

const { [a]: aVal, [b]: bVal } = (() => {
	return { [a]: 1, [b]: 1 };
})();
console.log(aVal, bVal);


//// [destructuringObjectBindingPatternAndAssignment6.js]
var a = "a";
var b = "b";
var _a = (function () {
    var _a;
    return _a = {}, _a[a] = 1, _a[b] = 1, _a;
})(), _b = a, aVal = _a[_b], _c = b, bVal = _a[_c];
console.log(aVal, bVal);

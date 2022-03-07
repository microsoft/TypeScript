//// [destructuringObjectBindingPatternAndAssignment7.ts]
enum K {
    a = "a",
    b = "b"
}
const { [K.a]: aVal, [K.b]: bVal } = (() => {
	return { [K.a]: 1, [K.b]: 1 };
})();
console.log(aVal, bVal);


//// [destructuringObjectBindingPatternAndAssignment7.js]
var K;
(function (K) {
    K["a"] = "a";
    K["b"] = "b";
})(K || (K = {}));
const { ["a" /* K.a */]: aVal, ["b" /* K.b */]: bVal } = (() => {
    return { ["a" /* K.a */]: 1, ["b" /* K.b */]: 1 };
})();
console.log(aVal, bVal);

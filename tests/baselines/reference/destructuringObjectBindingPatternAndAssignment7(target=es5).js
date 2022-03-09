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
var _a = (function () {
    var _a;
    return _a = {}, _a[K.a] = 1, _a[K.b] = 1, _a;
})(), _b = K.a, aVal = _a[_b], _c = K.b, bVal = _a[_c];
console.log(aVal, bVal);

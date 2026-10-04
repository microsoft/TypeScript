// @target: es5,esnext

const K = {
    a: "a",
    b: "b"
}
const { [K.a]: aVal, [K.b]: bVal } = (() => {
	return { [K.a]: 1, [K.b]: 1 };
})();
console.log(aVal, bVal);

// @target: es5,esnext

const a = "a";
const b = "b";

const { [a]: aVal, [b]: bVal } = (() => {
	return { [a]: 1, [b]: 1 };
})();
console.log(aVal, bVal);

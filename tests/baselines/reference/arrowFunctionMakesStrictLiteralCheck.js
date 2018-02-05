//// [arrowFunctionMakesStrictLiteralCheck.ts]
interface X { x: number; }

type XGetter = () => X;

const getX2: XGetter = () => {
	return { x: 1, y: 2 }; // Expect excess property error on `y`
}

//// [arrowFunctionMakesStrictLiteralCheck.js]
var getX2 = function () {
    return { x: 1, y: 2 }; // Expect excess property error on `y`
};

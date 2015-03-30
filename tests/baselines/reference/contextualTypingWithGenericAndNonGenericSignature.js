//// [contextualTypingWithGenericAndNonGenericSignature.ts]
//•	If e is a FunctionExpression or ArrowFunctionExpression with no type parameters and no parameter or return type annotations, and T is a function type with EXACTLY ONE non - generic call signature, then any inferences made for type parameters referenced by the parameters of T’s call signature are fixed(section 4.12.2) and e is processed with the contextual type T, as described in section 4.9.3.

var f2: {
    (x: string, y: number): string;
    <T, U>(x: T, y: U): T
};

f2 = (x, y) => { return x }

var f3: {
    <T, U>(x: T, y: U): T
    (x: string, y: number): string;
};

f3 = (x, y) => { return x }


//// [contextualTypingWithGenericAndNonGenericSignature.js]
//•	If e is a FunctionExpression or ArrowFunctionExpression with no type parameters and no parameter or return type annotations, and T is a function type with EXACTLY ONE non - generic call signature, then any inferences made for type parameters referenced by the parameters of T’s call signature are fixed(section 4.12.2) and e is processed with the contextual type T, as described in section 4.9.3.
var f2;
f2 = function (x, y) { return x; };
var f3;
f3 = function (x, y) { return x; };

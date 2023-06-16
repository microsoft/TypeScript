//// [tests/cases/conformance/es6/destructuring/destructuringVariableDeclaration1ES6.ts] ////

//// [destructuringVariableDeclaration1ES6.ts]
// The type T associated with a destructuring variable declaration is determined as follows:
//      If the declaration includes a type annotation, T is that type.
var {a1, a2}: { a1: number, a2: string } = { a1: 10, a2: "world" }
var [a3, [[a4]], a5]: [number, [[string]], boolean] = [1, [["hello"]], true];

// The type T associated with a destructuring variable declaration is determined as follows:
//      Otherwise, if the declaration includes an initializer expression, T is the type of that initializer expression.
var { b1: { b11 } = { b11: "string" }  } = { b1: { b11: "world" } };
var temp = { t1: true, t2: "false" };
var [b2 = 3, b3 = true, b4 = temp] = [3, false, { t1: false, t2: "hello" }];
var [b5 = 3, b6 = true, b7 = temp] = [undefined, undefined, undefined];

// The type T associated with a binding element is determined as follows:
//      If the binding element is a rest element, T is an array type with
//          an element type E, where E is the type of the numeric index signature of S.
var [...c1] = [1,2,3]; 
var [...c2] = [1,2,3, "string"]; 

// The type T associated with a binding element is determined as follows:
//      Otherwise, if S is a tuple- like type (section 3.3.3):
//          	Let N be the zero-based index of the binding element in the array binding pattern.
// 	            If S has a property with the numerical name N, T is the type of that property.
var [d1,d2] = [1,"string"]	

// The type T associated with a binding element is determined as follows:
//      Otherwise, if S is a tuple- like type (section 3.3.3):
//              Otherwise, if S has a numeric index signature, T is the type of the numeric index signature.
var temp1 = [true, false, true]
var [d3, d4] = [1, "string", ...temp1];

//  Combining both forms of destructuring,
var {e: [e1, e2, e3 = { b1: 1000, b4: 200 }]} = { e: [1, 2, { b1: 4, b4: 0 }] }; 
var {f: [f1, f2, { f3: f4, f5 }, , ]} = { f: [1, 2, { f3: 4, f5: 0 }] };

// When a destructuring variable declaration, binding property, or binding element specifies
// an initializer expression, the type of the initializer expression is required to be assignable
// to the widened form of the type associated with the destructuring variable declaration, binding property, or binding element.
var {g: {g1 = [undefined, null]}}: { g: { g1: any[] } } = { g: { g1: [1, 2] } };
var {h: {h1 = [undefined, null]}}: { h: { h1: number[] } } = { h: { h1: [1, 2] } };



//// [destructuringVariableDeclaration1ES6.js]
// The type T associated with a destructuring variable declaration is determined as follows:
//      If the declaration includes a type annotation, T is that type.
var { a1, a2 } = { a1: 10, a2: "world" };
var [a3, [[a4]], a5] = [1, [["hello"]], true];
// The type T associated with a destructuring variable declaration is determined as follows:
//      Otherwise, if the declaration includes an initializer expression, T is the type of that initializer expression.
var { b1: { b11 } = { b11: "string" } } = { b1: { b11: "world" } };
var temp = { t1: true, t2: "false" };
var [b2 = 3, b3 = true, b4 = temp] = [3, false, { t1: false, t2: "hello" }];
var [b5 = 3, b6 = true, b7 = temp] = [undefined, undefined, undefined];
// The type T associated with a binding element is determined as follows:
//      If the binding element is a rest element, T is an array type with
//          an element type E, where E is the type of the numeric index signature of S.
var [...c1] = [1, 2, 3];
var [...c2] = [1, 2, 3, "string"];
// The type T associated with a binding element is determined as follows:
//      Otherwise, if S is a tuple- like type (section 3.3.3):
//          	Let N be the zero-based index of the binding element in the array binding pattern.
// 	            If S has a property with the numerical name N, T is the type of that property.
var [d1, d2] = [1, "string"];
// The type T associated with a binding element is determined as follows:
//      Otherwise, if S is a tuple- like type (section 3.3.3):
//              Otherwise, if S has a numeric index signature, T is the type of the numeric index signature.
var temp1 = [true, false, true];
var [d3, d4] = [1, "string", ...temp1];
//  Combining both forms of destructuring,
var { e: [e1, e2, e3 = { b1: 1000, b4: 200 }] } = { e: [1, 2, { b1: 4, b4: 0 }] };
var { f: [f1, f2, { f3: f4, f5 }, ,] } = { f: [1, 2, { f3: 4, f5: 0 }] };
// When a destructuring variable declaration, binding property, or binding element specifies
// an initializer expression, the type of the initializer expression is required to be assignable
// to the widened form of the type associated with the destructuring variable declaration, binding property, or binding element.
var { g: { g1 = [undefined, null] } } = { g: { g1: [1, 2] } };
var { h: { h1 = [undefined, null] } } = { h: { h1: [1, 2] } };

// The type T associated with a destructuring variable declaration is determined as follows:
//      If the declaration includes a type annotation, T is that type.
var {a1, a2}: { a1: number, a2: string } = { a1: true, a2: 1 }               // Error
var [a3, [[a4]], a5]: [number, [[string]], boolean] = [1, [[false]], true];  // Error

// The type T associated with a destructuring variable declaration is determined as follows:
//      Otherwise, if the declaration includes an initializer expression, T is the type of that initializer expression.
var temp = { t1: true, t2: "false" };
var [b0 = 3, b1 = true, b2 = temp] = [3, false, { t1: false, t2: 5}];  // Error

// The type T associated with a binding element is determined as follows:
//      If the binding element is a rest element, T is an array type with
//          an element type E, where E is the type of the numeric index signature of S.
var [c1, c2, { c3: c4, c5 }, , ...c6] = [1, 2, { c3: 4, c5: 0 }];  // Error

// When a destructuring variable declaration, binding property, or binding element specifies
// an initializer expression, the type of the initializer expression is required to be assignable
// to the widened form of the type associated with the destructuring variable declaration, binding property, or binding element.
var {d: {d1 = ["string", null]}}: { d: { d1: number[] } } = { d: { d1: [1, 2] } };  // Error
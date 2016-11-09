//// [destructuringVariableDeclaration2.ts]
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

//// [destructuringVariableDeclaration2.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
// The type T associated with a destructuring variable declaration is determined as follows:
//      If the declaration includes a type annotation, T is that type.
var _a = { a1: true, a2: 1 }, a1 = _a.a1, a2 = _a.a2; // Error
var _b = [1, [[false]], true], a3 = _b[0], _c = __read(_b[1], 1), _d = __read(_c[0], 1), a4 = _d[0], a5 = _b[2]; // Error
// The type T associated with a destructuring variable declaration is determined as follows:
//      Otherwise, if the declaration includes an initializer expression, T is the type of that initializer expression.
var temp = { t1: true, t2: "false" };
var _e = [3, false, { t1: false, t2: 5 }], _f = _e[0], b0 = _f === void 0 ? 3 : _f, _g = _e[1], b1 = _g === void 0 ? true : _g, _h = _e[2], b2 = _h === void 0 ? temp : _h; // Error
// The type T associated with a binding element is determined as follows:
//      If the binding element is a rest element, T is an array type with
//          an element type E, where E is the type of the numeric index signature of S.
var _j = [1, 2, { c3: 4, c5: 0 }], c1 = _j[0], c2 = _j[1], _k = _j[2], c4 = _k.c3, c5 = _k.c5, c6 = _j.slice(4); // Error
// When a destructuring variable declaration, binding property, or binding element specifies
// an initializer expression, the type of the initializer expression is required to be assignable
// to the widened form of the type associated with the destructuring variable declaration, binding property, or binding element.
var _l = { d: { d1: [1, 2] } }.d.d1, d1 = _l === void 0 ? ["string", null] : _l; // Error

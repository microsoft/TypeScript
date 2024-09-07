//// [tests/cases/conformance/es6/destructuring/destructuringVariableDeclaration1ES5.ts] ////

//// [destructuringVariableDeclaration1ES5.ts]
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



//// [destructuringVariableDeclaration1ES5.js]
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
// The type T associated with a destructuring variable declaration is determined as follows:
//      If the declaration includes a type annotation, T is that type.
var _b = { a1: 10, a2: "world" }, a1 = _b.a1, a2 = _b.a2;
var _c = [1, [["hello"]], true], a3 = _c[0], a4 = _c[1][0][0], a5 = _c[2];
// The type T associated with a destructuring variable declaration is determined as follows:
//      Otherwise, if the declaration includes an initializer expression, T is the type of that initializer expression.
var _d = { b1: { b11: "world" } }.b1, _e = _d === void 0 ? { b11: "string" } : _d, b11 = _e.b11;
var temp = { t1: true, t2: "false" };
var _f = [3, false, { t1: false, t2: "hello" }], _g = _f[0], b2 = _g === void 0 ? 3 : _g, _h = _f[1], b3 = _h === void 0 ? true : _h, _j = _f[2], b4 = _j === void 0 ? temp : _j;
var _k = [undefined, undefined, undefined], _l = _k[0], b5 = _l === void 0 ? 3 : _l, _m = _k[1], b6 = _m === void 0 ? true : _m, _o = _k[2], b7 = _o === void 0 ? temp : _o;
// The type T associated with a binding element is determined as follows:
//      If the binding element is a rest element, T is an array type with
//          an element type E, where E is the type of the numeric index signature of S.
var c1 = [1, 2, 3].slice(0);
var c2 = [1, 2, 3, "string"].slice(0);
// The type T associated with a binding element is determined as follows:
//      Otherwise, if S is a tuple- like type (section 3.3.3):
//          	Let N be the zero-based index of the binding element in the array binding pattern.
// 	            If S has a property with the numerical name N, T is the type of that property.
var _p = [1, "string"], d1 = _p[0], d2 = _p[1];
// The type T associated with a binding element is determined as follows:
//      Otherwise, if S is a tuple- like type (section 3.3.3):
//              Otherwise, if S has a numeric index signature, T is the type of the numeric index signature.
var temp1 = [true, false, true];
var _q = __spreadArray([1, "string"], temp1, true), d3 = _q[0], d4 = _q[1];
//  Combining both forms of destructuring,
var _r = { e: [1, 2, { b1: 4, b4: 0 }] }.e, e1 = _r[0], e2 = _r[1], _s = _r[2], e3 = _s === void 0 ? { b1: 1000, b4: 200 } : _s;
var _t = { f: [1, 2, { f3: 4, f5: 0 }] }.f, f1 = _t[0], f2 = _t[1], _u = _t[2], f4 = _u.f3, f5 = (_a = _u.f5, _t[3], _a);
// When a destructuring variable declaration, binding property, or binding element specifies
// an initializer expression, the type of the initializer expression is required to be assignable
// to the widened form of the type associated with the destructuring variable declaration, binding property, or binding element.
var _v = { g: { g1: [1, 2] } }.g.g1, g1 = _v === void 0 ? [undefined, null] : _v;
var _w = { h: { h1: [1, 2] } }.h.h1, h1 = _w === void 0 ? [undefined, null] : _w;

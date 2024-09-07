//// [tests/cases/conformance/es6/destructuring/destructuringVariableDeclaration1ES5iterable.ts] ////

//// [destructuringVariableDeclaration1ES5iterable.ts]
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



//// [destructuringVariableDeclaration1ES5iterable.js]
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
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
var _c = __read([1, [["hello"]], true], 3), a3 = _c[0], _d = __read(_c[1], 1), _e = __read(_d[0], 1), a4 = _e[0], a5 = _c[2];
// The type T associated with a destructuring variable declaration is determined as follows:
//      Otherwise, if the declaration includes an initializer expression, T is the type of that initializer expression.
var _f = { b1: { b11: "world" } }.b1, _g = _f === void 0 ? { b11: "string" } : _f, b11 = _g.b11;
var temp = { t1: true, t2: "false" };
var _h = __read([3, false, { t1: false, t2: "hello" }], 3), _j = _h[0], b2 = _j === void 0 ? 3 : _j, _k = _h[1], b3 = _k === void 0 ? true : _k, _l = _h[2], b4 = _l === void 0 ? temp : _l;
var _m = __read([undefined, undefined, undefined], 3), _o = _m[0], b5 = _o === void 0 ? 3 : _o, _p = _m[1], b6 = _p === void 0 ? true : _p, _q = _m[2], b7 = _q === void 0 ? temp : _q;
// The type T associated with a binding element is determined as follows:
//      If the binding element is a rest element, T is an array type with
//          an element type E, where E is the type of the numeric index signature of S.
var _r = __read([1, 2, 3]), c1 = _r.slice(0);
var _s = __read([1, 2, 3, "string"]), c2 = _s.slice(0);
// The type T associated with a binding element is determined as follows:
//      Otherwise, if S is a tuple- like type (section 3.3.3):
//          	Let N be the zero-based index of the binding element in the array binding pattern.
// 	            If S has a property with the numerical name N, T is the type of that property.
var _t = __read([1, "string"], 2), d1 = _t[0], d2 = _t[1];
// The type T associated with a binding element is determined as follows:
//      Otherwise, if S is a tuple- like type (section 3.3.3):
//              Otherwise, if S has a numeric index signature, T is the type of the numeric index signature.
var temp1 = [true, false, true];
var _u = __read(__spreadArray([1, "string"], __read(temp1), false), 2), d3 = _u[0], d4 = _u[1];
//  Combining both forms of destructuring,
var _v = __read({ e: [1, 2, { b1: 4, b4: 0 }] }.e, 3), e1 = _v[0], e2 = _v[1], _w = _v[2], e3 = _w === void 0 ? { b1: 1000, b4: 200 } : _w;
var _x = __read({ f: [1, 2, { f3: 4, f5: 0 }] }.f, 4), f1 = _x[0], f2 = _x[1], _y = _x[2], f4 = _y.f3, f5 = (_a = _y.f5, _x[3], _a);
// When a destructuring variable declaration, binding property, or binding element specifies
// an initializer expression, the type of the initializer expression is required to be assignable
// to the widened form of the type associated with the destructuring variable declaration, binding property, or binding element.
var _z = { g: { g1: [1, 2] } }.g.g1, g1 = _z === void 0 ? [undefined, null] : _z;
var _0 = { h: { h1: [1, 2] } }.h.h1, h1 = _0 === void 0 ? [undefined, null] : _0;

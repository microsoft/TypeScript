//// [tests/cases/conformance/emitter/es2015/safeNavigation/emitter.safeNavigation.es2015.ts] ////

//// [declarations.d.ts]
declare var x: any;
declare var y: any;
declare var f: ({
    (): void;
    <T>(): void;
    new (): any;
    new <T>(): any;
}) | undefined;
declare var o: { y: typeof f; }
declare class Base { x(): any; }
declare namespace M {
    export class y {}
    export class z<T> {}
}
//// [propertyAccessOk.ts]
x.y
x?.y
x?.y.z
x.y?.z
x?.y?.z
//// [elementAccessOk.ts]
x["y"]
x?.["y"]
x?.["y"]["z"]
x["y"]?.["z"]
x?.["y"]?.["z"]
//// [callExpressionOk.ts]
x()
x?.()
x.y?.()
x["y"]?.()
f?.<number>()
o.y?.<number>()
o["y"]?.<number>()
//// [newExpressionOk.ts]
new x()
new x.y?.()
new x["y"]?.()
new f?.<number>()
new o.y?.<number>()
new o["y"]?.<number>()
//// [mixedOk.ts]
x?.y?.["z"]
x?.["y"]?.z
x?.y()
x?.y?.()
o?.y<number>()
o?.y?.<number>()
x?.["z"]()
x?.["z"]?.()
o?.["y"]<number>()
o?.["y"]?.<number>()
//// [mutationOk.ts]
x?.y = 1
x?.y += 1;
x?.y -= 1;
x?.y *= 1;
x?.y /= 1;
x?.y %= 1;
x?.y **= 1;
x?.y |= 1;
x?.y &= 1;
x?.y ^= 1;
x?.y <<= 1;
x?.y >>= 1;
x?.y >>>= 1;
x?.y++;
x?.y--;
++x?.y;
--x?.y;
delete x?.y;
x?.["y"] = 1
x?.["y"] += 1;
x?.["y"] -= 1;
x?.["y"] *= 1;
x?.["y"] /= 1;
x?.["y"] %= 1;
x?.["y"] **= 1;
x?.["y"] |= 1;
x?.["y"] &= 1;
x?.["y"] ^= 1;
x?.["y"] <<= 1;
x?.["y"] >>= 1;
x?.["y"] >>>= 1;
x?.["y"]++;
x?.["y"]--;
++x?.["y"];
--x?.["y"];
delete x?.["y"];
//// [arrayAssignmentPatternOk.ts]
[x?.y] = [1];
[x?.["y"]] = [1];
[...x?.y] = [1];
[...x?.["y"]] = [1];
//// [objectAssignmentPatternOk.ts]
({ a: x?.y } = { a: 1 });
({ a: x?.["y"] } = { a: 1 });
//// [questionDotDigitIsConditionalOk.ts]
x?.3:1;
//// [superPropertyInvocationOk.ts]
// supported for invocation of super property
void class extends Base {
    m() {
        super.x?.();
        super["x"]?.();
    }
}

//// [generalParsingOk.ts]
// object literals
// - computed property names
void { [x?.y]: 1 }
void { [x?.["y"]]: 1 }
void { [x?.()]: 1 }
void { [new x?.()]: 1 }
// - property assignments
void { a: x?.y }
void { a: x?.["y"] }
void { a: x?.() }
void { a: new x?.() }

// classes
// - computed property names
// void class { [x?.y] = 1 }        // legal parse, but causes a checker error
// void class { [x?.["y"]] = 1 }    // legal parse, but causes a checker error
// void class { [x?.()] = 1 }       // legal parse, but causes a checker error
// void class { [new f?.()] = 1 }   // legal parse, but causes a checker error
void class { [Symbol?.toStringTag] = "" }
// - property declarations
void class { a = x?.y }
void class { a = x?.["y"] }
void class { a = x?.() }
void class { a = new x?.() }
// - heritage clauses
void class extends M?.y {}
void class extends M?.["y"] {}
void class extends M?.z<number> {}
// - class decorators
@x?.y class C1 {}
@x?.["y"] class C2 {}
@x?.() class C3 {}
@new x?.() class C4 {}
// - member decorators
class C5 { @x?.y m() {} }
class C6 { @x?.["y"] m() {} } // allowed as ?.[ is not ambiguous with computed property names
class C7 { @x?.() m() {} }
class C8 { @new x?.() m () {} }
// - parameter decorators
class C9 { m(@x?.y a) {} }
class C10 { m(@x?.["y"] a) {} }
class C11 { m(@x?.() a) {} }
class C12 { m(@new x?.() a) {} }

// functions
// - parameters
void function (a = x?.y) {}
void function (a = x?.["y"]) {}
void function (a = x?.()) {}
void function (a = new x?.()) {}
// - binding elements
//   - initializers
void function ({ a = x?.y }) {}
void function ({ a = x?.["y"] }) {}
void function ({ a = x?.() }) {}
void function ({ a = new x?.() }) {}
//   - computed properties
void function ({ [x?.y]: a }) {}
void function ({ [x?.["y"]]: a }) {}
void function ({ [x?.()]: a }) {}
void function ({ [new x?.()]: a }) {}

// arrow functions
// - parameters
((a = x?.y) => {});
((a = x?.["y"]) => {});
((a = x?.()) => {});
((a = new x?.()) => {});
// - expression bodies
(() => x?.y);
(() => x?.["y"]);
(() => x?.());
(() => new x?.());

// parenthesis
(x?.y);

// comma
x?.y, f();
f(), x?.y;

// conditional
x?.y ? 0 : 1
0 ? x?.y : 1;
0 ? 1 : x?.y;

// binary
x?.y + 1;
x?.y - 1;
x?.y * 1;
x?.y / 1;
x?.y ** 1;
x?.y % 1;
x?.y ^ 1;
x?.y & 1;
x?.y | 1;
x?.y << 1;
x?.y >> 1;
x?.y >>> 1;
x?.y && 1;
x?.y || 1;
x?.y == 1;
x?.y === 1;
x?.y != 1;
x?.y !== 1;
x?.y < 1;
x?.y <= 1;
x?.y > 1;
x?.y >= 1;
1 + x?.y;
1 - x?.y;
1 * x?.y;
1 / x?.y;
1 ** x?.y;
1 % x?.y;
1 ^ x?.y;
1 & x?.y;
1 | x?.y;
1 << x?.y;
1 >> x?.y;
1 >>> x?.y;
1 && x?.y;
1 || x?.y;
1 == x?.y;
1 === x?.y;
1 != x?.y;
1 !== x?.y;
1 < x?.y;
1 <= x?.y;
1 > x?.y;
1 >= x?.y;

// prefix unary
+x?.y;
-x?.y;
!x?.y;
~x?.y;

// unary
void x?.y;
typeof x?.y;
void function * () { yield x?.y; }
void async function() { await x?.y; }

// notnull
x?.y!.z;

// assertions
<string>x?.y;
x?.y as string;

// array literals
[x?.y];
[, x?.y];
[...x?.y];

// literals
1?.toString(); // no need for `..`
1.?.toString();
.0?.toString();
4e3?.toString();
1.e3?.toString();
""?.toString();
''?.toString();
``?.toString();
/./?.toString();
/./g?.toString();
true?.toString();
false?.toString();

// templates
`${x?.y}`;

// variables
var v = x?.y;
var [v] = x?.y;
var [v = x?.y] = [1];
var {v} = x?.y;
var {v = x?.y} = {v:1};
var {[x?.y]: v} = null;

// if/else if
if (x?.y) {}
if (1) {} else if (x?.y) {}

// switch
switch (x?.y) {}
switch (1) { case x?.y: break; }

// do/while
do {} while (x?.y)
while (x?.y) {}

// for
for (x?.y; x?.y; x?.y);

// for..in
for (x?.y in {});

// for..of
for (x?.y of []);

// enums
enum E {
    a = x?.y
}

//// [exportsOk.ts]
export default x?.y;

//// [propertyAccessOk.js]
x.y;
x == null ? void 0 : x.y;
(x == null ? void 0 : x.y).z;
(_a = x.y) == null ? void 0 : _a.z;
(_b = x == null ? void 0 : x.y) == null ? void 0 : _b.z;
var _a, _b;
//// [elementAccessOk.js]
x["y"];
x == null ? void 0 : x["y"];
(x == null ? void 0 : x["y"])["z"];
(_a = x["y"]) == null ? void 0 : _a["z"];
(_b = x == null ? void 0 : x["y"]) == null ? void 0 : _b["z"];
var _a, _b;
//// [callExpressionOk.js]
x();
x == null ? void 0 : x();
(_a = x.y) == null ? void 0 : _a.call(x);
(_b = x["y"]) == null ? void 0 : _b.call(x);
f == null ? void 0 : f();
(_c = o.y) == null ? void 0 : _c.call(o);
(_d = o["y"]) == null ? void 0 : _d.call(o);
var _a, _b, _c, _d;
//// [newExpressionOk.js]
new x();
(_a = x.y) == null ? void 0 : new _a();
(_b = x["y"]) == null ? void 0 : new _b();
f == null ? void 0 : new f();
(_c = o.y) == null ? void 0 : new _c();
(_d = o["y"]) == null ? void 0 : new _d();
var _a, _b, _c, _d;
//// [mixedOk.js]
(_a = x == null ? void 0 : x.y) == null ? void 0 : _a["z"];
(_b = x == null ? void 0 : x["y"]) == null ? void 0 : _b.z;
(x == null ? void 0 : x.y)();
(_c = x == null ? void 0 : x.y) == null ? void 0 : _c.call(x);
(o == null ? void 0 : o.y)();
(_d = o == null ? void 0 : o.y) == null ? void 0 : _d.call(o);
(x == null ? void 0 : x["z"])();
(_e = x == null ? void 0 : x["z"]) == null ? void 0 : _e.call(x);
(o == null ? void 0 : o["y"])();
(_f = o == null ? void 0 : o["y"]) == null ? void 0 : _f.call(o);
var _a, _b, _c, _d, _e, _f;
//// [mutationOk.js]
_a = 1, x == null ? _a : x.y = _a;
_b = 1, x == null ? _b : x.y += _b;
_c = 1, x == null ? _c : x.y -= _c;
_d = 1, x == null ? _d : x.y *= _d;
_e = 1, x == null ? _e : x.y /= _e;
_f = 1, x == null ? _f : x.y %= _f;
_g = 1, x == null ? _g : (_h = x).y = Math.pow(_h.y, _g);
_j = 1, x == null ? _j : x.y |= _j;
_k = 1, x == null ? _k : x.y &= _k;
_l = 1, x == null ? _l : x.y ^= _l;
_m = 1, x == null ? _m : x.y <<= _m;
_o = 1, x == null ? _o : x.y >>= _o;
_p = 1, x == null ? _p : x.y >>>= _p;
x == null ? void 0 : x.y++;
x == null ? void 0 : x.y--;
x == null ? void 0 : ++x.y;
x == null ? void 0 : --x.y;
x == null ? true : delete x.y;
_q = 1, x == null ? _q : x["y"] = _q;
_r = 1, x == null ? _r : x["y"] += _r;
_s = 1, x == null ? _s : x["y"] -= _s;
_t = 1, x == null ? _t : x["y"] *= _t;
_u = 1, x == null ? _u : x["y"] /= _u;
_v = 1, x == null ? _v : x["y"] %= _v;
_w = 1, x == null ? _w : (_x = x)[_y = "y"] = Math.pow(_x[_y], _w);
_z = 1, x == null ? _z : x["y"] |= _z;
_0 = 1, x == null ? _0 : x["y"] &= _0;
_1 = 1, x == null ? _1 : x["y"] ^= _1;
_2 = 1, x == null ? _2 : x["y"] <<= _2;
_3 = 1, x == null ? _3 : x["y"] >>= _3;
_4 = 1, x == null ? _4 : x["y"] >>>= _4;
x == null ? void 0 : x["y"]++;
x == null ? void 0 : x["y"]--;
x == null ? void 0 : ++x["y"];
x == null ? void 0 : --x["y"];
x == null ? true : delete x["y"];
var _a, _b, _c, _d, _e, _f, _g, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _z, _0, _1, _2, _3, _4;
var _h, _x, _y;
//// [arrayAssignmentPatternOk.js]
[{ set value(_a) { x == null ? _a : x.y = _a; } }.value] = [1];
[{ set value(_a) { x == null ? _a : x["y"] = _a; } }.value] = [1];
[...{ set value(_a) { x == null ? _a : x.y = _a; } }.value] = [1];
[...{ set value(_a) { x == null ? _a : x["y"] = _a; } }.value] = [1];
//// [objectAssignmentPatternOk.js]
({ a: { set value(_a) { x == null ? _a : x.y = _a; } }.value } = { a: 1 });
({ a: { set value(_a) { x == null ? _a : x["y"] = _a; } }.value } = { a: 1 });
//// [questionDotDigitIsConditionalOk.js]
x ? .3 : 1;
//// [superPropertyInvocationOk.js]
// supported for invocation of super property
void class extends Base {
    m() {
        (_a = super.x) == null ? void 0 : _a.call(this);
        (_b = super["x"]) == null ? void 0 : _b.call(this);
        var _a, _b;
    }
};
//// [generalParsingOk.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// object literals
// - computed property names
void { [x == null ? void 0 : x.y]: 1 };
void { [x == null ? void 0 : x["y"]]: 1 };
void { [x == null ? void 0 : x()]: 1 };
void { [x == null ? void 0 : new x()]: 1 };
// - property assignments
void { a: x == null ? void 0 : x.y };
void { a: x == null ? void 0 : x["y"] };
void { a: x == null ? void 0 : x() };
void { a: x == null ? void 0 : new x() };
// classes
// - computed property names
// void class { [x?.y] = 1 }        // legal parse, but causes a checker error
// void class { [x?.["y"]] = 1 }    // legal parse, but causes a checker error
// void class { [x?.()] = 1 }       // legal parse, but causes a checker error
// void class { [new f?.()] = 1 }   // legal parse, but causes a checker error
void class {
    constructor() {
        this[Symbol == null ? void 0 : Symbol.toStringTag] = "";
    }
};
// - property declarations
void class {
    constructor() {
        this.a = x == null ? void 0 : x.y;
    }
};
void class {
    constructor() {
        this.a = x == null ? void 0 : x["y"];
    }
};
void class {
    constructor() {
        this.a = x == null ? void 0 : x();
    }
};
void class {
    constructor() {
        this.a = x == null ? void 0 : new x();
    }
};
// - heritage clauses
void class extends (M == null ? void 0 : M.y) {
};
void class extends (M == null ? void 0 : M["y"]) {
};
void class extends (M == null ? void 0 : M.z) {
};
// - class decorators
let C1 = class C1 {
};
C1 = __decorate([
    x == null ? void 0 : x.y
], C1);
let C2 = class C2 {
};
C2 = __decorate([
    x == null ? void 0 : x["y"]
], C2);
let C3 = class C3 {
};
C3 = __decorate([
    x == null ? void 0 : x()
], C3);
let C4 = class C4 {
};
C4 = __decorate([
    x == null ? void 0 : new x()
], C4);
// - member decorators
class C5 {
    m() { }
}
__decorate([
    x == null ? void 0 : x.y
], C5.prototype, "m", null);
class C6 {
    m() { }
} // allowed as ?.[ is not ambiguous with computed property names
__decorate([
    x == null ? void 0 : x["y"]
], C6.prototype, "m", null);
class C7 {
    m() { }
}
__decorate([
    x == null ? void 0 : x()
], C7.prototype, "m", null);
class C8 {
    m() { }
}
__decorate([
    x == null ? void 0 : new x()
], C8.prototype, "m", null);
// - parameter decorators
class C9 {
    m(a) { }
}
__decorate([
    __param(0, x == null ? void 0 : x.y)
], C9.prototype, "m", null);
class C10 {
    m(a) { }
}
__decorate([
    __param(0, x == null ? void 0 : x["y"])
], C10.prototype, "m", null);
class C11 {
    m(a) { }
}
__decorate([
    __param(0, x == null ? void 0 : x())
], C11.prototype, "m", null);
class C12 {
    m(a) { }
}
__decorate([
    __param(0, x == null ? void 0 : new x())
], C12.prototype, "m", null);
// functions
// - parameters
void function (a = x == null ? void 0 : x.y) { };
void function (a = x == null ? void 0 : x["y"]) { };
void function (a = x == null ? void 0 : x()) { };
void function (a = x == null ? void 0 : new x()) { };
// - binding elements
//   - initializers
void function ({ a = x == null ? void 0 : x.y }) { };
void function ({ a = x == null ? void 0 : x["y"] }) { };
void function ({ a = x == null ? void 0 : x() }) { };
void function ({ a = x == null ? void 0 : new x() }) { };
//   - computed properties
void function ({ [x == null ? void 0 : x.y]: a }) { };
void function ({ [x == null ? void 0 : x["y"]]: a }) { };
void function ({ [x == null ? void 0 : x()]: a }) { };
void function ({ [x == null ? void 0 : new x()]: a }) { }((a = x == null ? void 0 : x.y) => { });
((a = x == null ? void 0 : x["y"]) => { });
((a = x == null ? void 0 : x()) => { });
((a = x == null ? void 0 : new x()) => { });
// - expression bodies
(() => x == null ? void 0 : x.y);
(() => x == null ? void 0 : x["y"]);
(() => x == null ? void 0 : x());
(() => x == null ? void 0 : new x());
// parenthesis
(x == null ? void 0 : x.y);
// comma
x == null ? void 0 : x.y, f();
f(), x == null ? void 0 : x.y;
// conditional
x == null ? void 0 : x.y ? 0 : 1;
0 ? x == null ? void 0 : x.y : 1;
0 ? 1 : x == null ? void 0 : x.y;
// binary
(x == null ? void 0 : x.y) + 1;
(x == null ? void 0 : x.y) - 1;
(x == null ? void 0 : x.y) * 1;
(x == null ? void 0 : x.y) / 1;
Math.pow((x == null ? void 0 : x.y), 1);
(x == null ? void 0 : x.y) % 1;
(x == null ? void 0 : x.y) ^ 1;
(x == null ? void 0 : x.y) & 1;
(x == null ? void 0 : x.y) | 1;
(x == null ? void 0 : x.y) << 1;
(x == null ? void 0 : x.y) >> 1;
(x == null ? void 0 : x.y) >>> 1;
(x == null ? void 0 : x.y) && 1;
(x == null ? void 0 : x.y) || 1;
(x == null ? void 0 : x.y) == 1;
(x == null ? void 0 : x.y) === 1;
(x == null ? void 0 : x.y) != 1;
(x == null ? void 0 : x.y) !== 1;
(x == null ? void 0 : x.y) < 1;
(x == null ? void 0 : x.y) <= 1;
(x == null ? void 0 : x.y) > 1;
(x == null ? void 0 : x.y) >= 1;
1 + (x == null ? void 0 : x.y);
1 - (x == null ? void 0 : x.y);
1 * (x == null ? void 0 : x.y);
1 / (x == null ? void 0 : x.y);
Math.pow(1, (x == null ? void 0 : x.y));
1 % (x == null ? void 0 : x.y);
1 ^ (x == null ? void 0 : x.y);
1 & (x == null ? void 0 : x.y);
1 | (x == null ? void 0 : x.y);
1 << (x == null ? void 0 : x.y);
1 >> (x == null ? void 0 : x.y);
1 >>> (x == null ? void 0 : x.y);
1 && (x == null ? void 0 : x.y);
1 || (x == null ? void 0 : x.y);
1 == (x == null ? void 0 : x.y);
1 === (x == null ? void 0 : x.y);
1 != (x == null ? void 0 : x.y);
1 !== (x == null ? void 0 : x.y);
1 < (x == null ? void 0 : x.y);
1 <= (x == null ? void 0 : x.y);
1 > (x == null ? void 0 : x.y);
1 >= (x == null ? void 0 : x.y);
// prefix unary
+(x == null ? void 0 : x.y);
-(x == null ? void 0 : x.y);
!(x == null ? void 0 : x.y);
~(x == null ? void 0 : x.y);
// unary
void (x == null ? void 0 : x.y);
typeof (x == null ? void 0 : x.y);
void function* () { yield x == null ? void 0 : x.y; };
void function () {
    return __awaiter(this, void 0, void 0, function* () { yield (x == null ? void 0 : x.y); });
};
// notnull
(x == null ? void 0 : x.y).z;
// assertions
x == null ? void 0 : x.y;
x == null ? void 0 : x.y;
// array literals
[x == null ? void 0 : x.y];
[, x == null ? void 0 : x.y];
[...x == null ? void 0 : x.y];
// literals
((_a = 1) == null ? void 0 : _a.toString)(); // no need for `..`
((_b = 1.) == null ? void 0 : _b.toString)();
((_c = .0) == null ? void 0 : _c.toString)();
((_d = 4e3) == null ? void 0 : _d.toString)();
((_e = 1.e3) == null ? void 0 : _e.toString)();
((_f = "") == null ? void 0 : _f.toString)();
((_g = '') == null ? void 0 : _g.toString)();
((_h = ``) == null ? void 0 : _h.toString)();
((_j = /./) == null ? void 0 : _j.toString)();
((_k = /./g) == null ? void 0 : _k.toString)();
((_l = true) == null ? void 0 : _l.toString)();
((_m = false) == null ? void 0 : _m.toString)();
// templates
`${x == null ? void 0 : x.y}`;
// variables
var v = x == null ? void 0 : x.y;
var [v] = x == null ? void 0 : x.y;
var [v = x == null ? void 0 : x.y] = [1];
var { v } = x == null ? void 0 : x.y;
var { v = x == null ? void 0 : x.y } = { v: 1 };
var { [x == null ? void 0 : x.y]: v } = null;
// if/else if
if (x == null ? void 0 : x.y) { }
if (1) { }
else if (x == null ? void 0 : x.y) { }
// switch
switch (x == null ? void 0 : x.y) {
}
switch (1) {
    case x == null ? void 0 : x.y: break;
}
// do/while
do { } while (x == null ? void 0 : x.y);
while (x == null ? void 0 : x.y) { }
// for
for (x == null ? void 0 : x.y; x == null ? void 0 : x.y; x == null ? void 0 : x.y)
    ;
// for..in
for ({ set value(_a) { x == null ? _a : x.y = _a; } }.value in {})
    ;
// for..of
for ({ set value(_a) { x == null ? _a : x.y = _a; } }.value of [])
    ;
// enums
var E;
(function (E) {
    E[E["a"] = x == null ? void 0 : x.y] = "a";
})(E || (E = {}));
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
//// [exportsOk.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = x == null ? void 0 : x.y;

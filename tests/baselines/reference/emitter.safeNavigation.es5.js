//// [tests/cases/conformance/emitter/es5/safeNavigation/emitter.safeNavigation.es5.ts] ////

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
x == null ? void 0 : x.y();
(_c = x == null ? void 0 : x.y) == null ? void 0 : _c.call(x);
o == null ? void 0 : o.y();
(_d = o == null ? void 0 : o.y) == null ? void 0 : _d.call(o);
x == null ? void 0 : x["z"]();
(_e = x == null ? void 0 : x["z"]) == null ? void 0 : _e.call(x);
o == null ? void 0 : o["y"]();
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
_a = [1], (x == null ? void 0 : x.y = _a[0], _a);
_b = [1], (x == null ? void 0 : x["y"] = _b[0], _b);
_c = [1], (x == null ? void 0 : x.y = _c.slice(0), _c);
_d = [1], (x == null ? void 0 : x["y"] = _d.slice(0), _d);
var _a, _b, _c, _d;
//// [objectAssignmentPatternOk.js]
(_a = { a: 1 }, (x == null ? void 0 : x.y = _a.a, _a));
(_b = { a: 1 }, (x == null ? void 0 : x["y"] = _b.a, _b));
var _a, _b;
//// [questionDotDigitIsConditionalOk.js]
x ? .3 : 1;
//// [superPropertyInvocationOk.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// supported for invocation of super property
void (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    class_1.prototype.m = function () {
        (_a = _super.prototype.x) == null ? void 0 : _a.call(this);
        var _a;
    };
    return class_1;
}(Base));
//// [generalParsingOk.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// object literals
// - computed property names
void (_a = {}, _a[x == null ? void 0 : x.y] = 1, _a);
void (_b = {}, _b[x == null ? void 0 : x["y"]] = 1, _b);
void (_c = {}, _c[x == null ? void 0 : x()] = 1, _c);
void (_d = {}, _d[x == null ? void 0 : new x()] = 1, _d);
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
void (function () {
    function class_1() {
        this[Symbol == null ? void 0 : Symbol.toStringTag] = "";
    }
    return class_1;
}());
// - property declarations
void (function () {
    function class_2() {
        this.a = x == null ? void 0 : x.y;
    }
    return class_2;
}());
void (function () {
    function class_3() {
        this.a = x == null ? void 0 : x["y"];
    }
    return class_3;
}());
void (function () {
    function class_4() {
        this.a = x == null ? void 0 : x();
    }
    return class_4;
}());
void (function () {
    function class_5() {
        this.a = x == null ? void 0 : new x();
    }
    return class_5;
}());
// - heritage clauses
void (function (_super) {
    __extends(class_6, _super);
    function class_6() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return class_6;
}((M == null ? void 0 : M.y)));
void (function (_super) {
    __extends(class_7, _super);
    function class_7() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return class_7;
}((M == null ? void 0 : M["y"])));
void (function (_super) {
    __extends(class_8, _super);
    function class_8() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return class_8;
}((M == null ? void 0 : M.z)));
// - class decorators
var C1 = (function () {
    function C1() {
    }
    return C1;
}());
C1 = __decorate([
    x == null ? void 0 : x.y
], C1);
var C2 = (function () {
    function C2() {
    }
    return C2;
}());
C2 = __decorate([
    x == null ? void 0 : x["y"]
], C2);
var C3 = (function () {
    function C3() {
    }
    return C3;
}());
C3 = __decorate([
    x == null ? void 0 : x()
], C3);
var C4 = (function () {
    function C4() {
    }
    return C4;
}());
C4 = __decorate([
    x == null ? void 0 : new x()
], C4);
// - member decorators
var C5 = (function () {
    function C5() {
    }
    C5.prototype.m = function () { };
    return C5;
}());
__decorate([
    x == null ? void 0 : x.y
], C5.prototype, "m", null);
var C6 = (function () {
    function C6() {
    }
    C6.prototype.m = function () { };
    return C6;
}()); // allowed as ?.[ is not ambiguous with computed property names
__decorate([
    x == null ? void 0 : x["y"]
], C6.prototype, "m", null);
var C7 = (function () {
    function C7() {
    }
    C7.prototype.m = function () { };
    return C7;
}());
__decorate([
    x == null ? void 0 : x()
], C7.prototype, "m", null);
var C8 = (function () {
    function C8() {
    }
    C8.prototype.m = function () { };
    return C8;
}());
__decorate([
    x == null ? void 0 : new x()
], C8.prototype, "m", null);
// - parameter decorators
var C9 = (function () {
    function C9() {
    }
    C9.prototype.m = function (a) { };
    return C9;
}());
__decorate([
    __param(0, x == null ? void 0 : x.y)
], C9.prototype, "m", null);
var C10 = (function () {
    function C10() {
    }
    C10.prototype.m = function (a) { };
    return C10;
}());
__decorate([
    __param(0, x == null ? void 0 : x["y"])
], C10.prototype, "m", null);
var C11 = (function () {
    function C11() {
    }
    C11.prototype.m = function (a) { };
    return C11;
}());
__decorate([
    __param(0, x == null ? void 0 : x())
], C11.prototype, "m", null);
var C12 = (function () {
    function C12() {
    }
    C12.prototype.m = function (a) { };
    return C12;
}());
__decorate([
    __param(0, x == null ? void 0 : new x())
], C12.prototype, "m", null);
// functions
// - parameters
void function (a) {
    if (a === void 0) { a = x == null ? void 0 : x.y; }
};
void function (a) {
    if (a === void 0) { a = x == null ? void 0 : x["y"]; }
};
void function (a) {
    if (a === void 0) { a = x == null ? void 0 : x(); }
};
void function (a) {
    if (a === void 0) { a = x == null ? void 0 : new x(); }
};
// - binding elements
//   - initializers
void function (_a) {
    var _b = _a.a, a = _b === void 0 ? x == null ? void 0 : x.y : _b;
};
void function (_a) {
    var _b = _a.a, a = _b === void 0 ? x == null ? void 0 : x["y"] : _b;
};
void function (_a) {
    var _b = _a.a, a = _b === void 0 ? x == null ? void 0 : x() : _b;
};
void function (_a) {
    var _b = _a.a, a = _b === void 0 ? x == null ? void 0 : new x() : _b;
};
//   - computed properties
void function (_a) {
    var _b = x == null ? void 0 : x.y, a = _a[_b];
};
void function (_a) {
    var _b = x == null ? void 0 : x["y"], a = _a[_b];
};
void function (_a) {
    var _b = x == null ? void 0 : x(), a = _a[_b];
};
void function (_a) {
    var _b = x == null ? void 0 : new x(), a = _a[_b];
}(function (a) {
    if (a === void 0) { a = x == null ? void 0 : x.y; }
});
(function (a) {
    if (a === void 0) { a = x == null ? void 0 : x["y"]; }
});
(function (a) {
    if (a === void 0) { a = x == null ? void 0 : x(); }
});
(function (a) {
    if (a === void 0) { a = x == null ? void 0 : new x(); }
});
// - expression bodies
(function () { return x == null ? void 0 : x.y; });
(function () { return x == null ? void 0 : x["y"]; });
(function () { return x == null ? void 0 : x(); });
(function () { return x == null ? void 0 : new x(); });
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
void function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, x == null ? void 0 : x.y];
        case 1:
            _a.sent();
            return [2 /*return*/];
    }
}); };
void function () {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (x == null ? void 0 : x.y)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    }); });
};
// notnull
(x == null ? void 0 : x.y).z;
// assertions
x == null ? void 0 : x.y;
x == null ? void 0 : x.y;
// array literals
[x == null ? void 0 : x.y];
[, x == null ? void 0 : x.y];
(x == null ? void 0 : x.y).slice();
// literals
1 == null ? void 0 : 1..toString(); // no need for `..`
1. == null ? void 0 : 1..toString();
.0 == null ? void 0 : .0.toString();
4e3 == null ? void 0 : 4e3.toString();
1.e3 == null ? void 0 : 1.e3.toString();
"" == null ? void 0 : "".toString();
'' == null ? void 0 : ''.toString();
"" == null ? void 0 : "".toString();
_e = /./, _e == null ? void 0 : (_e == null ? void 0 : _e.toString)();
_f = /./g, _f == null ? void 0 : (_f == null ? void 0 : _f.toString)();
true == null ? void 0 : true.toString();
false == null ? void 0 : false.toString();
// templates
"" + (x == null ? void 0 : x.y);
// variables
var v = x == null ? void 0 : x.y;
var v = (x == null ? void 0 : x.y)[0];
var _g = [1][0], v = _g === void 0 ? x == null ? void 0 : x.y : _g;
var v = (x == null ? void 0 : x.y).v;
var _h = { v: 1 }.v, v = _h === void 0 ? x == null ? void 0 : x.y : _h;
var _j = x == null ? void 0 : x.y, v = null[_j];
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
for (var _i = 0, _k = []; _i < _k.length; _i++) {
    var _l = _k[_i];
    x == null ? _l : x.y = _l;
    ;
}
// enums
var E;
(function (E) {
    E[E["a"] = x == null ? void 0 : x.y] = "a";
})(E || (E = {}));
var _e, _f, _l;
var _a, _b, _c, _d;
//// [exportsOk.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = x == null ? void 0 : x.y;

//// [tests/cases/conformance/emitter/esnext/safeNavigation/emitter.safeNavigation.esnext.ts] ////

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
x?.y;
x?.y.z;
x.y?.z;
x?.y?.z;
//// [elementAccessOk.js]
x["y"];
x?.["y"];
x?.["y"]["z"];
x["y"]?.["z"];
x?.["y"]?.["z"];
//// [callExpressionOk.js]
x();
x?.();
x.y?.();
x["y"]?.();
f?.();
o.y?.();
o["y"]?.();
//// [newExpressionOk.js]
new x();
new x.y?.();
new x["y"]?.();
new f?.();
new o.y?.();
new o["y"]?.();
//// [mixedOk.js]
x?.y?.["z"];
x?.["y"]?.z;
x?.y();
x?.y?.();
o?.y();
o?.y?.();
x?.["z"]();
x?.["z"]?.();
o?.["y"]();
o?.["y"]?.();
//// [mutationOk.js]
x?.y = 1;
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
x?.["y"] = 1;
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
//// [arrayAssignmentPatternOk.js]
[x?.y] = [1];
[x?.["y"]] = [1];
[...x?.y] = [1];
[...x?.["y"]] = [1];
//// [objectAssignmentPatternOk.js]
({ a: x?.y } = { a: 1 });
({ a: x?.["y"] } = { a: 1 });
//// [questionDotDigitIsConditionalOk.js]
x ? .3 : 1;
//// [superPropertyInvocationOk.js]
// supported for invocation of super property
void class extends Base {
    m() {
        super.x?.();
        super["x"]?.();
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
// object literals
// - computed property names
void { [x?.y]: 1 };
void { [x?.["y"]]: 1 };
void { [x?.()]: 1 };
void { [new x?.()]: 1 };
// - property assignments
void { a: x?.y };
void { a: x?.["y"] };
void { a: x?.() };
void { a: new x?.() };
// classes
// - computed property names
// void class { [x?.y] = 1 }        // legal parse, but causes a checker error
// void class { [x?.["y"]] = 1 }    // legal parse, but causes a checker error
// void class { [x?.()] = 1 }       // legal parse, but causes a checker error
// void class { [new f?.()] = 1 }   // legal parse, but causes a checker error
void class {
    constructor() {
        this[Symbol?.toStringTag] = "";
    }
};
// - property declarations
void class {
    constructor() {
        this.a = x?.y;
    }
};
void class {
    constructor() {
        this.a = x?.["y"];
    }
};
void class {
    constructor() {
        this.a = x?.();
    }
};
void class {
    constructor() {
        this.a = new x?.();
    }
};
// - heritage clauses
void class extends M?.y {
};
void class extends M?.["y"] {
};
void class extends M?.z {
};
// - class decorators
let C1 = class C1 {
};
C1 = __decorate([
    x?.y
], C1);
let C2 = class C2 {
};
C2 = __decorate([
    x?.["y"]
], C2);
let C3 = class C3 {
};
C3 = __decorate([
    x?.()
], C3);
let C4 = class C4 {
};
C4 = __decorate([
    new x?.()
], C4);
// - member decorators
class C5 {
    m() { }
}
__decorate([
    x?.y
], C5.prototype, "m", null);
class C6 {
    m() { }
} // allowed as ?.[ is not ambiguous with computed property names
__decorate([
    x?.["y"]
], C6.prototype, "m", null);
class C7 {
    m() { }
}
__decorate([
    x?.()
], C7.prototype, "m", null);
class C8 {
    m() { }
}
__decorate([
    new x?.()
], C8.prototype, "m", null);
// - parameter decorators
class C9 {
    m(a) { }
}
__decorate([
    __param(0, x?.y)
], C9.prototype, "m", null);
class C10 {
    m(a) { }
}
__decorate([
    __param(0, x?.["y"])
], C10.prototype, "m", null);
class C11 {
    m(a) { }
}
__decorate([
    __param(0, x?.())
], C11.prototype, "m", null);
class C12 {
    m(a) { }
}
__decorate([
    __param(0, new x?.())
], C12.prototype, "m", null);
// functions
// - parameters
void function (a = x?.y) { };
void function (a = x?.["y"]) { };
void function (a = x?.()) { };
void function (a = new x?.()) { };
// - binding elements
//   - initializers
void function ({ a = x?.y }) { };
void function ({ a = x?.["y"] }) { };
void function ({ a = x?.() }) { };
void function ({ a = new x?.() }) { };
//   - computed properties
void function ({ [x?.y]: a }) { };
void function ({ [x?.["y"]]: a }) { };
void function ({ [x?.()]: a }) { };
void function ({ [new x?.()]: a }) { }((a = x?.y) => { });
((a = x?.["y"]) => { });
((a = x?.()) => { });
((a = new x?.()) => { });
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
x?.y ? 0 : 1;
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
void function* () { yield x?.y; };
void async function () { await x?.y; };
// notnull
x?.y.z;
// assertions
x?.y;
x?.y;
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
var { v } = x?.y;
var { v = x?.y } = { v: 1 };
var { [x?.y]: v } = null;
// if/else if
if (x?.y) { }
if (1) { }
else if (x?.y) { }
// switch
switch (x?.y) {
}
switch (1) {
    case x?.y: break;
}
// do/while
do { } while (x?.y);
while (x?.y) { }
// for
for (x?.y; x?.y; x?.y)
    ;
// for..in
for (x?.y in {})
    ;
// for..of
for (x?.y of [])
    ;
// enums
var E;
(function (E) {
    E[E["a"] = x?.y] = "a";
})(E || (E = {}));
//// [exportsOk.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = x?.y;

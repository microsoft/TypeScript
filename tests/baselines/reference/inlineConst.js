//// [inlineConst.ts]
declare function output(x: any, y?: any)
declare function bazz()
declare function bazzz()

const a: number = 1 + 2;
const foo = {
    a: 123
}
const bar = {
    a
}
class Foo {
    a = 456
}
class Bar {
    get a() { return 1 }
    set a(v) { }
}
class Baz {
    _a: number = 1

    get [a]() { return a }
    set [a](a) { this._a = a }
}

if (a) { }
if (a === 2) { }
const b = a + 1
if (b) { }
const c = a + b
if (c) { }
if (foo.a) {
    a.toString()
}
if (foo[a]) {
    a['toString']()
}
for (let i = 0; i < 10; ++i) {
    output(i)
}
output(+a)
output(-a)
output(~a)
output(a < b)
output(a > b)
output(a <= b)
output(a >= b)
output(a == b)
output(a != b)
output(a === b)
const f = a, g = bazz
if (f) { }
if (g) { }
const h = (bazz() || bazzz())
const i = "test"
output(i, i.length)
const args: string[] = []
const configPath = args.forEach(arg => arg.lastIndexOf(i, 0) === 0 && arg.substr(i.length))


//// [inlineConst.js]
var a = 3;
var foo = {
    a: 123
};
var bar = {
    a: a
};
var Foo = /** @class */ (function () {
    function Foo() {
        this.a = 456;
    }
    return Foo;
}());
var Bar = /** @class */ (function () {
    function Bar() {
    }
    Object.defineProperty(Bar.prototype, "a", {
        get: function () { return 1; },
        set: function (v) { },
        enumerable: true,
        configurable: true
    });
    return Bar;
}());
var Baz = /** @class */ (function () {
    function Baz() {
        this._a = 1;
    }
    Object.defineProperty(Baz.prototype, 3, {
        get: function () { return 3; },
        set: function (a) { this._a = a; },
        enumerable: true,
        configurable: true
    });
    return Baz;
}());
if (3) { }
if (false) { }
var b = 4;
if (4) { }
var c = 7;
if (7) { }
if (foo.a) {
    3..toString();
}
if (foo[3]) {
    3['toString']();
}
for (var i_1 = 0; i_1 < 10; ++i_1) {
    output(i_1);
}
output(3);
output(-3);
output(-4);
output(true);
output(false);
output(true);
output(false);
output(false);
output(true);
output(false);
var f = 3, g = bazz;
if (3) { }
if (g) { }
var h = (bazz() || bazzz());
output("test", "test".length);
var args = [];
var configPath = args.forEach(function (arg) { return arg.lastIndexOf("test", 0) === 0 && arg.substr("test".length); });


//// [inlineConst.d.ts]
declare function output(x: any, y?: any): any;
declare function bazz(): any;
declare function bazzz(): any;
declare const a: number;
declare const foo: {
    a: number;
};
declare const bar: {
    a: number;
};
declare class Foo {
    a: number;
}
declare class Bar {
    a: number;
}
declare class Baz {
    _a: number;
}
declare const b: number;
declare const c: number;
declare const f: number, g: typeof bazz;
declare const h: any;
declare const i = "test";
declare const args: string[];
declare const configPath: void;

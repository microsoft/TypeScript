//// [inlineConst.ts]
declare function output(x: any, y?: any)
declare function bazz()
declare function bazzz()

const a = 1 + 2;
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
const j = "123" + "456"
if (j === "123456") { }
if (j) { }


//// [inlineConst.js]
const foo = {
    a: 123
};
const bar = {
    a
};
class Foo {
    constructor() {
        this.a = 456;
    }
}
class Bar {
    get a() { return 1; }
    set a(v) { }
}
class Baz {
    constructor() {
        this._a = 1;
    }
    get [3]() { return 3; }
    set [3](a) { this._a = a; }
}
if (3) { }
if (false) { }
if (4) { }
if (7) { }
if (foo.a) {
    3..toString();
}
if (foo[3]) {
    3['toString']();
}
for (let ; i < 10; ++i) {
    output(i);
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
const g = bazz;
if (3) { }
if (g) { }
const h = (bazz() || bazzz());
output("test", "test".length);
const args = [];
const configPath = args.forEach(arg => arg.lastIndexOf(i, 0) === 0 && arg.substr(i.length));
if (true) { }
if ("123456") { }


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
declare const j: string;

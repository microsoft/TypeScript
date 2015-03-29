//// [computedPropertyNames13_ES6.ts]
var s: string;
var n: number;
var a: any;
class C {
    [s]() {}
    [n]() { }
    static [s + s]() { }
    [s + n]() { }
    [+s]() { }
    static [""]() { }
    [0]() { }
    [a]() { }
    static [<any>true]() { }
    [`hello bye`]() { }
    static [`hello ${a} bye`]() { }
}

//// [computedPropertyNames13_ES6.js]
var s;
var n;
var a;
class C {
    [s]() { }
    [n]() { }
    static [s + s]() { }
    [s + n]() { }
    [+s]() { }
    static [""]() { }
    [0]() { }
    [a]() { }
    static [true]() { }
    [`hello bye`]() { }
    static [`hello ${a} bye`]() { }
}

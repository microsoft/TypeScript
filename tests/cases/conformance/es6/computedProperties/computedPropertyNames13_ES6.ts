// @target: es6
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
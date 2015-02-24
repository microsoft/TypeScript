// @target: es6
var s: string;
var n: number;
var a: any;
class C {
    get [s]() { return 0;}
    set [n](v) { }
    static get [s + s]() { return 0; }
    set [s + n](v) { }
    get [+s]() { return 0; }
    static set [""](v) { }
    get [0]() { return 0; }
    set [a](v) { }
    static get [<any>true]() { return 0; }
    set [`hello bye`](v) { }
    get [`hello ${a} bye`]() { return 0; }
}
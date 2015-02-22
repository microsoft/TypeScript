// @target: es6
var s: string;
var n: number;
var a: any;
var v = {
    [s]: 0,
    [n]: n,
    [s + s]: 1,
    [s + n]: 2,
    [+s]: s,
    [""]: 0,
    [0]: 0,
    [a]: 1,
    [<any>true]: 0,
    [`hello bye`]: 0,
    [`hello ${a} bye`]: 0
}
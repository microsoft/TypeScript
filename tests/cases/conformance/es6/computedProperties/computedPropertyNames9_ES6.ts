// @target: es6
function f(s: string): string;
function f(n: number): number;
function f<T>(x: T): T;
function f(x): any { }

var v = {
    [f("")]: 0,
    [f(0)]: 0,
    [f(true)]: 0
}
// @target: es2015
var v: any[];

function foo(a = v[1 + 1]) { }

function bar(a = v[1 + 1]) {
}
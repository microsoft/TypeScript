// @target: es2015
var v: any[];

function foo(a = bar()) { }

function bar(a = foo()) {
}
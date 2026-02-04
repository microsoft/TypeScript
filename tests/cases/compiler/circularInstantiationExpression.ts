// @target: es2015
// @declaration: true
declare function foo<T>(t: T): typeof foo<T>;
foo("");

// @target: es6
// @noImplicitAny: true
const undef = undefined;

function f<T>(x: T): T { return x; }
const x = f<undefined>(undefined);
const y = f(undefined);

function g<T>(x: T, y: T): T { return x; }
const a = g(<any> 1, undefined); //shouldn't error?
const b = g(undefined, <any> 1); //should error?


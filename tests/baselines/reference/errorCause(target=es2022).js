//// [tests/cases/compiler/errorCause.ts] ////

//// [errorCause.ts]
declare const a: unknown;

let err = new Error("foo", { cause: new Error("bar") });
err.cause;
let anotherErr = new Error("foo", { cause: a });
anotherErr.cause;

new EvalError("foo", { cause: new Error("bar") });
new EvalError("foo", { cause: a });
new RangeError("foo", { cause: new Error("bar") });
new ReferenceError("foo", { cause: new Error("bar") });
new SyntaxError("foo", { cause: new Error("bar") });
new TypeError("foo", { cause: new Error("bar") });
new URIError("foo", { cause: new Error("bar") });
new AggregateError([], "foo", { cause: new Error("bar") });


//// [errorCause.js]
let err = new Error("foo", { cause: new Error("bar") });
err.cause;
let anotherErr = new Error("foo", { cause: a });
anotherErr.cause;
new EvalError("foo", { cause: new Error("bar") });
new EvalError("foo", { cause: a });
new RangeError("foo", { cause: new Error("bar") });
new ReferenceError("foo", { cause: new Error("bar") });
new SyntaxError("foo", { cause: new Error("bar") });
new TypeError("foo", { cause: new Error("bar") });
new URIError("foo", { cause: new Error("bar") });
new AggregateError([], "foo", { cause: new Error("bar") });

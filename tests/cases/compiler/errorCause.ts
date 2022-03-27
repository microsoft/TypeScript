// @target: es2021, es2022, esnext

let err = new Error("foo", { cause: new Error("bar") });
err.cause;

new EvalError("foo", { cause: new Error("bar") });
new RangeError("foo", { cause: new Error("bar") });
new ReferenceError("foo", { cause: new Error("bar") });
new SyntaxError("foo", { cause: new Error("bar") });
new TypeError("foo", { cause: new Error("bar") });
new URIError("foo", { cause: new Error("bar") });
new AggregateError([], "foo", { cause: new Error("bar") });

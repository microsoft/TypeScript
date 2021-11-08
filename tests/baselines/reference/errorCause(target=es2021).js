//// [errorCause.ts]
new Error("foo", { cause: new Error("bar") });


//// [errorCause.js]
new Error("foo", { cause: new Error("bar") });

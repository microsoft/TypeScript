//// [useUnknownInCatchVariables01.ts]
try {
    // ...
}
catch (e) {
    // error!
    void e.toUpperCase();
    void e++;
    void e();

    if (typeof e === "string") {
        // works!
        // We've narrowed 'e' down to the type 'string'.
        console.log(e.toUpperCase());
    }
    if (e instanceof Error) {
        e.stack?.toUpperCase();
    }
    if (typeof e === "number") {
        e++;
    }
}

//// [useUnknownInCatchVariables01.js]
var _a;
try {
    // ...
}
catch (e) {
    // error!
    void e.toUpperCase();
    void e++;
    void e();
    if (typeof e === "string") {
        // works!
        // We've narrowed 'e' down to the type 'string'.
        console.log(e.toUpperCase());
    }
    if (e instanceof Error) {
        (_a = e.stack) === null || _a === void 0 ? void 0 : _a.toUpperCase();
    }
    if (typeof e === "number") {
        e++;
    }
}

//// [tests/cases/compiler/useUnknownInCatchVariables01.ts] ////

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
        e.toExponential();
        e++;
    }
}


try {
    // ...
}
catch (e: any) {
    // All are allowed.
    void e.toUpperCase();
    void e.toExponential();
    void e();
}

//// [useUnknownInCatchVariables01.js]
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
        e.toExponential();
        e++;
    }
}
try {
    // ...
}
catch (e) {
    // All are allowed.
    void e.toUpperCase();
    void e.toExponential();
    void e();
}

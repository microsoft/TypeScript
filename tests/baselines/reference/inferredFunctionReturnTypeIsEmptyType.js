//// [tests/cases/compiler/inferredFunctionReturnTypeIsEmptyType.ts] ////

//// [inferredFunctionReturnTypeIsEmptyType.ts]
function foo() {
    if (true) {
        return 42;
    }
    else {
        return "42";
    }
};


//// [inferredFunctionReturnTypeIsEmptyType.js]
function foo() {
    if (true) {
        return 42;
    }
    else {
        return "42";
    }
}
;

//// [sourceMapValidationFunctions.ts]
var greetings = 0;
function greet(greeting: string): number {
    greetings++;
    return greetings;
}
function greet2(greeting: string, n = 10, x?: string, ...restParams: string[]): number {
    greetings++;
    return greetings;
}
function foo(greeting: string, n = 10, x?: string, ...restParams: string[])
{
    return;
}

//// [sourceMapValidationFunctions.js]
var greetings = 0;
function greet(greeting) {
    greetings++;
    return greetings;
}
function greet2(greeting, n, x) {
    if (n === void 0) { n = 10; }
    var restParams = [];
    for (var _a = 3; _a < arguments.length; _a++) {
        restParams[_a - 3] = arguments[_a];
    }
    greetings++;
    return greetings;
}
function foo(greeting, n, x) {
    if (n === void 0) { n = 10; }
    var restParams = [];
    for (var _a = 3; _a < arguments.length; _a++) {
        restParams[_a - 3] = arguments[_a];
    }
    return;
}
//# sourceMappingURL=sourceMapValidationFunctions.js.map
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
    if (typeof n === "undefined") { n = 10; }
    var restParams = [];
    for (var _i = 0; _i < (arguments.length - 3); _i++) {
        restParams[_i] = arguments[_i + 3];
    }
    greetings++;
    return greetings;
}
function foo(greeting, n, x) {
    if (typeof n === "undefined") { n = 10; }
    var restParams = [];
    for (var _i = 0; _i < (arguments.length - 3); _i++) {
        restParams[_i] = arguments[_i + 3];
    }
    return;
}
//# sourceMappingURL=sourceMapValidationFunctions.js.map

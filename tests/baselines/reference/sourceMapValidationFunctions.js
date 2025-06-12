//// [tests/cases/compiler/sourceMapValidationFunctions.ts] ////

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
function greet2(greeting, n = 10, x, ...restParams) {
    greetings++;
    return greetings;
}
function foo(greeting, n = 10, x, ...restParams) {
    return;
}
//# sourceMappingURL=sourceMapValidationFunctions.js.map
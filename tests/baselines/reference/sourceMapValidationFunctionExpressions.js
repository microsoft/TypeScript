//// [tests/cases/compiler/sourceMapValidationFunctionExpressions.ts] ////

//// [sourceMapValidationFunctionExpressions.ts]
var greetings = 0;
var greet = (greeting: string): number => {
    greetings++;
    return greetings;
}
greet("Hello");
var incrGreetings = () => greetings++;

//// [sourceMapValidationFunctionExpressions.js]
var greetings = 0;
var greet = (greeting) => {
    greetings++;
    return greetings;
};
greet("Hello");
var incrGreetings = () => greetings++;
//# sourceMappingURL=sourceMapValidationFunctionExpressions.js.map
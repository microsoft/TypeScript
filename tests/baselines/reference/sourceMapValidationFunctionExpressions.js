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
var greet = function (greeting) {
    greetings++;
    return greetings;
};
greet("Hello");
var incrGreetings = function () { return greetings++; };
//# sourceMappingURL=sourceMapValidationFunctionExpressions.js.map
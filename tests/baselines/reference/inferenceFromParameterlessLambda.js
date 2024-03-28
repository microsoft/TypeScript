//// [tests/cases/compiler/inferenceFromParameterlessLambda.ts] ////

//// [inferenceFromParameterlessLambda.ts]
function foo<T>(o: Take<T>, i: Make<T>) { }
interface Make<T> {
    (): T;
}
interface Take<T> {
    (n: T): void;
}
// Infer string from second argument because it isn't context sensitive
foo(n => n.length, () => 'hi');


//// [inferenceFromParameterlessLambda.js]
function foo(o, i) { }
// Infer string from second argument because it isn't context sensitive
foo(function (n) { return n.length; }, function () { return 'hi'; });

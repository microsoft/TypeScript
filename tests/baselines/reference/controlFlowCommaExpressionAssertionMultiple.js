//// [controlFlowCommaExpressionAssertionMultiple.ts]
function Narrow<T>(value: any): asserts value is T {}

function func(foo: any, bar: any) {
    Narrow<number>(foo), Narrow<string>(bar);
    foo;
    bar;
}


//// [controlFlowCommaExpressionAssertionMultiple.js]
function Narrow(value) { }
function func(foo, bar) {
    Narrow(foo), Narrow(bar);
    foo;
    bar;
}

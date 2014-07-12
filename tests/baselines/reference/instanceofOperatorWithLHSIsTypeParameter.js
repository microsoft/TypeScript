//// [instanceofOperatorWithLHSIsTypeParameter.ts]
function foo<T>(t: T) {
    var x: any;
    var r = t instanceof x;
}

//// [instanceofOperatorWithLHSIsTypeParameter.js]
function foo(t) {
    var x;
    var r = t instanceof x;
}

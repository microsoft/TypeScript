//// [tests/cases/compiler/cyclicGenericTypeInstantiationInference.ts] ////

//// [cyclicGenericTypeInstantiationInference.ts]
function foo<T>() {
    var z = foo<typeof y>();
    var y: {
        y2: typeof z
    };
    return y;
}


function bar<T>() {
    var z = bar<typeof y>();
    var y: {
        y2: typeof z;
    }
    return y;
}

var a = foo<number>();
var b = bar<number>();

function test<T>(x: typeof a): void { }
test(b);

//// [cyclicGenericTypeInstantiationInference.js]
function foo() {
    var z = foo();
    var y;
    return y;
}
function bar() {
    var z = bar();
    var y;
    return y;
}
var a = foo();
var b = bar();
function test(x) { }
test(b);

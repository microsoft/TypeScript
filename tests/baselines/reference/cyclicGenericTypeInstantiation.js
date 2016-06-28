//// [cyclicGenericTypeInstantiation.ts]
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
a = b;


//// [cyclicGenericTypeInstantiation.js]
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
a = b;

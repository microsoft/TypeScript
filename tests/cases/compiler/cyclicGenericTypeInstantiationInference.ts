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
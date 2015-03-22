//// [letCollidingNameInNestedScope.ts]
declare function foo(a: any);
var x = 1;
{
    let x = true;
    foo(x);
    function bar() {
        var _x = 1;
        foo(_x);
        foo(x);
        {
            let x = 1;
            foo(x);
        }
        foo(_x);
    }
    foo(x);
}

//// [letCollidingNameInNestedScope.js]
var x = 1;
{
    var _x_1 = true;
    foo(_x_1);
    function bar() {
        var _x = 1;
        foo(_x);
        foo(_x_1);
        {
            var _x_2 = 1;
            foo(_x_2);
        }
        foo(_x);
    }
    foo(_x_1);
}

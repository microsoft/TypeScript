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
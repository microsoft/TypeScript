//// [functionCall13.ts]
function foo(a:string, ...b:number[]){}
foo('foo', 1); 
foo('foo'); 
foo();
foo(1, 'bar');
foo('foo', 1, 3);


//// [functionCall13.js]
function foo(a) {
    var b = [];
    for (var _a = 1; _a < arguments.length; _a++) {
        b[_a - 1] = arguments[_a];
    }
}
foo('foo', 1);
foo('foo');
foo();
foo(1, 'bar');
foo('foo', 1, 3);

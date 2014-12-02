//// [functionCall16.ts]
function foo(a:string, b?:string, ...c:number[]){}
foo('foo', 1); 
foo('foo'); 
foo('foo', 'bar'); 
foo();
foo(1, 'bar');
foo('foo', 'bar', 3);


//// [functionCall16.js]
function foo(a, b) {
    var c = [];
    for (var _a = 2; _a < arguments.length; _a++) {
        c[_a - 2] = arguments[_a];
    }
}
foo('foo', 1);
foo('foo');
foo('foo', 'bar');
foo();
foo(1, 'bar');
foo('foo', 'bar', 3);

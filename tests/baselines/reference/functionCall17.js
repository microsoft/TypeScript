//// [tests/cases/compiler/functionCall17.ts] ////

//// [functionCall17.ts]
function foo(a:string, b?:string, c?:number, ...d:number[]){}
foo('foo', 1); 
foo('foo'); 
foo();
foo(1, 'bar');
foo('foo', 1, 3);
foo('foo', 'bar', 3, 4);


//// [functionCall17.js]
function foo(a, b, c) {
    var d = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        d[_i - 3] = arguments[_i];
    }
}
foo('foo', 1);
foo('foo');
foo();
foo(1, 'bar');
foo('foo', 1, 3);
foo('foo', 'bar', 3, 4);

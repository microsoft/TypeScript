//// [functionCall10.ts]
function foo(...a:number[]){};
foo(0, 1); 
foo('foo'); 
foo();
foo(1, 'bar');


//// [functionCall10.js]
function foo() {
    var a = [];
    for (var _a = 0; _a < arguments.length; _a++) {
        a[_a - 0] = arguments[_a];
    }
}
;
foo(0, 1);
foo('foo');
foo();
foo(1, 'bar');

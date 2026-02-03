//// [tests/cases/compiler/functionCall10.ts] ////

//// [functionCall10.ts]
function foo(...a:number[]){};
foo(0, 1); 
foo('foo'); 
foo();
foo(1, 'bar');


//// [functionCall10.js]
function foo() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
}
;
foo(0, 1);
foo('foo');
foo();
foo(1, 'bar');

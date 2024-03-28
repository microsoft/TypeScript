//// [tests/cases/compiler/functionOverloads43.ts] ////

//// [functionOverloads43.ts]
function foo(bar: { a:number }[]): number;
function foo(bar: { a:string }[]): string;
function foo([x]: { a:number | string }[]): string | number {
    if (x) {
        return x.a;
    }
    
    return undefined;
}

var x = foo([{a: "str"}]);
var y = foo([{a: 100}]);

//// [functionOverloads43.js]
function foo(_a) {
    var x = _a[0];
    if (x) {
        return x.a;
    }
    return undefined;
}
var x = foo([{ a: "str" }]);
var y = foo([{ a: 100 }]);

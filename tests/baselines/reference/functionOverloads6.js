//// [tests/cases/compiler/functionOverloads6.ts] ////

//// [functionOverloads6.ts]
class foo { 
   static fnOverload();
   static fnOverload(foo:string);
   static fnOverload(foo?: any){ }
}


//// [functionOverloads6.js]
var foo = /** @class */ (function () {
    function foo() {
    }
    foo.fnOverload = function (foo) { };
    return foo;
}());

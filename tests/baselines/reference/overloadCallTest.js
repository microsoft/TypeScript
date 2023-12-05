//// [tests/cases/compiler/overloadCallTest.ts] ////

//// [overloadCallTest.ts]
class foo {
    constructor() {
        function bar(): string;
        function bar(s:string);
        function bar(foo?: string) { return "foo" };

        var test = bar("test");
        var goo = bar();

        goo = bar("test");
    }
 
}



//// [overloadCallTest.js]
var foo = /** @class */ (function () {
    function foo() {
        function bar(foo) { return "foo"; }
        ;
        var test = bar("test");
        var goo = bar();
        goo = bar("test");
    }
    return foo;
}());

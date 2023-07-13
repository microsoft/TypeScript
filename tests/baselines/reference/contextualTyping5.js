//// [tests/cases/compiler/contextualTyping5.ts] ////

//// [contextualTyping5.ts]
class foo { public bar:{id:number;} = { }; }

//// [contextualTyping5.js]
var foo = /** @class */ (function () {
    function foo() {
        this.bar = {};
    }
    return foo;
}());

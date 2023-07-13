//// [tests/cases/compiler/contextualTyping11.ts] ////

//// [contextualTyping11.ts]
class foo { public bar:{id:number;}[] = [<foo>({})]; }

//// [contextualTyping11.js]
var foo = /** @class */ (function () {
    function foo() {
        this.bar = [({})];
    }
    return foo;
}());

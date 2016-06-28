//// [contextualTyping11.ts]
class foo { public bar:{id:number;}[] = [<foo>({})]; }

//// [contextualTyping11.js]
var foo = (function () {
    function foo() {
        this.bar = [({})];
    }
    return foo;
}());

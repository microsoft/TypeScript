//// [contextualTyping5.ts]
class foo { public bar:{id:number;} = { }; }

//// [contextualTyping5.js]
var foo = (function () {
    function foo() {
        this.bar = {};
    }
    return foo;
}());

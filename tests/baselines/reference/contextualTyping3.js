//// [contextualTyping3.ts]
class foo { public bar:{id:number;} = {id:5}; }

//// [contextualTyping3.js]
var foo = (function () {
    function foo() {
        this.bar = { id: 5 };
    }
    return foo;
}());

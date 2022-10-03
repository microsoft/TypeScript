//// [contextualTyping10.ts]
class foo { public bar:{id:number;}[] = [{id:1}, {id:2}]; }

//// [contextualTyping10.js]
var foo = /** @class */ (function () {
    function foo() {
        this.bar = [{ id: 1 }, { id: 2 }];
    }
    return foo;
}());

//// [contextualTyping12.ts]
class foo { public bar:{id:number;}[] = [{id:1}, {id:2, name:"foo"}]; }

//// [contextualTyping12.js]
var foo = (function () {
    function foo() {
        this.bar = [{ id: 1 }, { id: 2, name: "foo" }];
    }
    return foo;
}());

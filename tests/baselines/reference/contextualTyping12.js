//// [tests/cases/compiler/contextualTyping12.ts] ////

//// [contextualTyping12.ts]
class foo { public bar:{id:number;}[] = [{id:1}, {id:2, name:"foo"}]; }

//// [contextualTyping12.js]
var foo = /** @class */ (function () {
    function foo() {
        this.bar = [{ id: 1 }, { id: 2, name: "foo" }];
    }
    return foo;
}());

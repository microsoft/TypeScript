//// [tests/cases/compiler/contextualTyping12.ts] ////

//// [contextualTyping12.ts]
class foo { public bar:{id:number;}[] = [{id:1}, {id:2, name:"foo"}]; }

//// [contextualTyping12.js]
class foo {
    bar = [{ id: 1 }, { id: 2, name: "foo" }];
}

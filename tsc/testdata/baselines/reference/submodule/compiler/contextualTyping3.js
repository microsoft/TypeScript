//// [tests/cases/compiler/contextualTyping3.ts] ////

//// [contextualTyping3.ts]
class foo { public bar:{id:number;} = {id:5}; }

//// [contextualTyping3.js]
class foo {
    bar = { id: 5 };
}

//// [tests/cases/compiler/contextualTyping4.ts] ////

//// [contextualTyping4.ts]
class foo { public bar:{id:number;} = {id:5, name:"foo"}; }

//// [contextualTyping4.js]
"use strict";
class foo {
    bar = { id: 5, name: "foo" };
}

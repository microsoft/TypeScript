//// [tests/cases/compiler/contextualTyping10.ts] ////

//// [contextualTyping10.ts]
class foo { public bar:{id:number;}[] = [{id:1}, {id:2}]; }

//// [contextualTyping10.js]
"use strict";
class foo {
    bar = [{ id: 1 }, { id: 2 }];
}

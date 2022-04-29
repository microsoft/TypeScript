//// [contextualTyping20.ts]
var foo:{id:number;}[] = [{id:1}]; foo = [{id:1}, {id:2, name:"foo"}];

//// [contextualTyping20.js]
var foo = [{ id: 1 }];
foo = [{ id: 1 }, { id: 2, name: "foo" }];

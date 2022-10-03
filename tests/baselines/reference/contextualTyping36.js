//// [contextualTyping36.ts]
var foo = <{ id: number; }[]>[{ id: 4 }, <{ id: number; }>({  })];

//// [contextualTyping36.js]
var foo = [{ id: 4 }, ({})];

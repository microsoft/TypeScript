//// [templateStringInConditional.ts]
var x = `abc${ " " }def` ? `abc${ " " }def` : `abc${ " " }def`;

//// [templateStringInConditional.js]
var x = "abc".concat(" ", "def") ? "abc".concat(" ", "def") : "abc".concat(" ", "def");

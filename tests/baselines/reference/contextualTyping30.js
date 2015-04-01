//// [contextualTyping30.ts]
function foo(param:number[]){}; foo([1, "a"]);

//// [contextualTyping30.js]
function foo(param) { }
;
foo([1, "a"]);

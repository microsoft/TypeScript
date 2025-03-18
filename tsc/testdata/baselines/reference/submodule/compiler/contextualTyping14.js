//// [tests/cases/compiler/contextualTyping14.ts] ////

//// [contextualTyping14.ts]
class foo { public bar:(a:number)=>number = function(a){return a}; }

//// [contextualTyping14.js]
class foo {
    bar = function (a) { return a; };
}

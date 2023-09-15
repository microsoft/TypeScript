//// [tests/cases/compiler/contextualTyping33.ts] ////

//// [contextualTyping33.ts]
function foo(param: {():number; (i:number):number; }[]) { }; foo([function(){return 1;}, function(){return "foo"}]);

//// [contextualTyping33.js]
function foo(param) { }
;
foo([function () { return 1; }, function () { return "foo"; }]);

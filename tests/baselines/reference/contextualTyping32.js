//// [contextualTyping32.ts]
function foo(param: {():number; (i:number):number; }[]) { }; foo([function(){return 1;}, function(){return 4}]);

//// [contextualTyping32.js]
function foo(param) { }
;
foo([function () { return 1; }, function () { return 4; }]);

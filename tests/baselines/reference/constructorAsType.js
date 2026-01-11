//// [tests/cases/compiler/constructorAsType.ts] ////

//// [constructorAsType.ts]
var Person:new () => {name: string;} = function () {return {name:"joe"};};

declare var Person2:{new() : {name:string;};};

Person = Person2;

//// [constructorAsType.js]
var Person = function () { return { name: "joe" }; };
Person = Person2;

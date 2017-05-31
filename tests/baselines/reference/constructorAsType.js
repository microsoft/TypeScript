//// [constructorAsType.ts]
var Person:new () => {name: string;} = function () {return {name:"joe"};};

var Person2:{new() : {name:string;};};

Person = Person2;

//// [constructorAsType.js]
var Person = function Person() { return { name: "joe" }; };
var Person2;
Person = Person2;

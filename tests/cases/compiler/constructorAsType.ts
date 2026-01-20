var Person:new () => {name: string;} = function () {return {name:"joe"};};

declare var Person2:{new() : {name:string;};};

Person = Person2;
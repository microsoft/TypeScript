//// [constructorAsType.js]
var Person = function () {
    return { name: "joe" };
};

var Person2;

Person = Person2;

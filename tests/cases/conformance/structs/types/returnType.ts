// doc 8

struct Person {
	constructor(public name: string, public age: number) {}
}

var p: Person;
var test = (name: string, age: number) => new Person(name, age);
p = test("John", 25);
test = function (n, a) {return {name: n, age: a} }; // error, type not compatible


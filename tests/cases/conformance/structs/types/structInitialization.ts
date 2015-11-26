// doc 7
// Struct initialization requires explicit declaration and the sequence of the arguments matters.
struct Person {
	constructor(public name: string, public age: number) {}
}
var john = new Person("John", 25); // ok
var george = new Person(25, "George"); // error, sequence matters
var jg = new Person("John", "George", 25); // error, wrong call signature
var john1 = new Person({name: "John", age: 25}); // error, wrong call signature

var test = function (person: Person) {};
test(john); // ok
test({ name: "John", age: 25 }); // error, type incompatibility. need an explicit declaration


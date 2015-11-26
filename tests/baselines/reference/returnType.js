//// [returnType.ts]
// doc 8

struct Person {
	constructor(public name: string, public age: number) {}
}

var p: Person;
var test = (name: string, age: number) => new Person(name, age);
p = test("John", 25);
test = function (n, a) {return {name: n, age: a} }; // error, type not compatible



//// [returnType.js]
// doc 8
var Person = (function () {
    var _Person = new TypedObject.StructType({
    });
    function _ctor(name, age) {
        this.name = name;
        this.age = age;
    }
    function Person(name, age) {
        var obj = new _Person();
        _ctor.call(obj ,);
        return obj;
    }
    Person._TO = _Person;
    return Person;
})();
var p;
var test = function (name, age) { return new Person(name, age); };
p = test("John", 25);
test = function (n, a) { return { name: n, age: a }; }; // error, type not compatible

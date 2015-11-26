//// [NotAssignableBetweenStructsWithoutInheritance.ts]
// doc 8
// Only a subtype struct can be assigned to a supertype struct.

struct Animal {
	feet: number;
	constructor(name: string, numFeet: number) { }
}

struct Size {
	feet: number;
	constructor(numFeet: number) { }
}

var a: Animal;
var s: Size;

a = s;  //error
s = a;  //error



//// [NotAssignableBetweenStructsWithoutInheritance.js]
// doc 8
// Only a subtype struct can be assigned to a supertype struct.
var Animal = (function () {
    var _Animal = new TypedObject.StructType({
        feet: TypedObject.float64,
    });
    function _ctor(name, numFeet) {
    }
    function Animal(name, numFeet) {
        var obj = new _Animal();
        _ctor.call(obj ,);
        return obj;
    }
    Animal._TO = _Animal;
    return Animal;
})();
var Size = (function () {
    var _Size = new TypedObject.StructType({
        feet: TypedObject.float64,
    });
    function _ctor(numFeet) {
    }
    function Size(numFeet) {
        var obj = new _Size();
        _ctor.call(obj ,);
        return obj;
    }
    Size._TO = _Size;
    return Size;
})();
var a;
var s;
a = s; //error
s = a; //error

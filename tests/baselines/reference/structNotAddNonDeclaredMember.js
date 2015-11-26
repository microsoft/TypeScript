//// [structNotAddNonDeclaredMember.ts]
struct C {
	constructor(public firstName: string, public age: number) {}
}

var c = new C("John", 25);
c.lastName = c.firstName; // error, cannot add undefined members to struct

//// [structNotAddNonDeclaredMember.js]
var C = (function () {
    var _C = new TypedObject.StructType({
    });
    function _ctor(firstName, age) {
        this.firstName = firstName;
        this.age = age;
    }
    function C(firstName, age) {
        var obj = new _C();
        _ctor.call(obj ,);
        return obj;
    }
    C._TO = _C;
    return C;
})();
var c = new C("John", 25);
c.lastName = c.firstName; // error, cannot add undefined members to struct

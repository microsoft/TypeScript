//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/typeOfThisInStaticMembers5.ts] ////

//// [typeOfThisInStaticMembers5.ts]
class C {
    static create = () => new this("yep")

    constructor (private foo: string) {

    }
}


//// [typeOfThisInStaticMembers5.js]
var C = /** @class */ (function () {
    function C(foo) {
        this.foo = foo;
    }
    var _a;
    _a = C;
    C.create = function () { return new _a("yep"); };
    return C;
}());

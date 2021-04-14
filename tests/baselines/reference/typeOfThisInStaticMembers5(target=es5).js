//// [typeOfThisInStaticMembers5.ts]
class C {
    static create = () => new this("yep")

    constructor (private foo: string) {

    }
}


//// [typeOfThisInStaticMembers5.js]
var _this = this;
var C = /** @class */ (function () {
    function C(foo) {
        this.foo = foo;
    }
    C.create = function () { return new _this("yep"); };
    return C;
}());

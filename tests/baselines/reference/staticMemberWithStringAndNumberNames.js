//// [staticMemberWithStringAndNumberNames.ts]
class C {
    static "foo" = 0;
    static 0 = 1;

    x = C['foo'];
    x2 = C['0'];
    x3 = C[0];
        
    static s = C['foo'];
    static s2 = C['0'];
    static s3 = C[0];
}

//// [staticMemberWithStringAndNumberNames.js]
var C = /** @class */ (function () {
    function C() {
        this.x = C['foo'];
        this.x2 = C['0'];
        this.x3 = C[0];
    }
    C["foo"] = 0;
    C[0] = 1;
    C.s = C['foo'];
    C.s2 = C['0'];
    C.s3 = C[0];
    return C;
}());

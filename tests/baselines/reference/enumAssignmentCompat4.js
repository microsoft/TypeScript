//// [enumAssignmentCompat4.ts]
namespace M {
    export enum MyEnum {
        BAR
    }
    export var object2 = {
        foo: MyEnum.BAR
    };
}

namespace N {
    export enum MyEnum {
        FOO
    };
    export var object1 = {
        foo: MyEnum.FOO
    };
}

let broken = [
    N.object1,
    M.object2
];


//// [enumAssignmentCompat4.js]
var M = M || (M = {});
(function (M) {
    var MyEnum = M.MyEnum || (M.MyEnum = {});
    (function (MyEnum) {
        MyEnum[MyEnum["BAR"] = 0] = "BAR";
    })(MyEnum);
    M.object2 = {
        foo: MyEnum.BAR
    };
})(M);
var N = N || (N = {});
(function (N) {
    var MyEnum = N.MyEnum || (N.MyEnum = {});
    (function (MyEnum) {
        MyEnum[MyEnum["FOO"] = 0] = "FOO";
    })(MyEnum);
    ;
    N.object1 = {
        foo: MyEnum.FOO
    };
})(N);
var broken = [
    N.object1,
    M.object2
];

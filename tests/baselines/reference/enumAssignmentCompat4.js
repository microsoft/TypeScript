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
var M;
(function (M) {
    (function (MyEnum) {
        MyEnum[MyEnum["BAR"] = 0] = "BAR";
    })(M.MyEnum || (M.MyEnum = {}));
    var MyEnum = M.MyEnum;
    M.object2 = {
        foo: MyEnum.BAR
    };
})(M || (M = {}));
var N;
(function (N) {
    (function (MyEnum) {
        MyEnum[MyEnum["FOO"] = 0] = "FOO";
    })(N.MyEnum || (N.MyEnum = {}));
    var MyEnum = N.MyEnum;
    ;
    N.object1 = {
        foo: MyEnum.FOO
    };
})(N || (N = {}));
var broken = [
    N.object1,
    M.object2
];

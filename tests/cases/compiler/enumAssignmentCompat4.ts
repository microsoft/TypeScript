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

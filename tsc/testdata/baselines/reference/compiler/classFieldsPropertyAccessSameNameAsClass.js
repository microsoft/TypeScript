//// [tests/cases/compiler/classFieldsPropertyAccessSameNameAsClass.ts] ////

//// [classFieldsPropertyAccessSameNameAsClass.ts]
export enum MyEnum {
    Foo = "FooValue",
    Bar = "BarValue",
}

// Class declarations with self-reference - alias is same-name, so bug is invisible
// but these still serve as regression tests
export class Foo {
    static instance = new Foo();
    type: MyEnum = MyEnum.Foo;

    getType(): MyEnum {
        return this.type || MyEnum.Foo;
    }
}

declare const obj: { Bar: string };

export class Bar {
    static instance = new Bar();
    prop = obj.Bar;

    method() {
        return obj.Bar;
    }
}

class Other {
    static Baz = 42;
}

export class Baz {
    static instance = new Baz();
    prop = Other.Baz;
}

// Class EXPRESSION with self-reference and transformable static fields.
// At target < ES2022, the class fields transformer creates a temp variable alias,
// so property access names must not be incorrectly substituted.
declare const obj2: { Qux: number };

const MyClass = class Qux {
    static ref = new Qux();
    static count = Qux.ref ? 1 : 0;
    prop = obj2.Qux;
    method() {
        return MyEnum.Foo;
    }
}



//// [classFieldsPropertyAccessSameNameAsClass.js]
var _a;
export var MyEnum;
(function (MyEnum) {
    MyEnum["Foo"] = "FooValue";
    MyEnum["Bar"] = "BarValue";
})(MyEnum || (MyEnum = {}));
// Class declarations with self-reference - alias is same-name, so bug is invisible
// but these still serve as regression tests
export class Foo {
    constructor() {
        this.type = MyEnum.Foo;
    }
    getType() {
        return this.type || MyEnum.Foo;
    }
}
Foo.instance = new Foo();
export class Bar {
    constructor() {
        this.prop = obj.Bar;
    }
    method() {
        return obj.Bar;
    }
}
Bar.instance = new Bar();
class Other {
}
Other.Baz = 42;
export class Baz {
    constructor() {
        this.prop = Other.Baz;
    }
}
Baz.instance = new Baz();
const MyClass = (_a = class Qux {
        constructor() {
            this.prop = obj2.Qux;
        }
        method() {
            return MyEnum.Foo;
        }
    },
    _a.ref = new _a(),
    _a.count = _a.ref ? 1 : 0,
    _a);

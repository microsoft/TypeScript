//// [tests/cases/compiler/classFieldsPrivatePropertyAccessSameNameAsClass.ts] ////

//// [classFieldsPrivatePropertyAccessSameNameAsClass.ts]
export enum MyEnum {
    Foo = "FooValue",
    Bar = "BarValue",
}

// Private fields on a class trigger class alias creation at target < ES2022.
// Enum member access with same name as class should not be renamed.
export class Foo {
    #private = 1;
    static instance = new Foo();
    type: MyEnum = MyEnum.Foo;

    getType(): MyEnum {
        return this.type || MyEnum.Foo;
    }

    getPrivate() {
        return this.#private;
    }
}

// Property access with same name as class in static context
declare const obj: { Bar: number };

export class Bar {
    #data = 0;
    static ref = new Bar();
    static prop = obj.Bar;
}

// Class expression with private fields and self-reference
declare const obj2: { Baz: string };

const MyClass = class Baz {
    #field = 1;
    static instance = new Baz();
    prop = obj2.Baz;
}


//// [classFieldsPrivatePropertyAccessSameNameAsClass.js]
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Foo_private, _Bar_data, _Baz_field, _a;
export var MyEnum;
(function (MyEnum) {
    MyEnum["Foo"] = "FooValue";
    MyEnum["Bar"] = "BarValue";
})(MyEnum || (MyEnum = {}));
// Private fields on a class trigger class alias creation at target < ES2022.
// Enum member access with same name as class should not be renamed.
export class Foo {
    constructor() {
        _Foo_private.set(this, 1);
        this.type = MyEnum.Foo;
    }
    getType() {
        return this.type || MyEnum.Foo;
    }
    getPrivate() {
        return __classPrivateFieldGet(this, _Foo_private, "f");
    }
}
_Foo_private = new WeakMap();
Foo.instance = new Foo();
export class Bar {
    constructor() {
        _Bar_data.set(this, 0);
    }
}
_Bar_data = new WeakMap();
Bar.ref = new Bar();
Bar.prop = obj.Bar;
const MyClass = (_a = class Baz {
        constructor() {
            _Baz_field.set(this, 1);
            this.prop = obj2.Baz;
        }
    },
    _Baz_field = new WeakMap(),
    _a.instance = new _a(),
    _a);

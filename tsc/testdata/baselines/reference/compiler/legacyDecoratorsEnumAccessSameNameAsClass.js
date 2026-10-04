//// [tests/cases/compiler/legacyDecoratorsEnumAccessSameNameAsClass.ts] ////

//// [legacyDecoratorsEnumAccessSameNameAsClass.ts]
export enum MyEnum {
    Foo = "FooValue",
    Bar = "BarValue",
}

function myDecorator(target: any) {
    return target;
}

// Enum member access should not be renamed
@myDecorator
export class Foo {
    type: MyEnum = MyEnum.Foo;

    getType(): MyEnum {
        return this.type || MyEnum.Foo;
    }
}

// Property access on object should not rename the property name
declare const obj: { Bar: string };

@myDecorator
export class Bar {
    prop = obj.Bar;

    method() {
        return obj.Bar;
    }
}

// Nested property access should not rename the innermost name
declare const nested: { a: { Baz: number } };

@myDecorator
export class Baz {
    prop = nested.a.Baz;
}

// Static member of another class should not rename the property name
class Other {
    static Qux = 42;
}

@myDecorator
export class Qux {
    prop = Other.Qux;
}

// Standalone reference to the class SHOULD still be renamed (self-reference)
@myDecorator
export class SelfRef {
    static instance = new SelfRef();
    method() {
        return SelfRef;
    }
}


//// [legacyDecoratorsEnumAccessSameNameAsClass.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SelfRef_1;
export var MyEnum;
(function (MyEnum) {
    MyEnum["Foo"] = "FooValue";
    MyEnum["Bar"] = "BarValue";
})(MyEnum || (MyEnum = {}));
function myDecorator(target) {
    return target;
}
// Enum member access should not be renamed
let Foo = class Foo {
    type = MyEnum.Foo;
    getType() {
        return this.type || MyEnum.Foo;
    }
};
Foo = __decorate([
    myDecorator
], Foo);
export { Foo };
let Bar = class Bar {
    prop = obj.Bar;
    method() {
        return obj.Bar;
    }
};
Bar = __decorate([
    myDecorator
], Bar);
export { Bar };
let Baz = class Baz {
    prop = nested.a.Baz;
};
Baz = __decorate([
    myDecorator
], Baz);
export { Baz };
// Static member of another class should not rename the property name
class Other {
    static Qux = 42;
}
let Qux = class Qux {
    prop = Other.Qux;
};
Qux = __decorate([
    myDecorator
], Qux);
export { Qux };
// Standalone reference to the class SHOULD still be renamed (self-reference)
let SelfRef = class SelfRef {
    static { SelfRef_1 = this; }
    static instance = new SelfRef_1();
    method() {
        return SelfRef_1;
    }
};
SelfRef = SelfRef_1 = __decorate([
    myDecorator
], SelfRef);
export { SelfRef };

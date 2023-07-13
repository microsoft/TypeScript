//// [tests/cases/compiler/complexClassRelationships.ts] ////

//// [complexClassRelationships.ts]
// There should be no errors in this file
class Derived extends Base {
    public static createEmpty(): Derived {
        var item = new Derived();
        return item;
    }
}
class BaseCollection<T extends Base> {
    constructor(f: () => T) {
        (item: Thing) => { return [item.Components]; };
    }
}
class Base {
    ownerCollection: BaseCollection<Base>;
}

class Thing {
    public get Components(): ComponentCollection<any> { return null }
}

class ComponentCollection<T> {
    private static sortComponents(p: Foo) {
        return p.prop1;
    }
}

class Foo {
    public get prop1() {
        return new GenericType<string>(this);
    }
    public populate() {
        this.prop2;
    }
    public get prop2(): BaseCollection<Derived> {
        return new BaseCollection<Derived>(Derived.createEmpty);
    }
}

class GenericType<T> {
    constructor(parent: FooBase) { }
}

class FooBase {
    public populate() {

    }
}

//// [complexClassRelationships.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// There should be no errors in this file
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Derived.createEmpty = function () {
        var item = new Derived();
        return item;
    };
    return Derived;
}(Base));
var BaseCollection = /** @class */ (function () {
    function BaseCollection(f) {
        (function (item) { return [item.Components]; });
    }
    return BaseCollection;
}());
var Base = /** @class */ (function () {
    function Base() {
    }
    return Base;
}());
var Thing = /** @class */ (function () {
    function Thing() {
    }
    Object.defineProperty(Thing.prototype, "Components", {
        get: function () { return null; },
        enumerable: false,
        configurable: true
    });
    return Thing;
}());
var ComponentCollection = /** @class */ (function () {
    function ComponentCollection() {
    }
    ComponentCollection.sortComponents = function (p) {
        return p.prop1;
    };
    return ComponentCollection;
}());
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Object.defineProperty(Foo.prototype, "prop1", {
        get: function () {
            return new GenericType(this);
        },
        enumerable: false,
        configurable: true
    });
    Foo.prototype.populate = function () {
        this.prop2;
    };
    Object.defineProperty(Foo.prototype, "prop2", {
        get: function () {
            return new BaseCollection(Derived.createEmpty);
        },
        enumerable: false,
        configurable: true
    });
    return Foo;
}());
var GenericType = /** @class */ (function () {
    function GenericType(parent) {
    }
    return GenericType;
}());
var FooBase = /** @class */ (function () {
    function FooBase() {
    }
    FooBase.prototype.populate = function () {
    };
    return FooBase;
}());

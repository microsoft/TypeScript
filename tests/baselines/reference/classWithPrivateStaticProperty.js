//// [classWithPrivateStaticProperty.ts]
class GrandParent {
    private static privateStaticGrandParent = "unset";
    protected static protectedStaticGrandParent = "unset";
    public static publicStaticGrandParent = "unset";

    testGrandparent() {
        GrandParent.privateStaticGrandParent = "set";
        GrandParent.protectedStaticGrandParent = "set";
        GrandParent.publicStaticGrandParent = "set";

        Parent.privateStaticGrandParent = "set";
        Parent.protectedStaticGrandParent = "set";
        Parent.publicStaticGrandParent = "set";
        Parent.privateStaticParent = "set";
        Parent.protectedStaticParent = "set";
        Parent.publicStaticParent = "set";

        Child.privateStaticGrandParent = "set";
        Child.protectedStaticGrandParent = "set";
        Child.publicStaticGrandParent = "set";
        Child.privateStaticParent = "set";
        Child.protectedStaticParent = "set";
        Child.publicStaticParent = "set";
        Child.privateStaticChild = "set";
        Child.protectedStaticChild = "set";
        Child.publicStaticChild = "set";
    }
}

class Parent extends GrandParent {
    private static privateStaticParent = "unset";
    protected static protectedStaticParent = "unset";
    public static publicStaticParent = "unset";

    testParent() {
        GrandParent.privateStaticGrandParent = "set";
        GrandParent.protectedStaticGrandParent = "set";
        GrandParent.publicStaticGrandParent = "set";

        Parent.privateStaticGrandParent = "set";
        Parent.protectedStaticGrandParent = "set";
        Parent.publicStaticGrandParent = "set";
        Parent.privateStaticParent = "set";
        Parent.protectedStaticParent = "set";
        Parent.publicStaticParent = "set";

        Child.privateStaticGrandParent = "set";
        Child.protectedStaticGrandParent = "set";
        Child.publicStaticGrandParent = "set";
        Child.privateStaticParent = "set";
        Child.protectedStaticParent = "set";
        Child.publicStaticParent = "set";
        Child.privateStaticChild = "set";
        Child.protectedStaticChild = "set";
        Child.publicStaticChild = "set";
    }
}

class Child extends Parent {
    private static privateStaticChild = "unset";
    protected static protectedStaticChild = "unset";
    protected static publicStaticChild = "unset";

    testChild() {
        GrandParent.privateStaticGrandParent = "set";
        GrandParent.protectedStaticGrandParent = "set";
        GrandParent.publicStaticGrandParent = "set";

        Parent.privateStaticGrandParent = "set";
        Parent.protectedStaticGrandParent = "set";
        Parent.publicStaticGrandParent = "set";
        Parent.privateStaticParent = "set";
        Parent.protectedStaticParent = "set";
        Parent.publicStaticParent = "set";

        Child.privateStaticGrandParent = "set";
        Child.protectedStaticGrandParent = "set";
        Child.publicStaticGrandParent = "set";
        Child.privateStaticParent = "set";
        Child.protectedStaticParent = "set";
        Child.publicStaticParent = "set";
        Child.privateStaticChild = "set";
        Child.protectedStaticChild = "set";
        Child.publicStaticChild = "set";
    }
}


//// [classWithPrivateStaticProperty.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GrandParent = /** @class */ (function () {
    function GrandParent() {
    }
    GrandParent.prototype.testGrandparent = function () {
        GrandParent.privateStaticGrandParent = "set";
        GrandParent.protectedStaticGrandParent = "set";
        GrandParent.publicStaticGrandParent = "set";
        Parent.privateStaticGrandParent = "set";
        Parent.protectedStaticGrandParent = "set";
        Parent.publicStaticGrandParent = "set";
        Parent.privateStaticParent = "set";
        Parent.protectedStaticParent = "set";
        Parent.publicStaticParent = "set";
        Child.privateStaticGrandParent = "set";
        Child.protectedStaticGrandParent = "set";
        Child.publicStaticGrandParent = "set";
        Child.privateStaticParent = "set";
        Child.protectedStaticParent = "set";
        Child.publicStaticParent = "set";
        Child.privateStaticChild = "set";
        Child.protectedStaticChild = "set";
        Child.publicStaticChild = "set";
    };
    GrandParent.privateStaticGrandParent = "unset";
    GrandParent.protectedStaticGrandParent = "unset";
    GrandParent.publicStaticGrandParent = "unset";
    return GrandParent;
}());
var Parent = /** @class */ (function (_super) {
    __extends(Parent, _super);
    function Parent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Parent.prototype.testParent = function () {
        GrandParent.privateStaticGrandParent = "set";
        GrandParent.protectedStaticGrandParent = "set";
        GrandParent.publicStaticGrandParent = "set";
        Parent.privateStaticGrandParent = "set";
        Parent.protectedStaticGrandParent = "set";
        Parent.publicStaticGrandParent = "set";
        Parent.privateStaticParent = "set";
        Parent.protectedStaticParent = "set";
        Parent.publicStaticParent = "set";
        Child.privateStaticGrandParent = "set";
        Child.protectedStaticGrandParent = "set";
        Child.publicStaticGrandParent = "set";
        Child.privateStaticParent = "set";
        Child.protectedStaticParent = "set";
        Child.publicStaticParent = "set";
        Child.privateStaticChild = "set";
        Child.protectedStaticChild = "set";
        Child.publicStaticChild = "set";
    };
    Parent.privateStaticParent = "unset";
    Parent.protectedStaticParent = "unset";
    Parent.publicStaticParent = "unset";
    return Parent;
}(GrandParent));
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Child.prototype.testChild = function () {
        GrandParent.privateStaticGrandParent = "set";
        GrandParent.protectedStaticGrandParent = "set";
        GrandParent.publicStaticGrandParent = "set";
        Parent.privateStaticGrandParent = "set";
        Parent.protectedStaticGrandParent = "set";
        Parent.publicStaticGrandParent = "set";
        Parent.privateStaticParent = "set";
        Parent.protectedStaticParent = "set";
        Parent.publicStaticParent = "set";
        Child.privateStaticGrandParent = "set";
        Child.protectedStaticGrandParent = "set";
        Child.publicStaticGrandParent = "set";
        Child.privateStaticParent = "set";
        Child.protectedStaticParent = "set";
        Child.publicStaticParent = "set";
        Child.privateStaticChild = "set";
        Child.protectedStaticChild = "set";
        Child.publicStaticChild = "set";
    };
    Child.privateStaticChild = "unset";
    Child.protectedStaticChild = "unset";
    Child.publicStaticChild = "unset";
    return Child;
}(Parent));

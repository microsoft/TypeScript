//// [tests/cases/conformance/classes/classDeclarations/mergedInheritedClassInterface.ts] ////

//// [mergedInheritedClassInterface.ts]
interface BaseInterface {
    required: number;
    optional?: number;
}

class BaseClass {
    baseMethod() { }
    baseNumber: number;
}

interface Child extends BaseInterface {
    additional: number;
}

class Child extends BaseClass {
    classNumber: number;
    method() { }
}

interface ChildNoBaseClass extends BaseInterface {
    additional2: string;
}
class ChildNoBaseClass {
    classString: string;
    method2() { }
}
class Grandchild extends ChildNoBaseClass {
}

// checks if properties actually were merged
var child : Child;
child.required;
child.optional;
child.additional;
child.baseNumber;
child.classNumber;
child.baseMethod();
child.method();

var grandchild: Grandchild;
grandchild.required;
grandchild.optional;
grandchild.additional2;
grandchild.classString;
grandchild.method2();


//// [mergedInheritedClassInterface.js]
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
var BaseClass = /** @class */ (function () {
    function BaseClass() {
    }
    BaseClass.prototype.baseMethod = function () { };
    return BaseClass;
}());
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Child.prototype.method = function () { };
    return Child;
}(BaseClass));
var ChildNoBaseClass = /** @class */ (function () {
    function ChildNoBaseClass() {
    }
    ChildNoBaseClass.prototype.method2 = function () { };
    return ChildNoBaseClass;
}());
var Grandchild = /** @class */ (function (_super) {
    __extends(Grandchild, _super);
    function Grandchild() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Grandchild;
}(ChildNoBaseClass));
// checks if properties actually were merged
var child;
child.required;
child.optional;
child.additional;
child.baseNumber;
child.classNumber;
child.baseMethod();
child.method();
var grandchild;
grandchild.required;
grandchild.optional;
grandchild.additional2;
grandchild.classString;
grandchild.method2();

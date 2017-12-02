//// [noImplicitOverride.ts]
// ******************************************************
// First set of cases deal with inheritance from Object. 
// ******************************************************

class RejectWhenOverrideAbsentOnInheritedMethod extends Object {
    toString(): string { return 'foo'; };
}
class AcceptWhenOverridePresentOnInheritedMethod extends Object {
    override toString(): string { return 'foo'; };
}

// Similar to previous cases where augmentation from Object is implicit
class RejectWhenOverrideAbsentOnAugmentedProperty {
    toString(): string { return 'foo'; };
}
class AcceptWhenOverridePresentOnAugumentedProperty extends Object {
    override toString(): string { return 'foo'; };
}

// This should fail via type mismatch of the return value.
// (test is not specific to the override checking code)
class RejectWhenOverrideTypeMismatchOnMethodThatMasksObjectTypeMember {
    toString(): number {
        return -1;
    }
}

// ******************************************************
// Next set of cases deal with inheritance derived from 
// an explicitly defined class. 
// ******************************************************

class Base {
    // Public property
    public userId: number = 1;
    // Accessor
    get name(): string { return 'Base'; }
    // Typical public method
    getMeaningOfLife(): number { return 42; }
    // Private method
    private processInternal(): void { }
}

class RejectWhenOverrideAbsentOnInheritedProperty extends Base {
    public userId = 2;
}
class AcceptWhenOverridePresentOnInheritedProperty extends Base {
    public override userId = 2;
}

class RejectWhenOverrideAbsentOnInheritedAccessor extends Base {
    get name(): string { return 'foo'; };
}
class AcceptWhenOverridePresentOnInheritedAccessor extends Base {
    override get name(): string { return 'foo'; };
}

class RejectWhenOverrideAbsentOnInheritedMethod extends Base {
    getMeaningOfLife(): number { return 24; };
}
class AcceptWhenOverridePresentOnInheritedMethod extends Base {
    override getMeaningOfLife(): number { return 24; };
}

class RejectWhenOverridePresentWithPrivateModifier extends Base {
    private override processInternal() { }
}

// ******************************************************
// Next set of cases deal with override within interfaces
// and abstract classes (where is should not be present). 
// ******************************************************

interface Shape {
    getWidth(): number;
}

interface RejectWhenOverridePresentOnInterfaceDeclaration extends Shape {
    override getWidth(): number;
}

interface AcceptWhenOverrideAbsentOnInterfaceDeclaration extends Shape {
    getWidth(): number;
}

// ******************************************************
// Next set of cases deal with override with abstract 
// classes. 
// ******************************************************

abstract class Animal {
    protected readonly name: string

    constructor(name: string) {
        this.name = name;
    }

    abstract speak(): string;
}

abstract class RejectWhenOverridePresentWithAbstractModifier extends Animal {
    abstract override speak(): string;
}

abstract class AcceptWhenOverridePresentOnConcreteDeclaration extends Animal {
    override speak(): string { return "Woof!"; }
}

// ******************************************************
// Next set of cases deal with override with mixins 
// ******************************************************

const mixin = <BC extends new (...args: any[]) => {}>(Base: BC) => class extends Base {
    mixedIn() {}
};

class A {
    normal() {}
}

class RejectWhenOverrideAbsentOnInheritedMethodMixin extends mixin(A) {
    normal() {} 
    mixedIn() {} 
}

class AcceptWhenOverridePresentOnInheritedMethodMixin extends mixin(A) {
    override normal() {} 
    override mixedIn() {} 
}

// ********************************************************
// Next set of cases deal with override specified via JsDoc
// ********************************************************

//class AcceptWhenOverrideSpecifiedByJSDocAnnotation extends Animal {
//    /** @override */ public speak(): string { return "Woof!" }
//}


//// [noImplicitOverride.js]
// ******************************************************
// First set of cases deal with inheritance from Object. 
// ******************************************************
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var RejectWhenOverrideAbsentOnInheritedMethod = /** @class */ (function (_super) {
    __extends(RejectWhenOverrideAbsentOnInheritedMethod, _super);
    function RejectWhenOverrideAbsentOnInheritedMethod() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RejectWhenOverrideAbsentOnInheritedMethod.prototype.toString = function () { return 'foo'; };
    ;
    return RejectWhenOverrideAbsentOnInheritedMethod;
}(Object));
var AcceptWhenOverridePresentOnInheritedMethod = /** @class */ (function (_super) {
    __extends(AcceptWhenOverridePresentOnInheritedMethod, _super);
    function AcceptWhenOverridePresentOnInheritedMethod() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AcceptWhenOverridePresentOnInheritedMethod.prototype.toString = function () { return 'foo'; };
    ;
    return AcceptWhenOverridePresentOnInheritedMethod;
}(Object));
// Similar to previous cases where augmentation from Object is implicit
var RejectWhenOverrideAbsentOnAugmentedProperty = /** @class */ (function () {
    function RejectWhenOverrideAbsentOnAugmentedProperty() {
    }
    RejectWhenOverrideAbsentOnAugmentedProperty.prototype.toString = function () { return 'foo'; };
    ;
    return RejectWhenOverrideAbsentOnAugmentedProperty;
}());
var AcceptWhenOverridePresentOnAugumentedProperty = /** @class */ (function (_super) {
    __extends(AcceptWhenOverridePresentOnAugumentedProperty, _super);
    function AcceptWhenOverridePresentOnAugumentedProperty() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AcceptWhenOverridePresentOnAugumentedProperty.prototype.toString = function () { return 'foo'; };
    ;
    return AcceptWhenOverridePresentOnAugumentedProperty;
}(Object));
// This should fail via type mismatch of the return value.
// (test is not specific to the override checking code)
var RejectWhenOverrideTypeMismatchOnMethodThatMasksObjectTypeMember = /** @class */ (function () {
    function RejectWhenOverrideTypeMismatchOnMethodThatMasksObjectTypeMember() {
    }
    RejectWhenOverrideTypeMismatchOnMethodThatMasksObjectTypeMember.prototype.toString = function () {
        return -1;
    };
    return RejectWhenOverrideTypeMismatchOnMethodThatMasksObjectTypeMember;
}());
// ******************************************************
// Next set of cases deal with inheritance derived from 
// an explicitly defined class. 
// ******************************************************
var Base = /** @class */ (function () {
    function Base() {
        // Public property
        this.userId = 1;
    }
    Object.defineProperty(Base.prototype, "name", {
        // Accessor
        get: function () { return 'Base'; },
        enumerable: true,
        configurable: true
    });
    // Typical public method
    Base.prototype.getMeaningOfLife = function () { return 42; };
    // Private method
    Base.prototype.processInternal = function () { };
    return Base;
}());
var RejectWhenOverrideAbsentOnInheritedProperty = /** @class */ (function (_super) {
    __extends(RejectWhenOverrideAbsentOnInheritedProperty, _super);
    function RejectWhenOverrideAbsentOnInheritedProperty() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.userId = 2;
        return _this;
    }
    return RejectWhenOverrideAbsentOnInheritedProperty;
}(Base));
var AcceptWhenOverridePresentOnInheritedProperty = /** @class */ (function (_super) {
    __extends(AcceptWhenOverridePresentOnInheritedProperty, _super);
    function AcceptWhenOverridePresentOnInheritedProperty() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.userId = 2;
        return _this;
    }
    return AcceptWhenOverridePresentOnInheritedProperty;
}(Base));
var RejectWhenOverrideAbsentOnInheritedAccessor = /** @class */ (function (_super) {
    __extends(RejectWhenOverrideAbsentOnInheritedAccessor, _super);
    function RejectWhenOverrideAbsentOnInheritedAccessor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RejectWhenOverrideAbsentOnInheritedAccessor.prototype, "name", {
        get: function () { return 'foo'; },
        enumerable: true,
        configurable: true
    });
    ;
    return RejectWhenOverrideAbsentOnInheritedAccessor;
}(Base));
var AcceptWhenOverridePresentOnInheritedAccessor = /** @class */ (function (_super) {
    __extends(AcceptWhenOverridePresentOnInheritedAccessor, _super);
    function AcceptWhenOverridePresentOnInheritedAccessor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AcceptWhenOverridePresentOnInheritedAccessor.prototype, "name", {
        get: function () { return 'foo'; },
        enumerable: true,
        configurable: true
    });
    ;
    return AcceptWhenOverridePresentOnInheritedAccessor;
}(Base));
var RejectWhenOverrideAbsentOnInheritedMethod = /** @class */ (function (_super) {
    __extends(RejectWhenOverrideAbsentOnInheritedMethod, _super);
    function RejectWhenOverrideAbsentOnInheritedMethod() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RejectWhenOverrideAbsentOnInheritedMethod.prototype.getMeaningOfLife = function () { return 24; };
    ;
    return RejectWhenOverrideAbsentOnInheritedMethod;
}(Base));
var AcceptWhenOverridePresentOnInheritedMethod = /** @class */ (function (_super) {
    __extends(AcceptWhenOverridePresentOnInheritedMethod, _super);
    function AcceptWhenOverridePresentOnInheritedMethod() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AcceptWhenOverridePresentOnInheritedMethod.prototype.getMeaningOfLife = function () { return 24; };
    ;
    return AcceptWhenOverridePresentOnInheritedMethod;
}(Base));
var RejectWhenOverridePresentWithPrivateModifier = /** @class */ (function (_super) {
    __extends(RejectWhenOverridePresentWithPrivateModifier, _super);
    function RejectWhenOverridePresentWithPrivateModifier() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RejectWhenOverridePresentWithPrivateModifier.prototype.processInternal = function () { };
    return RejectWhenOverridePresentWithPrivateModifier;
}(Base));
// ******************************************************
// Next set of cases deal with override with abstract 
// classes. 
// ******************************************************
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
var RejectWhenOverridePresentWithAbstractModifier = /** @class */ (function (_super) {
    __extends(RejectWhenOverridePresentWithAbstractModifier, _super);
    function RejectWhenOverridePresentWithAbstractModifier() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RejectWhenOverridePresentWithAbstractModifier;
}(Animal));
var AcceptWhenOverridePresentOnConcreteDeclaration = /** @class */ (function (_super) {
    __extends(AcceptWhenOverridePresentOnConcreteDeclaration, _super);
    function AcceptWhenOverridePresentOnConcreteDeclaration() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AcceptWhenOverridePresentOnConcreteDeclaration.prototype.speak = function () { return "Woof!"; };
    return AcceptWhenOverridePresentOnConcreteDeclaration;
}(Animal));
// ******************************************************
// Next set of cases deal with override with mixins 
// ******************************************************
var mixin = function (Base) { return /** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    class_1.prototype.mixedIn = function () { };
    return class_1;
}(Base)); };
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.normal = function () { };
    return A;
}());
var RejectWhenOverrideAbsentOnInheritedMethodMixin = /** @class */ (function (_super) {
    __extends(RejectWhenOverrideAbsentOnInheritedMethodMixin, _super);
    function RejectWhenOverrideAbsentOnInheritedMethodMixin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RejectWhenOverrideAbsentOnInheritedMethodMixin.prototype.normal = function () { };
    RejectWhenOverrideAbsentOnInheritedMethodMixin.prototype.mixedIn = function () { };
    return RejectWhenOverrideAbsentOnInheritedMethodMixin;
}(mixin(A)));
var AcceptWhenOverridePresentOnInheritedMethodMixin = /** @class */ (function (_super) {
    __extends(AcceptWhenOverridePresentOnInheritedMethodMixin, _super);
    function AcceptWhenOverridePresentOnInheritedMethodMixin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AcceptWhenOverridePresentOnInheritedMethodMixin.prototype.normal = function () { };
    AcceptWhenOverridePresentOnInheritedMethodMixin.prototype.mixedIn = function () { };
    return AcceptWhenOverridePresentOnInheritedMethodMixin;
}(mixin(A)));
// ********************************************************
// Next set of cases deal with override specified via JsDoc
// ********************************************************
//class AcceptWhenOverrideSpecifiedByJSDocAnnotation extends Animal {
//    /** @override */ public speak(): string { return "Woof!" }
//}

//// [noImplicitOverride.ts]

class Base {
    get name(): string {
        return 'Base';
    }
    public userId: number = 1;
}

class RejectWhenOverrideMissingOnInheritedMethod extends Object {
    toString(): string { return 'foo'; };
    hasOwnProperty(prop: string): boolean {
        return super.hasOwnProperty(prop);
    }
}

class RejectWhenOverrideMissingOnMethodThatMasksObjectTypeMember {
    toString(): string { return 'foo'; };
    hasOwnProperty(prop: string): boolean {
        return false;
    }
}

class RejectWhenOverrideTypeMismatchOnMethodThatMasksObjectTypeMember {
    hasOwnProperty(prop: string): number {
        return -1;
    }
}

class RejectWhenOverrideMissingOnInheritedProperty extends Base {
    public userId = 2;
}

class RejectWhenOverrideMissingOnInheritedAccessor extends Base {
    get name(): string { return 'foo'; };
}

interface Shape {
    getWidth(): number;
}

interface RejectWhenOverrideOnAbstractDeclaration_Line extends Shape {
    override getWidth(): number;
}

interface AcceptWhenOverrideNotOnAbstractDeclaration_Line extends Shape {
    // abstract members don't need to be declared override
    getWidth(): number;
}

class FIXME_AcceptWhenOverrideSpecifiedByJSDocAnnotation extends Base {
    /** @override */ public userId: number = 2;
}


//// [noImplicitOverride.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    function Base() {
        this.userId = 1;
    }
    Object.defineProperty(Base.prototype, "name", {
        get: function () {
            return 'Base';
        },
        enumerable: true,
        configurable: true
    });
    return Base;
}());
var RejectWhenOverrideMissingOnInheritedMethod = (function (_super) {
    __extends(RejectWhenOverrideMissingOnInheritedMethod, _super);
    function RejectWhenOverrideMissingOnInheritedMethod() {
        return _super.apply(this, arguments) || this;
    }
    RejectWhenOverrideMissingOnInheritedMethod.prototype.toString = function () { return 'foo'; };
    ;
    RejectWhenOverrideMissingOnInheritedMethod.prototype.hasOwnProperty = function (prop) {
        return _super.prototype.hasOwnProperty.call(this, prop);
    };
    return RejectWhenOverrideMissingOnInheritedMethod;
}(Object));
var RejectWhenOverrideMissingOnMethodThatMasksObjectTypeMember = (function () {
    function RejectWhenOverrideMissingOnMethodThatMasksObjectTypeMember() {
    }
    RejectWhenOverrideMissingOnMethodThatMasksObjectTypeMember.prototype.toString = function () { return 'foo'; };
    ;
    RejectWhenOverrideMissingOnMethodThatMasksObjectTypeMember.prototype.hasOwnProperty = function (prop) {
        return false;
    };
    return RejectWhenOverrideMissingOnMethodThatMasksObjectTypeMember;
}());
var RejectWhenOverrideTypeMismatchOnMethodThatMasksObjectTypeMember = (function () {
    function RejectWhenOverrideTypeMismatchOnMethodThatMasksObjectTypeMember() {
    }
    RejectWhenOverrideTypeMismatchOnMethodThatMasksObjectTypeMember.prototype.hasOwnProperty = function (prop) {
        return -1;
    };
    return RejectWhenOverrideTypeMismatchOnMethodThatMasksObjectTypeMember;
}());
var RejectWhenOverrideMissingOnInheritedProperty = (function (_super) {
    __extends(RejectWhenOverrideMissingOnInheritedProperty, _super);
    function RejectWhenOverrideMissingOnInheritedProperty() {
        var _this = _super.apply(this, arguments) || this;
        _this.userId = 2;
        return _this;
    }
    return RejectWhenOverrideMissingOnInheritedProperty;
}(Base));
var RejectWhenOverrideMissingOnInheritedAccessor = (function (_super) {
    __extends(RejectWhenOverrideMissingOnInheritedAccessor, _super);
    function RejectWhenOverrideMissingOnInheritedAccessor() {
        return _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RejectWhenOverrideMissingOnInheritedAccessor.prototype, "name", {
        get: function () { return 'foo'; },
        enumerable: true,
        configurable: true
    });
    ;
    return RejectWhenOverrideMissingOnInheritedAccessor;
}(Base));
var FIXME_AcceptWhenOverrideSpecifiedByJSDocAnnotation = (function (_super) {
    __extends(FIXME_AcceptWhenOverrideSpecifiedByJSDocAnnotation, _super);
    function FIXME_AcceptWhenOverrideSpecifiedByJSDocAnnotation() {
        var _this = _super.apply(this, arguments) || this;
        /** @override */ _this.userId = 2;
        return _this;
    }
    return FIXME_AcceptWhenOverrideSpecifiedByJSDocAnnotation;
}(Base));

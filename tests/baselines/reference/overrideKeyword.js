//// [overrideKeyword.ts]

abstract class AbstractBase {
    static toStringStatic(): string { return 'static member'; }
    public toString(): string { return 'instance member'; };
    abstract toStringAbstract(): string;
    private toStringPrivate(): string { return 'private member'; }
    getMeaningOfLife(): number { return 42; }
    public wasDisposed?: boolean;
}

class Base extends AbstractBase {
    private name_: string;

    toStringAbstract(): string { return 'implementation of abstract member'; };

    get name() {
        return this.name_;
    }

    set name(name: string) {
        this.name_ = name;
    }

    // override cannot be used with optional property.
    public override wasDisposed?: boolean;
}

abstract class RejectWhenAttemptToOverrideAbstractMethod extends AbstractBase {
    abstract override toStringAbstract(): string;
}

class RejectWhenAttemptToOverrideStaticMethod extends Base {
    override static toStringStatic() { return ''; };
}

class RejectWhenAttemptToOverridePrivateMethod extends Base {
    private override toStringPrivate() { return ''; };
}

class RejectWhenOverrideIsRepeated extends Base {
    public override override toString() { return ''; };
}

class RejectWhenOverridePrecedesAccessModifier extends Base {
    override public toString() { return ''; };
}

class RejectWhenOverrideMarkedOnNonInheritedMember extends Base {
    public override iDontExist() { return ''; };
}

class RejectWhenOverrideHasMismatchedType extends Base {
    override getMeaningOfLife(): string { return 'forty-two'; };
}

class RejectWhenAccessorNotBothOverride extends Base {
    override get name() {
        return 'hardcoded value';
    }
    set name(n: string) {
    }
}

/* @mhegazy: is this an appropriate test for consecutive declarations? */
class RejectWhenOverrideDeclarationsAreNotConsecutive extends Base {

    override hasOwnProperty(prop: string): boolean {
        return super.hasOwnProperty(prop);
    }

    public getMeaningOfLife(): number {
        return 42;
    }

    override propertyIsEnumerable(prop: string): boolean {
        return super.propertyIsEnumerable(prop);
    }

}

class AcceptWhenOverrideFollowsAccessModifier extends Base {
    public override toString() { return ''; };
}

class AcceptWhenOverrideMemberExistsOnNonImmediateSuperclass extends Base {
    public override getMeaningOfLife(): number { return 12; };
}


//// [overrideKeyword.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractBase = (function () {
    function AbstractBase() {
    }
    AbstractBase.toStringStatic = function () { return 'static member'; };
    AbstractBase.prototype.toString = function () { return 'instance member'; };
    ;
    AbstractBase.prototype.toStringPrivate = function () { return 'private member'; };
    AbstractBase.prototype.getMeaningOfLife = function () { return 42; };
    return AbstractBase;
}());
var Base = (function (_super) {
    __extends(Base, _super);
    function Base() {
        return _super.apply(this, arguments) || this;
    }
    Base.prototype.toStringAbstract = function () { return 'implementation of abstract member'; };
    ;
    Object.defineProperty(Base.prototype, "name", {
        get: function () {
            return this.name_;
        },
        set: function (name) {
            this.name_ = name;
        },
        enumerable: true,
        configurable: true
    });
    return Base;
}(AbstractBase));
var RejectWhenAttemptToOverrideAbstractMethod = (function (_super) {
    __extends(RejectWhenAttemptToOverrideAbstractMethod, _super);
    function RejectWhenAttemptToOverrideAbstractMethod() {
        return _super.apply(this, arguments) || this;
    }
    return RejectWhenAttemptToOverrideAbstractMethod;
}(AbstractBase));
var RejectWhenAttemptToOverrideStaticMethod = (function (_super) {
    __extends(RejectWhenAttemptToOverrideStaticMethod, _super);
    function RejectWhenAttemptToOverrideStaticMethod() {
        return _super.apply(this, arguments) || this;
    }
    RejectWhenAttemptToOverrideStaticMethod.toStringStatic = function () { return ''; };
    ;
    return RejectWhenAttemptToOverrideStaticMethod;
}(Base));
var RejectWhenAttemptToOverridePrivateMethod = (function (_super) {
    __extends(RejectWhenAttemptToOverridePrivateMethod, _super);
    function RejectWhenAttemptToOverridePrivateMethod() {
        return _super.apply(this, arguments) || this;
    }
    RejectWhenAttemptToOverridePrivateMethod.prototype.toStringPrivate = function () { return ''; };
    ;
    return RejectWhenAttemptToOverridePrivateMethod;
}(Base));
var RejectWhenOverrideIsRepeated = (function (_super) {
    __extends(RejectWhenOverrideIsRepeated, _super);
    function RejectWhenOverrideIsRepeated() {
        return _super.apply(this, arguments) || this;
    }
    RejectWhenOverrideIsRepeated.prototype.toString = function () { return ''; };
    ;
    return RejectWhenOverrideIsRepeated;
}(Base));
var RejectWhenOverridePrecedesAccessModifier = (function (_super) {
    __extends(RejectWhenOverridePrecedesAccessModifier, _super);
    function RejectWhenOverridePrecedesAccessModifier() {
        return _super.apply(this, arguments) || this;
    }
    RejectWhenOverridePrecedesAccessModifier.prototype.toString = function () { return ''; };
    ;
    return RejectWhenOverridePrecedesAccessModifier;
}(Base));
var RejectWhenOverrideMarkedOnNonInheritedMember = (function (_super) {
    __extends(RejectWhenOverrideMarkedOnNonInheritedMember, _super);
    function RejectWhenOverrideMarkedOnNonInheritedMember() {
        return _super.apply(this, arguments) || this;
    }
    RejectWhenOverrideMarkedOnNonInheritedMember.prototype.iDontExist = function () { return ''; };
    ;
    return RejectWhenOverrideMarkedOnNonInheritedMember;
}(Base));
var RejectWhenOverrideHasMismatchedType = (function (_super) {
    __extends(RejectWhenOverrideHasMismatchedType, _super);
    function RejectWhenOverrideHasMismatchedType() {
        return _super.apply(this, arguments) || this;
    }
    RejectWhenOverrideHasMismatchedType.prototype.getMeaningOfLife = function () { return 'forty-two'; };
    ;
    return RejectWhenOverrideHasMismatchedType;
}(Base));
var RejectWhenAccessorNotBothOverride = (function (_super) {
    __extends(RejectWhenAccessorNotBothOverride, _super);
    function RejectWhenAccessorNotBothOverride() {
        return _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RejectWhenAccessorNotBothOverride.prototype, "name", {
        get: function () {
            return 'hardcoded value';
        },
        set: function (n) {
        },
        enumerable: true,
        configurable: true
    });
    return RejectWhenAccessorNotBothOverride;
}(Base));
/* @mhegazy: is this an appropriate test for consecutive declarations? */
var RejectWhenOverrideDeclarationsAreNotConsecutive = (function (_super) {
    __extends(RejectWhenOverrideDeclarationsAreNotConsecutive, _super);
    function RejectWhenOverrideDeclarationsAreNotConsecutive() {
        return _super.apply(this, arguments) || this;
    }
    RejectWhenOverrideDeclarationsAreNotConsecutive.prototype.hasOwnProperty = function (prop) {
        return _super.prototype.hasOwnProperty.call(this, prop);
    };
    RejectWhenOverrideDeclarationsAreNotConsecutive.prototype.getMeaningOfLife = function () {
        return 42;
    };
    RejectWhenOverrideDeclarationsAreNotConsecutive.prototype.propertyIsEnumerable = function (prop) {
        return _super.prototype.propertyIsEnumerable.call(this, prop);
    };
    return RejectWhenOverrideDeclarationsAreNotConsecutive;
}(Base));
var AcceptWhenOverrideFollowsAccessModifier = (function (_super) {
    __extends(AcceptWhenOverrideFollowsAccessModifier, _super);
    function AcceptWhenOverrideFollowsAccessModifier() {
        return _super.apply(this, arguments) || this;
    }
    AcceptWhenOverrideFollowsAccessModifier.prototype.toString = function () { return ''; };
    ;
    return AcceptWhenOverrideFollowsAccessModifier;
}(Base));
var AcceptWhenOverrideMemberExistsOnNonImmediateSuperclass = (function (_super) {
    __extends(AcceptWhenOverrideMemberExistsOnNonImmediateSuperclass, _super);
    function AcceptWhenOverrideMemberExistsOnNonImmediateSuperclass() {
        return _super.apply(this, arguments) || this;
    }
    AcceptWhenOverrideMemberExistsOnNonImmediateSuperclass.prototype.getMeaningOfLife = function () { return 12; };
    ;
    return AcceptWhenOverrideMemberExistsOnNonImmediateSuperclass;
}(Base));

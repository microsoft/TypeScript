//// [overrideKeywordEs5.ts]

abstract class AbstractBase {
    readonly id: string;
    public wasDisposed?: boolean;
    private name_: string;
    get name() { return this.name_; }
    set name(name: string) { this.name_ = name; }

    static toStringStatic(): string { return 'static'; }
    public toStringPublic(): string { return 'public'; };
    protected toStringProtected(): string { return 'protected'; }
    private toStringPrivate(): string { return 'private'; }
    private toStringPrivate2(): string { return 'private2'; }
    abstract toStringAbstract(): string;
    abstract toStringAbstract2(): string;

    getMeaningOfLife(): number { return 42; }
}

class Base extends AbstractBase {
    override toStringAbstract(): string { return 'implemented'; }
    override toStringAbstract2(): string { return 'implemented2'; }
}

// The expected order of modifiers:
//
// [public | protected | private] [abstract | override] [static] [readonly | async] [get | set] identifier
//
class RejectWhenOverridePrecedesPublicModifier extends Base { override public toStringPublic() { return ''; }; }
class RejectWhenOverridePrecedesProtectedModifier extends Base { override protected toStringProtected() { return ''; }; }
class RejectWhenStaticPrecedesOverrideModifier extends Base { static override toStringStatic() { return ''; }; }
class AcceptWhenOverrideFollowsAccessModifier extends Base { public override toStringPublic() { return ''; } }
class RejectWhenReadonlyPrecedesOverrideModifier extends Base { readonly override id: string; }

// Modifiers should never be repeated
class RejectWhenOverrideIsRepeated extends Base {
    public override override toStringPublic() { return ''; }
}

// You cannot override a private method
class RejectWhenOverridePrivateMethod extends Base {
    private override toStringPrivate() { return ''; }
    override private toStringPrivate2() { return ''; }
}

// Override and abstract on methods are orthogonal, should never be used together
abstract class RejectWhenOverrideAbstractMethod extends AbstractBase {
    abstract override toStringAbstract(): string;
    override abstract toStringAbstract2(): string;
}

// Acceptable to provide an override implementation in an abstract class however
abstract class AcceptWhenOverrideInAbstractClass extends AbstractBase {
    override toStringAbstract(): string { return 'implemented in abstract class'; }
}

// Override checks are allowed on static methods
class AcceptWhenOverrideStaticMethod extends Base {
    override static toStringStatic() { return 'static'; }
}

// Compiler already checks for access modifier narrowing,
// override does not alter these semantics.
class RejectWhenOverrideChangesAccessModifier extends Base {
    protected override static toStringStatic() { return 'member is now protected'; }
}

// Compiler should be able to traverse multiple levels of inheritance
// to assess for overriden members (already does this).
class AcceptWhenOverrideMemberExistsOnNonImmediateSuperclass extends Base {
    override getMeaningOfLife(): number { return 12; }
}

// Override cannot be used with optional property.
class RejectWhenOverrideOptionalProperty extends Base {
    public override wasDisposed?: boolean;
}

// If one accessor is marked override, they both should be.
class RejectWhenAccessorNotBothOverride extends Base {
    override get name() { return ''; }
    /*    */ set name(n: string) {}
}

// Compiler should detect when override member is not inherited or augmented
class RejectWhenOverrideMarkedOnNonInheritedMember extends Base {
    public override iDontExist() { return ''; }
}

// Compiler already detects overriden assignability mismatches,
// override keyword does not change these semantics
class RejectWhenOverrideHasMismatchedType extends Base {
    override getMeaningOfLife(): string { return 'the meaning of life is a number, not a string'; }
}

// Override is not be used on parameters
class RejectWhenOverrideIsOnAParameter {
    public sayHello(override name: string) { return 'hi'; }
}

// Override is not used on class...
override class RejectWhenOverrideIsOnClassDeclaration { public sayHello(name: string) { return ''; } }
override interface RejectWhenOverrideIsOnInterfaceDeclaration { sayHello(name: string); }

//... or interface declarations
interface RejectWhenOverrideInAnInterface {
    override sayHello(name: string);
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


//// [overrideKeywordEs5.js]
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
var AbstractBase = (function () {
    function AbstractBase() {
    }
    Object.defineProperty(AbstractBase.prototype, "name", {
        get: function () { return this.name_; },
        set: function (name) { this.name_ = name; },
        enumerable: true,
        configurable: true
    });
    AbstractBase.toStringStatic = function () { return 'static'; };
    AbstractBase.prototype.toStringPublic = function () { return 'public'; };
    ;
    AbstractBase.prototype.toStringProtected = function () { return 'protected'; };
    AbstractBase.prototype.toStringPrivate = function () { return 'private'; };
    AbstractBase.prototype.toStringPrivate2 = function () { return 'private2'; };
    AbstractBase.prototype.getMeaningOfLife = function () { return 42; };
    return AbstractBase;
}());
var Base = (function (_super) {
    __extends(Base, _super);
    function Base() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Base.prototype.toStringAbstract = function () { return 'implemented'; };
    Base.prototype.toStringAbstract2 = function () { return 'implemented2'; };
    return Base;
}(AbstractBase));
// The expected order of modifiers:
//
// [public | protected | private] [abstract | override] [static] [readonly | async] [get | set] identifier
//
var RejectWhenOverridePrecedesPublicModifier = (function (_super) {
    __extends(RejectWhenOverridePrecedesPublicModifier, _super);
    function RejectWhenOverridePrecedesPublicModifier() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RejectWhenOverridePrecedesPublicModifier.prototype.toStringPublic = function () { return ''; };
    ;
    return RejectWhenOverridePrecedesPublicModifier;
}(Base));
var RejectWhenOverridePrecedesProtectedModifier = (function (_super) {
    __extends(RejectWhenOverridePrecedesProtectedModifier, _super);
    function RejectWhenOverridePrecedesProtectedModifier() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RejectWhenOverridePrecedesProtectedModifier.prototype.toStringProtected = function () { return ''; };
    ;
    return RejectWhenOverridePrecedesProtectedModifier;
}(Base));
var RejectWhenStaticPrecedesOverrideModifier = (function (_super) {
    __extends(RejectWhenStaticPrecedesOverrideModifier, _super);
    function RejectWhenStaticPrecedesOverrideModifier() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RejectWhenStaticPrecedesOverrideModifier.toStringStatic = function () { return ''; };
    ;
    return RejectWhenStaticPrecedesOverrideModifier;
}(Base));
var AcceptWhenOverrideFollowsAccessModifier = (function (_super) {
    __extends(AcceptWhenOverrideFollowsAccessModifier, _super);
    function AcceptWhenOverrideFollowsAccessModifier() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AcceptWhenOverrideFollowsAccessModifier.prototype.toStringPublic = function () { return ''; };
    return AcceptWhenOverrideFollowsAccessModifier;
}(Base));
var RejectWhenReadonlyPrecedesOverrideModifier = (function (_super) {
    __extends(RejectWhenReadonlyPrecedesOverrideModifier, _super);
    function RejectWhenReadonlyPrecedesOverrideModifier() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RejectWhenReadonlyPrecedesOverrideModifier;
}(Base));
// Modifiers should never be repeated
var RejectWhenOverrideIsRepeated = (function (_super) {
    __extends(RejectWhenOverrideIsRepeated, _super);
    function RejectWhenOverrideIsRepeated() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RejectWhenOverrideIsRepeated.prototype.toStringPublic = function () { return ''; };
    return RejectWhenOverrideIsRepeated;
}(Base));
// You cannot override a private method
var RejectWhenOverridePrivateMethod = (function (_super) {
    __extends(RejectWhenOverridePrivateMethod, _super);
    function RejectWhenOverridePrivateMethod() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RejectWhenOverridePrivateMethod.prototype.toStringPrivate = function () { return ''; };
    RejectWhenOverridePrivateMethod.prototype.toStringPrivate2 = function () { return ''; };
    return RejectWhenOverridePrivateMethod;
}(Base));
// Override and abstract on methods are orthogonal, should never be used together
var RejectWhenOverrideAbstractMethod = (function (_super) {
    __extends(RejectWhenOverrideAbstractMethod, _super);
    function RejectWhenOverrideAbstractMethod() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RejectWhenOverrideAbstractMethod;
}(AbstractBase));
// Acceptable to provide an override implementation in an abstract class however
var AcceptWhenOverrideInAbstractClass = (function (_super) {
    __extends(AcceptWhenOverrideInAbstractClass, _super);
    function AcceptWhenOverrideInAbstractClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AcceptWhenOverrideInAbstractClass.prototype.toStringAbstract = function () { return 'implemented in abstract class'; };
    return AcceptWhenOverrideInAbstractClass;
}(AbstractBase));
// Override checks are allowed on static methods
var AcceptWhenOverrideStaticMethod = (function (_super) {
    __extends(AcceptWhenOverrideStaticMethod, _super);
    function AcceptWhenOverrideStaticMethod() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AcceptWhenOverrideStaticMethod.toStringStatic = function () { return 'static'; };
    return AcceptWhenOverrideStaticMethod;
}(Base));
// Compiler already checks for access modifier narrowing,
// override does not alter these semantics.
var RejectWhenOverrideChangesAccessModifier = (function (_super) {
    __extends(RejectWhenOverrideChangesAccessModifier, _super);
    function RejectWhenOverrideChangesAccessModifier() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RejectWhenOverrideChangesAccessModifier.toStringStatic = function () { return 'member is now protected'; };
    return RejectWhenOverrideChangesAccessModifier;
}(Base));
// Compiler should be able to traverse multiple levels of inheritance
// to assess for overriden members (already does this).
var AcceptWhenOverrideMemberExistsOnNonImmediateSuperclass = (function (_super) {
    __extends(AcceptWhenOverrideMemberExistsOnNonImmediateSuperclass, _super);
    function AcceptWhenOverrideMemberExistsOnNonImmediateSuperclass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AcceptWhenOverrideMemberExistsOnNonImmediateSuperclass.prototype.getMeaningOfLife = function () { return 12; };
    return AcceptWhenOverrideMemberExistsOnNonImmediateSuperclass;
}(Base));
// Override cannot be used with optional property.
var RejectWhenOverrideOptionalProperty = (function (_super) {
    __extends(RejectWhenOverrideOptionalProperty, _super);
    function RejectWhenOverrideOptionalProperty() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RejectWhenOverrideOptionalProperty;
}(Base));
// If one accessor is marked override, they both should be.
var RejectWhenAccessorNotBothOverride = (function (_super) {
    __extends(RejectWhenAccessorNotBothOverride, _super);
    function RejectWhenAccessorNotBothOverride() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RejectWhenAccessorNotBothOverride.prototype, "name", {
        get: function () { return ''; },
        /*    */ set: function (n) { },
        enumerable: true,
        configurable: true
    });
    return RejectWhenAccessorNotBothOverride;
}(Base));
// Compiler should detect when override member is not inherited or augmented
var RejectWhenOverrideMarkedOnNonInheritedMember = (function (_super) {
    __extends(RejectWhenOverrideMarkedOnNonInheritedMember, _super);
    function RejectWhenOverrideMarkedOnNonInheritedMember() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RejectWhenOverrideMarkedOnNonInheritedMember.prototype.iDontExist = function () { return ''; };
    return RejectWhenOverrideMarkedOnNonInheritedMember;
}(Base));
// Compiler already detects overriden assignability mismatches,
// override keyword does not change these semantics
var RejectWhenOverrideHasMismatchedType = (function (_super) {
    __extends(RejectWhenOverrideHasMismatchedType, _super);
    function RejectWhenOverrideHasMismatchedType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RejectWhenOverrideHasMismatchedType.prototype.getMeaningOfLife = function () { return 'the meaning of life is a number, not a string'; };
    return RejectWhenOverrideHasMismatchedType;
}(Base));
// Override is not be used on parameters
var RejectWhenOverrideIsOnAParameter = (function () {
    function RejectWhenOverrideIsOnAParameter() {
    }
    RejectWhenOverrideIsOnAParameter.prototype.sayHello = function (name) { return 'hi'; };
    return RejectWhenOverrideIsOnAParameter;
}());
// Override is not used on class...
var RejectWhenOverrideIsOnClassDeclaration = (function () {
    function RejectWhenOverrideIsOnClassDeclaration() {
    }
    RejectWhenOverrideIsOnClassDeclaration.prototype.sayHello = function (name) { return ''; };
    return RejectWhenOverrideIsOnClassDeclaration;
}());
/* @mhegazy: is this an appropriate test for consecutive declarations? */
var RejectWhenOverrideDeclarationsAreNotConsecutive = (function (_super) {
    __extends(RejectWhenOverrideDeclarationsAreNotConsecutive, _super);
    function RejectWhenOverrideDeclarationsAreNotConsecutive() {
        return _super !== null && _super.apply(this, arguments) || this;
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


//// [overrideKeywordEs5.d.ts]
declare abstract class AbstractBase {
    readonly id: string;
    wasDisposed?: boolean;
    private name_;
    name: string;
    static toStringStatic(): string;
    toStringPublic(): string;
    protected toStringProtected(): string;
    private toStringPrivate();
    private toStringPrivate2();
    abstract toStringAbstract(): string;
    abstract toStringAbstract2(): string;
    getMeaningOfLife(): number;
}
declare class Base extends AbstractBase {
    override toStringAbstract(): string;
    override toStringAbstract2(): string;
}
declare class RejectWhenOverridePrecedesPublicModifier extends Base {
    override toStringPublic(): string;
}
declare class RejectWhenOverridePrecedesProtectedModifier extends Base {
    protected override toStringProtected(): string;
}
declare class RejectWhenStaticPrecedesOverrideModifier extends Base {
    static override toStringStatic(): string;
}
declare class AcceptWhenOverrideFollowsAccessModifier extends Base {
    override toStringPublic(): string;
}
declare class RejectWhenReadonlyPrecedesOverrideModifier extends Base {
    override readonly id: string;
}
declare class RejectWhenOverrideIsRepeated extends Base {
    override toStringPublic(): string;
}
declare class RejectWhenOverridePrivateMethod extends Base {
    private override toStringPrivate();
    private override toStringPrivate2();
}
declare abstract class RejectWhenOverrideAbstractMethod extends AbstractBase {
    override abstract toStringAbstract(): string;
    override abstract toStringAbstract2(): string;
}
declare abstract class AcceptWhenOverrideInAbstractClass extends AbstractBase {
    override toStringAbstract(): string;
}
declare class AcceptWhenOverrideStaticMethod extends Base {
    static override toStringStatic(): string;
}
declare class RejectWhenOverrideChangesAccessModifier extends Base {
    protected static override toStringStatic(): string;
}
declare class AcceptWhenOverrideMemberExistsOnNonImmediateSuperclass extends Base {
    override getMeaningOfLife(): number;
}
declare class RejectWhenOverrideOptionalProperty extends Base {
    override wasDisposed?: boolean;
}
declare class RejectWhenAccessorNotBothOverride extends Base {
    override name: string;
}
declare class RejectWhenOverrideMarkedOnNonInheritedMember extends Base {
    override iDontExist(): string;
}
declare class RejectWhenOverrideHasMismatchedType extends Base {
    override getMeaningOfLife(): string;
}
declare class RejectWhenOverrideIsOnAParameter {
    sayHello(name: string): string;
}
declare class RejectWhenOverrideIsOnClassDeclaration {
    sayHello(name: string): string;
}
interface RejectWhenOverrideIsOnInterfaceDeclaration {
    sayHello(name: string): any;
}
interface RejectWhenOverrideInAnInterface {
    sayHello(name: string): any;
}
declare class RejectWhenOverrideDeclarationsAreNotConsecutive extends Base {
    override hasOwnProperty(prop: string): boolean;
    getMeaningOfLife(): number;
    override propertyIsEnumerable(prop: string): boolean;
}

// @declaration: true
// @noImplicitOverride: false
// @target: es5

// ==============================================================
// Utility classes used in later test sections
// ==============================================================

class StaticBase {
    static id: number = 1;

    static toStringStatic(): string { 
        return ''; 
    }
}

class InstanceBase {
    public publicId: number = 1;
    protected protectedId: number = 1;
    private privateId: number = 1;

    public toStringPublic(): string { 
        return ''; 
    }

    protected toStringProtected(): string { 
        return ''; 
    }

    private toStringPrivate(): string { 
        return ''; 
    }
}

class ReadonlyBase {
    readonly id: number;
}

class OptionalBase {
    readonly id?: number;
}

class AccessorBase {
    get id(): number { return 1; }
    set id(id: number) {}
}

abstract class AbstractBase {
    abstract id: number;
    abstract toStringAbstract(): string;
}

const mixin = <BC extends new (...args: any[]) => {}>(Base: BC) => class extends Base {
    mixedIn() {}
};

class MixinBase {
    normal() {}
}

class DerivedBase extends InstanceBase {
}

interface InterfaceBase {
    id: number;
    toStringInterface(): string;
}

interface IndexSignature {
    [key: string]: string
}

// ==============================================================
// Tests that deal with modifier ordering
// ==============================================================

// Expected order of modifiers:
//
// [public | protected | private] [abstract | override] [static] [readonly | async] [get | set] identifier
//

// Override should not be repeated
class RejectWhenOverrideIsRepeated extends InstanceBase {
    override override toStringPublic() { return ''; }
}

// Override should not be present on private members
class RejectWhenOverrideOnPrivateMethod extends InstanceBase {
    private override privateId = 2;
    private override toStringPrivate() { return ''; }
}

// override should follow protected
class RejectWhenOverridePrecedesProtectedModifier extends InstanceBase { 
    override protected protectedId: number;
    override protected toStringProtected() { return ''; }; 
}
class AcceptWhenOverrideSuccedesProtectedModifier extends InstanceBase { 
    protected override protectedId: number;
    protected override toStringProtected() { return ''; }; 
}

// override should follow public
class RejectWhenOverridePrecedesPublicModifier extends InstanceBase { 
    override public publicId: number;
    override public toStringPublic() { return ''; }; 
}
class AcceptWhenOverrideSuccedesPublicModifier extends InstanceBase { 
    public override publicId: number;
    public override toStringPublic() { return ''; }; 
}

// override should go before static
class RejectWhenStaticPrecedesOverrideModifier extends StaticBase { 
    static override id: number = 2;
    static override toStringStatic() { return ''; }; 
}
class AcceptWhenStaticSuccedesOverrideModifier extends StaticBase { 
    override static id: number = 2;
    override static toStringStatic() { return ''; }; 
}

// override should go before readonly
class RejectWhenReadonlyPrecedesOverrideModifier extends ReadonlyBase { 
    readonly override id: number; 
}
class AcceptWhenReadonlySuccedesOverrideModifier extends ReadonlyBase { 
    override readonly id: number; 
}

// Compiler already checks for access modifier narrowing
// (override does not alter these semantics).
class RejectWhenOverrideChangesAccessModifier extends StaticBase {
    protected override static toStringStatic() { return 'was public'; }
}

// ==============================================================
// Tests that deal with optional properties
// ==============================================================

// Override cannot be used with optional property.
class RejectWhenOverrideOptionalProperty extends OptionalBase {
    override id?: number;
}

// ==============================================================
// Tests that deal with get/set accessors
// ==============================================================

// If one accessor is marked override, they both should be.
class RejectWhenAccessorNotBothOverride extends AccessorBase {
    override get id() { return 2; }
    /*    */ set id(id: number) {}
}

// Compiler should be satisfied if both override present and correct
class AcceptWhenAccessorBothOverrideSuperclass extends AccessorBase {
    override get id() { return 2; }
    override set id(id: number) {}
}

// Compiler should error if try to override accessor incorrectly
class RejectWhenAccessorBothOverrideButNotPresentInSuperclass extends AccessorBase {
    override get iDontExist() { return 2; }
    override set iDontExist(id: number) {}
}

abstract class HalfAccessorImplementation extends AbstractBase {
    override get id(): number { return 2; }
}

class AcceptWhenOverridePresentOnOtherHalfInSubclass extends HalfAccessorImplementation {
    override set id(id: number) {}
    toStringAbstract(): string { return ''; }
}

// This one should be tested in 'noImplicitOverride'
class RejectWhenOverrideAbsentOnOtherHalfInSubclass extends HalfAccessorImplementation {
    set id(id: number) {}
    toStringAbstract(): string { return ''; }
}

// ==============================================================
// Tests that deal with inheritance detection
// ==============================================================

// Compiler should detect when override member is not inherited or augmented
class RejectWhenOverrideMarkedOnNonInheritedMember extends InstanceBase {
    override iDontExist(): string { return ''; }
}

// Compiler should be able to traverse multiple levels of inheritance
// to assess for overriden members (already does this).
class AcceptWhenOverrideMemberExistsOnNonImmediateSuperclass extends DerivedBase {
    override toStringPublic(): string { return ''; }
}

// Compiler already detects overriden assignability mismatches,
// override keyword does not change these semantics
class RejectWhenOverrideHasMismatchedType extends InstanceBase {
    override toStringPublic(): number { return 1; }
}

// Override is compatible with properties augmented from Object,
// either implicitly, explicity, or though a derived class
class AcceptWhenOverridePresentOnAugmentedPropertyImplicit {
    override toString(): string { return ''; }
}
class AcceptWhenOverridePresentOnAugmentedPropertyExplicit extends Object {
    override toString(): string { return ''; }
}
class AcceptWhenOverridePresentOnAugmentedPropertyDerived extends DerivedBase {
    override toString(): string { return ''; }
}

// ==============================================================
// Tests that deal with parameters
// ==============================================================

// Override is not used on regular function/method parameters
class RejectWhenOverrideIsOnAParameter {
    public sayHello(override name: string) { return 'hi'; }
}

// Override *can* be used on parameter properties though
class AcceptWhenOverrideOnParameterPropertyImplementsRequiredMember extends AbstractBase {
	constructor(override id: number) {
        super();
    }
    toStringAbstract(): string { return 'concrete'; }
}

// Override *can* be used on parameter properties in conjuction with other
// parameter property modifiers
class AcceptWhenOverrideOnParameterPropertyWithAdditionalModifiers extends AbstractBase {
	constructor(public override id: number) {
        super();
    }
    toStringAbstract(): string { return 'concrete'; }
}

class RejectWhenOverridePresentOnConstructorOverloadDeclaration extends AbstractBase {
    constructor(override id: number);
    constructor(override id: number, public name?: string) {
        super();
    }
    override toStringAbstract(): string { return 'concrete'; }
}

// But it should be an error to 'override' a parameter property that does not
// actually do so.
class RejectWhenOverrideOnParameterPropertyDoesNotImplementRequiredMember extends AbstractBase {
	constructor(override id: number, override iDontExist: number) {
        super();
    }
    toStringAbstract(): string { return 'concrete'; }
}

// ==============================================================
// Tests that deal with override in spurious locations
// ==============================================================

// Override is not used on class or interface declarations
override class RejectWhenOverrideIsOnClassDeclaration { 
}
override interface RejectWhenOverrideIsOnInterfaceDeclaration { 
}

// Override is not used on constructor declarations.
// One *could* make an argument that this is semantically correct though.
class RejectWhenOverridePresentOnConstructorDeclaration extends InstanceBase {
    override constructor() {
        super();
    }
}

// Override is not used on index signature declarations
// Wait, should it?  If this is the point of the implementation, 
// then maybe is should be. Somewhat esoteric though.
// @see https://stackoverflow.com/questions/31977481/can-i-define-a-typescript-class-which-has-an-index-signature
class RejectWhenOverridePresentOnIndexSignatureDeclaration implements IndexSignature {
    override [key: string]: string;
}

// Override is not used on object literals.
// One could make an argument that is should be, 
// but since no modifiers are allowed here 
// we don't need to bend over backwards to support it.
let rejectWhenOverridePresentOnObjectLiteral = {
    override toString(): string { return ''; }
}

// ==============================================================
// Tests that deal with interfaces and abstract classes
// ==============================================================

// Acceptable to provide an override implementation in an abstract class however
abstract class AcceptWhenOverrideInAbstractClass extends AbstractBase {
    override toStringAbstract(): string { return 'now concrete'; }
}

// Override and abstract on methods are orthogonal, should never be used together
abstract class RejectWhenOverrideAbstractMethod extends AbstractBase {
    override abstract toStringAbstract(): string;
}

// Override should not be used/required in interface declarations
// Override errors are only triggered in concrete locations,
// so there's no need to say 'override' here.
interface RejectWhenOverrideInAnInterface extends InterfaceBase {
    override toStringInterface(): string;
}

// ==============================================================
// Tests that deal with mixin classes
// ==============================================================

class AcceptWhenOverridePresentOnInheritedMethodMixin extends mixin(MixinBase) {
    override normal() {} 
    override mixedIn() {} 
}

// ==============================================================
// Tests that deal with grouping of override declarations
// ==============================================================

/* Override method should be grouped as consecutive declarations */
class RejectWhenOverrideDeclarationsAreNotConsecutive extends InstanceBase {
    public override toStringPublic(): string { return '' }

    public iShouldNotBreakUpConsecutiveOverrideDeclarations(): boolean {
        return true;
    }
    protected override toStringProtected(): string { return '' }
    
}

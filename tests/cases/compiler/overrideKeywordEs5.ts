// @declaration: true
// @noImplicitOverride: false
// @target: es5

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

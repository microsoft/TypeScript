// @noImplicitOverride: true
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

// Override must be marked for properties augmented from Object, either
// implicitly, explicity, or though a derived class
class RejectWhenOverrideAbsentOnAugmentedPropertyImplicit {
    toString(): string { return ''; }
}
class RejectWhenOverrideAbsentOnAugmentedPropertyExplicit extends Object {
    toString(): string { return ''; }
}
class RejectWhenOverrideAbsentOnAugmentedPropertyDerived extends DerivedBase {
    toString(): string { return ''; }
}

// Override must be marked for properties inherited from base class,
class RejectWhenOverrideAbsentOnInheritedMember extends InstanceBase {
    protected protectedId: number;
    public publicId: number;
    protected toStringProtected(): string { return ''; }
    public toStringPublic(): string { return ''; }
}

// Override must be marked for properties inherited from base class (accessor
// variant)
class RejectWhenOverrideAbsentOnInheritedAccessorMember extends AccessorBase {
    get id(): number { return 2; }
    set id(id: number) {}
}

// Override must be marked for properties inherited from base class (static
// variant)
class RejectWhenOverrideAbsentOnInheritedStaticMember extends StaticBase {
    static id: number = 2;
    static toStringStatic(): string { return ''; }
}

// Override must be marked for properties inherited from base class (readonly
// variant)
class RejectWhenOverrideAbsentOnInheritedReadonlyMember extends ReadonlyBase {
    readonly id: number = 2;
    toStringReadonly(): string { return ''; }
}

// Override must be marked for a things that implement an abstract superclass
// member
class RejectWhenOverrideAbsentOnImplementationOfAbstractMember extends AbstractBase {
    id: number = 1;
    toStringAbstract(): string { return ''; }
}

// Override must be marked on a method that implements an abstract method, even
// if that class is itself abstract.
abstract class RejectWhenOverrideAbsentOnImplementationOfAbstractMemberInAbstractClass extends AbstractBase {
    toStringAbstract(): string { return ''; }
}

// Override must be marked on methods inherited via normal semantics and via the
// mixin class.
class RejectWhenOverrideAbsentOnInheritedMethodMixin extends mixin(MixinBase) {
    normal() {} 
    mixedIn() {} 
}

// Override must be marked on parameter properties that implement an abstract
// property. In this case, the 'public' modifier informs the compiler that 'id'
// is a parameter property.  This puts the 'id' symbol in the instance member
// symbol table and thus exposes it to the codepath that checks for missing
// override members.
class RejectWhenOverrideAbsentOnParameterPropertyThatImplementsSuperclassMember extends AbstractBase {
	constructor(public id: number) {
        super();
    }
    override toStringAbstract(): string { return 'concrete'; }
}


// Override *should* be marked on all parameter properties that implement some
// an abstract member. In this case, there is no additional modifier on the 'id'
// symbol that flags it as a parameter property (i.e., the symbol is considered
// to be a local to the scope of the constructor function). In this case, it is
// correct for the compiler *not* to raise an error (otherwise a user would
// never be able to name a constructor parameter as that of an abstract
// superclass member!). 
class AcceptWhenOverrideAbsentOnConstructorParameterThatIsNotAParameterProperty extends AbstractBase {
	constructor(id: number) {
        super();
    }
    override id: number = 2;
    override toStringAbstract(): string { return 'concrete'; }
}

class A {
    "constructor": typeof A;  // Explicitly declare constructor property
    protected static type: string;

    public log() {
        console.log(this.constructor.type);  // Access actual constructor object
    }
}

class B extends A {
    protected static type: string = 'B';
}

class C extends A {
    protected static type: string = 'C';
}
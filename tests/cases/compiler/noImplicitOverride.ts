// @noImplicitOverride: true
// @target: es5

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

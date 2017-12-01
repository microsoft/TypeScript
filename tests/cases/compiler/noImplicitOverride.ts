// @noImplicitOverride: true
// @target: es5

class Base {
    get name(): string {
        return 'Base';
    }
    getMeaningOfLife(): number { return 42; }
    public userId: number = 1;
}

class RejectWhenOverrideMissingOnInheritedMethod extends Object {
    toString(): string { return 'foo'; };
    hasOwnProperty(prop: string): boolean {
        return super.hasOwnProperty(prop);
    }
}

class RejectWhenOverrideMissingOnAugmentedProperty {
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

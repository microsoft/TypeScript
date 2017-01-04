// @noImplicitOverride: true
// @target: es5

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

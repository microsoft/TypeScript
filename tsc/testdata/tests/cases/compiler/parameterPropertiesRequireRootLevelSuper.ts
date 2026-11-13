// @target: es2021, es2022, esnext
// @useDefineForClassFields: true, false
// @strict: true
// @noTypesAndSymbols: true

class Base {}

class ConditionalParameterProperty extends Base {
    constructor(public value: number) {
        if (value) super();
        else super();
    }
}

class ReturnedSuperParameterProperty extends Array<number> {
    constructor(public value?: number) {
        return !value ? [] : (super() as any);
    }
}

class BlockParameterProperty extends Base {
    constructor(readonly value: number) {
        {
            super();
        }
    }
}

class RootLevelParameterProperty extends Base {
    constructor(public value: number) {
        const adjusted = value + 1;
        super();
        this.value = adjusted;
    }
}

class ConditionalPlainParameter extends Base {
    constructor(value: number) {
        if (value) super();
        else super();
    }
}

class ConditionalFieldInitializer extends Base {
    value = 1;

    constructor(condition: boolean) {
        if (condition) super();
        else super();
    }
}

class AccessBeforeSuperParameterProperty extends Base {
    constructor(public value: number) {
        this.value;
        super();
    }
}

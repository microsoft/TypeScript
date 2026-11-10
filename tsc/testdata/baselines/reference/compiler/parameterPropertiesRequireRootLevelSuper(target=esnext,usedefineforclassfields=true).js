//// [tests/cases/compiler/parameterPropertiesRequireRootLevelSuper.ts] ////

//// [parameterPropertiesRequireRootLevelSuper.ts]
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


//// [parameterPropertiesRequireRootLevelSuper.js]
"use strict";
class Base {
}
class ConditionalParameterProperty extends Base {
    value;
    constructor(value) {
        this.value = value;
        if (value)
            super();
        else
            super();
    }
}
class ReturnedSuperParameterProperty extends Array {
    value;
    constructor(value) {
        this.value = value;
        return !value ? [] : super();
    }
}
class BlockParameterProperty extends Base {
    value;
    constructor(value) {
        this.value = value;
        {
            super();
        }
    }
}
class RootLevelParameterProperty extends Base {
    value;
    constructor(value) {
        const adjusted = value + 1;
        super();
        this.value = value;
        this.value = adjusted;
    }
}
class ConditionalPlainParameter extends Base {
    constructor(value) {
        if (value)
            super();
        else
            super();
    }
}
class ConditionalFieldInitializer extends Base {
    value = 1;
    constructor(condition) {
        if (condition)
            super();
        else
            super();
    }
}
class AccessBeforeSuperParameterProperty extends Base {
    value;
    constructor(value) {
        this.value;
        super();
        this.value = value;
    }
}

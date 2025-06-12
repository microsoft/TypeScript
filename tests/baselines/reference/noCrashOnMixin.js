//// [tests/cases/compiler/noCrashOnMixin.ts] ////

//// [noCrashOnMixin.ts]
class Abstract {
    protected constructor() {
    }
}

class Concrete extends Abstract {
}

type Constructor<T = {}> = new (...args: any[]) => T;

function Mixin<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
    };
}

class Empty {
}

class CrashTrigger extends Mixin(Empty) {
    public trigger() {
        new Concrete();
    }
}

//// [noCrashOnMixin.js]
class Abstract {
    constructor() {
    }
}
class Concrete extends Abstract {
}
function Mixin(Base) {
    return class extends Base {
    };
}
class Empty {
}
class CrashTrigger extends Mixin(Empty) {
    trigger() {
        new Concrete();
    }
}

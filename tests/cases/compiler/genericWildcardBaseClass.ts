abstract class BaseClass {
    constructor(s: string = '', ...args: any[]) { }
    base() { return 0; }
    static staticBase() { return ''; }
}

function extendNoConstructor<T extends typeof BaseClass>(Base: T) {
    return class ExN extends Base {
        ext() { return 0; }
        static staticExt() { return ''; }
    };
}

function extendCompatibleConstructor<T extends typeof BaseClass>(Base: T) {
    return class ExC extends Base {
        constructor(x?: string, ...args: any[]) {
            super(x, args);
        }
    };
}

function fails_IncompatibleConstructor<T extends typeof BaseClass>(Base: T) {
    return class Fail extends Base {
        constructor(x?: string, ...args: string[]) {
            super(x, args);
        }
    };
}

abstract class ExtClass extends BaseClass {
    thing() { return 0; }
    static staticThing() { return ''; }
}

abstract class BadClass extends BaseClass {
    constructor(n: number) {
        super();
    }
}

const Thing2 = extendCompatibleConstructor(extendNoConstructor(ExtClass));
extendCompatibleConstructor(extendNoConstructor(BadClass));

const thing2 = new Thing2();
const thing2arg = new Thing2('');
const fails_arg = new Thing2(2);

const str2 = Thing2.staticExt() + Thing2.staticThing() + Thing2.staticBase();
const num2 = thing2.ext() + thing2.thing() + thing2.base();

class Thing3 extends Thing2 {
    constructor() {
        super('', 1, 2);
        Math.round(this.base() + this.thing() + this.ext());
    }
}

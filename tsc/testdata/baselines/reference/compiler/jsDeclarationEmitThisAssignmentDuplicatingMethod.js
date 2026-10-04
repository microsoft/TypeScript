//// [tests/cases/compiler/jsDeclarationEmitThisAssignmentDuplicatingMethod.ts] ////

//// [main.js]
export class A {
    constructor() {
        this.foo = this.foo.bind(this);
    }
    foo() {}
}

export class B {
    constructor() {
        this.#foo = this.#foo.bind(this);
    }
    #foo = () => {}
}

const sym = Symbol();
export class C {
    constructor() {
        this[sym] = this[sym].bind(this);
    }
    [sym]() {}
}

export class D {
    constructor() {
        this.bar = 1;
    }
    static bar() {}
}

export class E {
    static init() {
        this.baz = 1;
    }
    baz() {}
}

export class F {
    static #foo = () => {}
    static {
        this.#foo = this.#foo.bind(this);
    }
}

const sym2 = Symbol();
export class G {
    static {
        this[sym2] = this[sym2].bind(this);
    }
    static[sym2]() {}
}

export class H {
    static foo = () => {}
    static {
        this.foo = this.foo.bind(this);
    }
}




//// [main.d.ts]
export declare class A {
    constructor();
    foo(): void;
}
export declare class B {
    #private;
    constructor();
}
declare const sym: unique symbol;
export declare class C {
    constructor();
    [sym](): void;
}
export declare class D {
    bar: number;
    constructor();
    static bar(): void;
}
export declare class E {
    static baz: number | undefined;
    static init(): void;
    baz(): void;
}
export declare class F {
    #private;
}
declare const sym2: unique symbol;
export declare class G {
    static [sym2](): void;
}
export declare class H {
    static foo: () => void;
}
export {};

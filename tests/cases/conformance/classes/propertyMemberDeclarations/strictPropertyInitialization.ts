// @strict: true
// @declaration: true

// Properties with non-undefined types require initialization

class C1 {
    a: number;  // Error
    b: number | undefined;
    c: number | null;  // Error
    d?: number;
}

// No strict initialization checks in ambient contexts

declare class C2 {
    a: number;
    b: number | undefined;
    c: number | null;
    d?: number;
}

// No strict initialization checks for static members

class C3 {
    static a: number;
    static b: number | undefined;
    static c: number | null;
    static d?: number;
}

// Initializer satisfies strict initialization check

class C4 {
    a = 0;
    b: number = 0;
    c: string = "abc";
}

// Assignment in constructor satisfies strict initialization check

class C5 {
    a: number;
    constructor() {
        this.a = 0;
    }
}

// All code paths must contain assignment

class C6 {
    a: number;  // Error
    constructor(cond: boolean) {
        if (cond) {
            return;
        }
        this.a = 0;
    }
}

class C7 {
    a: number;
    constructor(cond: boolean) {
        if (cond) {
            this.a = 1;
            return;
        }
        this.a = 0;
    }
}

// Properties with string literal names aren't checked

class C8 {
    a: number;  // Error
    "b": number;
    0: number;
}

// No strict initialization checks for abstract members

abstract class C9 {
    abstract a: number;
    abstract b: number | undefined;
    abstract c: number | null;
    abstract d?: number;
}

// Properties with non-undefined types must be assigned before they can be accessed
// within their constructor

class C10 {
    a: number;
    b: number;
    c?: number;
    constructor() {
        let x = this.a;  // Error
        this.a = this.b;  // Error
        this.b = x;
        let y = this.c;
    }
}

// Property is considered initialized by type any even though value could be undefined

declare function someValue(): any;

class C11 {
    a: number;
    constructor() {
        this.a = someValue();
    }
}

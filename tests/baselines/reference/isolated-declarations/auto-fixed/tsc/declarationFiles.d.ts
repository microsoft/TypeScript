//// [tests/cases/conformance/types/thisType/declarationFiles.ts] ////

//// [declarationFiles.ts]
class C1 {
    x: this;
    f(x: this): this { return undefined; }
    constructor(x: this) { }
}

class C2 {
    [x: string]: this;
}

interface Foo<T> {
    x: T;
    y: this;
}

class C3 {
    a: this[];
    b: [this, this];
    c: this | Date;
    d: this & Date;
    e: (((this)));
    f: (x: this) => this;
    g: new (x: this) => this;
    h: Foo<this>;
    i: Foo<this | (() => this)>;
    j: (x: any) => x is this;
}

const x3_a: typeof globalThis = this;
const x1_a: typeof globalThis = this;
class C4 {
    x1 = { a: x1_a as typeof x1_a };
    x2: this[] = [this];
    x3 = [{ a: x3_a as typeof x3_a }] as const;
    x4 = (): this => this;
    f1() {
        return { a: this };
    }
    f2(): this[] {
        return [this];
    }
    f3() {
        return [{ a: this }];
    }
    f4(): () => this {
        return () => this;
    }
}


/// [Declarations] ////



//// [/.src/declarationFiles.d.ts]
declare class C1 {
    x: this;
    f(x: this): this;
    constructor(x: this);
}
declare class C2 {
    [x: string]: this;
}
interface Foo<T> {
    x: T;
    y: this;
}
declare class C3 {
    a: this[];
    b: [this, this];
    c: this | Date;
    d: this & Date;
    e: (((this)));
    f: (x: this) => this;
    g: new (x: this) => this;
    h: Foo<this>;
    i: Foo<this | (() => this)>;
    j: (x: any) => x is this;
}
declare const x3_a: typeof globalThis;
declare const x1_a: typeof globalThis;
declare class C4 {
    x1: {
        a: typeof globalThis;
    };
    x2: this[];
    x3: readonly [{
        readonly a: typeof globalThis;
    }];
    x4: () => this;
    f1(): any;
    f2(): this[];
    f3(): any;
    f4(): () => this;
}
/// [Errors] ////

declarationFiles.ts(4,20): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
declarationFiles.ts(36,5): error TS2527: The inferred type of 'f1' references an inaccessible 'this' type. A type annotation is necessary.
declarationFiles.ts(42,5): error TS2527: The inferred type of 'f3' references an inaccessible 'this' type. A type annotation is necessary.


==== declarationFiles.ts (3 errors) ====
    class C1 {
        x: this;
        f(x: this): this { return undefined; }
        constructor(x: this) { }
                       ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
    }
    
    class C2 {
        [x: string]: this;
    }
    
    interface Foo<T> {
        x: T;
        y: this;
    }
    
    class C3 {
        a: this[];
        b: [this, this];
        c: this | Date;
        d: this & Date;
        e: (((this)));
        f: (x: this) => this;
        g: new (x: this) => this;
        h: Foo<this>;
        i: Foo<this | (() => this)>;
        j: (x: any) => x is this;
    }
    
    const x3_a: typeof globalThis = this;
    const x1_a: typeof globalThis = this;
    class C4 {
        x1 = { a: x1_a as typeof x1_a };
        x2: this[] = [this];
        x3 = [{ a: x3_a as typeof x3_a }] as const;
        x4 = (): this => this;
        f1() {
        ~~
!!! error TS2527: The inferred type of 'f1' references an inaccessible 'this' type. A type annotation is necessary.
            return { a: this };
        }
        f2(): this[] {
            return [this];
        }
        f3() {
        ~~
!!! error TS2527: The inferred type of 'f3' references an inaccessible 'this' type. A type annotation is necessary.
            return [{ a: this }];
        }
        f4(): () => this {
            return () => this;
        }
    }
    
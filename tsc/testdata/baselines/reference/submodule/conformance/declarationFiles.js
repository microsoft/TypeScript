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

class C4 {
    x1 = { a: this };
    x2 = [this];
    x3 = [{ a: this }];
    x4 = () => this;
    f1() {
        return { a: this };
    }
    f2() {
        return [this];
    }
    f3() {
        return [{ a: this }];
    }
    f4() {
        return () => this;
    }
}


//// [declarationFiles.js]
class C1 {
    x;
    f(x) { return undefined; }
    constructor(x) { }
}
class C2 {
}
class C3 {
    a;
    b;
    c;
    d;
    e;
    f;
    g;
    h;
    i;
    j;
}
class C4 {
    x1 = { a: this };
    x2 = [this];
    x3 = [{ a: this }];
    x4 = () => this;
    f1() {
        return { a: this };
    }
    f2() {
        return [this];
    }
    f3() {
        return [{ a: this }];
    }
    f4() {
        return () => this;
    }
}

class C1 {
    x: this;
    f(x: this): this { return undefined; }
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

declare class C4 {
    x: this;
    f(x: this): this;
}

class C5 {
    foo() {
        let f1 = (x: this): this => this;
        let f2 = (x: this) => this;
        let f3 = (x: this) => (y: this) => this;
        let f4 = (x: this) => {
            let g = (y: this) => {
                return () => this;
            }
            return g(this);
        }
    }
    bar() {
        let x1 = <this>undefined;
        let x2 = undefined as this;
    }
}

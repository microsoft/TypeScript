interface I1 {
    x: this;
    f(x: this): this;
}

interface I2 {
    (x: this): this;
    new (x: this): this;
    [x: string]: this;
}

interface Foo<T> {
    x: T;
    y: this;
}

interface I3 {
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

// @declaration: true

declare class C1 {
    public a: number;
    protected b: number;
    private c: number;
    constructor(s: string);
    constructor(n: number);
}

declare class M1 {
    constructor(...args: any[]);
    p: number;
    static p: number;
}

declare class M2 {
    constructor(...args: any[]);
    f(): number;
    static f(): number;
}

declare const Mixed1: typeof M1 & typeof C1;
declare const Mixed2: typeof C1 & typeof M1;
declare const Mixed3: typeof M2 & typeof M1 & typeof C1;
declare const Mixed4: typeof C1 & typeof M1 & typeof M2;
declare const Mixed5: typeof M1 & typeof M2;

function f1() {
    let x1 = new Mixed1("hello");
    let x2 = new Mixed1(42);
    let x3 = new Mixed2("hello");
    let x4 = new Mixed2(42);
    let x5 = new Mixed3("hello");
    let x6 = new Mixed3(42);
    let x7 = new Mixed4("hello");
    let x8 = new Mixed4(42);
    let x9 = new Mixed5();
}

function f2() {
    let x = new Mixed1("hello");
    x.a;
    x.p;
    Mixed1.p;
}

function f3() {
    let x = new Mixed2("hello");
    x.a;
    x.p;
    Mixed2.p;
}

function f4() {
    let x = new Mixed3("hello");
    x.a;
    x.p;
    x.f();
    Mixed3.p;
    Mixed3.f();
}

function f5() {
    let x = new Mixed4("hello");
    x.a;
    x.p;
    x.f();
    Mixed4.p;
    Mixed4.f();
}

function f6() {
    let x = new Mixed5();
    x.p;
    x.f();
    Mixed5.p;
    Mixed5.f();
}

class C2 extends Mixed1 {
    constructor() {
        super("hello");
        this.a;
        this.b;
        this.p;
    }
}

class C3 extends Mixed3 {
    constructor() {
        super(42);
        this.a;
        this.b;
        this.p;
        this.f();
    }
    f() { return super.f(); }
}

// @strict: true
// @declaration: true

type TC1 = typeof class {
    constructor(s: string);
    static n: number;
    s: string;
}

declare let C1: TC1;
C1.n;
let c1 = new C1('hello');
c1.s;

declare let C2: typeof class {
    constructor(s: string);
    static n: number;
    s: string;
}
C2.n;
let c2 = new C2('hello');
c2.s;

declare let C3: typeof class extends Error {
    constructor(s: string);
    static n: number;
}
C3.n;
let c3 = new C3('hello');
c3.message;

declare let C4: typeof abstract class {
    constructor(s: string);
    static n: number;
    s: string;
}
C4.n;
let c4 = new C4('hello');  // Error

declare let C5: typeof class<T> {
    constructor(x: T);
    x: T;
}

let c51 = new C5('hello');
c51.x;
let c52 = new C5(42);
c52.x;

type BoxFactory<T> = typeof class Box {
    static default: T;
    constructor(value?: T);
    value: T;
}

declare let StringBox: BoxFactory<string>;
StringBox.default;
let sb = new StringBox('hello');
sb.value;

declare let NumberBox: BoxFactory<number>;
NumberBox.default;
let nb = new NumberBox(42);
nb.value;

declare const sb1: InstanceType<BoxFactory<string>>;
sb1.value;

declare const nb1: InstanceType<BoxFactory<number>>;
nb1.value;

function Printable1<T extends new (...args: any[]) => object>(Base: T) {
    return class extends Base {
        static foo: string;
        print() {}
    }
}

declare function Printable2<T extends new (...args: any[]) => object>(Base: T): typeof class extends Base {
    static foo: string;
    print(): void;
};

type PrintableMixin = typeof class {
    constructor(...args: any[]);  // Indicates class is a mixin
    static foo: string;
    print(): void;
};

declare function Printable3<T extends new (...args: any[]) => object, U>(Base: T): T & PrintableMixin;

declare function Printable4<T extends new (...args: any[]) => object>(Base: T): T & typeof class Printable {
    constructor(...args: any[]);  // Indicates class is a mixin
    static foo: string;
    print(): void;
};

class MyClass {
    static bar: number;
    x!: boolean;
}

let PC1 = Printable1(MyClass);
let pc1 = new PC1();
pc1.x;
pc1.print;

let PC2 = Printable2(MyClass);
let pc2 = new PC2();
pc2.x;
pc2.print;

let PC3 = Printable3(MyClass);
let pc3 = new PC3();
pc3.x;
pc3.print;

let PC4 = Printable4(MyClass);
let pc4 = new PC4();
pc4.x;
pc4.print;

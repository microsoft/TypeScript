//// [typeofClassExpression1.ts]
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


//// [typeofClassExpression1.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
C1.n;
var c1 = new C1('hello');
c1.s;
C2.n;
var c2 = new C2('hello');
c2.s;
C3.n;
var c3 = new C3('hello');
c3.message;
C4.n;
var c4 = new C4('hello'); // Error
var c51 = new C5('hello');
c51.x;
var c52 = new C5(42);
c52.x;
StringBox["default"];
var sb = new StringBox('hello');
sb.value;
NumberBox["default"];
var nb = new NumberBox(42);
nb.value;
sb1.value;
nb1.value;
function Printable1(Base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.print = function () { };
        return class_1;
    }(Base));
}
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    return MyClass;
}());
var PC1 = Printable1(MyClass);
var pc1 = new PC1();
pc1.x;
pc1.print;
var PC2 = Printable2(MyClass);
var pc2 = new PC2();
pc2.x;
pc2.print;
var PC3 = Printable3(MyClass);
var pc3 = new PC3();
pc3.x;
pc3.print;
var PC4 = Printable4(MyClass);
var pc4 = new PC4();
pc4.x;
pc4.print;


//// [typeofClassExpression1.d.ts]
declare type TC1 = typeof class {
    constructor(s: string);
    static n: number;
    s: string;
};
declare let C1: TC1;
declare let c1: {
    s: string;
};
declare let C2: typeof class {
    constructor(s: string);
    static n: number;
    s: string;
};
declare let c2: {
    s: string;
};
declare let C3: typeof class extends Error {
    constructor(s: string);
    static n: number;
};
declare let c3: {
    name: string;
    message: string;
    stack?: string | undefined;
};
declare let C4: typeof abstract class {
    constructor(s: string);
    static n: number;
    s: string;
};
declare let c4: any;
declare let C5: typeof class<T> {
    constructor(x: T);
    x: T;
};
declare let c51: {
    x: string;
};
declare let c52: {
    x: number;
};
declare type BoxFactory<T> = typeof class Box {
    static default: T;
    constructor(value?: T);
    value: T;
};
declare let StringBox: BoxFactory<string>;
declare let sb: {
    value: string;
};
declare let NumberBox: BoxFactory<number>;
declare let nb: {
    value: number;
};
declare const sb1: InstanceType<BoxFactory<string>>;
declare const nb1: InstanceType<BoxFactory<number>>;
declare function Printable1<T extends new (...args: any[]) => object>(Base: T): {
    new (...args: any[]): {
        print(): void;
    };
    foo: string;
} & T;
declare function Printable2<T extends new (...args: any[]) => object>(Base: T): typeof class extends Base {
    static foo: string;
    print(): void;
};
declare type PrintableMixin = typeof class {
    constructor(...args: any[]);
    static foo: string;
    print(): void;
};
declare function Printable3<T extends new (...args: any[]) => object, U>(Base: T): T & PrintableMixin;
declare function Printable4<T extends new (...args: any[]) => object>(Base: T): T & typeof class Printable {
    constructor(...args: any[]);
    static foo: string;
    print(): void;
};
declare class MyClass {
    static bar: number;
    x: boolean;
}
declare let PC1: {
    new (...args: any[]): {
        print(): void;
    };
    foo: string;
} & typeof MyClass;
declare let pc1: {
    print(): void;
} & MyClass;
declare let PC2: {
    new (...args: any[]): {
        print(): void;
    };
    foo: string;
} & typeof MyClass;
declare let pc2: {
    print(): void;
} & MyClass;
declare let PC3: typeof MyClass & {
    new (...args: any[]): {
        print(): void;
    };
    foo: string;
};
declare let pc3: MyClass & {
    print(): void;
};
declare let PC4: typeof MyClass & {
    new (...args: any[]): {
        print(): void;
    };
    foo: string;
};
declare let pc4: MyClass & {
    print(): void;
};

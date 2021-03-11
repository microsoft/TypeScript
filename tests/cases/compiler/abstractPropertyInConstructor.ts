abstract class AbstractClass {
    constructor(str: string, other: AbstractClass) {
        this.method(parseInt(str));
        let val = this.prop.toLowerCase();

        if (!str) {
            this.prop = "Hello World";
        }
        this.cb(str);

        // OK, reference is inside function
        const innerFunction = () => {
            return this.prop;
        }

        // OK, references are to another instance
        other.cb(other.prop);
    }

    abstract prop: string;
    abstract cb: (s: string) => void;

    abstract method(num: number): void;

    other = this.prop;
    fn = () => this.prop;

    method2() {
        this.prop = this.prop + "!";
    }
}

abstract class DerivedAbstractClass extends AbstractClass {
    cb = (s: string) => {};

    constructor(str: string, other: AbstractClass, yetAnother: DerivedAbstractClass) {
        super(str, other);
        // there is no implementation of 'prop' in any base class
        this.cb(this.prop.toLowerCase());

        this.method(1);

        // OK, references are to another instance
        other.cb(other.prop);
        yetAnother.cb(yetAnother.prop);
    }
}

class Implementation extends DerivedAbstractClass {
    prop = "";
    cb = (s: string) => {};

    constructor(str: string, other: AbstractClass, yetAnother: DerivedAbstractClass) {
        super(str, other, yetAnother);
        this.cb(this.prop);
    }

    method(n: number) {
        this.cb(this.prop + n);
    }
}

class User {
    constructor(a: AbstractClass) {
        a.prop;
        a.cb("hi");
        a.method(12);
        a.method2();
    }
}

abstract class C1 {
    abstract x: string;
    abstract y: string;

    constructor() {
        let self = this;                // ok
        let { x, y: y1 } = this;        // error
        ({ x, y: y1, "y": y1 } = this); // error
    }
}

class C2 {
    x: string;
    y: string;

    constructor() {
        let self = this;                // ok
        let { x, y: y1 } = this;        // ok
        ({ x, y: y1, "y": y1 } = this); // ok
    }
}

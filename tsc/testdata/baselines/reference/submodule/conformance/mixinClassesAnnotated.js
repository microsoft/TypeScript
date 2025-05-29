//// [tests/cases/conformance/classes/mixinClassesAnnotated.ts] ////

//// [mixinClassesAnnotated.ts]
type Constructor<T> = new(...args: any[]) => T;

class Base {
    constructor(public x: number, public y: number) {}
}

class Derived extends Base {
    constructor(x: number, y: number, public z: number) {
        super(x, y);
    }
}

interface Printable {
    print(): void;
}

const Printable = <T extends Constructor<Base>>(superClass: T): Constructor<Printable> & { message: string } & T =>
    class extends superClass {
        static message = "hello";
        print() {
            const output = this.x + "," + this.y;
        }
    }

interface Tagged {
    _tag: string;
}

function Tagged<T extends Constructor<{}>>(superClass: T): Constructor<Tagged> & T {
    class C extends superClass {
        _tag: string;
        constructor(...args: any[]) {
            super(...args);
            this._tag = "hello";
        }
    }
    return C;
}

const Thing1 = Tagged(Derived);
const Thing2 = Tagged(Printable(Derived));
Thing2.message;

function f1() {
    const thing = new Thing1(1, 2, 3);
    thing.x;
    thing._tag;
}

function f2() {
    const thing = new Thing2(1, 2, 3);
    thing.x;
    thing._tag;
    thing.print();
}

class Thing3 extends Thing2 {
    constructor(tag: string) {
        super(10, 20, 30);
        this._tag = tag;
    }
    test() {
        this.print();
    }
}


//// [mixinClassesAnnotated.js]
class Base {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Derived extends Base {
    z;
    constructor(x, y, z) {
        super(x, y);
        this.z = z;
    }
}
const Printable = (superClass) => class extends superClass {
    static message = "hello";
    print() {
        const output = this.x + "," + this.y;
    }
};
function Tagged(superClass) {
    class C extends superClass {
        _tag;
        constructor(...args) {
            super(...args);
            this._tag = "hello";
        }
    }
    return C;
}
const Thing1 = Tagged(Derived);
const Thing2 = Tagged(Printable(Derived));
Thing2.message;
function f1() {
    const thing = new Thing1(1, 2, 3);
    thing.x;
    thing._tag;
}
function f2() {
    const thing = new Thing2(1, 2, 3);
    thing.x;
    thing._tag;
    thing.print();
}
class Thing3 extends Thing2 {
    constructor(tag) {
        super(10, 20, 30);
        this._tag = tag;
    }
    test() {
        this.print();
    }
}


//// [mixinClassesAnnotated.d.ts]
type Constructor<T> = new (...args: any[]) => T;
declare class Base {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
declare class Derived extends Base {
    z: number;
    constructor(x: number, y: number, z: number);
}
interface Printable {
    print(): void;
}
declare const Printable: <T extends Constructor<Base>>(superClass: T) => Constructor<Printable> & {
    message: string;
} & T;
interface Tagged {
    _tag: string;
}
declare function Tagged<T extends Constructor<{}>>(superClass: T): Constructor<Tagged> & T;
declare const Thing1: Constructor<Tagged> & typeof Derived;
declare const Thing2: Constructor<Tagged> & Constructor<Printable> & {
    message: string;
} & typeof Derived;
declare function f1(): void;
declare function f2(): void;
declare class Thing3 extends Thing2 {
    constructor(tag: string);
    test(): void;
}

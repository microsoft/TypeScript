// @declaration: true

type Constructor<T = {}> = new (...args: any[]) => T;

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

const Printable = <T extends Constructor<Base>>(
    superClass: T
): T & Constructor<Printable> & { message: string } =>
    class extends superClass {
        static message = "hello";
        print() {
            console.log(this.x + "," + this.y);
        }
    };

interface Tagged {
    _tag: string;
}

function Tagged<T extends Constructor<Base>>(superClass: T): T & Constructor<Tagged> {
    return class extends superClass {
        _tag: string;
        constructor(...args: any[]) {
            super(...args);
            this._tag = "hello";
        }
    };
}

const Thing1 = Tagged(Derived);
const Thing2 = Tagged(Printable(Derived)) as Constructor<Tagged & Printable & Base>;

// Ensure TypeScript recognizes `message`
console.log((Thing2 as any).message);

function f1() {
    const thing = new Thing1(1, 2, 3);
    thing.x; 
    thing._tag;
}

function f2() {
    const thing = new Thing2(1, 2, 3);
    thing.x; // Recognized due to casting fix
    thing._tag;
    thing.print();
    console.log((Thing2 as any).message); // Ensure TypeScript does not complain
}

class Thing3 extends (Thing2 as Constructor<Tagged & Printable & Base>) {
    constructor(tag: string) {
        super(10, 20, 30);
        this._tag = tag;
    }
    test() {
        this.print();
    }
}

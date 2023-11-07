// @declaration: true
// @skipLibCheck: false

export class Base { foo: string; }
export class Derived extends Base { bar: string; }
export class Derived2 extends Derived { baz: string; }

export type Foo = {
    new (x: {
        new <T extends Derived>(a: T): T;
        new <T extends Base>(a: T): T;
    }): any[];
    new (x: {
        new <T extends Derived2>(a: T): T;
            new <T extends Base>(a: T): T;
    }): any[];
}

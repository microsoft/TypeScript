//// [tests/cases/compiler/declarationMapsMultifile.ts] ////

//// [a.ts]
export class Foo {
    doThing(x: {a: number}) {
        return {b: x.a};
    }
    static make() {
        return new Foo();
    }
}
//// [index.ts]
import {Foo} from "./a";

const c = new Foo();
c.doThing({a: 42});

export let x = c.doThing({a: 12});
export { c, Foo };


//// [a.js]
export class Foo {
    doThing(x) {
        return { b: x.a };
    }
    static make() {
        return new Foo();
    }
}
//// [index.js]
import { Foo } from "./a";
const c = new Foo();
c.doThing({ a: 42 });
export let x = c.doThing({ a: 12 });
export { c, Foo };


//// [a.d.ts]
export declare class Foo {
    doThing(x: {
        a: number;
    }): {
        b: number;
    };
    static make(): Foo;
}
//# sourceMappingURL=a.d.ts.map//// [index.d.ts]
import { Foo } from "./a";
declare const c: Foo;
export declare let x: {
    b: number;
};
export { c, Foo };
//# sourceMappingURL=index.d.ts.map
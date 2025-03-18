//// [tests/cases/compiler/declarationEmitTypeParameterNameReusedInOverloads.ts] ////

//// [declarationEmitTypeParameterNameReusedInOverloads.ts]
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


//// [declarationEmitTypeParameterNameReusedInOverloads.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Derived2 = exports.Derived = exports.Base = void 0;
class Base {
    foo;
}
exports.Base = Base;
class Derived extends Base {
    bar;
}
exports.Derived = Derived;
class Derived2 extends Derived {
    baz;
}
exports.Derived2 = Derived2;

//// [tests/cases/compiler/conflictingTypeParameterSymbolTransfer.ts] ////

//// [conflictingTypeParameterSymbolTransfer.ts]
// @strict

// Via #56620
class Base<U> { }
export class C2<T> extends Base<unknown> {
    T: number;
    constructor(T: number) {
        super();
        // Should not error
        this.T = T;

        // Should error
        let a: U = null;
    }
}

// via #56689
class Leg { }
class Foo<t> extends Leg {
    t = {} as t

    // should allow this access since t was declared as a property on Foo
    foo = this.t
}

// via #56661
class BaseClass { }
class Item<data> extends BaseClass {
    data: data;
    getData() {
        // should OK
        return this.data;
    }
}

//// [conflictingTypeParameterSymbolTransfer.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C2 = void 0;
// @strict
// Via #56620
class Base {
}
class C2 extends Base {
    T;
    constructor(T) {
        super();
        // Should not error
        this.T = T;
        // Should error
        let a = null;
    }
}
exports.C2 = C2;
// via #56689
class Leg {
}
class Foo extends Leg {
    t = {};
    // should allow this access since t was declared as a property on Foo
    foo = this.t;
}
// via #56661
class BaseClass {
}
class Item extends BaseClass {
    data;
    getData() {
        // should OK
        return this.data;
    }
}

//// [tests/cases/compiler/jsNoImplicitAnyNoCascadingReferenceErrors.ts] ////

//// [somelib.d.ts]
export declare class Foo<T> {
    prop: T;
}
//// [index.js]
import {Foo} from "./somelib";

class MyFoo extends Foo {
    constructor() {
        super();
        this.prop.alpha = 12;
    }
}


//// [index.js]
import { Foo } from "./somelib";
class MyFoo extends Foo {
    constructor() {
        super();
        this.prop.alpha = 12;
    }
}

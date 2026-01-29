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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const somelib_1 = require("./somelib");
class MyFoo extends somelib_1.Foo {
    constructor() {
        super();
        this.prop.alpha = 12;
    }
}

// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @outDir: ./built
// @filename: somelib.d.ts
export declare class Foo<T> {
    prop: T;
}
// @filename: index.js
import {Foo} from "./somelib";

class MyFoo extends Foo {
    constructor() {
        super();
        this.prop.alpha = 12;
    }
}

//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsThisTypes.ts] ////

//// [index.js]
export class A {
    /** @returns {this} */
    method() {
        return this;
    }
}
export default class Base extends A {
    // This method is required to reproduce #35932
    verify() { }
}

//// [index.js]
export class A {
    /** @returns {this} */
    method() {
        return this;
    }
}
export default class Base extends A {
    // This method is required to reproduce #35932
    verify() { }
}


//// [index.d.ts]
export class A {
    /** @returns {this} */
    method(): this;
}
export default class Base extends A {
    verify(): void;
}

// @module: nodenext
// @checkJs: true
// @declaration: true
// @strict: true, false

// @filename: a.ts
export class A<T> {}

// @filename: b.js
import { A } from './a.js';

/** @extends {A} */
export class B1 extends A {
    constructor() {
        super();
    }
}

/** @extends {A<string>} */
export class B2 extends A {
    constructor() {
        super();
    }
}

/** @extends {A<string, string>} */
export class B3 extends A {
    constructor() {
        super();
    }
}
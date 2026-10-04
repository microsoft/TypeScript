// @module: nodenext
// @checkJs: true
// @declaration: true
// @strict: true, false

// @filename: a.ts
export class A<T> {}

// @filename: b.js
import { A } from './a.js';

export class B1 extends A {
    constructor() {
        super();
    }
}

export class B2 extends A<string> {
    constructor() {
        super();
    }
}

export class B3 extends A<string, string> {
    constructor() {
        super();
    }
}
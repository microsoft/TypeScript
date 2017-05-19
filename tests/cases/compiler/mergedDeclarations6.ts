// @module: amd

// @filename: a.ts
export class A {
    protected protected: any;

    protected setProtected(val: any) {
        this.protected = val;
    }
}

// @filename: b.ts
import {A} from './a';

declare module "./a" {
    interface A { }
}

export class B extends A {
    protected setProtected() {

    }
}
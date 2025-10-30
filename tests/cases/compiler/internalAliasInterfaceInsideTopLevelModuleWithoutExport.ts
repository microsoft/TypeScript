//@module: amd
// @declaration: true
export namespace a {
    export interface I {
    }
}

import b = a.I;
export var x: b;

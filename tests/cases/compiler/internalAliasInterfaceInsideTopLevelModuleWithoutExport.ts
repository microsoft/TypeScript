//@module: amd
// @declaration: true
export module a {
    export interface I {
    }
}

import b = a.I;
export var x: b;

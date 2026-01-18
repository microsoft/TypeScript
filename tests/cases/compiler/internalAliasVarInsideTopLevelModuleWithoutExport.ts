//@module: commonjs
// @declaration: true
export namespace a {
    export var x = 10;
}

import b = a.x;
export var bVal = b;


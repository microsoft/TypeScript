// @declaration: true
// @module: commonjs
module m {
    export module c {
        export class c {
        }
    }
}
import a = m.c;
import b = a;
export = b;
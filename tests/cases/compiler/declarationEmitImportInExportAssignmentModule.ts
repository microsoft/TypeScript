// @declaration: true
// @module: commonjs 

namespace m {
    export namespace c {
        export class c {
        }
    }
    import x = c;
    export var a: typeof x;
}
export = m;
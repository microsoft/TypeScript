// @declaration: true
// @module: commonjs 

module m {
    export module c {
        export class c {
        }
    }
    import x = c;
    export var a: typeof x;
}
export = m;
// @target: es2015
// @module: commonjs
// @declaration: true
// @checkOrder: default,editorfirst

namespace m {
    export interface Inner {
        x: number;
    }
    export interface Outer {
        use: (inner: Inner) => Outer;
    }
}
declare var m: {
    (): m.Outer;
};
export = m;

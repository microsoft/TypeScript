// @strict: false
// @target: es5, es2015
// @module: esnext
namespace A {
    declare global {
        interface Array<T> { x }
    }
}
export {}

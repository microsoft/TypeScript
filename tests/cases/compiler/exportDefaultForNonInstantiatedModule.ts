// @target: ES6

module m {
    export interface foo {
    }
}
// Should not be emitted
export default m;
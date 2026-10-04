// @target: ES6

namespace m {
    export interface foo {
    }
}
// Should not be emitted
export default m;
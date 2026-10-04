// @target: es2015
// @strict: false
namespace my.data.foo {
    export function buz() { }
}
namespace my.data {
    function data(my) {
        foo.buz();
    }
}
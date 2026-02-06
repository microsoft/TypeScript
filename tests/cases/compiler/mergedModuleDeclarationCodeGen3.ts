// @target: es2015
// @strict: false
namespace my.data {
    export function buz() { }
}
namespace my.data.foo {
    function data(my, foo) {
        buz();
    }
}
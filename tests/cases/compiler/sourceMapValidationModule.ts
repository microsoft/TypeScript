// @sourcemap: true
namespace m2 {
    var a = 10;
    a++;
}
namespace m3 {
    namespace m4 {
        export var x = 30;
    }

    export function foo() {
        return m4.x;
    }
}
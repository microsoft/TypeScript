// @sourcemap: true
module m2 {
    var a = 10;
    a++;
}
module m3 {
    module m4 {
        export var x = 30;
    }

    export function foo() {
        return m4.x;
    }
}
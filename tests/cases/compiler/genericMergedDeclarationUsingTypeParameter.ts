function foo<T extends U, U>(y: T, z: U) { return y; }
module foo {
    export var x: T;
    var y = <T>1;
}

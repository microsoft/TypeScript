function foo<T,U>() {
    var x: (item) => T;
    var y: (item) => boolean;
    x = y;  // Should be an error
    y = x;  // Shound be an error
}

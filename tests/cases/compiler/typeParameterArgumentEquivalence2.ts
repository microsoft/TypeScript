function foo<T,U>() {
    var x: (item: U) => boolean;
    var y: (item: T) => boolean;
    x = y;  // Should be an error
    y = x;  // Shound be an error
}

function foo<T>() {
    var x: (item: number) => boolean;
    var y: (item: T) => boolean;
    x = y;  // Should be an error
    y = x;  // Shound be an error
}

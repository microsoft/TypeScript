function foo<T,U>() {
    var x!: (item: any) => T;
    var y!: (item: any) => boolean;
    x = y;  // Should be an error
    y = x;  // Shound be an error
}

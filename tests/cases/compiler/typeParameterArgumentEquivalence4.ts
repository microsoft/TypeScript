function foo<T,U>() {
    var x!: (item: any) => U;
    var y!: (item: any) => T;
    x = y;  // Should be an error
    y = x;  // Shound be an error
}

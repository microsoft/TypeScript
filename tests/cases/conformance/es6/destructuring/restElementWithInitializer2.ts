var a: number[];
var x: number[];
[...x = a] = a;  // Error, rest element cannot have initializer

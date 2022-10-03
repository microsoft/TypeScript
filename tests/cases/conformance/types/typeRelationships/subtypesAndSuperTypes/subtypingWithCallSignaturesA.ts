declare function foo3(cb: (x: number) => number): typeof cb;
var r5 = foo3((x: number) => ''); // error
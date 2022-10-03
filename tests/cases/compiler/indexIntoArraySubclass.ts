interface Foo2<T> extends Array<T> { }
var x2: Foo2<string>;
var r = x2[0]; // string
r = 0; //error
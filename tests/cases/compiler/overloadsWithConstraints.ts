declare function f<T extends Number>(x: T): T;
declare function f<T extends String>(x: T): T

var v = f<string>("");
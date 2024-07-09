function f<T>(x: T): T { return null; }
var r = <T>(x: T) => x;
r = f; // should be allowed
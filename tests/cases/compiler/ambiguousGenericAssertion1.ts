function f<T>(x: T): T { return null; }
var r = <T>(x: T) => x;
var r2 = < <T>(x: T) => T>f; // valid
var r3 = <<T>(x: T) => T>f; // ambiguous, appears to the parser as a << operation

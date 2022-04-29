declare var b: <T>(x: T) => void ;

var c: <T>(x: T) => void = function <T>(x: T) { return 42; }

b = c;

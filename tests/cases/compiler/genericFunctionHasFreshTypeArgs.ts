function f(p: <T>(x: T) => void) { };
f(x => f(y => x = y));
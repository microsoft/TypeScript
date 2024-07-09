function f<T>(value: T) { return value; };

function h<R>(func: (x: number) => R): R { return null; }

var z: number = h<number>(f);
var z: number = h(f);
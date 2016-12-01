var intersection: { a: number } & { b: string };

var o1: { a: number, b: string };
var o1 = { ...intersection };

var o2: { a: number, b: string, c: boolean };
var o2 = { ...intersection, c: false };
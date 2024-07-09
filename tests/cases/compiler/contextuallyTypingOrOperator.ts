var v: { a: (_: string) => number } = { a: s => s.length } || { a: s => 1 };

var v2 = (s: string) => s.length || function (s) { s.length };

var v3 = (s: string) => s.length || function (s: number) { return 1 };
var v4 = (s: number) => 1 || function (s: string) { return s.length };
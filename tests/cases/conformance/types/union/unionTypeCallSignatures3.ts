function f1(s: string) { }
function f2(s?: string) { }
function f3(...s: string[]) { }
function f4(s: string, s2?: string) { }
function f5(s?: string, n?: number) { }
function f6(s?: string, ...n: number[]) { }
function f7(s: string, ...sRest: string[]) { }

var fUnion: typeof f1 | typeof f2 | typeof f3 | typeof f4 | typeof f5 | typeof f6 | typeof f7;

fUnion(""); // All constituents can be called by passing a single string.

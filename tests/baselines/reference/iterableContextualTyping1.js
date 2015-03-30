//// [iterableContextualTyping1.ts]
var iter: Iterable<(x: string) => number> = [s => s.length];

//// [iterableContextualTyping1.js]
var iter = [s => s.length];

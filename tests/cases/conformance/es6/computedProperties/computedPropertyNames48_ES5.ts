// @target: es5
declare function extractIndexer<T>(p: { [n: number]: T }): T;

enum E { x }

var a: any;

extractIndexer({
    [a]: ""
}); // Should return string

extractIndexer({
    [E.x]: ""
}); // Should return string

extractIndexer({
    ["" || 0]: ""
}); // Should return any (widened form of undefined)
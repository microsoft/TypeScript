//// [contextualTypingTwoInstancesOfSameTypeParameter.ts]
function f6<T>(x: (a: T) => T) {
    return null;
} 
f6(x => f6(y => x = y));

//// [contextualTypingTwoInstancesOfSameTypeParameter.js]
function f6(x) {
    return null;
}
f6(function (x) { return f6(function (y) { return x = y; }); });

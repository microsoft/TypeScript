//// [functionAssignableToArrayLike.ts]
var bad1: ArrayLike<any> = (x, y) => x + y
var bad2: ArrayLike<string> = (x, y) => x + y


//// [functionAssignableToArrayLike.js]
var bad1 = function (x, y) { return x + y; };
var bad2 = function (x, y) { return x + y; };

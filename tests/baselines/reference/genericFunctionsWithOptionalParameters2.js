//// [genericFunctionsWithOptionalParameters2.ts]
interface Utils {
   fold<T, S>(c: Array<T>, folder?: (s: S, t: T) => T, init?: S): T;
}

var utils: Utils;

utils.fold(); // error
utils.fold(null); // no error
utils.fold(null, null); // no error
utils.fold(null, null, null); // error: Unable to invoke type with no call signatures


//// [genericFunctionsWithOptionalParameters2.js]
var utils;
utils.fold(); // error
utils.fold(null); // no error
utils.fold(null, null); // no error
utils.fold(null, null, null); // error: Unable to invoke type with no call signatures

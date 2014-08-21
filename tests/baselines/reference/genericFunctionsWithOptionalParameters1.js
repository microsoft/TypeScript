//// [genericFunctionsWithOptionalParameters1.ts]
interface Utils {
   fold<T, S>(c?: Array<T>, folder?: (s: S, t: T) => T, init?: S): T;
}

var utils: Utils;

utils.fold(); // no error
utils.fold(null); // no error
utils.fold(null, null); // no error
utils.fold(null, null, null); // no error


//// [genericFunctionsWithOptionalParameters1.js]
var utils;
utils.fold(); // no error
utils.fold(null); // no error
utils.fold(null, null); // no error
utils.fold(null, null, null); // no error

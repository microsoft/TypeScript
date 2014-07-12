//// [genericFunctionsWithOptionalParameters2.js]
var utils;

utils.fold(); // error
utils.fold(null); // no error
utils.fold(null, null); // no error
utils.fold(null, null, null); // error: Unable to invoke type with no call signatures

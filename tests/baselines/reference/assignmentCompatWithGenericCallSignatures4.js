//// [assignmentCompatWithGenericCallSignatures4.js]
// some complex cases of assignment compat of generic signatures.

var x;
var y;

// These both do not make sense as we would eventually be comparing I2<T> to I2<I2<T>>, and they are self referencing anyway
x = y;
y = x;

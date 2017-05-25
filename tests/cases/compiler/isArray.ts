// @lib: es5
var maybeArray: number | number[];


if (Array.isArray(maybeArray)) {
    maybeArray.length; // OK
}
else {
    maybeArray.toFixed(); // OK
}
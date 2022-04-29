var maybeArray: number | number[];


if (Array.isArray(maybeArray)) {
    maybeArray.length; // OK
}
else {
    maybeArray.toFixed(); // OK
}
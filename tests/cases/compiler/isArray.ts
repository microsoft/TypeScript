var maybeArray: number | number[];


if (Array.isArray(maybeArray)) {
    maybeArray.length; // OK
    maybeArray.push(0); // OK
    const str: string = maybeArray[0]; // Expect error
}
else {
    maybeArray.toFixed(); // OK
}

var maybeReadonlyArray: number | ReadonlyArray<number>;
if (Array.isArray(maybeReadonlyArray)) {
    maybeReadonlyArray.length; // OK
    const num = maybeReadonlyArray[0]; // OK, expect typeof num = number
    const str: string = maybeReadonlyArray[0]; // Expect error
    maybeReadonlyArray.push(0); // Expect error
} else {
    maybeReadonlyArray.toFixed();
}
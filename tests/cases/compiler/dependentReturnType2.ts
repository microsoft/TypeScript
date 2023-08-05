// @strict: true
// @noEmit: true

function f3<T extends 1 | 2 | 3>(x: T): T extends 1 ? number : T extends 2 ? string : T extends 3 ? boolean : never {
    if (x === 1) {
        return 0;
    }
    else {
        return ""; // Error, returned expression needs to have type string & boolean (= never)
    }
}
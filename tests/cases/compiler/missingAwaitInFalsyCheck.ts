// @strict: true

async function foo(): Promise<string | undefined> {
    return
}
const value = foo();

if (!value) {
    // ...
}

// if (value) { // Error 2801: This condition will always return true.

// }

// declare const f: () => boolean;

// if (f) {

// }

// declare const bs: boolean[];
// if ((bs[0] || bs[1]) || (value || bs[2])) {

// }
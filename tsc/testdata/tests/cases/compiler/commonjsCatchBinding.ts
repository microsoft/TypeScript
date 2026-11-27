// @target: es2022
// @module: commonjs
// @strict: true
// @noTypesAndSymbols: true

// @filename: a.ts
export const x = "x";
export default "y";

// @filename: b.ts
import y, { x } from "./a";
export let z = "z";

try {
    throw {};
} catch ({ a = x }: any) {
    console.log(a);
}

try {
    throw {};
} catch ({ a = z }: any) {
    console.log(a);
}

try {
    throw { a: {} };
} catch ({ a: { b = y } }: any) {
    console.log(b);
}

try {
    throw { x: 1, z: 2 };
} catch ({ [x]: a, [z]: b }: any) {
    console.log(a, b);
}

try {
    throw [];
} catch ([a = x, b = y, c = z]: any) {
    console.log(a, b, c);
}

try {
    throw {};
} catch ({ z = "a", a = z }: any) {
    console.log(z, a);
}

try {
    throw "a";
} catch (x) {
    console.log(x);
}

try {
    throw 0;
} catch {
    console.log(x);
}

try {
    throw {};
} catch ({ a = x }: any) {
    var w = a;
}
export { w };

function f1() {
    try {
        throw {};
    } catch ({ a = x, b = z }: any) {
        console.log(a, b);
    }
}
f1();

//// [isArray.ts]
interface MyArray<T> extends Array<T> { manifest: any; }
interface MyReadOnlyArray<T> extends ReadonlyArray<T> { manifest: any; }

function fn1(arg: string | string[]) {
    if (Array.isArray(arg)) arg.push(""); // Should OK
}

function fn2(arg: unknown) {
    if (Array.isArray(arg)) arg.push(""); // Should OK
}

function fn3(arg: object) {
    if (Array.isArray(arg)) arg.push(""); // Should OK
}

function fn4(arg: {}) {
    if (Array.isArray(arg)) arg.push(""); // Should OK
}

function fn5(arg: string | ReadonlyArray<string>) {
    if (Array.isArray(arg)) arg.push(10); // Should FAIL
    if (Array.isArray(arg)) arg.push(""); // Should FAIL
    if (Array.isArray(arg)) arg.indexOf(""); // Should OK
    if (!Array.isArray(arg)) arg.toUpperCase(); // Should OK
}

function fn6(arg: string | string[]) {
    if (Array.isArray(arg)) arg.push(10); // Should FAIL
}

function fn7(arg: boolean | number[] | string[]) {
    if (Array.isArray(arg)) arg.push(null as any as string & number); // Should OK
}

function fn8(arg: string | number[] | readonly string[]) {
    if (Array.isArray(arg)) arg.push(10); // Should FAIL
}

function fn9(arg: string | number[] | readonly string[]) {
    if (Array.isArray(arg)) arg.push(10); // Should FAIL
}

function fn10(arg: string | MyArray<string>) {
    if (Array.isArray(arg)) arg.push(10); // Should FAIL
    if (Array.isArray(arg)) arg.push(""); // Should OK
    if (Array.isArray(arg)) arg.manifest; // Should OK
}

function fn11(arg: string | MyReadOnlyArray<string>) {
    if (Array.isArray(arg)) arg.push(""); // Should FAIL
    if (Array.isArray(arg)) arg.indexOf(10); // Should FAIL
    if (Array.isArray(arg)) arg.indexOf(""); // Should OK
    if (Array.isArray(arg)) arg.manifest; // Should OK
}

function fn12<T>(arg: T | T[]) {
    if (Array.isArray(arg)) arg.push(null as any as T); // Should OK
}

function fn13<T>(arg: T | ReadonlyArray<T>) {
    if (Array.isArray(arg)) arg.push(null as any as T); // Should fail
    if (Array.isArray(arg)) arg.indexOf(null as any as T); // OK
}

function fn14<T>(arg: T | [T]) {
    if (Array.isArray(arg)) arg.push(null as any as T); // Should OK
}

function fn15<T>(arg: T | readonly [T]) {
    if (Array.isArray(arg)) arg.push(null as any as T); // Should fail
    if (Array.isArray(arg)) arg.indexOf(null as any as T); // Should OK
}

function fn16<T extends string | string[]>(arg: T) {
    if (Array.isArray(arg)) arg.push("10"); // Should OK
}

function fn17() {
    const s: Array<string | string[]> = [];
    const arrs = s.filter(Array.isArray);
    arrs.push(["one"]);
}


//// [isArray.js]
function fn1(arg) {
    if (Array.isArray(arg))
        arg.push(""); // Should OK
}
function fn2(arg) {
    if (Array.isArray(arg))
        arg.push(""); // Should OK
}
function fn3(arg) {
    if (Array.isArray(arg))
        arg.push(""); // Should OK
}
function fn4(arg) {
    if (Array.isArray(arg))
        arg.push(""); // Should OK
}
function fn5(arg) {
    if (Array.isArray(arg))
        arg.push(10); // Should FAIL
    if (Array.isArray(arg))
        arg.push(""); // Should FAIL
    if (Array.isArray(arg))
        arg.indexOf(""); // Should OK
    if (!Array.isArray(arg))
        arg.toUpperCase(); // Should OK
}
function fn6(arg) {
    if (Array.isArray(arg))
        arg.push(10); // Should FAIL
}
function fn7(arg) {
    if (Array.isArray(arg))
        arg.push(null); // Should OK
}
function fn8(arg) {
    if (Array.isArray(arg))
        arg.push(10); // Should FAIL
}
function fn9(arg) {
    if (Array.isArray(arg))
        arg.push(10); // Should FAIL
}
function fn10(arg) {
    if (Array.isArray(arg))
        arg.push(10); // Should FAIL
    if (Array.isArray(arg))
        arg.push(""); // Should OK
    if (Array.isArray(arg))
        arg.manifest; // Should OK
}
function fn11(arg) {
    if (Array.isArray(arg))
        arg.push(""); // Should FAIL
    if (Array.isArray(arg))
        arg.indexOf(10); // Should FAIL
    if (Array.isArray(arg))
        arg.indexOf(""); // Should OK
    if (Array.isArray(arg))
        arg.manifest; // Should OK
}
function fn12(arg) {
    if (Array.isArray(arg))
        arg.push(null); // Should OK
}
function fn13(arg) {
    if (Array.isArray(arg))
        arg.push(null); // Should fail
    if (Array.isArray(arg))
        arg.indexOf(null); // OK
}
function fn14(arg) {
    if (Array.isArray(arg))
        arg.push(null); // Should OK
}
function fn15(arg) {
    if (Array.isArray(arg))
        arg.push(null); // Should fail
    if (Array.isArray(arg))
        arg.indexOf(null); // Should OK
}
function fn16(arg) {
    if (Array.isArray(arg))
        arg.push("10"); // Should OK
}
function fn17() {
    var s = [];
    var arrs = s.filter(Array.isArray);
    arrs.push(["one"]);
}

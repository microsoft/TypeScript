//// [tests/cases/compiler/findLast.ts] ////

//// [findLast.ts]
const itemNumber: number | undefined = [0].findLast((item) => item === 0);
const itemString: string | undefined = ["string"].findLast((item) => item === "string");
new Int8Array().findLast((item) => item === 0);
new Uint8Array().findLast((item) => item === 0);
new Uint8ClampedArray().findLast((item) => item === 0);
new Int16Array().findLast((item) => item === 0);
new Uint16Array().findLast((item) => item === 0);
new Int32Array().findLast((item) => item === 0);
new Uint32Array().findLast((item) => item === 0);
new Float32Array().findLast((item) => item === 0);
new Float64Array().findLast((item) => item === 0);
new BigInt64Array().findLast((item) => item === BigInt(0));
new BigUint64Array().findLast((item) => item === BigInt(0));

const indexNumber: number = [0].findLastIndex((item) => item === 0);
const indexString: number = ["string"].findLastIndex((item) => item === "string");
new Int8Array().findLastIndex((item) => item === 0);
new Uint8Array().findLastIndex((item) => item === 0);
new Uint8ClampedArray().findLastIndex((item) => item === 0);
new Int16Array().findLastIndex((item) => item === 0);
new Uint16Array().findLastIndex((item) => item === 0);
new Int32Array().findLastIndex((item) => item === 0);
new Uint32Array().findLastIndex((item) => item === 0);
new Float32Array().findLastIndex((item) => item === 0);
new Float64Array().findLastIndex((item) => item === 0);
new BigInt64Array().findLastIndex((item) => item === BigInt(0));
new BigUint64Array().findLastIndex((item) => item === BigInt(0));


//// [findLast.js]
const itemNumber = [0].findLast((item) => item === 0);
const itemString = ["string"].findLast((item) => item === "string");
new Int8Array().findLast((item) => item === 0);
new Uint8Array().findLast((item) => item === 0);
new Uint8ClampedArray().findLast((item) => item === 0);
new Int16Array().findLast((item) => item === 0);
new Uint16Array().findLast((item) => item === 0);
new Int32Array().findLast((item) => item === 0);
new Uint32Array().findLast((item) => item === 0);
new Float32Array().findLast((item) => item === 0);
new Float64Array().findLast((item) => item === 0);
new BigInt64Array().findLast((item) => item === BigInt(0));
new BigUint64Array().findLast((item) => item === BigInt(0));
const indexNumber = [0].findLastIndex((item) => item === 0);
const indexString = ["string"].findLastIndex((item) => item === "string");
new Int8Array().findLastIndex((item) => item === 0);
new Uint8Array().findLastIndex((item) => item === 0);
new Uint8ClampedArray().findLastIndex((item) => item === 0);
new Int16Array().findLastIndex((item) => item === 0);
new Uint16Array().findLastIndex((item) => item === 0);
new Int32Array().findLastIndex((item) => item === 0);
new Uint32Array().findLastIndex((item) => item === 0);
new Float32Array().findLastIndex((item) => item === 0);
new Float64Array().findLastIndex((item) => item === 0);
new BigInt64Array().findLastIndex((item) => item === BigInt(0));
new BigUint64Array().findLastIndex((item) => item === BigInt(0));

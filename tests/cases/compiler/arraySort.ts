// @lib: esnext

var strTuple: ["foo", "bar", "baz"];
strTuple.sort(); // Type should be ("foo" | "bar" | "baz")[] instead of ["foo", "bar", "baz"]

var numTuple: [11, 2, 22, 1];
numTuple.sort((a, b) => a - b); // Type should be (11 | 2 | 22 | 1)[] instead of [11, 2, 22, 1]

interface Int8ArrayExtension extends Int8Array {}
var int8Array: Int8ArrayExtension;
int8Array.sort((a, b) => a - b); // Int8Array

interface Uint8ArrayExtension extends Uint8Array {}
var uint8Array: Uint8ArrayExtension;
uint8Array.sort((a, b) => a - b); // Uint8Array

interface Uint8ClampedArrayExtension extends Uint8ClampedArray {}
var uint8ClampedArray: Uint8ClampedArrayExtension;
uint8ClampedArray.sort((a, b) => a - b); // Uint8ClampedArray

interface Int16ArrayExtension extends Int16Array {}
var int16Array: Int16ArrayExtension;
int16Array.sort((a, b) => a - b); // Int16Array

interface Uint16ArrayExtension extends Uint16Array {}
var uint16Array: Uint16ArrayExtension;
uint16Array.sort((a, b) => a - b); // Uint16Array

interface Int32ArrayExtension extends Int32Array {}
var int32Array: Int32ArrayExtension;
int32Array.sort((a, b) => a - b); // Int32Array

interface Uint32ArrayExtension extends Uint32Array {}
var uint32Array: Uint32ArrayExtension;
uint32Array.sort((a, b) => a - b); // Uint32Array

interface Float32ArrayExtension extends Float32Array {}
var float32Array: Float32ArrayExtension;
float32Array.sort((a, b) => a - b); // Float32Array

interface Float64ArrayExtension extends Float64Array {}
var float64Array: Float64ArrayExtension;
float64Array.sort((a, b) => a - b); // Float64Array

interface BigInt64ArrayExtension extends BigInt64Array {}
var bigInt64Array: BigInt64ArrayExtension;
bigInt64Array.sort((a, b) => a - b); // BigInt64Array

interface BigUint64ArrayExtension extends BigUint64Array {}
var bigUint64Array: BigUint64ArrayExtension;
bigUint64Array.sort((a, b) => a - b); // BigUint64Array

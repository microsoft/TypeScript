//// [arrayCopyWithin.ts]
var strTuple: ["foo", "bar", "baz"];
strTuple.copyWithin(0, 0); // Type should be ("foo" | "bar" | "baz")[] instead of ["foo", "bar", "baz"]

var numTuple: [11, 2, 22, 1];
numTuple.copyWithin(0, 0); // Type should be (11 | 2 | 22 | 1)[] instead of [11, 2, 22, 1]

interface Int8ArrayExtension extends Int8Array {}
var int8Array: Int8ArrayExtension;
int8Array.copyWithin(0, 0); // Int8Array

interface Uint8ArrayExtension extends Uint8Array {}
var uint8Array: Uint8ArrayExtension;
uint8Array.copyWithin(0, 0); // Uint8Array

interface Uint8ClampedArrayExtension extends Uint8ClampedArray {}
var uint8ClampedArray: Uint8ClampedArrayExtension;
uint8ClampedArray.copyWithin(0, 0); // Uint8ClampedArray

interface Int16ArrayExtension extends Int16Array {}
var int16Array: Int16ArrayExtension;
int16Array.copyWithin(0, 0); // Int16Array

interface Uint16ArrayExtension extends Uint16Array {}
var uint16Array: Uint16ArrayExtension;
uint16Array.copyWithin(0, 0); // Uint16Array

interface Int32ArrayExtension extends Int32Array {}
var int32Array: Int32ArrayExtension;
int32Array.copyWithin(0, 0); // Int32Array

interface Uint32ArrayExtension extends Uint32Array {}
var uint32Array: Uint32ArrayExtension;
uint32Array.copyWithin(0, 0); // Uint32Array

interface Float32ArrayExtension extends Float32Array {}
var float32Array: Float32ArrayExtension;
float32Array.copyWithin(0, 0); // Float32Array

interface Float64ArrayExtension extends Float64Array {}
var float64Array: Float64ArrayExtension;
float64Array.copyWithin(0, 0); // Float64Array

interface BigInt64ArrayExtension extends BigInt64Array {}
var bigInt64Array: BigInt64ArrayExtension;
bigInt64Array.copyWithin(0, 0); // BigInt64Array

interface BigUint64ArrayExtension extends BigUint64Array {}
var bigUint64Array: BigUint64ArrayExtension;
bigUint64Array.copyWithin(0, 0); // BigUint64Array


//// [arrayCopyWithin.js]
var strTuple;
strTuple.copyWithin(0, 0); // Type should be ("foo" | "bar" | "baz")[] instead of ["foo", "bar", "baz"]
var numTuple;
numTuple.copyWithin(0, 0); // Type should be (11 | 2 | 22 | 1)[] instead of [11, 2, 22, 1]
var int8Array;
int8Array.copyWithin(0, 0); // Int8Array
var uint8Array;
uint8Array.copyWithin(0, 0); // Uint8Array
var uint8ClampedArray;
uint8ClampedArray.copyWithin(0, 0); // Uint8ClampedArray
var int16Array;
int16Array.copyWithin(0, 0); // Int16Array
var uint16Array;
uint16Array.copyWithin(0, 0); // Uint16Array
var int32Array;
int32Array.copyWithin(0, 0); // Int32Array
var uint32Array;
uint32Array.copyWithin(0, 0); // Uint32Array
var float32Array;
float32Array.copyWithin(0, 0); // Float32Array
var float64Array;
float64Array.copyWithin(0, 0); // Float64Array
var bigInt64Array;
bigInt64Array.copyWithin(0, 0); // BigInt64Array
var bigUint64Array;
bigUint64Array.copyWithin(0, 0); // BigUint64Array

//// [typedArrays-es5.ts]
const float32Array = new Float32Array(1);
[...float32Array];

const float64Array = new Float64Array(1);
[...float64Array];

const int16Array = new Int16Array(1);
[...int16Array];

const int32Array = new Int32Array(1);
[...int32Array];

const int8Array = new Int8Array(1);
[...int8Array];

const nodeList = new NodeList();
[...nodeList];

const uint16Array = new Uint16Array(1);
[...uint16Array];

const uint32Array = new Uint32Array(1);
[...uint32Array];

const uint8Array = new Uint8Array(1);
[...uint8Array];

const uint8ClampedArray = new Uint8ClampedArray(1);
[...uint8ClampedArray];




//// [typedArrays-es5.js]
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var float32Array = new Float32Array(1);
__spreadArray([], float32Array, true);
var float64Array = new Float64Array(1);
__spreadArray([], float64Array, true);
var int16Array = new Int16Array(1);
__spreadArray([], int16Array, true);
var int32Array = new Int32Array(1);
__spreadArray([], int32Array, true);
var int8Array = new Int8Array(1);
__spreadArray([], int8Array, true);
var nodeList = new NodeList();
__spreadArray([], nodeList, true);
var uint16Array = new Uint16Array(1);
__spreadArray([], uint16Array, true);
var uint32Array = new Uint32Array(1);
__spreadArray([], uint32Array, true);
var uint8Array = new Uint8Array(1);
__spreadArray([], uint8Array, true);
var uint8ClampedArray = new Uint8ClampedArray(1);
__spreadArray([], uint8ClampedArray, true);

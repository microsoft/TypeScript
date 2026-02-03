//// [tests/cases/compiler/arrayToLocaleStringES5.ts] ////

//// [arrayToLocaleStringES5.ts]
let str: string;
const arr = [1, 2, 3];
str = arr.toLocaleString(); // OK
str = arr.toLocaleString('en-US'); // should be error
str = arr.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // should be error

const dates: readonly Date[] = [new Date(), new Date()];
str = dates.toLocaleString(); // OK
str = dates.toLocaleString('fr'); // should be error
str = dates.toLocaleString('fr', { timeZone: 'UTC' }); // should be error

const int8Array = new Int8Array(3);
str = int8Array.toLocaleString(); // OK
str = int8Array.toLocaleString('en-US'); // should be error
str = int8Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // should be error

const uint8Array = new Uint8Array(3);
str = uint8Array.toLocaleString(); // OK
str = uint8Array.toLocaleString('en-US'); // should be error
str = uint8Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // should be error

const uint8ClampedArray = new Uint8ClampedArray(3);
str = uint8ClampedArray.toLocaleString(); // OK
str = uint8ClampedArray.toLocaleString('en-US'); // should be error
str = uint8ClampedArray.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // should be error

const int16Array = new Int16Array(3);
str = int16Array.toLocaleString(); // OK
str = int16Array.toLocaleString('en-US'); // should be error
str = int16Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // should be error

const uint16Array = new Uint16Array(3);
str = uint16Array.toLocaleString(); // OK
str = uint16Array.toLocaleString('en-US'); // should be error
str = uint16Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // should be error

const int32Array = new Int32Array(3);
str = int32Array.toLocaleString(); // OK
str = int32Array.toLocaleString('en-US'); // should be error
str = int32Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // should be error

const uint32Array = new Uint32Array(3);
str = uint32Array.toLocaleString(); // OK
str = uint32Array.toLocaleString('en-US'); // should be error
str = uint32Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // should be error

const float32Array = new Float32Array(3);
str = float32Array.toLocaleString(); // OK
str = float32Array.toLocaleString('en-US'); // should be error
str = float32Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // should be error

const float64Array = new Float64Array(3);
str = float64Array.toLocaleString(); // OK
str = float64Array.toLocaleString('en-US'); // should be error
str = float64Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // should be error


//// [arrayToLocaleStringES5.js]
var str;
var arr = [1, 2, 3];
str = arr.toLocaleString(); // OK
str = arr.toLocaleString('en-US'); // should be error
str = arr.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // should be error
var dates = [new Date(), new Date()];
str = dates.toLocaleString(); // OK
str = dates.toLocaleString('fr'); // should be error
str = dates.toLocaleString('fr', { timeZone: 'UTC' }); // should be error
var int8Array = new Int8Array(3);
str = int8Array.toLocaleString(); // OK
str = int8Array.toLocaleString('en-US'); // should be error
str = int8Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // should be error
var uint8Array = new Uint8Array(3);
str = uint8Array.toLocaleString(); // OK
str = uint8Array.toLocaleString('en-US'); // should be error
str = uint8Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // should be error
var uint8ClampedArray = new Uint8ClampedArray(3);
str = uint8ClampedArray.toLocaleString(); // OK
str = uint8ClampedArray.toLocaleString('en-US'); // should be error
str = uint8ClampedArray.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // should be error
var int16Array = new Int16Array(3);
str = int16Array.toLocaleString(); // OK
str = int16Array.toLocaleString('en-US'); // should be error
str = int16Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // should be error
var uint16Array = new Uint16Array(3);
str = uint16Array.toLocaleString(); // OK
str = uint16Array.toLocaleString('en-US'); // should be error
str = uint16Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // should be error
var int32Array = new Int32Array(3);
str = int32Array.toLocaleString(); // OK
str = int32Array.toLocaleString('en-US'); // should be error
str = int32Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // should be error
var uint32Array = new Uint32Array(3);
str = uint32Array.toLocaleString(); // OK
str = uint32Array.toLocaleString('en-US'); // should be error
str = uint32Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // should be error
var float32Array = new Float32Array(3);
str = float32Array.toLocaleString(); // OK
str = float32Array.toLocaleString('en-US'); // should be error
str = float32Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // should be error
var float64Array = new Float64Array(3);
str = float64Array.toLocaleString(); // OK
str = float64Array.toLocaleString('en-US'); // should be error
str = float64Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // should be error

//// [tests/cases/compiler/arrayToLocaleStringES2015.ts] ////

//// [arrayToLocaleStringES2015.ts]
let str: string;
const arr = [1, 2, 3];
str = arr.toLocaleString(); // OK
str = arr.toLocaleString('en-US'); // OK
str = arr.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // OK

const dates: readonly Date[] = [new Date(), new Date()];
str = dates.toLocaleString(); // OK
str = dates.toLocaleString('fr'); // OK
str = dates.toLocaleString('fr', { timeZone: 'UTC' }); // OK

const mixed = [1, new Date(), 59782, new Date()];
str = mixed.toLocaleString(); // OK
str = mixed.toLocaleString('fr'); // OK
str = mixed.toLocaleString('de', { style: 'currency', currency: 'EUR' }); // OK
str = (mixed as ReadonlyArray<number | Date>).toLocaleString('de', { currency: 'EUR', style: 'currency', timeZone: 'UTC' }); // OK

const int8Array = new Int8Array(3);
str = int8Array.toLocaleString(); // OK
str = int8Array.toLocaleString('en-US'); // OK
str = int8Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // OK

const uint8Array = new Uint8Array(3);
str = uint8Array.toLocaleString(); // OK
str = uint8Array.toLocaleString('en-US'); // OK
str = uint8Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // OK

const uint8ClampedArray = new Uint8ClampedArray(3);
str = uint8ClampedArray.toLocaleString(); // OK
str = uint8ClampedArray.toLocaleString('en-US'); // OK
str = uint8ClampedArray.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // OK

const int16Array = new Int16Array(3);
str = int16Array.toLocaleString(); // OK
str = int16Array.toLocaleString('en-US'); // OK
str = int16Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // OK

const uint16Array = new Uint16Array(3);
str = uint16Array.toLocaleString(); // OK
str = uint16Array.toLocaleString('en-US'); // OK
str = uint16Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // OK

const int32Array = new Int32Array(3);
str = int32Array.toLocaleString(); // OK
str = int32Array.toLocaleString('en-US'); // OK
str = int32Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // OK

const uint32Array = new Uint32Array(3);
str = uint32Array.toLocaleString(); // OK
str = uint32Array.toLocaleString('en-US'); // OK
str = uint32Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // OK

const float32Array = new Float32Array(3);
str = float32Array.toLocaleString(); // OK
str = float32Array.toLocaleString('en-US'); // OK
str = float32Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // OK

const float64Array = new Float64Array(3);
str = float64Array.toLocaleString(); // OK
str = float64Array.toLocaleString('en-US'); // OK
str = float64Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // OK


//// [arrayToLocaleStringES2015.js]
let str;
const arr = [1, 2, 3];
str = arr.toLocaleString(); // OK
str = arr.toLocaleString('en-US'); // OK
str = arr.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // OK
const dates = [new Date(), new Date()];
str = dates.toLocaleString(); // OK
str = dates.toLocaleString('fr'); // OK
str = dates.toLocaleString('fr', { timeZone: 'UTC' }); // OK
const mixed = [1, new Date(), 59782, new Date()];
str = mixed.toLocaleString(); // OK
str = mixed.toLocaleString('fr'); // OK
str = mixed.toLocaleString('de', { style: 'currency', currency: 'EUR' }); // OK
str = mixed.toLocaleString('de', { currency: 'EUR', style: 'currency', timeZone: 'UTC' }); // OK
const int8Array = new Int8Array(3);
str = int8Array.toLocaleString(); // OK
str = int8Array.toLocaleString('en-US'); // OK
str = int8Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // OK
const uint8Array = new Uint8Array(3);
str = uint8Array.toLocaleString(); // OK
str = uint8Array.toLocaleString('en-US'); // OK
str = uint8Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // OK
const uint8ClampedArray = new Uint8ClampedArray(3);
str = uint8ClampedArray.toLocaleString(); // OK
str = uint8ClampedArray.toLocaleString('en-US'); // OK
str = uint8ClampedArray.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // OK
const int16Array = new Int16Array(3);
str = int16Array.toLocaleString(); // OK
str = int16Array.toLocaleString('en-US'); // OK
str = int16Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // OK
const uint16Array = new Uint16Array(3);
str = uint16Array.toLocaleString(); // OK
str = uint16Array.toLocaleString('en-US'); // OK
str = uint16Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // OK
const int32Array = new Int32Array(3);
str = int32Array.toLocaleString(); // OK
str = int32Array.toLocaleString('en-US'); // OK
str = int32Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // OK
const uint32Array = new Uint32Array(3);
str = uint32Array.toLocaleString(); // OK
str = uint32Array.toLocaleString('en-US'); // OK
str = uint32Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // OK
const float32Array = new Float32Array(3);
str = float32Array.toLocaleString(); // OK
str = float32Array.toLocaleString('en-US'); // OK
str = float32Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // OK
const float64Array = new Float64Array(3);
str = float64Array.toLocaleString(); // OK
str = float64Array.toLocaleString('en-US'); // OK
str = float64Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // OK

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
let str;
const arr = [1, 2, 3];
str = arr.toLocaleString();
str = arr.toLocaleString('en-US');
str = arr.toLocaleString('en-US', { style: 'currency', currency: 'EUR' });
const dates = [new Date(), new Date()];
str = dates.toLocaleString();
str = dates.toLocaleString('fr');
str = dates.toLocaleString('fr', { timeZone: 'UTC' });
const int8Array = new Int8Array(3);
str = int8Array.toLocaleString();
str = int8Array.toLocaleString('en-US');
str = int8Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' });
const uint8Array = new Uint8Array(3);
str = uint8Array.toLocaleString();
str = uint8Array.toLocaleString('en-US');
str = uint8Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' });
const uint8ClampedArray = new Uint8ClampedArray(3);
str = uint8ClampedArray.toLocaleString();
str = uint8ClampedArray.toLocaleString('en-US');
str = uint8ClampedArray.toLocaleString('en-US', { style: 'currency', currency: 'EUR' });
const int16Array = new Int16Array(3);
str = int16Array.toLocaleString();
str = int16Array.toLocaleString('en-US');
str = int16Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' });
const uint16Array = new Uint16Array(3);
str = uint16Array.toLocaleString();
str = uint16Array.toLocaleString('en-US');
str = uint16Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' });
const int32Array = new Int32Array(3);
str = int32Array.toLocaleString();
str = int32Array.toLocaleString('en-US');
str = int32Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' });
const uint32Array = new Uint32Array(3);
str = uint32Array.toLocaleString();
str = uint32Array.toLocaleString('en-US');
str = uint32Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' });
const float32Array = new Float32Array(3);
str = float32Array.toLocaleString();
str = float32Array.toLocaleString('en-US');
str = float32Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' });
const float64Array = new Float64Array(3);
str = float64Array.toLocaleString();
str = float64Array.toLocaleString('en-US');
str = float64Array.toLocaleString('en-US', { style: 'currency', currency: 'EUR' });

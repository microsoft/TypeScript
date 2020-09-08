// @target: es2020
// @declaration: true

// Test BigInt functions
let bigintVal: bigint = BigInt(123);
bigintVal = BigInt("456");
new BigInt(123); // should error
bigintVal = BigInt.asIntN(8, 0xFFFFn);
bigintVal = BigInt.asUintN(8, 0xFFFFn);
bigintVal = bigintVal.valueOf();
let stringVal: string = bigintVal.toString();
stringVal = bigintVal.toString(2);
stringVal = bigintVal.toLocaleString();
stringVal = bigintVal.toLocaleString('de-DE');
stringVal = bigintVal.toLocaleString('de-DE', { style: 'currency' });
stringVal = bigintVal.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })

// Test BigInt64Array
let bigIntArray: BigInt64Array = new BigInt64Array();
bigIntArray = new BigInt64Array(10);
bigIntArray = new BigInt64Array([1n, 2n, 3n]);
bigIntArray = new BigInt64Array([1, 2, 3]); // should error
bigIntArray = new BigInt64Array(new ArrayBuffer(80));
bigIntArray = new BigInt64Array(new ArrayBuffer(80), 8);
bigIntArray = new BigInt64Array(new ArrayBuffer(80), 8, 3);
let len: number = bigIntArray.length;
bigIntArray.length = 10; // should error
let arrayBufferLike: ArrayBufferView = bigIntArray;

// Test BigUint64Array
let bigUintArray: BigUint64Array = new BigUint64Array();
bigUintArray = new BigUint64Array(10);
bigUintArray = new BigUint64Array([1n, 2n, 3n]);
bigUintArray = new BigUint64Array([1, 2, 3]); // should error
bigUintArray = new BigUint64Array(new ArrayBuffer(80));
bigUintArray = new BigUint64Array(new ArrayBuffer(80), 8);
bigUintArray = new BigUint64Array(new ArrayBuffer(80), 8, 3);
len = bigIntArray.length;
bigIntArray.length = 10; // should error
arrayBufferLike = bigIntArray;

// Test added DataView methods
const dataView = new DataView(new ArrayBuffer(80));
dataView.setBigInt64(1, -1n);
dataView.setBigInt64(1, -1n, true);
dataView.setBigInt64(1, -1); // should error
dataView.setBigUint64(2, 123n);
dataView.setBigUint64(2, 123n, true);
dataView.setBigUint64(2, 123); // should error
bigintVal = dataView.getBigInt64(1);
bigintVal = dataView.getBigInt64(1, true);
bigintVal = dataView.getBigUint64(2);
bigintVal = dataView.getBigUint64(2, true);

// Test emitted declarations files
const w = 12n; // should emit as const w = 12n
const x = -12n; // should emit as const x = -12n
const y: 12n = 12n; // should emit type 12n
let z = 12n; // should emit type bigint in declaration file

// Test Intl methods with new parameter type
new Intl.NumberFormat("fr").format(3000n);
new Intl.NumberFormat("fr").format(bigintVal);

//// [tests/cases/compiler/arrayToLocaleStringES5.ts] ////

//// [arrayToLocaleStringES5.ts]
const arr = [1, 2, 3];
let str: string;
str = arr.toLocaleString(); // OK
str = arr.toLocaleString('en-US'); // should be error
str = arr.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // should be error

const dates: readonly Date[] = [new Date(), new Date()];
let str2: string;
str2 = dates.toLocaleString(); // OK
str2 = dates.toLocaleString('fr'); // should be error
str2 = dates.toLocaleString('fr', { timeZone: 'UTC' }); // should be error


//// [arrayToLocaleStringES5.js]
var arr = [1, 2, 3];
var str;
str = arr.toLocaleString(); // OK
str = arr.toLocaleString('en-US'); // should be error
str = arr.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // should be error
var dates = [new Date(), new Date()];
var str2;
str2 = dates.toLocaleString(); // OK
str2 = dates.toLocaleString('fr'); // should be error
str2 = dates.toLocaleString('fr', { timeZone: 'UTC' }); // should be error

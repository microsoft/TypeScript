//// [tests/cases/compiler/arrayToLocaleStringES2015.ts] ////

//// [arrayToLocaleStringES2015.ts]
const arr = [1, 2, 3];
let str: string;
str = arr.toLocaleString(); // OK
str = arr.toLocaleString('en-US'); // OK
str = arr.toLocaleString('en-US', { style: 'currency' }); // OK

const dates: readonly Date[] = [new Date(), new Date()];
let str2: string;
str2 = dates.toLocaleString(); // OK
str2 = dates.toLocaleString('fr'); // OK
str2 = dates.toLocaleString('fr', { timeZone: 'UTC' }); // OK

const mixed = [1, new Date(), 59782, new Date()];
let str3: string;
str3 = mixed.toLocaleString(); // OK
str3 = mixed.toLocaleString('de', { currency: 'EUR' }); // OK
str3 = (mixed as ReadonlyArray<number | Date>).toLocaleString('de', { currency: 'EUR', timeZone: 'UTC' }); // OK


//// [arrayToLocaleStringES2015.js]
const arr = [1, 2, 3];
let str;
str = arr.toLocaleString(); // OK
str = arr.toLocaleString('en-US'); // OK
str = arr.toLocaleString('en-US', { style: 'currency' }); // OK
const dates = [new Date(), new Date()];
let str2;
str2 = dates.toLocaleString(); // OK
str2 = dates.toLocaleString('fr'); // OK
str2 = dates.toLocaleString('fr', { timeZone: 'UTC' }); // OK
const mixed = [1, new Date(), 59782, new Date()];
let str3;
str3 = mixed.toLocaleString(); // OK
str3 = mixed.toLocaleString('de', { currency: 'EUR' }); // OK
str3 = mixed.toLocaleString('de', { currency: 'EUR', timeZone: 'UTC' }); // OK

// @target: es2015

const arr = [1, 2, 3];
let str: string;
str = arr.toLocaleString(); // OK
str = arr.toLocaleString('en-US'); // OK
str = arr.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }); // OK

const dates: readonly Date[] = [new Date(), new Date()];
let str2: string;
str2 = dates.toLocaleString(); // OK
str2 = dates.toLocaleString('fr'); // OK
str2 = dates.toLocaleString('fr', { timeZone: 'UTC' }); // OK

const mixed = [1, new Date(), 59782, new Date()];
let str3: string;
str3 = mixed.toLocaleString(); // OK
str3 = mixed.toLocaleString('de', { style: 'currency', currency: 'EUR' }); // OK
str3 = (mixed as ReadonlyArray<number | Date>).toLocaleString('de', { currency: 'EUR', style: 'currency', timeZone: 'UTC' }); // OK

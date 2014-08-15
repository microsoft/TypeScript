//// [arrayAugment.ts]
interface Array<T> {
    split: (parts: number) => T[][];
}

var x = [''];
var y = x.split(4);
var y: string[][]; // Expect no error here


//// [arrayAugment.js]
var x = [''];
var y = x.split(4);
var y; // Expect no error here

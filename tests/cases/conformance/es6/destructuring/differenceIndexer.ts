interface A { a: number }
interface String1 { [s: string]: number }
interface String2 { [s: string]: string }
interface Number1 { [n: number]: number }
interface Number2 { [n: number]: number }
interface StringNumber { [s: string]: number; [n: number]: number }
// these should all be empty
let diffString: String1 - String2;
let diffNumber: Number1 - Number2;
let diffStringNumber: Number1 - String1;
let diffStringA: A - String1;
let diffStringStringNumber: StringNumber - String1;
let diffStringNumberString: String1 - StringNumber;
// these should still have their indexer
let diffAString: String1 - A;
let diffANumber: Number1 - A;

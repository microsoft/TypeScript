let numberObject: number & { foo: any };
let stringObject: string & { foo: any };
let numberString: number & string;

let a = numberObject + 1;
let b = stringObject + 1;
let c = numberObject + '';
let d = stringObject + '';
let e = numberObject + stringObject;

let f = numberString + 1;
let g = numberString + '';
let h = numberString + numberString;

let i = numberObject * 2;
let j = numberString * 2;

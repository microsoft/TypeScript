// @declaration: true

declare let abc: "ABC";
declare let xyz: "XYZ";
declare let abcOrXyz: "ABC" | "XYZ";
declare let abcOrXyzOrNumber: "ABC" | "XYZ" | number;

let a = abcOrXyzOrNumber + 100;
let b = 100 + abcOrXyzOrNumber;
let c = abcOrXyzOrNumber + abcOrXyzOrNumber;
let d = abcOrXyzOrNumber + true;
let e = false + abcOrXyzOrNumber;
let f = abcOrXyzOrNumber++;
let g = --abcOrXyzOrNumber;
let h = abcOrXyzOrNumber ^ 10;
let i = abcOrXyzOrNumber | 10;
let j = abc < xyz;
let k = abc === xyz;
let l = abc != xyz;
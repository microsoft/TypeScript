//// [tests/cases/conformance/types/stringLiteral/stringLiteralTypesWithVariousOperators01.ts] ////

//// [stringLiteralTypesWithVariousOperators01.ts]
let abc: "ABC" = "ABC";
let xyz: "XYZ" = "XYZ";
let abcOrXyz: "ABC" | "XYZ" = abc || xyz;
let abcOrXyzOrNumber: "ABC" | "XYZ" | number = abcOrXyz || 100;

let a = "" + abc;
let b = abc + "";
let c = 10 + abc;
let d = abc + 10;
let e = xyz + abc;
let f = abc + xyz;
let g = true + abc;
let h = abc + true;
let i = abc + abcOrXyz + xyz;
let j = abcOrXyz + abcOrXyz;
let k = +abcOrXyz;
let l = -abcOrXyz;
let m = abcOrXyzOrNumber + "";
let n = "" + abcOrXyzOrNumber;
let o = abcOrXyzOrNumber + abcOrXyz;
let p = abcOrXyz + abcOrXyzOrNumber;
let q = !abcOrXyzOrNumber;
let r = ~abcOrXyzOrNumber;
let s = abcOrXyzOrNumber < abcOrXyzOrNumber;
let t = abcOrXyzOrNumber >= abcOrXyz;
let u = abc === abcOrXyz;
let v = abcOrXyz === abcOrXyzOrNumber;

//// [stringLiteralTypesWithVariousOperators01.js]
let abc = "ABC";
let xyz = "XYZ";
let abcOrXyz = abc || xyz;
let abcOrXyzOrNumber = abcOrXyz || 100;
let a = "" + abc;
let b = abc + "";
let c = 10 + abc;
let d = abc + 10;
let e = xyz + abc;
let f = abc + xyz;
let g = true + abc;
let h = abc + true;
let i = abc + abcOrXyz + xyz;
let j = abcOrXyz + abcOrXyz;
let k = +abcOrXyz;
let l = -abcOrXyz;
let m = abcOrXyzOrNumber + "";
let n = "" + abcOrXyzOrNumber;
let o = abcOrXyzOrNumber + abcOrXyz;
let p = abcOrXyz + abcOrXyzOrNumber;
let q = !abcOrXyzOrNumber;
let r = ~abcOrXyzOrNumber;
let s = abcOrXyzOrNumber < abcOrXyzOrNumber;
let t = abcOrXyzOrNumber >= abcOrXyz;
let u = abc === abcOrXyz;
let v = abcOrXyz === abcOrXyzOrNumber;


//// [stringLiteralTypesWithVariousOperators01.d.ts]
declare let abc: "ABC";
declare let xyz: "XYZ";
declare let abcOrXyz: "ABC" | "XYZ";
declare let abcOrXyzOrNumber: "ABC" | "XYZ" | number;
declare let a: string;
declare let b: string;
declare let c: string;
declare let d: string;
declare let e: string;
declare let f: string;
declare let g: string;
declare let h: string;
declare let i: string;
declare let j: string;
declare let k: number;
declare let l: number;
declare let m: string;
declare let n: string;
declare let o: string;
declare let p: string;
declare let q: boolean;
declare let r: number;
declare let s: boolean;
declare let t: boolean;
declare let u: boolean;
declare let v: boolean;

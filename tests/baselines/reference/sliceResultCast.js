//// [sliceResultCast.ts]
declare var x: [number, string] | [number, string, string];

x.slice(1) as readonly string[];

//// [sliceResultCast.js]
x.slice(1);

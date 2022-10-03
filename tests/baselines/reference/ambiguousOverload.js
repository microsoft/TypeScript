//// [ambiguousOverload.ts]
function foof(bar: string, y): number;
function foof(bar: string, x): string;
function foof(bar: any): any { return bar };
var x: number = foof("s", null);
var y: string = foof("s", null);

function foof2(bar: string, x): string;
function foof2(bar: string, y): number;
function foof2(bar: any): any { return bar };
var x2: string = foof2("s", null);
var y2: number = foof2("s", null);

//// [ambiguousOverload.js]
function foof(bar) { return bar; }
;
var x = foof("s", null);
var y = foof("s", null);
function foof2(bar) { return bar; }
;
var x2 = foof2("s", null);
var y2 = foof2("s", null);

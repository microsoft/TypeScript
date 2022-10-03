//// [functionOverloads.ts]
function foo(): string;
function foo(bar: string): number;
function foo(bar?: string): any { return "" };
var x = foo(5);

//// [functionOverloads.js]
function foo(bar) { return ""; }
;
var x = foo(5);

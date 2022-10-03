function foo(): string;
function foo(bar: string): number;
function foo(bar?: string): any { return "" };
var x = foo(5);
function foo(bar: string): string;
function foo(bar: number): number;
function foo(bar: any): any { return bar };
var x = foo(true);
declare function doFoo(bar?: { baz?: string; bar: number; }): string;
declare function doFoo(bar?: any): number;

var x: string = doFoo({ bar: 1 }); // x: number, should be x: string

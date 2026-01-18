var x: { [index: string]: string; one: string; };
declare var a: { one: string; };
declare var b: { one: number; two: string; };
x = a;
x = b; // error

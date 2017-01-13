let abc: { a: number, b: string, c: boolean };
var { a, ...{ b, ...rest } } = abc;
var a: number;
var b: string;
var other: { c: boolean };
({ a, ...{ b, ...other } } = abc);


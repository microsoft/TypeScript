var a: string;
var a: (string);
var a: ((string) | string | (((string))));
var a: ((((((((((((((((((((((((((((((((((((((((string))))))))))))))))))))))))))))))))))))))));

var b: (x: string) => string;
var b: ((x: (string)) => (string));

var c: string[] | number[];
var c: (string)[] | (number)[];
var c: ((string)[]) | ((number)[]);

var d: (((x: string) => string) | ((x: number) => number))[];
var d: ({ (x: string): string } | { (x: number): number })[];
var d: Array<((x: string) => string) | ((x: number) => number)>;
var d: Array<{ (x: string): string } | { (x: number): number }>;
var d: (Array<{ (x: string): string } | { (x: number): number }>);

var e: typeof a[];
var e: (typeof a)[];

var f: (string) => string;
var f: (string: any) => string;

var g: [string, string];
var g: [(string), string];
var g: [(string), (((typeof a)))];

// basic uses of function literals with overloads

var f: {
    (x: string): string;
    (x: number): number;
} = (x) => x;

var f2: {
    <T>(x: string): string;
    <T>(x: number): number;
} = (x) => x;

var f3: {
    <T>(x: T): string;
    <T>(x: T): number;
} = (x) => x;

var f4: {
    <T>(x: string): T;
    <T>(x: number): T;
} = (x) => x;
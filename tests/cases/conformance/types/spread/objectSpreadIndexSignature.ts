class C {
    a: number;
    c: boolean;
}
let c: { ...C, b: string, c?: string, [n: number]: string };
let n: number = c.a;
let s: string = c[12];
interface Indexed {
    [n: string]: number;
    a: number;
}
let i: { ...Indexed, b: number };
n = i[101];
n = i.b;
interface Indexed2 {
    [n: string]: boolean;
    c: boolean;
}
let ii: { ...Indexed, ...Indexed2, b: boolean, d: number };
let nb: number | boolean = ii[1001];

function f<T>(t: T) {
    let i: { ...T, [n: number]: string };
}

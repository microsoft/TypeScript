class C {
    a: number;
    c: boolean;
}
let c: { ...C, b: string, c?: string, [n: number]: string };
let n: number = c.a;
let s: string = c[12];
interface Indexed {
    [n: number]: string;
    a: boolean;
}
let i: { ...Indexed, b: string };
s = i[101];
s = i.b;

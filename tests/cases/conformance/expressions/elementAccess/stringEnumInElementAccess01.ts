// @noImplicitAny: true
enum E {
    A = "a",
    B = "b",
    C = "c",
}

interface Item {
    a: string;
    b: number;
    c: boolean;
}

declare const item: Item;
declare const e: E;
const snb: string | number | boolean = item[e];

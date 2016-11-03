interface Indexed {
    [n: string]: number;
    a: number;
}
interface Indexed2 {
    [n: string]: boolean;
    c: boolean;
}
let indexed: Indexed;
let indexed2: Indexed2;
let i = { ...indexed, b: 11 };
// only indexed has indexer, so i[101]: any
i[101];
let ii = { ...indexed, ...indexed2 };
// both have indexer, so i[1001]: number | boolean
ii[1001];

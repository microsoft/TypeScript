let a: Date[];
let b: boolean[];

for (let x in a) {
    let a1 = a[x];
    let a2 = a[(x)];
    let a3 = a[+x];
    let b1 = b[x];
    let b2 = b[(x)];
    let b3 = b[+x];
}

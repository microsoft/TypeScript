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

for (let x in a) {
    for (let y in a) {
        for (let z in a) {
            let a1 = a[x];
            let a2 = a[y];
            let a3 = a[z];
        }
    }
}

let i: string;
let j: string;
for (i in a) {
    for (j in b) {
        let a1 = a[i];
        let a2 = a[j];
    }
}

var s: string;
for (var s in a) {
    let a1 = a[s];
}
for (s in a) {
    let a1 = a[s];
}

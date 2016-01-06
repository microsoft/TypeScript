//// [for-inStatementsArray.ts]
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


//// [for-inStatementsArray.js]
var a;
var b;
for (var x in a) {
    var a1 = a[x];
    var a2 = a[(x)];
    var a3 = a[+x];
    var b1 = b[x];
    var b2 = b[(x)];
    var b3 = b[+x];
}

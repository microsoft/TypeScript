//// [tests/cases/conformance/statements/for-inStatements/for-inStatementsArray.ts] ////

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
for (var x in a) {
    for (var y in a) {
        for (var z in a) {
            var a1 = a[x];
            var a2 = a[y];
            var a3 = a[z];
        }
    }
}
var i;
var j;
for (i in a) {
    for (j in b) {
        var a1 = a[i];
        var a2 = a[j];
    }
}
var s;
for (var s in a) {
    var a1 = a[s];
}
for (s in a) {
    var a1 = a[s];
}

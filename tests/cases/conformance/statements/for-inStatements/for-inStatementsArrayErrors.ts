// @noImplicitAny: true

let a: Date[];

for (let x in a) {
    let a1 = a[x + 1];
    let a2 = a[x - 1];
    if (x === 1) {
    }
    let a3 = x.unknownProperty;
}

var i: number;
for (var i in a ) {
}

var j: any;
for (var j in a ) {
}

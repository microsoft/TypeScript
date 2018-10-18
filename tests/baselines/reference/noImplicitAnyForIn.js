//// [noImplicitAnyForIn.ts]
var x: {}[] = [[1, 2, 3], ["hello"]];

for (var i in x) {
    for (var j in x[i]) {

        //Should yield an implicit 'any' error
        var _j = x[i][j];
    }

    for (var k in x[0]) {
        var k1 = x[0];

        //Should yield an implicit 'any' error
        var k2 = k1[k];
    }
}

for (var a in x) {
    // Should yield an implicit 'any' error.
    var b;

    var c = a || b;
}

var idx = 0;
var m = [1, 2, 3, 4, 5];
// Should yield an implicit 'any' error.
var n = [[]] || [];

for (n[idx++] in m);

//// [noImplicitAnyForIn.js]
var x = [[1, 2, 3], ["hello"]];
for (var i in x) {
    for (var j in x[i]) {
        //Should yield an implicit 'any' error
        var _j = x[i][j];
    }
    for (var k in x[0]) {
        var k1 = x[0];
        //Should yield an implicit 'any' error
        var k2 = k1[k];
    }
}
for (var a in x) {
    // Should yield an implicit 'any' error.
    var b;
    var c = a || b;
}
var idx = 0;
var m = [1, 2, 3, 4, 5];
// Should yield an implicit 'any' error.
var n = [[]] || [];
for (n[idx++] in m)
    ;

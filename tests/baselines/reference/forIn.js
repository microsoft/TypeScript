//// [forIn.ts]
var arr = null;
for (var i:number in arr) { // error
    var x1 = arr[i];
    var y1 = arr[i];
}

for (var j in arr) { // ok
    var x2 = arr[j];
    var y2 = arr[j];
}

var arr2 = [];
for (j in arr2) { // ok
    var x3 = arr2[j];
    var y3 = arr2[j];
}

for (var l in arr) { 
   // error in the body
   k[l] = 1;
}

//// [forIn.js]
var arr = null;
for (var i in arr) { // error
    var x1 = arr[i];
    var y1 = arr[i];
}
for (var j in arr) { // ok
    var x2 = arr[j];
    var y2 = arr[j];
}
var arr2 = [];
for (j in arr2) { // ok
    var x3 = arr2[j];
    var y3 = arr2[j];
}
for (var l in arr) {
    // error in the body
    k[l] = 1;
}

//// [tests/cases/compiler/for.ts] ////

//// [for.ts]
for (var i = 0; i < 10; i++) { // ok
    var x1 = i;
}

for (var j: number = 0; j < 10; j++) { // ok
    var x2 = j;
}

for (var k = 0; k < 10;) { // ok
    k++;
}

for (; i < 10;) { // ok
    i++;
}

for (; i > 1; i--) { // ok
}

for (var l = 0; ; l++) { // ok
    if (l > 10) {
        break;
    }
}

for (; ;) { // ok
}

for () { // error
}

for (var m = ['k' in {}]; ;); // ok

for (var n = (b = 'k' in {}) => {}; ;); // ok


//// [for.js]
for (var i = 0; i < 10; i++) { // ok
    var x1 = i;
}
for (var j = 0; j < 10; j++) { // ok
    var x2 = j;
}
for (var k = 0; k < 10;) { // ok
    k++;
}
for (; i < 10;) { // ok
    i++;
}
for (; i > 1; i--) { // ok
}
for (var l = 0;; l++) { // ok
    if (l > 10) {
        break;
    }
}
for (;;) { // ok
}
for (;; // error
) { // error
}
for (var m = ['k' in {}];;)
    ; // ok
for (var n = function (b) {
    if (b === void 0) { b = 'k' in {}; }
};;)
    ; // ok

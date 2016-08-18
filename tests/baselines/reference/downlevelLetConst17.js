//// [downlevelLetConst17.ts]
'use strict'

declare function use(a: any);

var x;
for (let x = 10; ;) {
    use(x);
}
use(x);

for (const x = 10; ;) {
    use(x);
}

for (; ;) {
    let x = 10;
    use(x);
    x = 1;
}

for (; ;) {
    const x = 10;
    use(x);
}

for (let x; ;) {
    use(x);
    x = 1;
}

for (; ;) {
    let x;
    use(x);
    x = 1;
}

while (true) {
    let x;
    use(x);
}

while (true) {
    const x = true;
    use(x);
}

do {
    let x;
    use(x);
} while (true);

do {
    let x;
    use(x);
} while (true);

for (let x in []) {
    use(x);
}

for (const x in []) {
    use(x);
}

for (const x of []) {
    use(x);
}

//// [downlevelLetConst17.js]
'use strict';
var x;
for (var x_1 = 10;;) {
    use(x_1);
}
use(x);
for (var x_2 = 10;;) {
    use(x_2);
}
for (;;) {
    var x_3 = 10;
    use(x_3);
    x_3 = 1;
}
for (;;) {
    var x_4 = 10;
    use(x_4);
}
for (var x_5;;) {
    use(x_5);
    x_5 = 1;
}
for (;;) {
    var x_6 = void 0;
    use(x_6);
    x_6 = 1;
}
while (true) {
    var x_7 = void 0;
    use(x_7);
}
while (true) {
    var x_8 = true;
    use(x_8);
}
do {
    var x_9 = void 0;
    use(x_9);
} while (true);
do {
    var x_10 = void 0;
    use(x_10);
} while (true);
for (var x_11 in []) {
    use(x_11);
}
for (var x_12 in []) {
    use(x_12);
}
for (var _i = 0, _a = []; _i < _a.length; _i++) {
    var x_13 = _a[_i];
    use(x_13);
}

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

// TODO: update once for-of statements are supported downlevel
for (const x of []) {
    use(x);
}

//// [downlevelLetConst17.js]
'use strict';
var x;
for (var _x = 10;;) {
    use(_x);
}
use(x);
for (var _x_1 = 10;;) {
    use(_x_1);
}
for (;;) {
    var _x_2 = 10;
    use(_x_2);
    _x_2 = 1;
}
for (;;) {
    var _x_3 = 10;
    use(_x_3);
}
for (var _x_4 = void 0;;) {
    use(_x_4);
    _x_4 = 1;
}
for (;;) {
    var _x_5 = void 0;
    use(_x_5);
    _x_5 = 1;
}
while (true) {
    var _x_6 = void 0;
    use(_x_6);
}
while (true) {
    var _x_7 = true;
    use(_x_7);
}
do {
    var _x_8 = void 0;
    use(_x_8);
} while (true);
do {
    var _x_9 = void 0;
    use(_x_9);
} while (true);
for (var _x_10 in []) {
    use(_x_10);
}
for (var _x_11 in []) {
    use(_x_11);
}
// TODO: update once for-of statements are supported downlevel
for (var _x_12 of []) {
    use(_x_12);
}

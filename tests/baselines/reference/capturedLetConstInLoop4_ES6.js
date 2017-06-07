//// [capturedLetConstInLoop4_ES6.ts]
//======let
export function exportedFoo() {
    return v0 + v00 + v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8;
}

for (let x of []) {
    var v0 = x;
    (function() { return x + v0});
    (() => x);    
}

for (let x in []) {
    var v00 = x;
    (function() { return x + v00});
    (() => x);    
}

for (let x = 0; x < 1; ++x) {
    var v1 = x;
    (function() { return x + v1});
    (() => x);
}

while (1 === 1) {
    let x;
    var v2 = x;
    (function() { return x + v2});
    (() => x);
}

do {
    let x;
    var v3 = x;
    (function() { return x + v3});
    (() => x);
} while (1 === 1)

for (let y = 0; y < 1; ++y) {
    let x = 1;
    var v4 = x;
    (function() { return x + v4});
    (() => x);
}

for (let x = 0, y = 1; x < 1; ++x) {
    var v5 = x;
    (function() { return x + y + v5});
    (() => x + y);
}

while (1 === 1) {
    let x, y;
    var v6 = x;
    (function() { return x + y + v6});
    (() => x + y);
}

do {
    let x, y;
    var v7 = x;
    (function() { return x + y + v7});
    (() => x + y);
} while (1 === 1)

for (let y = 0; y < 1; ++y) {
    let x = 1;
    var v8 = x;
    (function() { return x + y + v8});
    (() => x + y);
}

//======const
export function exportedFoo2() {
    return v0_c + v00_c + v1_c + v2_c + v3_c + v4_c + v5_c + v6_c + v7_c + v8_c;
}

for (const x of []) {
    var v0_c = x;
    (function() { return x + v0_c});
    (() => x);    
}

for (const x in []) {
    var v00_c = x;
    (function() { return x + v00});
    (() => x);    
}

for (const x = 0; x < 1;) {
    var v1_c = x;
    (function() { return x + v1_c});
    (() => x);
}

while (1 === 1) {
    const x =1;
    var v2_c = x;
    (function() { return x + v2_c});
    (() => x);
}

do {
    const x = 1;
    var v3_c = x;
    (function() { return x + v3_c});
    (() => x);
} while (1 === 1)

for (const y = 0; y < 1;) {
    const x = 1;
    var v4_c = x;
    (function() { return x + v4_c});
    (() => x);
}

for (const x = 0, y = 1; x < 1;) {
    var v5_c = x;
    (function() { return x + y + v5_c});
    (() => x + y);
}

while (1 === 1) {
    const x = 1, y = 1;
    var v6_c = x;
    (function() { return x + y + v6_c});
    (() => x + y);
}

do {
    const x = 1, y = 1;
    var v7_c = x;
    (function() { return x + y + v7_c});
    (() => x + y);
} while (1 === 1)

for (const y = 0; y < 1;) {
    const x = 1;
    var v8_c = x;
    (function() { return x + y + v8_c});
    (() => x + y);
}


//// [capturedLetConstInLoop4_ES6.js]
//======let
export function exportedFoo() {
    return v0 + v00 + v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8;
}
for (let x of []) {
    var v0 = x;
    (function () { return x + v0; });
    (() => x);
}
for (let x in []) {
    var v00 = x;
    (function () { return x + v00; });
    (() => x);
}
for (let x = 0; x < 1; ++x) {
    var v1 = x;
    (function () { return x + v1; });
    (() => x);
}
while (1 === 1) {
    let x;
    var v2 = x;
    (function () { return x + v2; });
    (() => x);
}
do {
    let x;
    var v3 = x;
    (function () { return x + v3; });
    (() => x);
} while (1 === 1);
for (let y = 0; y < 1; ++y) {
    let x = 1;
    var v4 = x;
    (function () { return x + v4; });
    (() => x);
}
for (let x = 0, y = 1; x < 1; ++x) {
    var v5 = x;
    (function () { return x + y + v5; });
    (() => x + y);
}
while (1 === 1) {
    let x, y;
    var v6 = x;
    (function () { return x + y + v6; });
    (() => x + y);
}
do {
    let x, y;
    var v7 = x;
    (function () { return x + y + v7; });
    (() => x + y);
} while (1 === 1);
for (let y = 0; y < 1; ++y) {
    let x = 1;
    var v8 = x;
    (function () { return x + y + v8; });
    (() => x + y);
}
//======const
export function exportedFoo2() {
    return v0_c + v00_c + v1_c + v2_c + v3_c + v4_c + v5_c + v6_c + v7_c + v8_c;
}
for (const x of []) {
    var v0_c = x;
    (function () { return x + v0_c; });
    (() => x);
}
for (const x in []) {
    var v00_c = x;
    (function () { return x + v00; });
    (() => x);
}
for (const x = 0; x < 1;) {
    var v1_c = x;
    (function () { return x + v1_c; });
    (() => x);
}
while (1 === 1) {
    const x = 1;
    var v2_c = x;
    (function () { return x + v2_c; });
    (() => x);
}
do {
    const x = 1;
    var v3_c = x;
    (function () { return x + v3_c; });
    (() => x);
} while (1 === 1);
for (const y = 0; y < 1;) {
    const x = 1;
    var v4_c = x;
    (function () { return x + v4_c; });
    (() => x);
}
for (const x = 0, y = 1; x < 1;) {
    var v5_c = x;
    (function () { return x + y + v5_c; });
    (() => x + y);
}
while (1 === 1) {
    const x = 1, y = 1;
    var v6_c = x;
    (function () { return x + y + v6_c; });
    (() => x + y);
}
do {
    const x = 1, y = 1;
    var v7_c = x;
    (function () { return x + y + v7_c; });
    (() => x + y);
} while (1 === 1);
for (const y = 0; y < 1;) {
    const x = 1;
    var v8_c = x;
    (function () { return x + y + v8_c; });
    (() => x + y);
}

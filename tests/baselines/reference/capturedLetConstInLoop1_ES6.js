//// [capturedLetConstInLoop1_ES6.ts]
//==== let
for (let x in {}) {
    (function() { return x});
    (() => x);
}

for (let x of []) {
    (function() { return x});
    (() => x);
}

for (let x = 0; x < 1; ++x) {
    (function() { return x});
    (() => x);
}

while (1 === 1) {
    let x;
    (function() { return x});
    (() => x);
}

do {
    let x;
    (function() { return x});
    (() => x);
} while (1 === 1)

for (let y = 0; y < 1; ++y) {
    let x = 1;
    (function() { return x});
    (() => x);
}

for (let x = 0, y = 1; x < 1; ++x) {
    (function() { return x + y});
    (() => x + y);
}

while (1 === 1) {
    let x, y;
    (function() { return x + y});
    (() => x + y);
}

do {
    let x, y;
    (function() { return x + y});
    (() => x + y);
} while (1 === 1)

for (let y = 0; y < 1; ++y) {
    let x = 1;
    (function() { return x + y});
    (() => x + y);
}

//=========const
for (const x in {}) {
    (function() { return x});
    (() => x);
}

for (const x of []) {
    (function() { return x});
    (() => x);
}

for (const x = 0; x < 1;) {
    (function() { return x});
    (() => x);
}

while (1 === 1) {
    const x = 1;
    (function() { return x});
    (() => x);
}

do {
    const x = 1;
    (function() { return x});
    (() => x);
} while (1 === 1)

for (const y = 0; y < 1;) {
    const x = 1;
    (function() { return x});
    (() => x);
}

for (const x = 0, y = 1; x < 1;) {
    (function() { return x + y});
    (() => x + y);
}

while (1 === 1) {
    const x = 1, y = 1;
    (function() { return x + y});
    (() => x + y);
}

do {
    const x = 1, y = 1;
    (function() { return x + y});
    (() => x + y);
} while (1 === 1)

for (const y = 0; y < 1;) {
    const x = 1;
    (function() { return x + y});
    (() => x + y);
}

//// [capturedLetConstInLoop1_ES6.js]
//==== let
for (let x in {}) {
    (function () { return x; });
    (() => x);
}
for (let x of []) {
    (function () { return x; });
    (() => x);
}
for (let x = 0; x < 1; ++x) {
    (function () { return x; });
    (() => x);
}
while (1 === 1) {
    let x;
    (function () { return x; });
    (() => x);
}
do {
    let x;
    (function () { return x; });
    (() => x);
} while (1 === 1);
for (let y = 0; y < 1; ++y) {
    let x = 1;
    (function () { return x; });
    (() => x);
}
for (let x = 0, y = 1; x < 1; ++x) {
    (function () { return x + y; });
    (() => x + y);
}
while (1 === 1) {
    let x, y;
    (function () { return x + y; });
    (() => x + y);
}
do {
    let x, y;
    (function () { return x + y; });
    (() => x + y);
} while (1 === 1);
for (let y = 0; y < 1; ++y) {
    let x = 1;
    (function () { return x + y; });
    (() => x + y);
}
//=========const
for (const x in {}) {
    (function () { return x; });
    (() => x);
}
for (const x of []) {
    (function () { return x; });
    (() => x);
}
for (const x = 0; x < 1;) {
    (function () { return x; });
    (() => x);
}
while (1 === 1) {
    const x = 1;
    (function () { return x; });
    (() => x);
}
do {
    const x = 1;
    (function () { return x; });
    (() => x);
} while (1 === 1);
for (const y = 0; y < 1;) {
    const x = 1;
    (function () { return x; });
    (() => x);
}
for (const x = 0, y = 1; x < 1;) {
    (function () { return x + y; });
    (() => x + y);
}
while (1 === 1) {
    const x = 1, y = 1;
    (function () { return x + y; });
    (() => x + y);
}
do {
    const x = 1, y = 1;
    (function () { return x + y; });
    (() => x + y);
} while (1 === 1);
for (const y = 0; y < 1;) {
    const x = 1;
    (function () { return x + y; });
    (() => x + y);
}

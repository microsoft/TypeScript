//// [tests/cases/compiler/elidedEmbeddedStatementsReplacedWithSemicolon.ts] ////

//// [elidedEmbeddedStatementsReplacedWithSemicolon.ts]
if (1)
    const enum A {}
else
    const enum B {}

do
    const enum C {}
while (0);

while (0)
    const enum D {}

for (;0;)
    const enum E {}

for (let _ in [])
    const enum F {}

for (let _ of [])
    const enum G {}

// @ts-ignore suppress `with` statement error
with (window)
    const enum H {}

//// [elidedEmbeddedStatementsReplacedWithSemicolon.js]
if (1) {
    var A;
    (function (A) {
    })(A || (A = {}));
}
else {
    var B;
    (function (B) {
    })(B || (B = {}));
}
do {
    var C;
    (function (C) {
    })(C || (C = {}));
} while (0);
while (0) {
    var D;
    (function (D) {
    })(D || (D = {}));
}
for (; 0;) {
    var E;
    (function (E) {
    })(E || (E = {}));
}
for (let _ in []) {
    var F;
    (function (F) {
    })(F || (F = {}));
}
for (let _ of []) {
    var G;
    (function (G) {
    })(G || (G = {}));
}
with (window) {
    var H;
    (function (H) {
    })(H || (H = {}));
}

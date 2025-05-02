//// [tests/cases/compiler/omittedExpressionForOfLoop.ts] ////

//// [omittedExpressionForOfLoop.ts]
for (const [,] of doesNotExist) {
}

for (const [,] of undefined) {
}

for (const [,] of []) {
}

for (const [] of []) {
}

//// [omittedExpressionForOfLoop.js]
"use strict";
for (const [,] of doesNotExist) {
}
for (const [,] of undefined) {
}
for (const [,] of []) {
}
for (const [] of []) {
}

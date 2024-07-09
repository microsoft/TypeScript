//// [tests/cases/compiler/duplicateLabel4.ts] ////

//// [duplicateLabel4.ts]
target:
while (true) {
}

target: 
while (true) {
}

//// [duplicateLabel4.js]
target: while (true) {
}
target: while (true) {
}

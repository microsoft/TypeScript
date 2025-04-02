//// [tests/cases/compiler/sourceMapValidationFor.ts] ////

//// [sourceMapValidationFor.ts]
for (var i = 0; i < 10; i++) {
    WScript.Echo("i: " + i);
}
for (i = 0; i < 10; i++)
{
    WScript.Echo("i: " + i);
}
for (var j = 0; j < 10; ) {
    j++;
    if (j == 1) {
        continue;
    }
}
for (j = 0; j < 10;)
{
    j++;
}
for (var k = 0;; k++) {
}
for (k = 0;; k++)
{
}
for (; k < 10; k++) {
}
for (;;) {
    i++;
}
for (;;)
{
    i++;
}
for (i = 0, j = 20; j < 20, i < 20; j++) {
}

//// [sourceMapValidationFor.js]
for (var i = 0; i < 10; i++) {
    WScript.Echo("i: " + i);
}
for (i = 0; i < 10; i++) {
    WScript.Echo("i: " + i);
}
for (var j = 0; j < 10;) {
    j++;
    if (j == 1) {
        continue;
    }
}
for (j = 0; j < 10;) {
    j++;
}
for (var k = 0;; k++) {
}
for (k = 0;; k++) {
}
for (; k < 10; k++) {
}
for (;;) {
    i++;
}
for (;;) {
    i++;
}
for (i = 0, j = 20; j < 20, i < 20; j++) {
}
//# sourceMappingURL=sourceMapValidationFor.js.map
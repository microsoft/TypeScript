//// [sourceMapValidationWhile.ts]
var a = 10;
while (a == 10) {
    a++;
}
while (a == 10)
{
    a++;
}

//// [sourceMapValidationWhile.js]
var a = 10;
while (a == 10) {
    a++;
}
while (a == 10) {
    a++;
}
//# sourceMappingURL=sourceMapValidationWhile.js.map
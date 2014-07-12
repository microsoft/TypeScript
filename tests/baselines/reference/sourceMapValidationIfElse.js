//// [sourceMapValidationIfElse.ts]
var i = 10;
if (i == 10) {
    i++;
} else
{
}
if (i == 10)
{
    i++;
}
else if (i == 20) {
    i--;
} else if (i == 30) {
    i += 70;
} else {
    i--;
}

//// [sourceMapValidationIfElse.js]
var i = 10;
if (i == 10) {
    i++;
}
else {
}
if (i == 10) {
    i++;
}
else if (i == 20) {
    i--;
}
else if (i == 30) {
    i += 70;
}
else {
    i--;
}
//# sourceMappingURL=sourceMapValidationIfElse.js.map
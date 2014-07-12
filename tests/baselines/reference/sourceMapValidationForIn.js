//// [sourceMapValidationForIn.ts]
for (var x in String) {
    WScript.Echo(x);
}
for (x in String) {
    WScript.Echo(x);
}
for (var x2 in String)
{
    WScript.Echo(x2);
}
for (x in String)
{
    WScript.Echo(x);
}

//// [sourceMapValidationForIn.js]
for (var x in String) {
    WScript.Echo(x);
}
for (x in String) {
    WScript.Echo(x);
}
for (var x2 in String) {
    WScript.Echo(x2);
}
for (x in String) {
    WScript.Echo(x);
}
//# sourceMappingURL=sourceMapValidationForIn.js.map
//// [templateStringWithPropertyAccess.ts]
`abc${0}abc`.indexOf(`abc`);

//// [templateStringWithPropertyAccess.js]
"abc".concat(0, "abc").indexOf("abc");

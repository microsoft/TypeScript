//// [templateStringWithPropertyAccess.ts]
`abc${0}abc`.indexOf(`abc`);

//// [templateStringWithPropertyAccess.js]
("abc" + 0 + "abc").indexOf("abc");

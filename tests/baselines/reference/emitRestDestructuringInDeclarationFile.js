//// [emitRestDestructuringInDeclarationFile.ts]
var [a, b, ...rest] = [1, 2, 3, "string"];
var [a1, b1, [...rest]] = [1, 2, [3, "string"]];

//// [emitRestDestructuringInDeclarationFile.js]
var _a = [
    1,
    2,
    3,
    "string"
], a = _a[0], b = _a[1], rest = _a.slice(2);
var _b = [
    1,
    2,
    [
        3,
        "string"
    ]
], a1 = _b[0], b1 = _b[1], _c = _b[2], rest = _c.slice(0);


//// [emitRestDestructuringInDeclarationFile.d.ts]
declare var a: string | number, b: string | number, rest: (string | number)[];
declare var a1: number, b1: number, rest: (string | number)[];

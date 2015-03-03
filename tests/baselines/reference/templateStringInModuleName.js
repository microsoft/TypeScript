//// [templateStringInModuleName.ts]
declare module `M1` {
}

declare module `M${2}` {
}

//// [templateStringInModuleName.js]
declare;
(_a = ["M1"], _a.raw = ["M1"], module(_a));
{
}
declare;
(_a_1 = ["M", ""], _a_1.raw = ["M", ""], module(_a_1, 2));
{
}
var _a, _a_1;

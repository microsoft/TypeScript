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
(_b = ["M", ""], _b.raw = ["M", ""], module(_b, 2));
{
}
var _a, _b;

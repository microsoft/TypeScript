//// [templateStringInModuleName.ts]
declare module `M1` {
}

declare module `M${2}` {
}

//// [templateStringInModuleName.js]
declare;
module "M1";
{
}
declare;
module "M" + 2;
{
}

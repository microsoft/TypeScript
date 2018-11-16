//// [es5ExportDefaultFunctionDeclaration4.ts]
declare module "bar" {
    var before: typeof func;

    export default function func(): typeof func;

    var after: typeof func;
}

//// [es5ExportDefaultFunctionDeclaration4.js]


//// [es5ExportDefaultFunctionDeclaration4.d.ts]
declare module "bar" {
    var before: typeof func;
    export default function func(): typeof func;
    var after: typeof func;
}

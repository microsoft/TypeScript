/// <reference path="fourslash.ts" />

//// [|f1/*0*/('');|]

// @Filename: package.json
//// { "dependencies": { "package-name": "latest" } }

// @Filename: node_modules/package-name/node_modules/package-name2/bin/lib/libfile.d.ts
//// export function f1(text: string): string;

// @Filename: node_modules/package-name/node_modules/package-name2/bin/lib/libfile.js
//// function f1(text) { }
//// exports.f1 = f1;

// @Filename: node_modules/package-name/node_modules/package-name2/package.json
//// {
////   "main": "bin/lib/libfile.js",
////   "types": "bin/lib/libfile.d.ts"
//// }

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Add_missing_function_declaration_0.message, "f1"],
    newFileContent:
`f1('');

function f1(arg0: string) {
    throw new Error("Function not implemented.");
}
`
});

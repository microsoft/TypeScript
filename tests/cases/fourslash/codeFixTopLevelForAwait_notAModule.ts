/// <reference path="fourslash.ts" />
// @filename: /dir/a.ts
////declare const p: number[];
////for await (const _ of p);
// @filename: /dir/tsconfig.json
////{
////    "compilerOptions": {
////        "target": "esnext",
////        "module": "esnext"
////    }
////}

verify.codeFix({
    description: ts.Diagnostics.Add_export_to_make_this_file_into_a_module.message,
    index: 0,
    newFileContent:
  `declare const p: number[];
for await (const _ of p);

export { };
`
});

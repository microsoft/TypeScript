/// <reference path="fourslash.ts" />
// @filename: /dir/a.ts
////declare const p: number[];
////for await (const _ of p);
////export {};
// @filename: /dir/tsconfig.json
////{
////    "compilerOptions": {
////        "module": "es2015"
////    }
////}


verify.codeFix({
    description: [ts.Diagnostics.Set_the_module_option_in_your_configuration_file_to_0.message, "esnext"],
    index: 0,
    newFileContent: {
      "/dir/tsconfig.json":
`{
    "compilerOptions": {
        "module": "esnext"
    }
}`
    }
});

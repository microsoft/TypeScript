/// <reference path="fourslash.ts" />
// @filename: /dir/a.ts
////declare const p: number[];
////for await (const _ of p);
////export {};
// @filename: /dir/tsconfig.json
////{
////    "compilerOptions": {
////    }
////}


verify.codeFix({
    description: [ts.Diagnostics.Set_the_target_option_in_your_configuration_file_to_0.message, "es2017"],
    index: 0,
    newFileContent: {
      "/dir/tsconfig.json":
`{
    "compilerOptions": {
        "target": "es2017",
        "module": "commonjs"
    }
}`
    }
});

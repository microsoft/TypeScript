/// <reference path='fourslash.ts' />

// @Filename: /dir/a.ts
//// class B { foo () {} }
//// class D extends B { override foo () {} }

// @Filename: /dir/tsconfig.json
////{
////    "compilerOptions": {
////    }
////}

goTo.file("/dir/a.ts");
verify.codeFix({
    description: "Enable the '--pedanticOverride' flag in your configuration file",
    newFileContent: {
        "/dir/tsconfig.json":
`{
    "compilerOptions": {
        "pedanticOverride": true
    }
}`,
    },
});

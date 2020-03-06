/// <reference path='fourslash.ts' />

// @Filename: /dir/a.ts
////declare const decorator: any;
////class A {
//// @decorator method() {};
////};

// @Filename: /dir/jsconfig.json
////{
////    "compilerOptions": {
////        "experimentalDecorators": false,
////    }
////}

goTo.file("/dir/a.ts");
verify.codeFix({
    description: "Enable the 'experimentalDecorators' option in your configuration file",
    newFileContent: {
        "/dir/jsconfig.json":
`{
    "compilerOptions": {
        "experimentalDecorators": true,
    }
}`,
    },
});

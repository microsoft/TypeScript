/// <reference path='fourslash.ts' />

// @Filename: /dir/a.tsx
////export const Component = () => <></>

// @Filename: /dir/jsconfig.json
////{
////    "compilerOptions": {
////    }
////}

goTo.file("/dir/a.tsx");
verify.codeFix({
    description: "Enable the '--jsx' flag in your configuration file",
    newFileContent: {
        "/dir/jsconfig.json":
`{
    "compilerOptions": {
        "jsx": "react",
    }
}`,
    },
});

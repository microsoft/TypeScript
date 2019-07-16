/// <reference path='fourslash.ts' />

// @Filename: /dir/a.tsx
////export const Component = () => <></>

// @Filename: /dir/tsconfig.json
////{
////}

goTo.file("/dir/a.tsx");
verify.codeFix({
    description: "Enable the '--jsx' flag in your configuration file",
    newFileContent: {
        "/dir/tsconfig.json":
`{
    "compilerOptions": { "jsx": "react" },
}`,
    },
});

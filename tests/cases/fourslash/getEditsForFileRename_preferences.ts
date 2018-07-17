/// <reference path='fourslash.ts' />

// @Filename: /dir/a.ts
////export const a = 0;

// @Filename: /dir/b.ts
////import {} from "dir/a";

// @Filename: /tsconfig.json
////{ "compilerOptions": { "baseUrl": "." } }

verify.getEditsForFileRename({
    oldPath: "/dir/a.ts",
    newPath: "/dir/a1.ts",
    newFileContents: {
        "/dir/b.ts": 'import {} from "dir/a1";',
    },
    preferences: {
        importModuleSpecifierPreference: "non-relative",
    },
});

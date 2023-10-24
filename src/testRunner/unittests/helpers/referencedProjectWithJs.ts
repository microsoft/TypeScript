import {
    dedent,
} from "../../_namespaces/Utils";
import {
    jsonToReadableText,
} from "../helpers";
import {
    libContent,
} from "./contents";
import {
    FileOrFolderOrSymLinkMap,
    libFile,
} from "./virtualFileSystemWithWatch";

function tsconfig(additional?: object) {
    return jsonToReadableText({
        compilerOptions: {
            outDir: "./dist",
            declarationDir: "./dist/types",
        },
        extends: "../../tsconfig.base.json",
        include: ["./src"],
        ...additional,
    });
}
export function getFsContentsForReferencedProjectWithJs(): FileOrFolderOrSymLinkMap {
    return {
        "/home/src/projects/myproject/packages/a/src/lib.js": `export const magicString = "12";`,
        "/home/src/projects/myproject/packages/a/src/util.ts": `export const magicNumber = 12;`,
        "/home/src/projects/myproject/packages/a/tsconfig.json": tsconfig(),
        "/home/src/projects/myproject/packages/a/package.json": jsonToReadableText({
            name: "@my-package/a",
            version: "1.0.0",
            main: "index.js",
        }),
        "/home/src/projects/myproject/packages/b/src/index.ts": dedent`
            import { magicString } from "@my-package/a/src/lib";
            import { magicNumber } from "@my-package/a/src/util";
            const a: number = magicNumber;
            const b: string = magicString;
            console.log({ a });
            console.log({ b });
        `,
        "/home/src/projects/myproject/packages/b/tsconfig.json": tsconfig({
            references: [{ path: "../a/tsconfig.json" }],
        }),
        "/home/src/projects/myproject/tsconfig.base.json": jsonToReadableText({
            compilerOptions: {
                composite: true,
                allowJs: true,
                emitDeclarationOnly: true,
                traceResolution: true,
                strict: true,
            },
        }),
        "/home/src/projects/myproject/node_modules/@my-package/a": {
            symLink: "/home/src/projects/myproject/packages/a",
        },
        [libFile.path]: libContent,
    };
}

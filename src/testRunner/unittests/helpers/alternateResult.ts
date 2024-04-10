import { dedent } from "../../_namespaces/Utils";
import { jsonToReadableText } from "../helpers";
import { FsContents } from "./contents";
import { libFile } from "./virtualFileSystemWithWatch";

export function getFsConentsForAlternateResultAtTypesPackageJson(packageName: string, addTypesCondition: boolean) {
    return jsonToReadableText({
        name: `@types/${packageName}`,
        version: "1.0.0",
        types: "index.d.ts",
        exports: {
            ".": {
                ...(addTypesCondition ? { types: "./index.d.ts" } : {}),
                require: "./index.d.ts",
            },
        },
    });
}

export function getFsContentsForAlternateResultPackageJson(packageName: string, addTypes: boolean, addTypesCondition: boolean) {
    return jsonToReadableText({
        name: packageName,
        version: "1.0.0",
        main: "index.js",
        ...(addTypes ? { types: "index.d.ts" } : {}),
        exports: {
            ".": {
                ...(addTypesCondition ? { types: "./index.d.ts" } : {}),
                import: "./index.mjs",
                require: "./index.js",
            },
        },
    });
}

export function getFsContentsForAlternateResultDts(packageName: string) {
    return `export declare const ${packageName}: number;`;
}

function js(packageName: string) {
    return `module.exports = { ${packageName}: 1 };`;
}

function mjs(packageName: string) {
    return `export const ${packageName} = 1;`;
}

export function getFsContentsForAlternateResult(): FsContents {
    return {
        "/home/src/projects/project/node_modules/@types/bar/package.json": getFsConentsForAlternateResultAtTypesPackageJson("bar", /*addTypesCondition*/ false),
        "/home/src/projects/project/node_modules/@types/bar/index.d.ts": getFsContentsForAlternateResultDts("bar"),
        "/home/src/projects/project/node_modules/bar/package.json": getFsContentsForAlternateResultPackageJson("bar", /*addTypes*/ false, /*addTypesCondition*/ false),
        "/home/src/projects/project/node_modules/bar/index.js": js("bar"),
        "/home/src/projects/project/node_modules/bar/index.mjs": mjs("bar"),
        "/home/src/projects/project/node_modules/foo/package.json": getFsContentsForAlternateResultPackageJson("foo", /*addTypes*/ true, /*addTypesCondition*/ false),
        "/home/src/projects/project/node_modules/foo/index.js": js("foo"),
        "/home/src/projects/project/node_modules/foo/index.mjs": mjs("foo"),
        "/home/src/projects/project/node_modules/foo/index.d.ts": getFsContentsForAlternateResultDts("foo"),
        "/home/src/projects/project/node_modules/@types/bar2/package.json": getFsConentsForAlternateResultAtTypesPackageJson("bar2", /*addTypesCondition*/ true),
        "/home/src/projects/project/node_modules/@types/bar2/index.d.ts": getFsContentsForAlternateResultDts("bar2"),
        "/home/src/projects/project/node_modules/bar2/package.json": getFsContentsForAlternateResultPackageJson("bar2", /*addTypes*/ false, /*addTypesCondition*/ false),
        "/home/src/projects/project/node_modules/bar2/index.js": js("bar2"),
        "/home/src/projects/project/node_modules/bar2/index.mjs": mjs("bar2"),
        "/home/src/projects/project/node_modules/foo2/package.json": getFsContentsForAlternateResultPackageJson("foo2", /*addTypes*/ true, /*addTypesCondition*/ true),
        "/home/src/projects/project/node_modules/foo2/index.js": js("foo2"),
        "/home/src/projects/project/node_modules/foo2/index.mjs": mjs("foo2"),
        "/home/src/projects/project/node_modules/foo2/index.d.ts": getFsContentsForAlternateResultDts("foo2"),
        "/home/src/projects/project/index.mts": dedent`
            import { foo } from "foo";
            import { bar } from "bar";
            import { foo2 } from "foo2";
            import { bar2 } from "bar2";
        `,
        "/home/src/projects/project/tsconfig.json": jsonToReadableText({
            compilerOptions: {
                moduleResolution: "node16",
                traceResolution: true,
                incremental: true,
                strict: true,
                types: [],
            },
            files: ["index.mts"],
        }),
        [libFile.path]: libFile.content,
    };
}

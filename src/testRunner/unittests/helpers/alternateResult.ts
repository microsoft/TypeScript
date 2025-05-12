import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { TscWatchCompileChange } from "./tscWatch.js";
import { TestServerHost } from "./virtualFileSystemWithWatch.js";

function getFsConentsForAlternateResultAtTypesPackageJson(packageName: string, addTypesCondition: boolean) {
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

function getFsContentsForAlternateResultPackageJson(packageName: string, addTypes: boolean, addTypesCondition: boolean) {
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

function getFsContentsForAlternateResultDts(packageName: string) {
    return `export declare const ${packageName}: number;`;
}

function js(packageName: string) {
    return `module.exports = { ${packageName}: 1 };`;
}

function mjs(packageName: string) {
    return `export const ${packageName} = 1;`;
}

function getSysForAlternateResult(forTsserver: boolean) {
    return TestServerHost.getCreateWatchedSystem(forTsserver)({
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
    }, { currentDirectory: "/home/src/projects/project" });
}

export function verifyAlternateResultScenario(
    forTsserver: boolean,
    action: (
        scenario: string,
        sys: () => TestServerHost,
        edits: () => readonly TscWatchCompileChange[],
    ) => void,
): void {
    action(
        "alternateResult",
        () => getSysForAlternateResult(forTsserver),
        () => [
            {
                caption: "delete the alternateResult in @types",
                edit: sys => sys.deleteFile("/home/src/projects/project/node_modules/@types/bar/index.d.ts"),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
            {
                caption: "delete the ndoe10Result in package/types",
                edit: sys => sys.deleteFile("/home/src/projects/project/node_modules/foo/index.d.ts"),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
            {
                caption: "add the alternateResult in @types",
                edit: sys => sys.writeFile("/home/src/projects/project/node_modules/@types/bar/index.d.ts", getFsContentsForAlternateResultDts("bar")),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
            {
                caption: "add the alternateResult in package/types",
                edit: sys => sys.writeFile("/home/src/projects/project/node_modules/foo/index.d.ts", getFsContentsForAlternateResultDts("foo")),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
            {
                caption: "update package.json from @types so error is fixed",
                edit: sys => sys.writeFile("/home/src/projects/project/node_modules/@types/bar/package.json", getFsConentsForAlternateResultAtTypesPackageJson("bar", /*addTypesCondition*/ true)),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
            {
                caption: "update package.json so error is fixed",
                edit: sys => sys.writeFile("/home/src/projects/project/node_modules/foo/package.json", getFsContentsForAlternateResultPackageJson("foo", /*addTypes*/ true, /*addTypesCondition*/ true)),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
            {
                caption: "update package.json from @types so error is introduced",
                edit: sys => sys.writeFile("/home/src/projects/project/node_modules/@types/bar2/package.json", getFsConentsForAlternateResultAtTypesPackageJson("bar2", /*addTypesCondition*/ false)),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
            {
                caption: "update package.json so error is introduced",
                edit: sys => sys.writeFile("/home/src/projects/project/node_modules/foo2/package.json", getFsContentsForAlternateResultPackageJson("foo2", /*addTypes*/ true, /*addTypesCondition*/ false)),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
            {
                caption: "delete the alternateResult in @types",
                edit: sys => sys.deleteFile("/home/src/projects/project/node_modules/@types/bar2/index.d.ts"),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
            {
                caption: "delete the ndoe10Result in package/types",
                edit: sys => sys.deleteFile("/home/src/projects/project/node_modules/foo2/index.d.ts"),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
            {
                caption: "add the alternateResult in @types",
                edit: sys => sys.writeFile("/home/src/projects/project/node_modules/@types/bar2/index.d.ts", getFsContentsForAlternateResultDts("bar2")),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
            {
                caption: "add the ndoe10Result in package/types",
                edit: sys => sys.writeFile("/home/src/projects/project/node_modules/foo2/index.d.ts", getFsContentsForAlternateResultDts("foo2")),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
        ],
    );
}

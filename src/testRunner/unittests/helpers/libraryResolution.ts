import { emptyArray } from "../../_namespaces/ts.js";
import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { TscWatchSystem } from "./baseline.js";
import { getTypeScriptLibTestLocation } from "./contents.js";
import { TscWatchCompileChange } from "./tscWatch.js";
import {
    libFile,
    TestServerHost,
} from "./virtualFileSystemWithWatch.js";

function getSysForLibResolution(libRedirection?: boolean, forTsserver?: boolean) {
    return TestServerHost.getCreateWatchedSystem(forTsserver)({
        "/home/src/workspace/projects/project1/utils.d.ts": `export const y = 10;`,
        "/home/src/workspace/projects/project1/file.ts": `export const file = 10;`,
        "/home/src/workspace/projects/project1/core.d.ts": `export const core = 10;`,
        "/home/src/workspace/projects/project1/index.ts": `export const x = "type1";`,
        "/home/src/workspace/projects/project1/file2.ts": dedent`
            /// <reference lib="webworker"/>
            /// <reference lib="scripthost"/>
            /// <reference lib="es5"/>
        `,
        "/home/src/workspace/projects/project1/tsconfig.json": jsonToReadableText({
            compilerOptions: { composite: true, typeRoots: ["./typeroot1"], lib: ["es5", "dom"], traceResolution: true, libReplacement: libRedirection },
        }),
        "/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts": `export type TheNum = "type1";`,
        "/home/src/workspace/projects/project2/utils.d.ts": `export const y = 10;`,
        "/home/src/workspace/projects/project2/index.ts": `export const y = 10`,
        "/home/src/workspace/projects/project2/tsconfig.json": jsonToReadableText({
            compilerOptions: { composite: true, lib: ["es5", "dom"], traceResolution: true, libReplacement: libRedirection },
        }),
        "/home/src/workspace/projects/project3/utils.d.ts": `export const y = 10;`,
        "/home/src/workspace/projects/project3/index.ts": `export const z = 10`,
        "/home/src/workspace/projects/project3/tsconfig.json": jsonToReadableText({
            compilerOptions: { composite: true, lib: ["es5", "dom"], traceResolution: true, libReplacement: libRedirection },
        }),
        "/home/src/workspace/projects/project4/utils.d.ts": `export const y = 10;`,
        "/home/src/workspace/projects/project4/index.ts": `export const z = 10`,
        "/home/src/workspace/projects/project4/tsconfig.json": jsonToReadableText({
            compilerOptions: { composite: true, lib: ["esnext", "dom", "webworker"], traceResolution: true, libReplacement: libRedirection },
        }),
        [getTypeScriptLibTestLocation("dom")]: "interface DOMInterface { }",
        [getTypeScriptLibTestLocation("webworker")]: "interface WebWorkerInterface { }",
        [getTypeScriptLibTestLocation("scripthost")]: "interface ScriptHostInterface { }",
        "/home/src/workspace/projects/node_modules/@typescript/unlreated/index.d.ts": "export const unrelated = 10;",
        ...libRedirection ? {
            "/home/src/workspace/projects/node_modules/@typescript/lib-es5/index.d.ts": libFile.content,
            "/home/src/workspace/projects/node_modules/@typescript/lib-esnext/index.d.ts": libFile.content,
            "/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts": "interface DOMInterface { }",
            "/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts": "interface WebWorkerInterface { }",
            "/home/src/workspace/projects/node_modules/@typescript/lib-scripthost/index.d.ts": "interface ScriptHostInterface { }",
        } : undefined,
    }, { currentDirectory: "/home/src/workspace/projects" });
}

function getLibResolutionEditOptions(
    withoutConfig: true | undefined,
    changeLib: (sys: TscWatchSystem) => void,
): readonly TscWatchCompileChange[] {
    return withoutConfig ?
        emptyArray :
        [
            {
                caption: "change program options to update module resolution",
                edit: sys =>
                    sys.writeFile(
                        "/home/src/workspace/projects/project1/tsconfig.json",
                        jsonToReadableText({
                            compilerOptions: {
                                composite: true,
                                typeRoots: ["./typeroot1", "./typeroot2"],
                                lib: ["es5", "dom"],
                                traceResolution: true,
                                libReplacement: true,
                            },
                        }),
                    ),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
            {
                caption: "change program options to update module resolution and also update lib file",
                edit: sys => {
                    sys.writeFile(
                        "/home/src/workspace/projects/project1/tsconfig.json",
                        jsonToReadableText({
                            compilerOptions: {
                                composite: true,
                                typeRoots: ["./typeroot1"],
                                lib: ["es5", "dom"],
                                traceResolution: true,
                                libReplacement: true,
                            },
                        }),
                    );
                    changeLib(sys);
                },
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
        ];
}

function getLibResolutionWithoutRedirection(withoutConfig: true | undefined): readonly TscWatchCompileChange[] {
    return [
        {
            caption: "write redirect file dom",
            edit: sys => sys.ensureFileOrFolder({ path: "/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts", content: "interface DOMInterface { }" }),
            timeouts: sys => {
                sys.runQueuedTimeoutCallbacks();
                sys.runQueuedTimeoutCallbacks();
            },
        },
        {
            caption: "edit file",
            edit: sys => sys.appendFile("/home/src/workspace/projects/project1/file.ts", "export const xyz = 10;"),
            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
        },
        {
            caption: "delete core",
            edit: sys => sys.deleteFile("/home/src/workspace/projects/project1/core.d.ts"),
            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
        },
        {
            caption: "delete redirect file dom",
            edit: sys => sys.deleteFile("/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts"),
            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
        },
        ...getLibResolutionEditOptions(
            withoutConfig,
            sys =>
                sys.ensureFileOrFolder({
                    path: "/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts",
                    content: "interface DOMInterface { }",
                }),
        ),
        {
            caption: "write redirect file webworker",
            edit: sys => sys.ensureFileOrFolder({ path: "/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts", content: "interface WebWorkerInterface { }" }),
            timeouts: sys => {
                sys.runQueuedTimeoutCallbacks();
                sys.runQueuedTimeoutCallbacks();
            },
        },
        {
            caption: "delete redirect file webworker",
            edit: sys => sys.deleteFile("/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts"),
            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
        },
    ];
}

function getLibResolutionWithRedirection(withoutConfig: true | undefined): readonly TscWatchCompileChange[] {
    return [
        {
            caption: "delete redirect file dom",
            edit: sys => sys.deleteFile("/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts"),
            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
        },
        {
            caption: "edit file",
            edit: sys => sys.appendFile("/home/src/workspace/projects/project1/file.ts", "export const xyz = 10;"),
            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
        },
        {
            caption: "delete core",
            edit: sys => sys.deleteFile("/home/src/workspace/projects/project1/core.d.ts"),
            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
        },
        {
            caption: "write redirect file dom",
            edit: sys => sys.ensureFileOrFolder({ path: "/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts", content: "interface DOMInterface { }" }),
            timeouts: sys => {
                sys.runQueuedTimeoutCallbacks();
                sys.runQueuedTimeoutCallbacks();
            },
        },
        ...getLibResolutionEditOptions(
            withoutConfig,
            sys => sys.deleteFile("/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts"),
        ),
        {
            caption: "delete redirect file webworker",
            edit: sys => sys.deleteFile("/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts"),
            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
        },
        {
            caption: "write redirect file webworker",
            edit: sys => sys.ensureFileOrFolder({ path: "/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts", content: "interface WebWorkerInterface { }" }),
            timeouts: sys => {
                sys.runQueuedTimeoutCallbacks();
                sys.runQueuedTimeoutCallbacks();
            },
        },
    ];
}

export function forEachLibResolutionScenario(
    forTsserver: boolean,
    withoutConfig: true | undefined,
    action: (scenario: string, sys: () => TestServerHost, edits: () => readonly TscWatchCompileChange[]) => void,
): void {
    [undefined, true].forEach(libRedirection => {
        action(
            `${withoutConfig ? "without" : "with"} config${libRedirection ? " with redirection" : ""}`,
            () => getSysForLibResolution(libRedirection, forTsserver),
            () =>
                libRedirection ?
                    getLibResolutionWithRedirection(withoutConfig) :
                    getLibResolutionWithoutRedirection(withoutConfig),
        );
    });
}

export function getCommandLineArgsForLibResolution(withoutConfig: true | undefined): string[] {
    return withoutConfig ?
        ["project1/core.d.ts", "project1/utils.d.ts", "project1/file.ts", "project1/index.ts", "project1/file2.ts", "--lib", "es5,dom", "--traceResolution", "--explainFiles"] :
        ["-p", "project1", "--explainFiles"];
}

export function getSysForLibResolutionUnknown(): TestServerHost {
    return TestServerHost.createWatchedSystem({
        "/home/src/workspace/projects/project1/utils.d.ts": `export const y = 10;`,
        "/home/src/workspace/projects/project1/file.ts": `export const file = 10;`,
        "/home/src/workspace/projects/project1/core.d.ts": `export const core = 10;`,
        "/home/src/workspace/projects/project1/index.ts": `export const x = "type1";`,
        "/home/src/workspace/projects/project1/file2.ts": dedent`
            /// <reference lib="webworker2"/>
            /// <reference lib="unknownlib"/>
            /// <reference lib="scripthost"/>
        `,
        "/home/src/workspace/projects/project1/tsconfig.json": jsonToReadableText({
            compilerOptions: {
                composite: true,
                traceResolution: true,
                libReplacement: true,
            },
        }),
        [getTypeScriptLibTestLocation("webworker")]: "interface WebWorkerInterface { }",
        [getTypeScriptLibTestLocation("scripthost")]: "interface ScriptHostInterface { }",
    }, { currentDirectory: "/home/src/workspace/projects" });
}

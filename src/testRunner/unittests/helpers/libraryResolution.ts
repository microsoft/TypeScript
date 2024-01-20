import {
    dedent,
} from "../../_namespaces/Utils";
import {
    jsonToReadableText,
} from "../helpers";
import {
    FsContents,
    libContent,
} from "./contents";
import {
    loadProjectFromFiles,
} from "./vfs";
import {
    createServerHost,
    createWatchedSystem,
} from "./virtualFileSystemWithWatch";

function getFsContentsForLibResolution(libRedirection?: boolean): FsContents {
    return {
        "/home/src/projects/project1/utils.d.ts": `export const y = 10;`,
        "/home/src/projects/project1/file.ts": `export const file = 10;`,
        "/home/src/projects/project1/core.d.ts": `export const core = 10;`,
        "/home/src/projects/project1/index.ts": `export const x = "type1";`,
        "/home/src/projects/project1/file2.ts": dedent`
            /// <reference lib="webworker"/>
            /// <reference lib="scripthost"/>
            /// <reference lib="es5"/>
        `,
        "/home/src/projects/project1/tsconfig.json": jsonToReadableText({
            compilerOptions: { composite: true, typeRoots: ["./typeroot1"], lib: ["es5", "dom"], traceResolution: true },
        }),
        "/home/src/projects/project1/typeroot1/sometype/index.d.ts": `export type TheNum = "type1";`,
        "/home/src/projects/project2/utils.d.ts": `export const y = 10;`,
        "/home/src/projects/project2/index.ts": `export const y = 10`,
        "/home/src/projects/project2/tsconfig.json": jsonToReadableText({
            compilerOptions: { composite: true, lib: ["es5", "dom"], traceResolution: true },
        }),
        "/home/src/projects/project3/utils.d.ts": `export const y = 10;`,
        "/home/src/projects/project3/index.ts": `export const z = 10`,
        "/home/src/projects/project3/tsconfig.json": jsonToReadableText({
            compilerOptions: { composite: true, lib: ["es5", "dom"], traceResolution: true },
        }),
        "/home/src/projects/project4/utils.d.ts": `export const y = 10;`,
        "/home/src/projects/project4/index.ts": `export const z = 10`,
        "/home/src/projects/project4/tsconfig.json": jsonToReadableText({
            compilerOptions: { composite: true, lib: ["esnext", "dom", "webworker"], traceResolution: true },
        }),
        "/home/src/lib/lib.es5.d.ts": libContent,
        "/home/src/lib/lib.esnext.d.ts": libContent,
        "/home/src/lib/lib.dom.d.ts": "interface DOMInterface { }",
        "/home/src/lib/lib.webworker.d.ts": "interface WebWorkerInterface { }",
        "/home/src/lib/lib.scripthost.d.ts": "interface ScriptHostInterface { }",
        "/home/src/projects/node_modules/@typescript/unlreated/index.d.ts": "export const unrelated = 10;",
        ...libRedirection ? {
            "/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts": libContent,
            "/home/src/projects/node_modules/@typescript/lib-esnext/index.d.ts": libContent,
            "/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts": "interface DOMInterface { }",
            "/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts": "interface WebworkerInterface { }",
            "/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts": "interface ScriptHostInterface { }",
        } : undefined,
    };
}

export function getFsForLibResolution(libRedirection: true | undefined) {
    return loadProjectFromFiles(
        getFsContentsForLibResolution(libRedirection),
        {
            cwd: "/home/src/projects",
            executingFilePath: "/home/src/lib/tsc.js",
        },
    );
}

export function getSysForLibResolution(libRedirection?: true) {
    return createWatchedSystem(
        getFsContentsForLibResolution(libRedirection),
        {
            currentDirectory: "/home/src/projects",
            executingFilePath: "/home/src/lib/tsc.js",
        },
    );
}

export function getServerHostForLibResolution(libRedirection?: true) {
    return createServerHost(
        getFsContentsForLibResolution(libRedirection),
        {
            currentDirectory: "/home/src/projects",
            executingFilePath: "/home/src/lib/tsc.js",
        },
    );
}

export function getCommandLineArgsForLibResolution(withoutConfig: true | undefined) {
    return withoutConfig ?
        ["project1/core.d.ts", "project1/utils.d.ts", "project1/file.ts", "project1/index.ts", "project1/file2.ts", "--lib", "es5,dom", "--traceResolution", "--explainFiles"] :
        ["-p", "project1", "--explainFiles"];
}

import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { TscWatchCompileChange } from "./tscWatch.js";
import { TestServerHost } from "./virtualFileSystemWithWatch.js";

function getRandomFileContent() {
    return "export const x = 10;";
}

export function forEachPackageJsonScopeScenario(
    forTsserver: boolean,
    action: (
        scenario: string,
        sys: () => TestServerHost,
        edits: () => readonly TscWatchCompileChange[],
        project: string,
        mainFile: string,
    ) => void,
): void {
    action(
        "project with package json scope",
        () =>
            (!forTsserver ? TestServerHost.createWatchedSystem : TestServerHost.createServerHost)({
                "/home/src/workspaces/project/src/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        target: "es2016",
                        composite: true,
                        module: "node16",
                        outDir: "../out",
                        traceResolution: true,
                    },
                    files: [
                        "main.ts",
                        "fileA.ts",
                        "fileB.mts",
                        "randomFile.ts",
                        "a/randomFile.ts",
                        "b/ba/randomFile.ts",
                        "b/randomFile.ts",
                        "c/ca/randomFile.ts",
                        "c/ca/caa/randomFile.ts",
                        "c/ca/caa/caaa/randomFile.ts",
                        "c/cb/randomFile.ts",
                        "d/da/daa/daaa/x/y/z/randomFile.ts",
                        "d/da/daa/daaa/randomFile.ts",
                        "d/da/daa/randomFile.ts",
                        "d/da/randomFile.ts",
                        "e/ea/randomFile.ts",
                        "e/ea/eaa/randomFile.ts",
                        "e/ea/eaa/eaaa/randomFile.ts",
                        "e/ea/eaa/eaaa/x/y/z/randomFile.ts",
                        "f/fa/faa/x/y/z/randomFile.ts",
                        "f/fa/faa/faaa/randomFile.ts",
                    ],
                }),
                "/home/src/workspaces/project/src/main.ts": getRandomFileContent(),
                "/home/src/workspaces/project/src/fileA.ts": dedent`
                    import { foo } from "./fileB.mjs";
                    foo();
                `,
                "/home/src/workspaces/project/src/fileB.mts": `export function foo() {}`,
                "/home/src/workspaces/project/src/randomFile.ts": getRandomFileContent(),
                "/home/src/workspaces/project/src/a/randomFile.ts": getRandomFileContent(),
                "/home/src/workspaces/project/src/b/ba/randomFile.ts": getRandomFileContent(),
                "/home/src/workspaces/project/src/b/randomFile.ts": getRandomFileContent(),
                "/home/src/workspaces/project/src/c/ca/randomFile.ts": getRandomFileContent(),
                "/home/src/workspaces/project/src/c/ca/caa/randomFile.ts": getRandomFileContent(),
                "/home/src/workspaces/project/src/c/ca/caa/caaa/randomFile.ts": getRandomFileContent(),
                "/home/src/workspaces/project/src/c/cb/randomFile.ts": getRandomFileContent(),
                "/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/randomFile.ts": getRandomFileContent(),
                "/home/src/workspaces/project/src/d/da/daa/daaa/randomFile.ts": getRandomFileContent(),
                "/home/src/workspaces/project/src/d/da/daa/randomFile.ts": getRandomFileContent(),
                "/home/src/workspaces/project/src/d/da/randomFile.ts": getRandomFileContent(),
                "/home/src/workspaces/project/src/e/ea/randomFile.ts": getRandomFileContent(),
                "/home/src/workspaces/project/src/e/ea/eaa/randomFile.ts": getRandomFileContent(),
                "/home/src/workspaces/project/src/e/ea/eaa/eaaa/randomFile.ts": getRandomFileContent(),
                "/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts": getRandomFileContent(),
                "/home/src/workspaces/project/src/f/fa/faa/faaa/randomFile.ts": getRandomFileContent(),
                "/home/src/workspaces/project/src/f/fa/faa/x/y/z/randomFile.ts": getRandomFileContent(),
                "/home/src/workspaces/project/package.json": jsonToReadableText({ name: "app", version: "1.0.0" }),
            }, { currentDirectory: "/home/src/workspaces/project" }),
        () => [
            {
                caption: "random edit",
                edit: sys => sys.appendFile("/home/src/workspaces/project/src/randomFile.ts", `export const y = 10;`),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks(); // Failed lookups
                    sys.runQueuedTimeoutCallbacks(); // actual update
                },
            },
            {
                caption: "Modify package json file to add type module",
                edit: sys => sys.writeFile(`/home/src/workspaces/project/package.json`, jsonToReadableText({ name: "app", version: "1.0.0", type: "module" })),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks(); // Failed lookups
                    sys.runQueuedTimeoutCallbacks(); // actual update
                },
            },
            {
                caption: "Modify package.json file to remove type module",
                edit: sys => sys.writeFile(`/home/src/workspaces/project/package.json`, jsonToReadableText({ name: "app", version: "1.0.0" })),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks(); // Failed lookups
                    sys.runQueuedTimeoutCallbacks(); // actual update
                },
            },
            {
                caption: "Delete package.json",
                edit: sys => sys.deleteFile(`/home/src/workspaces/project/package.json`),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks(); // Failed lookups
                    sys.runQueuedTimeoutCallbacks(); // actual update
                },
            },
            {
                caption: "Add package json file with type module",
                edit: sys => sys.writeFile(`/home/src/workspaces/project/package.json`, jsonToReadableText({ name: "app", version: "1.0.0", type: "module" })),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks(); // Failed lookups
                    sys.runQueuedTimeoutCallbacks(); // actual update
                },
            },
            {
                caption: "Delete package.json",
                edit: sys => sys.deleteFile(`/home/src/workspaces/project/package.json`),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks(); // Failed lookups
                    sys.runQueuedTimeoutCallbacks(); // actual update
                },
            },
        ],
        "/home/src/workspaces/project/src/tsconfig.json",
        "/home/src/workspaces/project/src/main.ts",
    );
}

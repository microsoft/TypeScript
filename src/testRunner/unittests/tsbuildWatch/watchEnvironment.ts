import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import {
    createBaseline,
    createSolutionBuilderWithWatchHostForBaseline,
    runWatchBaseline,
} from "../helpers/tscWatch.js";
import {
    createWatchedSystem,
    File,
    libFile,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuildWatch:: watchEnvironment:: tsbuild:: watchMode:: with different watch environments", () => {
    it("watchFile on same file multiple times because file is part of multiple projects", () => {
        const project = `/user/username/projects/myproject`;
        let maxPkgs = 4;
        const configPath = `${project}/tsconfig.json`;
        const typing: File = {
            path: `${project}/typings/xterm.d.ts`,
            content: "export const typing = 10;",
        };

        const allPkgFiles = pkgs(pkgFiles);
        const system = createWatchedSystem([libFile, typing, ...flatArray(allPkgFiles)], { currentDirectory: project });
        writePkgReferences(system);
        const { sys, baseline, cb, getPrograms } = createBaseline(system);
        const host = createSolutionBuilderWithWatchHostForBaseline(sys, cb);
        const solutionBuilder = ts.createSolutionBuilderWithWatch(host, ["tsconfig.json"], { watch: true, verbose: true });
        solutionBuilder.build();
        runWatchBaseline({
            scenario: "watchEnvironment",
            subScenario: `same file in multiple projects with single watcher per file`,
            commandLineArgs: ["--b", "--w"],
            sys,
            baseline,
            getPrograms,
            edits: [
                {
                    caption: "modify typing file",
                    edit: sys => sys.writeFile(typing.path, `${typing.content}export const typing1 = 10;`),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks();
                        sys.runQueuedTimeoutCallbacks();
                    },
                },
                {
                    // Make change
                    caption: "change pkg references",
                    edit: sys => {
                        maxPkgs--;
                        writePkgReferences(sys);
                    },
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "modify typing file",
                    edit: sys => sys.writeFile(typing.path, typing.content),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks();
                        sys.runQueuedTimeoutCallbacks();
                    },
                },
                {
                    // Make change to remove all watches
                    caption: "change pkg references to remove all watches",
                    edit: sys => {
                        maxPkgs = 0;
                        writePkgReferences(sys);
                    },
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "modify typing file",
                    edit: sys => sys.writeFile(typing.path, `${typing.content}export const typing1 = 10;`),
                    timeouts: ts.noop,
                },
            ],
            watchOrSolution: solutionBuilder,
        });

        function flatArray<T extends {}>(arr: T[][]): readonly T[] {
            return ts.flatMap(arr, ts.identity);
        }
        function pkgs<T>(cb: (index: number) => T): T[] {
            const result: T[] = [];
            for (let index = 0; index < maxPkgs; index++) {
                result.push(cb(index));
            }
            return result;
        }
        function createPkgReference(index: number) {
            return { path: `./pkg${index}` };
        }
        function pkgFiles(index: number): File[] {
            return [
                {
                    path: `${project}/pkg${index}/index.ts`,
                    content: `export const pkg${index} = ${index};`,
                },
                {
                    path: `${project}/pkg${index}/tsconfig.json`,
                    content: jsonToReadableText({
                        complerOptions: { composite: true },
                        include: [
                            "**/*.ts",
                            "../typings/xterm.d.ts",
                        ],
                    }),
                },
            ];
        }
        function writePkgReferences(system: TestServerHost) {
            system.writeFile(
                configPath,
                jsonToReadableText({
                    files: [],
                    include: [],
                    references: pkgs(createPkgReference),
                }),
            );
        }
    });
});

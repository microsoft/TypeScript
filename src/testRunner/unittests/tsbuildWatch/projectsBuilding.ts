import * as ts from "../../_namespaces/ts";
import {
    jsonToReadableText,
} from "../helpers";
import {
    noopChange,
    TscWatchCompileChange,
    verifyTscWatch,
} from "../helpers/tscWatch";
import {
    createWatchedSystem,
    File,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsbuildWatch:: watchMode:: projectsBuilding", () => {
    function pkgs<T>(cb: (index: number) => T, count: number, startIndex?: number): T[] {
        const result: T[] = [];
        for (let index = startIndex || 0; count > 0; index++, count--) {
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
                path: `/user/username/projects/myproject/pkg${index}/index.ts`,
                content: `export const pkg${index} = ${index};`,
            },
            {
                path: `/user/username/projects/myproject/pkg${index}/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: { composite: true },
                    references: index === 0 ?
                        undefined :
                        [{ path: `../pkg0` }],
                }),
            },
        ];
    }
    function solution(maxPkgs: number): File {
        return {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: jsonToReadableText({
                references: pkgs(createPkgReference, maxPkgs),
                files: [],
            }),
        };
    }
    function checkBuildPkg(startIndex: number, count: number): TscWatchCompileChange {
        return {
            caption: `build ${pkgs(index => `pkg${index}`, count, startIndex).join(",")}`,
            edit: ts.noop,
            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
        };
    }
    verifyTscWatch({
        scenario: "projectsBuilding",
        subScenario: `when there are 3 projects in a solution`,
        commandLineArgs: ["-b", "-w", "-v"],
        sys: () =>
            createWatchedSystem(
                [libFile, ...ts.flatMap(pkgs(pkgFiles, 3), ts.identity), solution(3)],
                { currentDirectory: "/user/username/projects/myproject" },
            ),
        edits: [
            {
                caption: "dts doesn't change",
                edit: sys => sys.appendFile(`/user/username/projects/myproject/pkg0/index.ts`, `const someConst2 = 10;`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Build pkg0 and update timestamps
            },
            noopChange,
            {
                caption: "dts change",
                edit: sys => sys.appendFile(`/user/username/projects/myproject/pkg0/index.ts`, `export const someConst = 10;`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Build pkg0
            },
            checkBuildPkg(1, 2),
            noopChange,
        ],
    });
    verifyTscWatch({
        scenario: "projectsBuilding",
        subScenario: `when there are 5 projects in a solution`,
        commandLineArgs: ["-b", "-w", "-v"],
        sys: () =>
            createWatchedSystem(
                [libFile, ...ts.flatMap(pkgs(pkgFiles, 5), ts.identity), solution(5)],
                { currentDirectory: "/user/username/projects/myproject" },
            ),
        edits: [
            {
                caption: "dts doesn't change",
                edit: sys => sys.appendFile(`/user/username/projects/myproject/pkg0/index.ts`, `const someConst2 = 10;`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Build pkg0 and update timestamps
            },
            noopChange,
            {
                caption: "dts change",
                edit: sys => sys.appendFile(`/user/username/projects/myproject/pkg0/index.ts`, `export const someConst = 10;`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Build pkg0
            },
            checkBuildPkg(1, 4),
            noopChange,
        ],
    });
    verifyTscWatch({
        scenario: "projectsBuilding",
        subScenario: `when there are 8 projects in a solution`,
        commandLineArgs: ["-b", "-w", "-v"],
        sys: () =>
            createWatchedSystem(
                [libFile, ...ts.flatMap(pkgs(pkgFiles, 8), ts.identity), solution(8)],
                { currentDirectory: "/user/username/projects/myproject" },
            ),
        edits: [
            {
                caption: "dts doesn't change",
                edit: sys => sys.appendFile(`/user/username/projects/myproject/pkg0/index.ts`, `const someConst2 = 10;`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Build pkg0 and update timestamps
            },
            noopChange,
            {
                caption: "dts change",
                edit: sys => sys.appendFile(`/user/username/projects/myproject/pkg0/index.ts`, `export const someConst = 10;`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Build pkg0
            },
            checkBuildPkg(1, 5),
            checkBuildPkg(6, 2),
            noopChange,
            {
                caption: "dts change2",
                edit: sys => sys.appendFile(`/user/username/projects/myproject/pkg0/index.ts`, `export const someConst3 = 10;`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Build pkg0
            },
            checkBuildPkg(1, 5),
            {
                caption: "change while building",
                edit: sys => sys.appendFile(`/user/username/projects/myproject/pkg0/index.ts`, `const someConst4 = 10;`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Build pkg0
            },
            checkBuildPkg(6, 2),
            noopChange,
        ],
    });
    verifyTscWatch({
        scenario: "projectsBuilding",
        subScenario: `when there are 23 projects in a solution`,
        commandLineArgs: ["-b", "-w", "-v"],
        sys: () =>
            createWatchedSystem(
                [libFile, ...ts.flatMap(pkgs(pkgFiles, 23), ts.identity), solution(23)],
                { currentDirectory: "/user/username/projects/myproject" },
            ),
        edits: [
            {
                caption: "dts doesn't change",
                edit: sys => sys.appendFile(`/user/username/projects/myproject/pkg0/index.ts`, `const someConst2 = 10;`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Build pkg0 and update timestamps
            },
            noopChange,
            {
                caption: "dts change",
                edit: sys => sys.appendFile(`/user/username/projects/myproject/pkg0/index.ts`, `export const someConst = 10;`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Build pkg0
            },
            checkBuildPkg(1, 5),
            checkBuildPkg(6, 5),
            checkBuildPkg(11, 5),
            checkBuildPkg(16, 5),
            checkBuildPkg(21, 3),
            noopChange,
            {
                caption: "dts change2",
                edit: sys => sys.appendFile(`/user/username/projects/myproject/pkg0/index.ts`, `export const someConst3 = 10;`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Build pkg0
            },
            checkBuildPkg(1, 5),
            checkBuildPkg(6, 5),
            {
                caption: "change while building",
                edit: sys => sys.appendFile(`/user/username/projects/myproject/pkg0/index.ts`, `const someConst4 = 10;`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Build pkg0
            },
            checkBuildPkg(11, 5),
            {
                caption: "change while building: dts changes",
                edit: sys => sys.appendFile(`/user/username/projects/myproject/pkg0/index.ts`, `export const someConst5 = 10;`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Build pkg0
            },
            checkBuildPkg(1, 5),
            checkBuildPkg(6, 5),
            checkBuildPkg(11, 5),
            checkBuildPkg(16, 5),
            checkBuildPkg(21, 3),
            noopChange,
        ],
    });
});

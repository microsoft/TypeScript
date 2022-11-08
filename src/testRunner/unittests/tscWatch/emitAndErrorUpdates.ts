import * as ts from "../../_namespaces/ts";

describe("unittests:: tsc-watch:: Emit times and Error updates in builder after program changes", () => {
    const config: ts.tscWatch.File = {
        path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
        content: `{}`
    };
    interface VerifyEmitAndErrorUpdates {
        subScenario: string
        files: () => ts.tscWatch.File[];
        currentDirectory?: string;
        changes: ts.tscWatch.TscWatchCompileChange[];
    }
    function verifyEmitAndErrorUpdates({
        subScenario,
        files,
        currentDirectory,
        changes,
    }: VerifyEmitAndErrorUpdates) {
        ts.tscWatch.verifyTscWatch({
            scenario: "emitAndErrorUpdates",
            subScenario: `default/${subScenario}`,
            commandLineArgs: ["--w"],
            sys: () => ts.tscWatch.createWatchedSystem(
                files(),
                { currentDirectory: currentDirectory || ts.tscWatch.projectRoot }
            ),
            changes,
            baselineIncremental: true
        });

        ts.tscWatch.verifyTscWatch({
            scenario: "emitAndErrorUpdates",
            subScenario: `defaultAndD/${subScenario}`,
            commandLineArgs: ["--w", "--d"],
            sys: () => ts.tscWatch.createWatchedSystem(
                files(),
                { currentDirectory: currentDirectory || ts.tscWatch.projectRoot }
            ),
            changes,
            baselineIncremental: true
        });

        ts.tscWatch.verifyTscWatch({
            scenario: "emitAndErrorUpdates",
            subScenario: `isolatedModules/${subScenario}`,
            commandLineArgs: ["--w", "--isolatedModules"],
            sys: () => ts.tscWatch.createWatchedSystem(
                files(),
                { currentDirectory: currentDirectory || ts.tscWatch.projectRoot }
            ),
            changes,
            baselineIncremental: true
        });

        ts.tscWatch.verifyTscWatch({
            scenario: "emitAndErrorUpdates",
            subScenario: `isolatedModulesAndD/${subScenario}`,
            commandLineArgs: ["--w", "--isolatedModules", "--d"],
            sys: () => ts.tscWatch.createWatchedSystem(
                files(),
                { currentDirectory: currentDirectory || ts.tscWatch.projectRoot }
            ),
            changes,
            baselineIncremental: true
        });

        ts.tscWatch.verifyTscWatch({
            scenario: "emitAndErrorUpdates",
            subScenario: `assumeChangesOnlyAffectDirectDependencies/${subScenario}`,
            commandLineArgs: ["--w", "--assumeChangesOnlyAffectDirectDependencies"],
            sys: () => ts.tscWatch.createWatchedSystem(
                files(),
                { currentDirectory: currentDirectory || ts.tscWatch.projectRoot }
            ),
            changes,
            baselineIncremental: true
        });

        ts.tscWatch.verifyTscWatch({
            scenario: "emitAndErrorUpdates",
            subScenario: `assumeChangesOnlyAffectDirectDependenciesAndD/${subScenario}`,
            commandLineArgs: ["--w", "--assumeChangesOnlyAffectDirectDependencies", "--d"],
            sys: () => ts.tscWatch.createWatchedSystem(
                files(),
                { currentDirectory: currentDirectory || ts.tscWatch.projectRoot }
            ),
            changes,
            baselineIncremental: true
        });
    }

    describe("deep import changes", () => {
        const aFile: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/a.ts`,
            content: `import {B} from './b';
declare var console: any;
let b = new B();
console.log(b.c.d);`
        };

        function verifyDeepImportChange(subScenario: string, bFile: ts.tscWatch.File, cFile: ts.tscWatch.File) {
            verifyEmitAndErrorUpdates({
                subScenario: `deepImportChanges/${subScenario}`,
                files: () => [aFile, bFile, cFile, config, ts.tscWatch.libFile],
                changes: [
                    {
                        caption: "Rename property d to d2 of class C to initialize signatures",
                        change: sys => sys.writeFile(cFile.path, cFile.content.replace("d", "d2")),
                        timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
                    },
                    {
                        caption: "Rename property d2 to d of class C to revert back to original text",
                        change: sys => sys.writeFile(cFile.path, cFile.content.replace("d2", "d")),
                        timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
                    },
                    {
                        caption: "Rename property d to d2 of class C",
                        change: sys => sys.writeFile(cFile.path, cFile.content.replace("d", "d2")),
                        timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
                    }
                ],
            });
        }
        describe("updates errors when deep import file changes", () => {
            const bFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/b.ts`,
                content: `import {C} from './c';
export class B
{
    c = new C();
}`
            };
            const cFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/c.ts`,
                content: `export class C
{
    d = 1;
}`
            };
            verifyDeepImportChange(
                "errors for .ts change",
                bFile,
                cFile
            );
        });
        describe("updates errors when deep import through declaration file changes", () => {
            const bFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/b.d.ts`,
                content: `import {C} from './c';
export class B
{
    c: C;
}`
            };
            const cFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/c.d.ts`,
                content: `export class C
{
    d: number;
}`
            };
            verifyDeepImportChange(
                "errors for .d.ts change",
                bFile,
                cFile
            );
        });
    });

    describe("updates errors in file not exporting a deep multilevel import that changes", () => {
        const aFile: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/a.ts`,
            content: `export interface Point {
    name: string;
    c: Coords;
}
export interface Coords {
    x2: number;
    y: number;
}`
        };
        const bFile: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/b.ts`,
            content: `import { Point } from "./a";
export interface PointWrapper extends Point {
}`
        };
        const cFile: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/c.ts`,
            content: `import { PointWrapper } from "./b";
export function getPoint(): PointWrapper {
    return {
        name: "test",
        c: {
            x: 1,
            y: 2
        }
    }
};`
        };
        const dFile: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/d.ts`,
            content: `import { getPoint } from "./c";
getPoint().c.x;`
        };
        const eFile: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/e.ts`,
            content: `import "./d";`
        };
        verifyEmitAndErrorUpdates({
            subScenario: "file not exporting a deep multilevel import that changes",
            files: () => [aFile, bFile, cFile, dFile, eFile, config, ts.tscWatch.libFile],
            changes: [
                {
                    caption: "Rename property x2 to x of interface Coords to initialize signatures",
                    change: sys => sys.writeFile(aFile.path, aFile.content.replace("x2", "x")),
                    timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Rename property x to x2 of interface Coords to revert back to original text",
                    change: sys => sys.writeFile(aFile.path, aFile.content.replace("x: number", "x2: number")),
                    timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Rename property x2 to x of interface Coords",
                    change: sys => sys.writeFile(aFile.path, aFile.content.replace("x2", "x")),
                    timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
                },
            ]
        });
    });
    describe("updates errors when file transitively exported file changes", () => {
        const config: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
            content: JSON.stringify({
                files: ["app.ts"],
                compilerOptions: { baseUrl: "." }
            })
        };
        const app: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/app.ts`,
            content: `import { Data } from "lib2/public";
export class App {
    public constructor() {
        new Data().test();
    }
}`
        };
        const lib2Public: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/lib2/public.ts`,
            content: `export * from "./data";`
        };
        const lib2Data: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/lib2/data.ts`,
            content: `import { ITest } from "lib1/public";
export class Data {
    public test() {
        const result: ITest = {
            title: "title"
        }
        return result;
    }
}`
        };
        const lib1Public: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/lib1/public.ts`,
            content: `export * from "./tools/public";`
        };
        const lib1ToolsPublic: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/lib1/tools/public.ts`,
            content: `export * from "./tools.interface";`
        };
        const lib1ToolsInterface: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/lib1/tools/tools.interface.ts`,
            content: `export interface ITest {
    title: string;
}`
        };

        function verifyTransitiveExports(subScenario: string, files: readonly ts.tscWatch.File[]) {
            verifyEmitAndErrorUpdates({
                subScenario: `transitive exports/${subScenario}`,
                files: () => [lib1ToolsInterface, lib1ToolsPublic, app, lib2Public, lib1Public, ...files, config, ts.tscWatch.libFile],
                changes: [
                    {
                        caption: "Rename property title to title2 of interface ITest to initialize signatures",
                        change: sys => sys.writeFile(lib1ToolsInterface.path, lib1ToolsInterface.content.replace("title", "title2")),
                        timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
                    },
                    {
                        caption: "Rename property title2 to title of interface ITest to revert back to original text",
                        change: sys => sys.writeFile(lib1ToolsInterface.path, lib1ToolsInterface.content.replace("title2", "title")),
                        timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
                    },
                    {
                        caption: "Rename property title to title2 of interface ITest",
                        change: sys => sys.writeFile(lib1ToolsInterface.path, lib1ToolsInterface.content.replace("title", "title2")),
                        timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
                    }
                ]
            });
        }
        describe("when there are no circular import and exports", () => {
            verifyTransitiveExports(
                "no circular import/export",
                [lib2Data]
            );
        });
        describe("when there are circular import and exports", () => {
            const lib2Data: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/lib2/data.ts`,
                content: `import { ITest } from "lib1/public"; import { Data2 } from "./data2";
export class Data {
    public dat?: Data2; public test() {
        const result: ITest = {
            title: "title"
        }
        return result;
    }
}`
            };
            const lib2Data2: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/lib2/data2.ts`,
                content: `import { Data } from "./data";
export class Data2 {
    public dat?: Data;
}`
            };
            verifyTransitiveExports(
                "yes circular import/exports",
                [lib2Data, lib2Data2]
            );
        });
    });

    describe("with noEmitOnError", () => {
        function change(caption: string, content: string): ts.tscWatch.TscWatchCompileChange {
            return {
                caption,
                change: sys => sys.writeFile(`${ts.TestFSWithWatch.tsbuildProjectsLocation}/noEmitOnError/src/main.ts`, content),
                // build project
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun
            };
        }
        const noChange: ts.tscWatch.TscWatchCompileChange = {
            caption: "No change",
            change: sys => sys.writeFile(`${ts.TestFSWithWatch.tsbuildProjectsLocation}/noEmitOnError/src/main.ts`, sys.readFile(`${ts.TestFSWithWatch.tsbuildProjectsLocation}/noEmitOnError/src/main.ts`)!),
            // build project
            timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
        };
        verifyEmitAndErrorUpdates({
            subScenario: "with noEmitOnError",
            currentDirectory: `${ts.TestFSWithWatch.tsbuildProjectsLocation}/noEmitOnError`,
            files: () => ["shared/types/db.ts", "src/main.ts", "src/other.ts", "tsconfig.json"]
                .map(f => ts.TestFSWithWatch.getTsBuildProjectFile("noEmitOnError", f)).concat({ path: ts.tscWatch.libFile.path, content: ts.libContent }),
            changes: [
                noChange,
                change("Fix Syntax error", `import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
};`),
                change("Semantic Error", `import { A } from "../shared/types/db";
const a: string = 10;`),
                noChange,
                change("Fix Semantic Error", `import { A } from "../shared/types/db";
const a: string = "hello";`),
                noChange,
            ],
        });
    });
});

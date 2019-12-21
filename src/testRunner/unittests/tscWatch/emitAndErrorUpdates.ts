namespace ts.tscWatch {
    describe("unittests:: tsc-watch:: Emit times and Error updates in builder after program changes", () => {
        const config: File = {
            path: `${projectRoot}/tsconfig.json`,
            content: `{}`
        };
        interface VerifyEmitAndErrorUpdatesWorker extends VerifyEmitAndErrorUpdates {
            configFile: () => File;
        }
        function verifyEmitAndErrorUpdatesWorker({
            subScenario,
            files,
            currentDirectory,
            lib,
            configFile,
            changes,
        }: VerifyEmitAndErrorUpdatesWorker) {
            verifyTscWatch({
                scenario: "emitAndErrorUpdates",
                subScenario,
                commandLineArgs: ["--w"],
                sys: () => createWatchedSystem(
                    [...files(), configFile(), lib?.() || libFile],
                    { currentDirectory: currentDirectory || projectRoot }
                ),
                changes
            });
        }

        function changeCompilerOptions(input: VerifyEmitAndErrorUpdates, additionalOptions: CompilerOptions): File {
            const configFile = input.configFile?.() || config;
            const content = JSON.parse(configFile.content);
            content.compilerOptions = { ...content.compilerOptions, ...additionalOptions };
            return { path: configFile.path, content: JSON.stringify(content) };
        }

        interface VerifyEmitAndErrorUpdates {
            subScenario: string
            files: () => File[];
            currentDirectory?: string;
            lib?: () => File;
            changes: TscWatchCompileChange[];
            configFile?: () => File;
        }
        function verifyEmitAndErrorUpdates(input: VerifyEmitAndErrorUpdates) {
            verifyEmitAndErrorUpdatesWorker({
                ...input,
                subScenario: `with default config/${input.subScenario}`,
                configFile: () => input.configFile?.() || config
            });

            verifyEmitAndErrorUpdatesWorker({
                ...input,
                subScenario: `with default config and --declaration/${input.subScenario}`,
                configFile: () => changeCompilerOptions(input, { declaration: true })
            });

            verifyEmitAndErrorUpdatesWorker({
                ...input,
                subScenario: `config with --isolatedModules/${input.subScenario}`,
                configFile: () => changeCompilerOptions(input, { isolatedModules: true })
            });

            verifyEmitAndErrorUpdatesWorker({
                ...input,
                subScenario: `config with --isolatedModules and --declaration/${input.subScenario}`,
                configFile: () => changeCompilerOptions(input, { isolatedModules: true, declaration: true })
            });
        }

        describe("deep import changes", () => {
            const aFile: File = {
                path: `${projectRoot}/a.ts`,
                content: `import {B} from './b';
declare var console: any;
let b = new B();
console.log(b.c.d);`
            };

            function verifyDeepImportChange(subScenario: string, bFile: File, cFile: File) {
                verifyEmitAndErrorUpdates({
                    subScenario: `deep import changes/${subScenario}`,
                    files: () => [aFile, bFile, cFile],
                    changes: [
                        sys => {
                            sys.writeFile(cFile.path, cFile.content.replace("d", "d2"));
                            sys.runQueuedTimeoutCallbacks();
                            return "Rename property d to d2 of class C";
                        }
                    ],
                });
            }

            describe("updates errors when deep import file changes", () => {
                const bFile: File = {
                    path: `${projectRoot}/b.ts`,
                    content: `import {C} from './c';
export class B
{
    c = new C();
}`
                };
                const cFile: File = {
                    path: `${projectRoot}/c.ts`,
                    content: `export class C
{
    d = 1;
}`
                };
                verifyDeepImportChange(
                    "updates errors when deep import file changes",
                    bFile,
                    cFile
                );
            });

            describe("updates errors when deep import through declaration file changes", () => {
                const bFile: File = {
                    path: `${projectRoot}/b.d.ts`,
                    content: `import {C} from './c';
export class B
{
    c: C;
}`
                };
                const cFile: File = {
                    path: `${projectRoot}/c.d.ts`,
                    content: `export class C
{
    d: number;
}`
                };
                verifyDeepImportChange(
                    "updates errors when deep import through declaration file changes",
                    bFile,
                    cFile
                );
            });
        });

        describe("updates errors in file not exporting a deep multilevel import that changes", () => {
            const aFile: File = {
                path: `${projectRoot}/a.ts`,
                content: `export interface Point {
    name: string;
    c: Coords;
}
export interface Coords {
    x2: number;
    y: number;
}`
            };
            const bFile: File = {
                path: `${projectRoot}/b.ts`,
                content: `import { Point } from "./a";
export interface PointWrapper extends Point {
}`
            };
            const cFile: File = {
                path: `${projectRoot}/c.ts`,
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
            const dFile: File = {
                path: `${projectRoot}/d.ts`,
                content: `import { getPoint } from "./c";
getPoint().c.x;`
            };
            const eFile: File = {
                path: `${projectRoot}/e.ts`,
                content: `import "./d";`
            };
            verifyEmitAndErrorUpdates({
                subScenario: "updates errors in file not exporting a deep multilevel import that changes",
                files: () => [aFile, bFile, cFile, dFile, eFile],
                changes: [
                    sys => {
                        sys.writeFile(aFile.path, aFile.content.replace("x2", "x"));
                        sys.runQueuedTimeoutCallbacks();
                        return "Rename property x2 to x of interface Coords";
                    }
                ]
            });
        });

        describe("updates errors when file transitively exported file changes", () => {
            const config: File = {
                path: `${projectRoot}/tsconfig.json`,
                content: JSON.stringify({
                    files: ["app.ts"],
                    compilerOptions: { baseUrl: "." }
                })
            };
            const app: File = {
                path: `${projectRoot}/app.ts`,
                content: `import { Data } from "lib2/public";
export class App {
    public constructor() {
        new Data().test();
    }
}`
            };
            const lib2Public: File = {
                path: `${projectRoot}/lib2/public.ts`,
                content: `export * from "./data";`
            };
            const lib2Data: File = {
                path: `${projectRoot}/lib2/data.ts`,
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
            const lib1Public: File = {
                path: `${projectRoot}/lib1/public.ts`,
                content: `export * from "./tools/public";`
            };
            const lib1ToolsPublic: File = {
                path: `${projectRoot}/lib1/tools/public.ts`,
                content: `export * from "./tools.interface";`
            };
            const lib1ToolsInterface: File = {
                path: `${projectRoot}/lib1/tools/tools.interface.ts`,
                content: `export interface ITest {
    title: string;
}`
            };

            function verifyTransitiveExports(subScenario: string, files: readonly File[]) {
                verifyEmitAndErrorUpdates({
                    subScenario: `updates errors when file transitively exported file changes/${subScenario}`,
                    files: () => [lib1ToolsInterface, lib1ToolsPublic, app, lib2Public, lib1Public, ...files],
                    configFile: () => config,
                    changes: [
                        sys => {
                            sys.writeFile(lib1ToolsInterface.path, lib1ToolsInterface.content.replace("title", "title2"));
                            sys.runQueuedTimeoutCallbacks();
                            return "Rename property title to title2 of interface ITest";
                        }
                    ]
                });
            }
            describe("when there are no circular import and exports", () => {
                verifyTransitiveExports(
                    "when there are no circular import and exports",
                    [lib2Data]
                );
            });

            describe("when there are circular import and exports", () => {
                const lib2Data: File = {
                    path: `${projectRoot}/lib2/data.ts`,
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
                const lib2Data2: File = {
                    path: `${projectRoot}/lib2/data2.ts`,
                    content: `import { Data } from "./data";
export class Data2 {
    public dat?: Data;
}`
                };
                verifyTransitiveExports(
                    "when there are circular import and exports",
                    [lib2Data, lib2Data2]
                );
            });
        });

        verifyEmitAndErrorUpdates({
            subScenario: "with noEmitOnError",
            currentDirectory: `${TestFSWithWatch.tsbuildProjectsLocation}/noEmitOnError`,
            files: () => ["shared/types/db.ts", "src/main.ts", "src/other.ts"]
                .map(f => TestFSWithWatch.getTsBuildProjectFile("noEmitOnError", f)),
            lib: () => ({ path: libFile.path, content: libContent }),
            configFile: () => TestFSWithWatch.getTsBuildProjectFile("noEmitOnError", "tsconfig.json"),
            changes: [
                sys => {
                    sys.writeFile(`${TestFSWithWatch.tsbuildProjectsLocation}/noEmitOnError/src/main.ts`, `import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
};`);
                    sys.checkTimeoutQueueLengthAndRun(1); // build project
                    return "Fix the error";
                }
            ]
        });
    });
}

import { jsonToReadableText } from "../helpers.js";
import {
    TscWatchCompileChange,
    verifyTscWatch,
} from "../helpers/tscWatch.js";
import {
    File,
    FileOrFolderOrSymLinkMap,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tscWatch:: emitAndErrorUpdates:: Emit times and Error updates in builder after program changes", () => {
    const config: File = {
        path: `/user/username/projects/myproject/tsconfig.json`,
        content: `{}`,
    };
    interface VerifyEmitAndErrorUpdates {
        subScenario: string;
        files: () => FileOrFolderOrSymLinkMap | readonly File[];
        changes: TscWatchCompileChange[];
    }
    function verifyEmitAndErrorUpdates({
        subScenario,
        files,
        changes,
    }: VerifyEmitAndErrorUpdates) {
        verifyTscWatch({
            scenario: "emitAndErrorUpdates",
            subScenario: `default/${subScenario}`,
            commandLineArgs: ["--w"],
            sys,
            edits: changes,
            baselineIncremental: true,
        });

        verifyTscWatch({
            scenario: "emitAndErrorUpdates",
            subScenario: `defaultAndD/${subScenario}`,
            commandLineArgs: ["--w", "--d"],
            sys,
            edits: changes,
            baselineIncremental: true,
        });

        verifyTscWatch({
            scenario: "emitAndErrorUpdates",
            subScenario: `isolatedModules/${subScenario}`,
            commandLineArgs: ["--w", "--isolatedModules"],
            sys,
            edits: changes,
            baselineIncremental: true,
        });

        verifyTscWatch({
            scenario: "emitAndErrorUpdates",
            subScenario: `isolatedModulesAndD/${subScenario}`,
            commandLineArgs: ["--w", "--isolatedModules", "--d"],
            sys,
            edits: changes,
            baselineIncremental: true,
        });

        verifyTscWatch({
            scenario: "emitAndErrorUpdates",
            subScenario: `assumeChangesOnlyAffectDirectDependencies/${subScenario}`,
            commandLineArgs: ["--w", "--assumeChangesOnlyAffectDirectDependencies"],
            sys,
            edits: changes,
            baselineIncremental: true,
        });

        verifyTscWatch({
            scenario: "emitAndErrorUpdates",
            subScenario: `assumeChangesOnlyAffectDirectDependenciesAndD/${subScenario}`,
            commandLineArgs: ["--w", "--assumeChangesOnlyAffectDirectDependencies", "--d"],
            sys,
            edits: changes,
            baselineIncremental: true,
        });

        function sys() {
            return TestServerHost.createWatchedSystem(
                files(),
                { currentDirectory: "/user/username/projects/myproject" },
            );
        }
    }

    describe("deep import changes", () => {
        const aFile: File = {
            path: `/user/username/projects/myproject/a.ts`,
            content: `import {B} from './b';
declare var console: any;
let b = new B();
console.log(b.c.d);`,
        };

        function verifyDeepImportChange(subScenario: string, bFile: File, cFile: File) {
            verifyEmitAndErrorUpdates({
                subScenario: `deepImportChanges/${subScenario}`,
                files: () => [aFile, bFile, cFile, config],
                changes: [
                    {
                        caption: "Rename property d to d2 of class C to initialize signatures",
                        edit: sys => sys.writeFile(cFile.path, cFile.content.replace("d", "d2")),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "Rename property d2 to d of class C to revert back to original text",
                        edit: sys => sys.writeFile(cFile.path, cFile.content.replace("d2", "d")),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "Rename property d to d2 of class C",
                        edit: sys => sys.writeFile(cFile.path, cFile.content.replace("d", "d2")),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                ],
            });
        }
        describe("updates errors when deep import file changes", () => {
            const bFile: File = {
                path: `/user/username/projects/myproject/b.ts`,
                content: `import {C} from './c';
export class B
{
    c = new C();
}`,
            };
            const cFile: File = {
                path: `/user/username/projects/myproject/c.ts`,
                content: `export class C
{
    d = 1;
}`,
            };
            verifyDeepImportChange(
                "errors for .ts change",
                bFile,
                cFile,
            );
        });
        describe("updates errors when deep import through declaration file changes", () => {
            const bFile: File = {
                path: `/user/username/projects/myproject/b.d.ts`,
                content: `import {C} from './c';
export class B
{
    c: C;
}`,
            };
            const cFile: File = {
                path: `/user/username/projects/myproject/c.d.ts`,
                content: `export class C
{
    d: number;
}`,
            };
            verifyDeepImportChange(
                "errors for .d.ts change",
                bFile,
                cFile,
            );
        });
    });

    describe("updates errors in file not exporting a deep multilevel import that changes", () => {
        const aFile: File = {
            path: `/user/username/projects/myproject/a.ts`,
            content: `export interface Point {
    name: string;
    c: Coords;
}
export interface Coords {
    x2: number;
    y: number;
}`,
        };
        const bFile: File = {
            path: `/user/username/projects/myproject/b.ts`,
            content: `import { Point } from "./a";
export interface PointWrapper extends Point {
}`,
        };
        const cFile: File = {
            path: `/user/username/projects/myproject/c.ts`,
            content: `import { PointWrapper } from "./b";
export function getPoint(): PointWrapper {
    return {
        name: "test",
        c: {
            x: 1,
            y: 2
        }
    }
};`,
        };
        const dFile: File = {
            path: `/user/username/projects/myproject/d.ts`,
            content: `import { getPoint } from "./c";
getPoint().c.x;`,
        };
        const eFile: File = {
            path: `/user/username/projects/myproject/e.ts`,
            content: `import "./d";`,
        };
        verifyEmitAndErrorUpdates({
            subScenario: "file not exporting a deep multilevel import that changes",
            files: () => [aFile, bFile, cFile, dFile, eFile, config],
            changes: [
                {
                    caption: "Rename property x2 to x of interface Coords to initialize signatures",
                    edit: sys => sys.writeFile(aFile.path, aFile.content.replace("x2", "x")),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "Rename property x to x2 of interface Coords to revert back to original text",
                    edit: sys => sys.writeFile(aFile.path, aFile.content.replace("x: number", "x2: number")),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "Rename property x2 to x of interface Coords",
                    edit: sys => sys.writeFile(aFile.path, aFile.content.replace("x2", "x")),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
            ],
        });
    });
    describe("updates errors when file transitively exported file changes", () => {
        const config: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: jsonToReadableText({
                files: ["app.ts"],
                compilerOptions: { baseUrl: "." },
            }),
        };
        const app: File = {
            path: `/user/username/projects/myproject/app.ts`,
            content: `import { Data } from "lib2/public";
export class App {
    public constructor() {
        new Data().test();
    }
}`,
        };
        const lib2Public: File = {
            path: `/user/username/projects/myproject/lib2/public.ts`,
            content: `export * from "./data";`,
        };
        const lib2Data: File = {
            path: `/user/username/projects/myproject/lib2/data.ts`,
            content: `import { ITest } from "lib1/public";
export class Data {
    public test() {
        const result: ITest = {
            title: "title"
        }
        return result;
    }
}`,
        };
        const lib1Public: File = {
            path: `/user/username/projects/myproject/lib1/public.ts`,
            content: `export * from "./tools/public";`,
        };
        const lib1ToolsPublic: File = {
            path: `/user/username/projects/myproject/lib1/tools/public.ts`,
            content: `export * from "./toolsinterface";`,
        };
        const lib1ToolsInterface: File = {
            path: `/user/username/projects/myproject/lib1/tools/toolsinterface.ts`,
            content: `export interface ITest {
    title: string;
}`,
        };

        function verifyTransitiveExports(subScenario: string, files: readonly File[]) {
            verifyEmitAndErrorUpdates({
                subScenario: `transitive exports/${subScenario}`,
                files: () => [lib1ToolsInterface, lib1ToolsPublic, app, lib2Public, lib1Public, ...files, config],
                changes: [
                    {
                        caption: "Rename property title to title2 of interface ITest to initialize signatures",
                        edit: sys => sys.writeFile(lib1ToolsInterface.path, lib1ToolsInterface.content.replace("title", "title2")),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "Rename property title2 to title of interface ITest to revert back to original text",
                        edit: sys => sys.writeFile(lib1ToolsInterface.path, lib1ToolsInterface.content.replace("title2", "title")),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "Rename property title to title2 of interface ITest",
                        edit: sys => sys.writeFile(lib1ToolsInterface.path, lib1ToolsInterface.content.replace("title", "title2")),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                ],
            });
        }
        describe("when there are no circular import and exports", () => {
            verifyTransitiveExports(
                "no circular import/export",
                [lib2Data],
            );
        });
        describe("when there are circular import and exports", () => {
            const lib2Data: File = {
                path: `/user/username/projects/myproject/lib2/data.ts`,
                content: `import { ITest } from "lib1/public"; import { Data2 } from "./data2";
export class Data {
    public dat?: Data2; public test() {
        const result: ITest = {
            title: "title"
        }
        return result;
    }
}`,
            };
            const lib2Data2: File = {
                path: `/user/username/projects/myproject/lib2/data2.ts`,
                content: `import { Data } from "./data";
export class Data2 {
    public dat?: Data;
}`,
            };
            verifyTransitiveExports(
                "yes circular import/exports",
                [lib2Data, lib2Data2],
            );
        });
    });
});

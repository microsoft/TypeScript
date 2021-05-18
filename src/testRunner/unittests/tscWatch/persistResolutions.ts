namespace ts.tscWatch {
    describe("unittests:: tsc-watch:: persistResolutions", () => {
        function getSys(outFile?: string) {
            return createWatchedSystem([
                {
                    path: `${projectRoot}/src/main.ts`,
                    content: Utils.dedent`
                        import { something } from "./filePresent";
                        import { something as something1 } from "./filePresent";
                        import { something2 } from "./fileNotFound";
                        import { externalThing1 } from "externalThing";
                        import { externalThing2 } from "externalThingNotPresent";`,
                },
                {
                    path: `${projectRoot}/src/anotherFileReusingResolution.ts`,
                    content: Utils.dedent`
                        import { something } from "./filePresent";
                        import { something2 } from "./fileNotFound";
                        import { externalThing1 } from "externalThing";
                        import { externalThing2 } from "externalThingNotPresent";`,
                },
                {
                    path: `${projectRoot}/src/filePresent.ts`,
                    content: `export function something() { return 10; }`,
                },
                {
                    path: `${projectRoot}/src/fileWithRef.ts`,
                    content: `/// <reference path="./types.ts"/>`,
                },
                {
                    path: `${projectRoot}/src/types.ts`,
                    content: `interface SomeType {}`,
                },
                {
                    path: `${projectRoot}/src/globalMain.ts`,
                    content: Utils.dedent`
                        /// <reference path="./globalFilePresent.ts"/>
                        /// <reference path="./globalFileNotFound.ts"/>
                        function globalMain() { }
                    `,
                },
                {
                    path: `${projectRoot}/src/globalAnotherFileWithSameReferenes.ts`,
                    content: Utils.dedent`
                        /// <reference path="./globalFilePresent.ts"/>
                        /// <reference path="./globalFileNotFound.ts"/>
                        function globalAnotherFileWithSameReferenes() { }
                    `,
                },
                {
                    path: `${projectRoot}/src/globalFilePresent.ts`,
                    content: `function globalSomething() { return 10; }`,
                },
                {
                    path: `${projectRoot}/src/externalThing.d.ts`,
                    content: `export function externalThing1(): number;`,
                },
                {
                    path: `${projectRoot}/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: {
                            module: "amd",
                            composite: true,
                            persistResolutions: true,
                            traceResolution: true,
                            outFile
                        },
                        include: ["src/**/*.ts"]
                    }),
                },
                libFile
            ], { currentDirectory: projectRoot });
        }

        function getSysWithSavedResolutions(outFile?: string) {
            const sys = getSys(outFile);
            const exit = sys.exit;
            sys.exit = noop;
            fakes.withTemporaryPatchingForBuildinfoReadWrite(sys, sys => executeCommandLine(sys, noop, ["--p", "."]));
            sys.exit = exit;
            sys.clearOutput();
            return sys;
        }

        function getSysWithClearedResolutions(outFile?: string) {
            const sys = getSys(outFile);
            const exit = sys.exit;
            sys.exit = noop;
            fakes.withTemporaryPatchingForBuildinfoReadWrite(sys, sys => {
                executeCommandLine(sys, noop, ["--p", "."]);
                executeCommandLine(sys, noop, ["--p", ".", "--cleanPersistedProgram"]);
            });
            sys.exit = exit;
            sys.clearOutput();
            return sys;
        }

        verifyTscWatch({
            scenario: "persistResolutions",
            subScenario: "saves resolution and uses it for new program",
            sys: getSys,
            commandLineArgs: ["--p", ".", "-w", "--extendedDiagnostics"],
            changes: [
                {
                    caption: "Modify globalMain file",
                    change: sys => sys.appendFile(`${projectRoot}/src/globalMain.ts`, `globalSomething();`),
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Add new globalFile and update globalMain file",
                    change: sys => {
                        sys.writeFile(`${projectRoot}/src/globalNewFile.ts`, "function globalFoo() { return 20; }");
                        sys.prependFile(`${projectRoot}/src/globalMain.ts`, `/// <reference path="./globalNewFile.ts"/>
`);
                        sys.appendFile(`${projectRoot}/src/globalMain.ts`, `globalFoo();`);
                    },
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Write file that could not be resolved by referenced path",
                    change: sys => sys.writeFile(`${projectRoot}/src/globalFileNotFound.ts`, "function globalSomething2() { return 20; }"),
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Modify main file",
                    change: sys => sys.appendFile(`${projectRoot}/src/main.ts`, `something();`),
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Add new module and update main file",
                    change: sys => {
                        sys.writeFile(`${projectRoot}/src/newFile.ts`, "export function foo() { return 20; }");
                        sys.prependFile(`${projectRoot}/src/main.ts`, `import { foo } from "./newFile";`);
                    },
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Write file that could not be resolved",
                    change: sys => sys.writeFile(`${projectRoot}/src/fileNotFound.ts`, "export function something2() { return 20; }"),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
                        sys.runQueuedTimeoutCallbacks(); // Actual update
                    }
                },
                {
                    caption: "Delete file that could not be resolved",
                    change: sys => sys.deleteFile(`${projectRoot}/src/fileNotFound.ts`),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
                        sys.runQueuedTimeoutCallbacks(); // Actual update
                    }
                },
                {
                    caption: "Create external module file that could not be resolved",
                    change: sys => sys.writeFile(`${projectRoot}/src/externalThingNotPresent.ts`, "export function externalThing2() { return 20; }"),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
                        sys.runQueuedTimeoutCallbacks(); // Actual update
                    }
                },
                {
                    caption: "Write .ts file that takes preference over resolved .d.ts file",
                    change: sys => sys.writeFile(`${projectRoot}/src/externalThing.ts`, "export function externalThing1() { return 10; }"),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
                        sys.runQueuedTimeoutCallbacks(); // Actual update
                    }
                },
            ]
        });
        verifyTscWatch({
            scenario: "persistResolutions",
            subScenario: "can build after resolutions have been saved in tsbuildinfo file",
            sys: getSysWithSavedResolutions,
            commandLineArgs: ["--p", ".", "-w", "--extendedDiagnostics"],
            changes: [
                {
                    caption: "Modify globalMain file",
                    change: sys => sys.appendFile(`${projectRoot}/src/globalMain.ts`, `globalSomething();`),
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Add new globalFile and update globalMain file",
                    change: sys => {
                        sys.writeFile(`${projectRoot}/src/globalNewFile.ts`, "function globalFoo() { return 20; }");
                        sys.prependFile(`${projectRoot}/src/globalMain.ts`, `/// <reference path="./globalNewFile.ts"/>
`);
                        sys.appendFile(`${projectRoot}/src/globalMain.ts`, `globalFoo();`);
                    },
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Write file that could not be resolved by referenced path",
                    change: sys => sys.writeFile(`${projectRoot}/src/globalFileNotFound.ts`, "function globalSomething2() { return 20; }"),
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Modify main file",
                    change: sys => sys.appendFile(`${projectRoot}/src/main.ts`, `something();`),
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Add new module and update main file",
                    change: sys => {
                        sys.writeFile(`${projectRoot}/src/newFile.ts`, "export function foo() { return 20; }");
                        sys.prependFile(`${projectRoot}/src/main.ts`, `import { foo } from "./newFile";`);
                    },
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Write file that could not be resolved",
                    change: sys => sys.writeFile(`${projectRoot}/src/fileNotFound.ts`, "export function something2() { return 20; }"),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
                        sys.runQueuedTimeoutCallbacks(); // Actual update
                    }
                },
                {
                    caption: "Delete file that could not be resolved",
                    change: sys => sys.deleteFile(`${projectRoot}/src/fileNotFound.ts`),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
                        sys.runQueuedTimeoutCallbacks(); // Actual update
                    }
                },
                {
                    caption: "Create external module file that could not be resolved",
                    change: sys => sys.writeFile(`${projectRoot}/src/externalThingNotPresent.ts`, "export function externalThing2() { return 20; }"),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
                        sys.runQueuedTimeoutCallbacks(); // Actual update
                    }
                },
                {
                    caption: "Write .ts file that takes preference over resolved .d.ts file",
                    change: sys => sys.writeFile(`${projectRoot}/src/externalThing.ts`, "export function externalThing1() { return 10; }"),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
                        sys.runQueuedTimeoutCallbacks(); // Actual update
                    }
                },
            ]
        });
        verifyTscWatch({
            scenario: "persistResolutions",
            subScenario: "can build after resolutions are cleaned",
            sys: getSysWithClearedResolutions,
            commandLineArgs: ["--p", ".", "-w", "--extendedDiagnostics"],
            changes: [
                {
                    caption: "Modify globalMain file",
                    change: sys => sys.appendFile(`${projectRoot}/src/globalMain.ts`, `globalSomething();`),
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Add new globalFile and update globalMain file",
                    change: sys => {
                        sys.writeFile(`${projectRoot}/src/globalNewFile.ts`, "function globalFoo() { return 20; }");
                        sys.prependFile(`${projectRoot}/src/globalMain.ts`, `/// <reference path="./globalNewFile.ts"/>
`);
                        sys.appendFile(`${projectRoot}/src/globalMain.ts`, `globalFoo();`);
                    },
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Write file that could not be resolved by referenced path",
                    change: sys => sys.writeFile(`${projectRoot}/src/globalFileNotFound.ts`, "function globalSomething2() { return 20; }"),
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Modify main file",
                    change: sys => sys.appendFile(`${projectRoot}/src/main.ts`, `something();`),
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Add new module and update main file",
                    change: sys => {
                        sys.writeFile(`${projectRoot}/src/newFile.ts`, "export function foo() { return 20; }");
                        sys.prependFile(`${projectRoot}/src/main.ts`, `import { foo } from "./newFile";`);
                    },
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Write file that could not be resolved",
                    change: sys => sys.writeFile(`${projectRoot}/src/fileNotFound.ts`, "export function something2() { return 20; }"),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
                        sys.runQueuedTimeoutCallbacks(); // Actual update
                    }
                },
                {
                    caption: "Delete file that could not be resolved",
                    change: sys => sys.deleteFile(`${projectRoot}/src/fileNotFound.ts`),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
                        sys.runQueuedTimeoutCallbacks(); // Actual update
                    }
                },
                {
                    caption: "Create external module file that could not be resolved",
                    change: sys => sys.writeFile(`${projectRoot}/src/externalThingNotPresent.ts`, "export function externalThing2() { return 20; }"),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
                        sys.runQueuedTimeoutCallbacks(); // Actual update
                    }
                },
                {
                    caption: "Write .ts file that takes preference over resolved .d.ts file",
                    change: sys => sys.writeFile(`${projectRoot}/src/externalThing.ts`, "export function externalThing1() { return 10; }"),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
                        sys.runQueuedTimeoutCallbacks(); // Actual update
                    }
                },
            ]
        });

        verifyTscWatch({
            scenario: "persistResolutions",
            subScenario: "saves resolution and uses it for new program with outFile",
            sys: () => getSys("outFile.js"),
            commandLineArgs: ["--p", ".", "-w", "--extendedDiagnostics"],
            changes: [
                {
                    caption: "Modify globalMain file",
                    change: sys => sys.appendFile(`${projectRoot}/src/globalMain.ts`, `globalSomething();`),
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Add new globalFile and update globalMain file",
                    change: sys => {
                        sys.writeFile(`${projectRoot}/src/globalNewFile.ts`, "function globalFoo() { return 20; }");
                        sys.prependFile(`${projectRoot}/src/globalMain.ts`, `/// <reference path="./globalNewFile.ts"/>
`);
                        sys.appendFile(`${projectRoot}/src/globalMain.ts`, `globalFoo();`);
                    },
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Write file that could not be resolved by referenced path",
                    change: sys => sys.writeFile(`${projectRoot}/src/globalFileNotFound.ts`, "function globalSomething2() { return 20; }"),
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Modify main file",
                    change: sys => sys.appendFile(`${projectRoot}/src/main.ts`, `something();`),
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Add new module and update main file",
                    change: sys => {
                        sys.writeFile(`${projectRoot}/src/newFile.ts`, "export function foo() { return 20; }");
                        sys.prependFile(`${projectRoot}/src/main.ts`, `import { foo } from "./newFile";`);
                    },
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Write file that could not be resolved",
                    change: sys => sys.writeFile(`${projectRoot}/src/fileNotFound.ts`, "export function something2() { return 20; }"),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
                        sys.runQueuedTimeoutCallbacks(); // Actual update
                    }
                },
                {
                    caption: "Delete file that could not be resolved",
                    change: sys => sys.deleteFile(`${projectRoot}/src/fileNotFound.ts`),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
                        sys.runQueuedTimeoutCallbacks(); // Actual update
                    }
                },
                {
                    caption: "Create external module file that could not be resolved",
                    change: sys => sys.writeFile(`${projectRoot}/src/externalThingNotPresent.ts`, "export function externalThing2() { return 20; }"),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
                        sys.runQueuedTimeoutCallbacks(); // Actual update
                    }
                },
                {
                    caption: "Write .ts file that takes preference over resolved .d.ts file",
                    change: sys => sys.writeFile(`${projectRoot}/src/externalThing.ts`, "export function externalThing1() { return 10; }"),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
                        sys.runQueuedTimeoutCallbacks(); // Actual update
                    }
                },
            ]
        });
        verifyTscWatch({
            scenario: "persistResolutions",
            subScenario: "can build after resolutions have been saved in tsbuildinfo file with outFile",
            sys: () => getSysWithSavedResolutions("outFile.js"),
            commandLineArgs: ["--p", ".", "-w", "--extendedDiagnostics"],
            changes: [
                {
                    caption: "Modify globalMain file",
                    change: sys => sys.appendFile(`${projectRoot}/src/globalMain.ts`, `globalSomething();`),
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Add new globalFile and update globalMain file",
                    change: sys => {
                        sys.writeFile(`${projectRoot}/src/globalNewFile.ts`, "function globalFoo() { return 20; }");
                        sys.prependFile(`${projectRoot}/src/globalMain.ts`, `/// <reference path="./globalNewFile.ts"/>
`);
                        sys.appendFile(`${projectRoot}/src/globalMain.ts`, `globalFoo();`);
                    },
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Write file that could not be resolved by referenced path",
                    change: sys => sys.writeFile(`${projectRoot}/src/globalFileNotFound.ts`, "function globalSomething2() { return 20; }"),
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Modify main file",
                    change: sys => sys.appendFile(`${projectRoot}/src/main.ts`, `something();`),
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Add new module and update main file",
                    change: sys => {
                        sys.writeFile(`${projectRoot}/src/newFile.ts`, "export function foo() { return 20; }");
                        sys.prependFile(`${projectRoot}/src/main.ts`, `import { foo } from "./newFile";`);
                    },
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Write file that could not be resolved",
                    change: sys => sys.writeFile(`${projectRoot}/src/fileNotFound.ts`, "export function something2() { return 20; }"),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
                        sys.runQueuedTimeoutCallbacks(); // Actual update
                    }
                },
                {
                    caption: "Delete file that could not be resolved",
                    change: sys => sys.deleteFile(`${projectRoot}/src/fileNotFound.ts`),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
                        sys.runQueuedTimeoutCallbacks(); // Actual update
                    }
                },
                {
                    caption: "Create external module file that could not be resolved",
                    change: sys => sys.writeFile(`${projectRoot}/src/externalThingNotPresent.ts`, "export function externalThing2() { return 20; }"),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
                        sys.runQueuedTimeoutCallbacks(); // Actual update
                    }
                },
                {
                    caption: "Write .ts file that takes preference over resolved .d.ts file",
                    change: sys => sys.writeFile(`${projectRoot}/src/externalThing.ts`, "export function externalThing1() { return 10; }"),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
                        sys.runQueuedTimeoutCallbacks(); // Actual update
                    }
                },
            ]
        });
        verifyTscWatch({
            scenario: "persistResolutions",
            subScenario: "can build after resolutions are cleaned with outFile",
            sys: () => getSysWithClearedResolutions("outFile.js"),
            commandLineArgs: ["--p", ".", "-w", "--extendedDiagnostics"],
            changes: [
                {
                    caption: "Modify globalMain file",
                    change: sys => sys.appendFile(`${projectRoot}/src/globalMain.ts`, `globalSomething();`),
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Add new globalFile and update globalMain file",
                    change: sys => {
                        sys.writeFile(`${projectRoot}/src/globalNewFile.ts`, "function globalFoo() { return 20; }");
                        sys.prependFile(`${projectRoot}/src/globalMain.ts`, `/// <reference path="./globalNewFile.ts"/>
`);
                        sys.appendFile(`${projectRoot}/src/globalMain.ts`, `globalFoo();`);
                    },
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Write file that could not be resolved by referenced path",
                    change: sys => sys.writeFile(`${projectRoot}/src/globalFileNotFound.ts`, "function globalSomething2() { return 20; }"),
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Modify main file",
                    change: sys => sys.appendFile(`${projectRoot}/src/main.ts`, `something();`),
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Add new module and update main file",
                    change: sys => {
                        sys.writeFile(`${projectRoot}/src/newFile.ts`, "export function foo() { return 20; }");
                        sys.prependFile(`${projectRoot}/src/main.ts`, `import { foo } from "./newFile";`);
                    },
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Write file that could not be resolved",
                    change: sys => sys.writeFile(`${projectRoot}/src/fileNotFound.ts`, "export function something2() { return 20; }"),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
                        sys.runQueuedTimeoutCallbacks(); // Actual update
                    }
                },
                {
                    caption: "Delete file that could not be resolved",
                    change: sys => sys.deleteFile(`${projectRoot}/src/fileNotFound.ts`),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
                        sys.runQueuedTimeoutCallbacks(); // Actual update
                    }
                },
                {
                    caption: "Create external module file that could not be resolved",
                    change: sys => sys.writeFile(`${projectRoot}/src/externalThingNotPresent.ts`, "export function externalThing2() { return 20; }"),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
                        sys.runQueuedTimeoutCallbacks(); // Actual update
                    }
                },
                {
                    caption: "Write .ts file that takes preference over resolved .d.ts file",
                    change: sys => sys.writeFile(`${projectRoot}/src/externalThing.ts`, "export function externalThing1() { return 10; }"),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // Invalidate resolutions
                        sys.runQueuedTimeoutCallbacks(); // Actual update
                    }
                },
            ]
        });
    });
}
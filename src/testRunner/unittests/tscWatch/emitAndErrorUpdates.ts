namespace ts.tscWatch {
    describe("unittests:: tsc-watch:: Emit times and Error updates in builder after program changes", () => {
        const config: File = {
            path: `${projectRoot}/tsconfig.json`,
            content: `{}`
        };
        function getOutputFileStampAndError(host: WatchedSystem, watch: Watch, file: File) {
            const builderProgram = watch.getBuilderProgram();
            const state = builderProgram.getState();
            return {
                file,
                fileStamp: host.getModifiedTime(file.path.replace(".ts", ".js")),
                errors: builderProgram.getSemanticDiagnostics(watch().getSourceFileByPath(file.path as Path)),
                errorsFromOldState: !!state.semanticDiagnosticsFromOldState && state.semanticDiagnosticsFromOldState.has(file.path),
                dtsStamp: host.getModifiedTime(file.path.replace(".ts", ".d.ts"))
            };
        }

        function getOutputFileStampsAndErrors(host: WatchedSystem, watch: Watch, directoryFiles: readonly File[]) {
            return directoryFiles.map(d => getOutputFileStampAndError(host, watch, d));
        }

        function findStampAndErrors(stampsAndErrors: readonly ReturnType<typeof getOutputFileStampAndError>[], file: File) {
            return find(stampsAndErrors, info => info.file === file)!;
        }

        interface VerifyOutputFileStampAndErrors {
            file: File;
            jsEmitExpected: boolean;
            dtsEmitExpected: boolean;
            errorRefershExpected: boolean;
            beforeChangeFileStampsAndErrors: readonly ReturnType<typeof getOutputFileStampAndError>[];
            afterChangeFileStampsAndErrors: readonly ReturnType<typeof getOutputFileStampAndError>[];
        }
        function verifyOutputFileStampsAndErrors({
            file,
            jsEmitExpected,
            dtsEmitExpected,
            errorRefershExpected,
            beforeChangeFileStampsAndErrors,
            afterChangeFileStampsAndErrors
        }: VerifyOutputFileStampAndErrors) {
            const beforeChange = findStampAndErrors(beforeChangeFileStampsAndErrors, file);
            const afterChange = findStampAndErrors(afterChangeFileStampsAndErrors, file);
            if (jsEmitExpected) {
                assert.notStrictEqual(afterChange.fileStamp, beforeChange.fileStamp, `Expected emit for file ${file.path}`);
            }
            else {
                assert.strictEqual(afterChange.fileStamp, beforeChange.fileStamp, `Did not expect new emit for file ${file.path}`);
            }
            if (dtsEmitExpected) {
                assert.notStrictEqual(afterChange.dtsStamp, beforeChange.dtsStamp, `Expected emit for file ${file.path}`);
            }
            else {
                assert.strictEqual(afterChange.dtsStamp, beforeChange.dtsStamp, `Did not expect new emit for file ${file.path}`);
            }
            if (errorRefershExpected) {
                if (afterChange.errors !== emptyArray || beforeChange.errors !== emptyArray) {
                    assert.notStrictEqual(afterChange.errors, beforeChange.errors, `Expected new errors for file ${file.path}`);
                }
                assert.isFalse(afterChange.errorsFromOldState, `Expected errors to be not copied from old state for file ${file.path}`);
            }
            else {
                assert.strictEqual(afterChange.errors, beforeChange.errors, `Expected errors to not change for file ${file.path}`);
                assert.isTrue(afterChange.errorsFromOldState, `Expected errors to be copied from old state for file ${file.path}`);
            }
        }

        interface VerifyEmitAndErrorUpdatesWorker extends VerifyEmitAndErrorUpdates {
            configFile: File;
        }
        function verifyEmitAndErrorUpdatesWorker({
            fileWithChange,
            filesWithNewEmit,
            filesWithOnlyErrorRefresh,
            filesNotTouched,
            configFile,
            change,
            getInitialErrors,
            getIncrementalErrors
        }: VerifyEmitAndErrorUpdatesWorker) {
            const nonLibFiles = [...filesWithNewEmit, ...filesWithOnlyErrorRefresh, ...filesNotTouched];
            const files = [...nonLibFiles, configFile, libFile];
            const compilerOptions = (JSON.parse(configFile.content).compilerOptions || {}) as CompilerOptions;
            const host = createWatchedSystem(files, { currentDirectory: projectRoot });
            const watch = createWatchOfConfigFile("tsconfig.json", host);
            checkProgramActualFiles(watch(), [...nonLibFiles.map(f => f.path), libFile.path]);
            checkOutputErrorsInitial(host, getInitialErrors(watch));
            const beforeChange = getOutputFileStampsAndErrors(host, watch, nonLibFiles);
            change(host);
            host.runQueuedTimeoutCallbacks();
            checkOutputErrorsIncremental(host, getIncrementalErrors(watch));
            const afterChange = getOutputFileStampsAndErrors(host, watch, nonLibFiles);
            filesWithNewEmit.forEach(file => verifyOutputFileStampsAndErrors({
                file,
                jsEmitExpected: !compilerOptions.isolatedModules || fileWithChange === file,
                dtsEmitExpected: getEmitDeclarations(compilerOptions),
                errorRefershExpected: true,
                beforeChangeFileStampsAndErrors: beforeChange,
                afterChangeFileStampsAndErrors: afterChange
            }));
            filesWithOnlyErrorRefresh.forEach(file => verifyOutputFileStampsAndErrors({
                file,
                jsEmitExpected: false,
                dtsEmitExpected: getEmitDeclarations(compilerOptions) && !file.path.endsWith(".d.ts"),
                errorRefershExpected: true,
                beforeChangeFileStampsAndErrors: beforeChange,
                afterChangeFileStampsAndErrors: afterChange
            }));
            filesNotTouched.forEach(file => verifyOutputFileStampsAndErrors({
                file,
                jsEmitExpected: false,
                dtsEmitExpected: false,
                errorRefershExpected: false,
                beforeChangeFileStampsAndErrors: beforeChange,
                afterChangeFileStampsAndErrors: afterChange
            }));
        }

        function changeCompilerOptions(input: VerifyEmitAndErrorUpdates, additionalOptions: CompilerOptions): File {
            const configFile = input.configFile || config;
            const content = JSON.parse(configFile.content);
            content.compilerOptions = { ...content.compilerOptions, ...additionalOptions };
            return { path: configFile.path, content: JSON.stringify(content) };
        }

        interface VerifyEmitAndErrorUpdates {
            change: (host: WatchedSystem) => void;
            getInitialErrors: (watch: Watch) => readonly Diagnostic[] | readonly string[];
            getIncrementalErrors: (watch: Watch) => readonly Diagnostic[] | readonly string[];
            fileWithChange: File;
            filesWithNewEmit: readonly File[];
            filesWithOnlyErrorRefresh: readonly File[];
            filesNotTouched: readonly File[];
            configFile?: File;
        }
        function verifyEmitAndErrorUpdates(input: VerifyEmitAndErrorUpdates) {
            it("with default config", () => {
                verifyEmitAndErrorUpdatesWorker({
                    ...input,
                    configFile: input.configFile || config
                });
            });

            it("with default config and --declaration", () => {
                verifyEmitAndErrorUpdatesWorker({
                    ...input,
                    configFile: changeCompilerOptions(input, { declaration: true })
                });
            });

            it("config with --isolatedModules", () => {
                verifyEmitAndErrorUpdatesWorker({
                    ...input,
                    configFile: changeCompilerOptions(input, { isolatedModules: true })
                });
            });

            it("config with --isolatedModules and --declaration", () => {
                verifyEmitAndErrorUpdatesWorker({
                    ...input,
                    configFile: changeCompilerOptions(input, { isolatedModules: true, declaration: true })
                });
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

            function verifyDeepImportChange(bFile: File, cFile: File) {
                const filesWithNewEmit: File[] = [];
                const filesWithOnlyErrorRefresh = [aFile];
                addImportedModule(bFile);
                addImportedModule(cFile);
                verifyEmitAndErrorUpdates({
                    fileWithChange: cFile,
                    filesWithNewEmit,
                    filesWithOnlyErrorRefresh,
                    filesNotTouched: emptyArray,
                    change: host => host.writeFile(cFile.path, cFile.content.replace("d", "d2")),
                    getInitialErrors: () => emptyArray,
                    getIncrementalErrors: watch => [
                        getDiagnosticOfFileFromProgram(watch(), aFile.path, aFile.content.lastIndexOf("d"), 1, Diagnostics.Property_0_does_not_exist_on_type_1, "d", "C")
                    ]
                });

                function addImportedModule(file: File) {
                    if (file.path.endsWith(".d.ts")) {
                        filesWithOnlyErrorRefresh.push(file);
                    }
                    else {
                        filesWithNewEmit.push(file);
                    }
                }
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
                verifyDeepImportChange(bFile, cFile);
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
                verifyDeepImportChange(bFile, cFile);
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
                fileWithChange: aFile,
                filesWithNewEmit: [aFile, bFile],
                filesWithOnlyErrorRefresh: [cFile, dFile],
                filesNotTouched: [eFile],
                change: host => host.writeFile(aFile.path, aFile.content.replace("x2", "x")),
                getInitialErrors: watch => [
                    getDiagnosticOfFileFromProgram(watch(), cFile.path, cFile.content.indexOf("x: 1"), 4, chainDiagnosticMessages(
                        chainDiagnosticMessages(/*details*/ undefined, Diagnostics.Object_literal_may_only_specify_known_properties_and_0_does_not_exist_in_type_1, "x", "Coords"),
                        Diagnostics.Type_0_is_not_assignable_to_type_1,
                        "{ x: number; y: number; }",
                        "Coords"
                    )),
                    getDiagnosticOfFileFromProgram(watch(), dFile.path, dFile.content.lastIndexOf("x"), 1, Diagnostics.Property_0_does_not_exist_on_type_1, "x", "Coords")
                ],
                getIncrementalErrors: () => emptyArray
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

            function verifyTransitiveExports(lib2Data: File, lib2Data2?: File) {
                const filesWithNewEmit = [lib1ToolsInterface, lib1ToolsPublic];
                const filesWithOnlyErrorRefresh = [app, lib2Public, lib1Public, lib2Data];
                if (lib2Data2) {
                    filesWithOnlyErrorRefresh.push(lib2Data2);
                }
                verifyEmitAndErrorUpdates({
                    fileWithChange: lib1ToolsInterface,
                    filesWithNewEmit,
                    filesWithOnlyErrorRefresh,
                    filesNotTouched: emptyArray,
                    configFile: config,
                    change: host => host.writeFile(lib1ToolsInterface.path, lib1ToolsInterface.content.replace("title", "title2")),
                    getInitialErrors: () => emptyArray,
                    getIncrementalErrors: () => [
                        "lib2/data.ts(5,13): error TS2322: Type '{ title: string; }' is not assignable to type 'ITest'.\n  Object literal may only specify known properties, but 'title' does not exist in type 'ITest'. Did you mean to write 'title2'?\n"
                    ]
                });
            }
            describe("when there are no circular import and exports", () => {
                verifyTransitiveExports(lib2Data);
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
                verifyTransitiveExports(lib2Data, lib2Data2);
            });
        });
    });
}

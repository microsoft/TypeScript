import * as Harness from "../../_namespaces/Harness";
import * as ts from "../../_namespaces/ts";
import {
    jsonToReadableText,
} from "../helpers";
import {
    CommandLineProgram,
} from "../helpers/baseline";
import {
    libContent,
} from "../helpers/contents";
import {
    applyEdit,
    createBaseline,
    verifyTscWatch,
    watchBaseline,
} from "../helpers/tscWatch";
import {
    createWatchedSystem,
    File,
    libFile,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsc-watch:: emit file --incremental", () => {
    const project = "/users/username/projects/project";

    const configFile: File = {
        path: `${project}/tsconfig.json`,
        content: jsonToReadableText({ compilerOptions: { incremental: true } }),
    };

    interface VerifyIncrementalWatchEmitInput {
        subScenario: string;
        files: () => readonly File[];
        optionsToExtend?: readonly string[];
        modifyFs?: (host: TestServerHost) => void;
    }
    function verifyIncrementalWatchEmit(input: VerifyIncrementalWatchEmitInput) {
        describe(input.subScenario, () => {
            it("with tsc --w", () => {
                verifyIncrementalWatchEmitWorker(input, /*incremental*/ false);
            });
            it("with tsc", () => {
                verifyIncrementalWatchEmitWorker(input, /*incremental*/ true);
            });
        });
    }

    function verifyIncrementalWatchEmitWorker(
        { subScenario, files, optionsToExtend, modifyFs }: VerifyIncrementalWatchEmitInput,
        incremental: boolean,
    ) {
        const { sys, baseline, cb, getPrograms } = createBaseline(createWatchedSystem(files(), { currentDirectory: project }));
        if (incremental) sys.exit = exitCode => sys.exitCode = exitCode;
        const argsToPass = [incremental ? "-i" : "-w", ...(optionsToExtend || ts.emptyArray)];
        baseline.push(`${sys.getExecutingFilePath()} ${argsToPass.join(" ")}`);
        let oldPrograms: readonly CommandLineProgram[] = ts.emptyArray;
        build();

        if (modifyFs) {
            applyEdit(sys, baseline, modifyFs);
            build();
        }

        Harness.Baseline.runBaseline(`${ts.isBuild(argsToPass) ? "tsbuild/watchMode" : "tscWatch"}/incremental/${subScenario.split(" ").join("-")}-${incremental ? "incremental" : "watch"}.js`, baseline.join("\r\n"));

        function build() {
            const closer = ts.executeCommandLine(
                sys,
                cb,
                argsToPass,
            );
            oldPrograms = watchBaseline({
                baseline,
                getPrograms,
                oldPrograms,
                sys,
            });
            if (closer) closer.close();
        }
    }

    describe("non module compilation", () => {
        const file1: File = {
            path: `${project}/file1.ts`,
            content: "const x = 10;",
        };
        const file2: File = {
            path: `${project}/file2.ts`,
            content: "const y = 20;",
        };
        describe("own file emit without errors", () => {
            function verify(subScenario: string, optionsToExtend?: readonly string[]) {
                const modifiedFile2Content = file2.content.replace("y", "z").replace("20", "10");
                verifyIncrementalWatchEmit({
                    files: () => [libFile, file1, file2, configFile],
                    optionsToExtend,
                    subScenario: `own file emit without errors/${subScenario}`,
                    modifyFs: host => host.writeFile(file2.path, modifiedFile2Content),
                });
            }
            verify("without commandline options");
            verify("with commandline parameters that are not relative", ["-p", "tsconfig.json"]);
        });

        verifyIncrementalWatchEmit({
            files: () => [libFile, file1, configFile, {
                path: file2.path,
                content: `const y: string = 20;`,
            }],
            subScenario: "own file emit with errors",
            modifyFs: host => host.writeFile(file1.path, file1.content.replace("x", "z")),
        });

        verifyIncrementalWatchEmit({
            files: () => [libFile, file1, file2, {
                path: configFile.path,
                content: jsonToReadableText({ compilerOptions: { incremental: true, outFile: "out.js" } }),
            }],
            subScenario: "with --out",
        });
    });

    describe("module compilation", () => {
        const file1: File = {
            path: `${project}/file1.ts`,
            content: "export const x = 10;",
        };
        const file2: File = {
            path: `${project}/file2.ts`,
            content: "export const y = 20;",
        };
        const config: File = {
            path: configFile.path,
            content: jsonToReadableText({ compilerOptions: { incremental: true, module: "amd" } }),
        };

        verifyIncrementalWatchEmit({
            files: () => [libFile, file1, file2, config],
            subScenario: "module compilation/own file emit without errors",
            modifyFs: host => host.writeFile(file2.path, file2.content.replace("y", "z").replace("20", "10")),
        });

        describe("own file emit with errors", () => {
            const fileModified: File = {
                path: file2.path,
                content: `export const y: string = 20;`,
            };

            verifyIncrementalWatchEmit({
                files: () => [libFile, file1, fileModified, config],
                subScenario: "module compilation/own file emit with errors",
                modifyFs: host => host.writeFile(file1.path, file1.content.replace("x = 10", "z = 10")),
            });

            it("verify that state is read correctly", () => {
                const system = createWatchedSystem([libFile, file1, fileModified, config], { currentDirectory: project });
                const reportDiagnostic = ts.createDiagnosticReporter(system);
                const parsedConfig = ts.parseConfigFileWithSystem("tsconfig.json", {}, /*extendedConfigCache*/ undefined, /*watchOptionsToExtend*/ undefined, system, reportDiagnostic)!;
                ts.performIncrementalCompilation({
                    rootNames: parsedConfig.fileNames,
                    options: parsedConfig.options,
                    projectReferences: parsedConfig.projectReferences,
                    configFileParsingDiagnostics: ts.getConfigFileParsingDiagnostics(parsedConfig),
                    reportDiagnostic,
                    system,
                });

                const command = ts.parseConfigFileWithSystem("tsconfig.json", {}, /*extendedConfigCache*/ undefined, /*watchOptionsToExtend*/ undefined, system, ts.noop)!;
                const builderProgram = ts.createIncrementalProgram({
                    rootNames: command.fileNames,
                    options: command.options,
                    projectReferences: command.projectReferences,
                    configFileParsingDiagnostics: ts.getConfigFileParsingDiagnostics(command),
                    host: ts.createIncrementalCompilerHost(command.options, system),
                });

                const state = builderProgram.getState();
                assert.equal(state.changedFilesSet!.size, 0, "changes");

                assert.equal(state.fileInfos.size, 3, "FileInfo size");
                assert.deepEqual(state.fileInfos.get(libFile.path as ts.Path), {
                    version: system.createHash(libFile.content),
                    signature: system.createHash(libFile.content),
                    affectsGlobalScope: true,
                    impliedFormat: undefined,
                });
                assert.deepEqual(state.fileInfos.get(file1.path as ts.Path), {
                    version: system.createHash(file1.content),
                    signature: system.createHash(file1.content),
                    affectsGlobalScope: undefined,
                    impliedFormat: undefined,
                });
                assert.deepEqual(state.fileInfos.get(file2.path as ts.Path), {
                    version: system.createHash(fileModified.content),
                    signature: system.createHash(fileModified.content),
                    affectsGlobalScope: undefined,
                    impliedFormat: undefined,
                });

                assert.deepEqual(state.compilerOptions, {
                    incremental: true,
                    module: ts.ModuleKind.AMD,
                    configFilePath: config.path,
                });

                assert.equal(ts.arrayFrom(state.referencedMap!.keys()).length, 0);
                assert.equal(ts.arrayFrom(state.exportedModulesMap!.keys()).length, 0);

                assert.equal(state.semanticDiagnosticsPerFile!.size, 3);
                assert.deepEqual(state.semanticDiagnosticsPerFile!.get(libFile.path as ts.Path), ts.emptyArray);
                assert.deepEqual(state.semanticDiagnosticsPerFile!.get(file1.path as ts.Path), ts.emptyArray);
                assert.deepEqual(state.semanticDiagnosticsPerFile!.get(file2.path as ts.Path), [{
                    file: state.program!.getSourceFileByPath(file2.path as ts.Path)!,
                    start: 13,
                    length: 1,
                    code: ts.Diagnostics.Type_0_is_not_assignable_to_type_1.code,
                    category: ts.Diagnostics.Type_0_is_not_assignable_to_type_1.category,
                    messageText: "Type 'number' is not assignable to type 'string'.",
                    relatedInformation: undefined,
                    reportsUnnecessary: undefined,
                    reportsDeprecated: undefined,
                    source: undefined,
                    skippedOn: undefined,
                }]);
            });
        });

        verifyIncrementalWatchEmit({
            files: () => [libFile, file1, file2, {
                path: configFile.path,
                content: jsonToReadableText({ compilerOptions: { incremental: true, module: "amd", outFile: "out.js" } }),
            }],
            subScenario: "module compilation/with --out",
        });
    });

    verifyIncrementalWatchEmit({
        files: () => {
            const config: File = {
                path: configFile.path,
                content: jsonToReadableText({
                    compilerOptions: {
                        incremental: true,
                        target: "es5",
                        module: "commonjs",
                        declaration: true,
                        emitDeclarationOnly: true,
                    },
                }),
            };
            const aTs: File = {
                path: `${project}/a.ts`,
                content: `import { B } from "./b";
export interface A {
    b: B;
}
`,
            };
            const bTs: File = {
                path: `${project}/b.ts`,
                content: `import { C } from "./c";
export interface B {
    b: C;
}
`,
            };
            const cTs: File = {
                path: `${project}/c.ts`,
                content: `import { A } from "./a";
export interface C {
    a: A;
}
`,
            };
            const indexTs: File = {
                path: `${project}/index.ts`,
                content: `export { A } from "./a";
export { B } from "./b";
export { C } from "./c";
`,
            };
            return [libFile, aTs, bTs, cTs, indexTs, config];
        },
        subScenario: "incremental with circular references",
        modifyFs: host =>
            host.writeFile(
                `${project}/a.ts`,
                `import { B } from "./b";
export interface A {
    b: B;
    foo: any;
}
`,
            ),
    });

    verifyIncrementalWatchEmit({
        subScenario: "when file with ambient global declaration file is deleted",
        files: () => [
            { path: libFile.path, content: libContent },
            { path: `${project}/globals.d.ts`, content: `declare namespace Config { const value: string;} ` },
            { path: `${project}/index.ts`, content: `console.log(Config.value);` },
            { path: configFile.path, content: jsonToReadableText({ compilerOptions: { incremental: true } }) },
        ],
        modifyFs: host => host.deleteFile(`${project}/globals.d.ts`),
    });

    describe("with option jsxImportSource", () => {
        const jsxImportSourceOptions = { module: "commonjs", jsx: "react-jsx", incremental: true, jsxImportSource: "react" };
        const jsxLibraryContent = `export namespace JSX {
    interface Element {}
    interface IntrinsicElements {
        div: {
            propA?: boolean;
        };
    }
}
export function jsx(...args: any[]): void;
export function jsxs(...args: any[]): void;
export const Fragment: unique symbol;
`;

        verifyIncrementalWatchEmit({
            subScenario: "jsxImportSource option changed",
            files: () => [
                { path: libFile.path, content: libContent },
                { path: `${project}/node_modules/react/jsx-runtime/index.d.ts`, content: jsxLibraryContent },
                { path: `${project}/node_modules/react/package.json`, content: jsonToReadableText({ name: "react", version: "0.0.1" }) },
                { path: `${project}/node_modules/preact/jsx-runtime/index.d.ts`, content: jsxLibraryContent.replace("propA", "propB") },
                { path: `${project}/node_modules/preact/package.json`, content: jsonToReadableText({ name: "preact", version: "0.0.1" }) },
                { path: `${project}/index.tsx`, content: `export const App = () => <div propA={true}></div>;` },
                { path: configFile.path, content: jsonToReadableText({ compilerOptions: jsxImportSourceOptions }) },
            ],
            modifyFs: host => host.writeFile(configFile.path, jsonToReadableText({ compilerOptions: { ...jsxImportSourceOptions, jsxImportSource: "preact" } })),
            optionsToExtend: ["--explainFiles"],
        });

        verifyIncrementalWatchEmit({
            subScenario: "jsxImportSource backing types added",
            files: () => [
                { path: libFile.path, content: libContent },
                { path: `${project}/index.tsx`, content: `export const App = () => <div propA={true}></div>;` },
                { path: configFile.path, content: jsonToReadableText({ compilerOptions: jsxImportSourceOptions }) },
            ],
            modifyFs: host => {
                host.createDirectory(`${project}/node_modules`);
                host.createDirectory(`${project}/node_modules/react`);
                host.createDirectory(`${project}/node_modules/react/jsx-runtime`);
                host.writeFile(`${project}/node_modules/react/jsx-runtime/index.d.ts`, jsxLibraryContent);
                host.writeFile(`${project}/node_modules/react/package.json`, jsonToReadableText({ name: "react", version: "0.0.1" }));
            },
        });

        verifyIncrementalWatchEmit({
            subScenario: "jsxImportSource backing types removed",
            files: () => [
                { path: libFile.path, content: libContent },
                { path: `${project}/node_modules/react/jsx-runtime/index.d.ts`, content: jsxLibraryContent },
                { path: `${project}/node_modules/react/package.json`, content: jsonToReadableText({ name: "react", version: "0.0.1" }) },
                { path: `${project}/index.tsx`, content: `export const App = () => <div propA={true}></div>;` },
                { path: configFile.path, content: jsonToReadableText({ compilerOptions: jsxImportSourceOptions }) },
            ],
            modifyFs: host => {
                host.deleteFile(`${project}/node_modules/react/jsx-runtime/index.d.ts`);
                host.deleteFile(`${project}/node_modules/react/package.json`);
            },
        });

        verifyIncrementalWatchEmit({
            subScenario: "importHelpers backing types removed",
            files: () => [
                { path: libFile.path, content: libContent },
                { path: `${project}/node_modules/tslib/index.d.ts`, content: "export function __assign(...args: any[]): any;" },
                { path: `${project}/node_modules/tslib/package.json`, content: jsonToReadableText({ name: "tslib", version: "0.0.1" }) },
                { path: `${project}/index.tsx`, content: `export const x = {...{}};` },
                { path: configFile.path, content: jsonToReadableText({ compilerOptions: { importHelpers: true } }) },
            ],
            modifyFs: host => {
                host.deleteFile(`${project}/node_modules/tslib/index.d.ts`);
                host.deleteFile(`${project}/node_modules/tslib/package.json`);
            },
        });
    });

    describe("editing module augmentation", () => {
        verifyIncrementalWatchEmit({
            subScenario: "editing module augmentation",
            files: () => [
                { path: libFile.path, content: libContent },
                { path: `${project}/node_modules/classnames/index.d.ts`, content: `export interface Result {} export default function classNames(): Result;` },
                { path: `${project}/src/types/classnames.d.ts`, content: `export {}; declare module "classnames" { interface Result { foo } }` },
                { path: `${project}/src/index.ts`, content: `import classNames from "classnames"; classNames().foo;` },
                { path: configFile.path, content: jsonToReadableText({ compilerOptions: { module: "commonjs", incremental: true } }) },
            ],
            modifyFs: host => {
                // delete 'foo'
                host.writeFile(`${project}/src/types/classnames.d.ts`, `export {}; declare module "classnames" { interface Result {} }`);
            },
        });
    });

    verifyTscWatch({
        scenario: "incremental",
        subScenario: "tsbuildinfo has error",
        sys: () =>
            createWatchedSystem({
                "/src/project/main.ts": "export const x = 10;",
                "/src/project/tsconfig.json": "{}",
                "/src/project/tsconfig.tsbuildinfo": "Some random string",
                [libFile.path]: libFile.content,
            }),
        commandLineArgs: ["--p", "src/project", "-i", "-w"],
    });
});

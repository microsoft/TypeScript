import * as ts from "../../_namespaces/ts";
import * as Utils from "../../_namespaces/Utils";
import * as vfs from "../../_namespaces/vfs";
import {
    appendText,
    compilerOptionsToConfigJson,
    libContent,
    loadProjectFromDisk,
    loadProjectFromFiles,
    noChangeOnlyRuns,
    noChangeRun,
    noChangeWithExportsDiscrepancyRun,
    prependText,
    replaceText,
    TestTscEdit,
    verifyTsc,
    verifyTscWithEdits,
} from "./helpers";

describe("unittests:: tsc:: incremental::", () => {
    verifyTscWithEdits({
        scenario: "incremental",
        subScenario: "when passing filename for buildinfo on commandline",
        fs: () => loadProjectFromFiles({
            "/src/project/src/main.ts": "export const x = 10;",
            "/src/project/tsconfig.json": Utils.dedent`
                    {
                        "compilerOptions": {
                            "target": "es5",
                            "module": "commonjs",
                        },
                        "include": [
                            "src/**/*.ts"
                        ]
                    }`,
        }),
        commandLineArgs: ["--incremental", "--p", "src/project", "--tsBuildInfoFile", "src/project/.tsbuildinfo", "--explainFiles"],
        edits: noChangeOnlyRuns
    });

    verifyTscWithEdits({
        scenario: "incremental",
        subScenario: "when passing rootDir from commandline",
        fs: () => loadProjectFromFiles({
            "/src/project/src/main.ts": "export const x = 10;",
            "/src/project/tsconfig.json": Utils.dedent`
                    {
                        "compilerOptions": {
                            "incremental": true,
                            "outDir": "dist",
                        },
                    }`,
        }),
        commandLineArgs: ["--p", "src/project", "--rootDir", "src/project/src"],
        edits: noChangeOnlyRuns
    });

    verifyTscWithEdits({
        scenario: "incremental",
        subScenario: "with only dts files",
        fs: () => loadProjectFromFiles({
            "/src/project/src/main.d.ts": "export const x = 10;",
            "/src/project/src/another.d.ts": "export const y = 10;",
            "/src/project/tsconfig.json": "{}",
        }),
        commandLineArgs: ["--incremental", "--p", "src/project"],
        edits: [
            noChangeRun,
            {
                subScenario: "incremental-declaration-doesnt-change",
                modifyFs: fs => appendText(fs, "/src/project/src/main.d.ts", "export const xy = 100;")
            }
        ]
    });

    verifyTscWithEdits({
        scenario: "incremental",
        subScenario: "when passing rootDir is in the tsconfig",
        fs: () => loadProjectFromFiles({
            "/src/project/src/main.ts": "export const x = 10;",
            "/src/project/tsconfig.json": Utils.dedent`
                    {
                        "compilerOptions": {
                            "incremental": true,
                            "outDir": "./built",
                            "rootDir": "./"
                        },
                    }`,
        }),
        commandLineArgs: ["--p", "src/project"],
        edits: noChangeOnlyRuns
    });

    verifyTscWithEdits({
        scenario: "incremental",
        subScenario: "tsbuildinfo has error",
        fs: () => loadProjectFromFiles({
            "/src/project/main.ts": "export const x = 10;",
            "/src/project/tsconfig.json": "{}",
            "/src/project/tsconfig.tsbuildinfo": "Some random string",
        }),
        commandLineArgs: ["--p", "src/project", "-i"],
        edits: [{
            subScenario: "tsbuildinfo written has error",
            modifyFs: fs => prependText(fs, "/src/project/tsconfig.tsbuildinfo", "Some random string"),
        }]
    });

    describe("with noEmitOnError", () => {
        let projFs: vfs.FileSystem;
        before(() => {
            projFs = loadProjectFromDisk("tests/projects/noEmitOnError");
        });
        after(() => {
            projFs = undefined!;
        });

        function verifyNoEmitOnError(subScenario: string, fixModifyFs: TestTscEdit["modifyFs"], modifyFs?: TestTscEdit["modifyFs"]) {
            verifyTscWithEdits({
                scenario: "incremental",
                subScenario,
                fs: () => projFs,
                commandLineArgs: ["--incremental", "-p", "src"],
                modifyFs,
                edits: [
                    noChangeWithExportsDiscrepancyRun,
                    {
                        subScenario: "incremental-declaration-doesnt-change",
                        modifyFs: fixModifyFs
                    },
                    noChangeRun,
                ],
                baselinePrograms: true
            });
        }
        verifyNoEmitOnError(
            "with noEmitOnError syntax errors",
            fs => fs.writeFileSync("/src/src/main.ts", `import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
};`, "utf-8")
        );

        verifyNoEmitOnError(
            "with noEmitOnError semantic errors",
            fs => fs.writeFileSync("/src/src/main.ts", `import { A } from "../shared/types/db";
const a: string = "hello";`, "utf-8"),
            fs => fs.writeFileSync("/src/src/main.ts", `import { A } from "../shared/types/db";
const a: string = 10;`, "utf-8"),
        );
    });

    describe("when noEmit changes between compilation", () => {
        verifyNoEmitChanges({ incremental: true });
        verifyNoEmitChanges({ incremental: true, declaration: true });
        verifyNoEmitChanges({ composite: true });

        function verifyNoEmitChanges(compilerOptions: ts.CompilerOptions) {
            const discrepancyExplanation = () => [
                ...noChangeWithExportsDiscrepancyRun.discrepancyExplanation!(),
                "Clean build will not have latestChangedDtsFile as there was no emit and emitSignatures as undefined for files",
                "Incremental will store the past latestChangedDtsFile and emitSignatures",
            ];
            const discrepancyIfNoDtsEmit = ts.getEmitDeclarations(compilerOptions) ?
                undefined :
                noChangeWithExportsDiscrepancyRun.discrepancyExplanation;
            const noChangeRunWithNoEmit: TestTscEdit = {
                ...noChangeRun,
                subScenario: "No Change run with noEmit",
                commandLineArgs: ["--p", "src/project", "--noEmit"],
                discrepancyExplanation: compilerOptions.composite ?
                    discrepancyExplanation :
                    !compilerOptions.declaration ?
                        noChangeWithExportsDiscrepancyRun.discrepancyExplanation :
                        undefined,
            };
            const noChangeRunWithEmit: TestTscEdit = {
                ...noChangeRun,
                subScenario: "No Change run with emit",
                commandLineArgs: ["--p", "src/project"],
                discrepancyExplanation: discrepancyIfNoDtsEmit,
            };
            let optionsString = "";
            for (const key in compilerOptions) {
                if (ts.hasProperty(compilerOptions, key)) {
                    optionsString += ` ${key}`;
                }
            }

            verifyTscWithEdits({
                scenario: "incremental",
                subScenario: `noEmit changes${optionsString}`,
                commandLineArgs: ["--p", "src/project"],
                fs,
                edits: [
                    noChangeRunWithNoEmit,
                    noChangeRunWithNoEmit,
                    {
                        subScenario: "Introduce error but still noEmit",
                        commandLineArgs: ["--p", "src/project", "--noEmit"],
                        modifyFs: fs => replaceText(fs, "/src/project/src/class.ts", "prop", "prop1"),
                        discrepancyExplanation: compilerOptions.composite ?
                            discrepancyExplanation :
                            compilerOptions.declaration ?
                                noChangeWithExportsDiscrepancyRun.discrepancyExplanation :
                                undefined,
                    },
                    {
                        subScenario: "Fix error and emit",
                        modifyFs: fs => replaceText(fs, "/src/project/src/class.ts", "prop1", "prop"),
                        discrepancyExplanation: discrepancyIfNoDtsEmit,
                    },
                    noChangeRunWithEmit,
                    noChangeRunWithNoEmit,
                    noChangeRunWithNoEmit,
                    noChangeRunWithEmit,
                    {
                        subScenario: "Introduce error and emit",
                        modifyFs: fs => replaceText(fs, "/src/project/src/class.ts", "prop", "prop1"),
                        discrepancyExplanation: discrepancyIfNoDtsEmit,
                    },
                    noChangeRunWithEmit,
                    noChangeRunWithNoEmit,
                    noChangeRunWithNoEmit,
                    noChangeRunWithEmit,
                    {
                        subScenario: "Fix error and no emit",
                        commandLineArgs: ["--p", "src/project", "--noEmit"],
                        modifyFs: fs => replaceText(fs, "/src/project/src/class.ts", "prop1", "prop"),
                        discrepancyExplanation: compilerOptions.composite ?
                            discrepancyExplanation :
                            noChangeWithExportsDiscrepancyRun.discrepancyExplanation,
                    },
                    noChangeRunWithEmit,
                    noChangeRunWithNoEmit,
                    noChangeRunWithNoEmit,
                    noChangeRunWithEmit,
                ],
            });

            verifyTscWithEdits({
                scenario: "incremental",
                subScenario: `noEmit changes with initial noEmit${optionsString}`,
                commandLineArgs: ["--p", "src/project", "--noEmit"],
                fs,
                edits: [
                    noChangeRunWithEmit,
                    {
                        subScenario: "Introduce error with emit",
                        commandLineArgs: ["--p", "src/project"],
                        modifyFs: fs => replaceText(fs, "/src/project/src/class.ts", "prop", "prop1"),
                    },
                    {
                        subScenario: "Fix error and no emit",
                        modifyFs: fs => replaceText(fs, "/src/project/src/class.ts", "prop1", "prop"),
                        discrepancyExplanation: compilerOptions.composite ?
                            discrepancyExplanation :
                            noChangeWithExportsDiscrepancyRun.discrepancyExplanation,
                    },
                    noChangeRunWithEmit,
                ],
            });

            function fs() {
                return loadProjectFromFiles({
                    "/src/project/src/class.ts": Utils.dedent`
                            export class classC {
                                prop = 1;
                            }`,
                    "/src/project/src/indirectClass.ts": Utils.dedent`
                            import { classC } from './class';
                            export class indirectClass {
                                classC = new classC();
                            }`,
                    "/src/project/src/directUse.ts": Utils.dedent`
                            import { indirectClass } from './indirectClass';
                            new indirectClass().classC.prop;`,
                    "/src/project/src/indirectUse.ts": Utils.dedent`
                            import { indirectClass } from './indirectClass';
                            new indirectClass().classC.prop;`,
                    "/src/project/src/noChangeFile.ts": Utils.dedent`
                            export function writeLog(s: string) {
                            }`,
                    "/src/project/src/noChangeFileWithEmitSpecificError.ts": Utils.dedent`
                            function someFunc(arguments: boolean, ...rest: any[]) {
                            }`,
                    "/src/project/tsconfig.json": JSON.stringify({ compilerOptions }),
                });
            }
        }
    });

    verifyTscWithEdits({
        scenario: "incremental",
        subScenario: `when global file is added, the signatures are updated`,
        fs: () => loadProjectFromFiles({
            "/src/project/src/main.ts": Utils.dedent`
                    /// <reference path="./filePresent.ts"/>
                    /// <reference path="./fileNotFound.ts"/>
                    function main() { }
                `,
            "/src/project/src/anotherFileWithSameReferenes.ts": Utils.dedent`
                    /// <reference path="./filePresent.ts"/>
                    /// <reference path="./fileNotFound.ts"/>
                    function anotherFileWithSameReferenes() { }
                `,
            "/src/project/src/filePresent.ts": `function something() { return 10; }`,
            "/src/project/tsconfig.json": JSON.stringify({
                compilerOptions: { composite: true, },
                include: ["src/**/*.ts"]
            }),
        }),
        commandLineArgs: ["--p", "src/project"],
        edits: [
            noChangeRun,
            {
                subScenario: "Modify main file",
                modifyFs: fs => appendText(fs, `/src/project/src/main.ts`, `something();`),
            },
            {
                subScenario: "Modify main file again",
                modifyFs: fs => appendText(fs, `/src/project/src/main.ts`, `something();`),
            },
            {
                subScenario: "Add new file and update main file",
                modifyFs: fs => {
                    fs.writeFileSync(`/src/project/src/newFile.ts`, "function foo() { return 20; }");
                    prependText(fs, `/src/project/src/main.ts`, `/// <reference path="./newFile.ts"/>
`);
                    appendText(fs, `/src/project/src/main.ts`, `foo();`);
                },
            },
            {
                subScenario: "Write file that could not be resolved",
                modifyFs: fs => fs.writeFileSync(`/src/project/src/fileNotFound.ts`, "function something2() { return 20; }"),
            },
            {
                subScenario: "Modify main file",
                modifyFs: fs => appendText(fs, `/src/project/src/main.ts`, `something();`),
            },
        ],
        baselinePrograms: true,
    });

    describe("when synthesized imports are added to files", () => {
        function getJsxLibraryContent() {
            return `
export {};
declare global {
    namespace JSX {
        interface Element {}
        interface IntrinsicElements {
            div: {
                propA?: boolean;
            };
        }
    }
}`;
        }

        verifyTsc({
            scenario: "react-jsx-emit-mode",
            subScenario: "with no backing types found doesn't crash",
            fs: () => loadProjectFromFiles({
                "/src/project/node_modules/react/jsx-runtime.js": "export {}", // js needs to be present so there's a resolution result
                "/src/project/node_modules/@types/react/index.d.ts": getJsxLibraryContent(), // doesn't contain a jsx-runtime definition
                "/src/project/src/index.tsx": `export const App = () => <div propA={true}></div>;`,
                "/src/project/tsconfig.json": JSON.stringify({ compilerOptions: { module: "commonjs", jsx: "react-jsx", incremental: true, jsxImportSource: "react" } })
            }),
            commandLineArgs: ["--p", "src/project"]
        });

        verifyTsc({
            scenario: "react-jsx-emit-mode",
            subScenario: "with no backing types found doesn't crash under --strict",
            fs: () => loadProjectFromFiles({
                "/src/project/node_modules/react/jsx-runtime.js": "export {}", // js needs to be present so there's a resolution result
                "/src/project/node_modules/@types/react/index.d.ts": getJsxLibraryContent(), // doesn't contain a jsx-runtime definition
                "/src/project/src/index.tsx": `export const App = () => <div propA={true}></div>;`,
                "/src/project/tsconfig.json": JSON.stringify({ compilerOptions: { module: "commonjs", jsx: "react-jsx", incremental: true, jsxImportSource: "react" } })
            }),
            commandLineArgs: ["--p", "src/project", "--strict"]
        });
    });

    verifyTscWithEdits({
        scenario: "incremental",
        subScenario: "when new file is added to the referenced project",
        commandLineArgs: ["-i", "-p", `src/projects/project2`],
        fs: () => loadProjectFromFiles({
            "/src/projects/project1/tsconfig.json": JSON.stringify({
                compilerOptions: {
                    module: "none",
                    composite: true
                },
                exclude: ["temp"]
            }),
            "/src/projects/project1/class1.ts": `class class1 {}`,
            "/src/projects/project1/class1.d.ts": `declare class class1 {}`,
            "/src/projects/project2/tsconfig.json": JSON.stringify({
                compilerOptions: {
                    module: "none",
                    composite: true
                },
                references: [
                    { path: "../project1" }
                ]
            }),
            "/src/projects/project2/class2.ts": `class class2 {}`,
        }),
        edits: [
            {
                subScenario: "Add class3 to project1 and build it",
                modifyFs: fs => fs.writeFileSync("/src/projects/project1/class3.ts", `class class3 {}`, "utf-8"),
                discrepancyExplanation: () => [
                    "Ts buildinfo will not be updated in incremental build so it will have semantic diagnostics cached from previous build",
                    "But in clean build because of global diagnostics, semantic diagnostics are not queried so not cached in tsbuildinfo",
                ],
            },
            {
                subScenario: "Add output of class3",
                modifyFs: fs => fs.writeFileSync("/src/projects/project1/class3.d.ts", `declare class class3 {}`, "utf-8"),
            },
            {
                subScenario: "Add excluded file to project1",
                modifyFs: fs => {
                    fs.mkdirSync("/src/projects/project1/temp");
                    fs.writeFileSync("/src/projects/project1/temp/file.d.ts", `declare class file {}`, "utf-8");
                },
            },
            {
                subScenario: "Delete output for class3",
                modifyFs: fs => fs.unlinkSync("/src/projects/project1/class3.d.ts"),
                discrepancyExplanation: () => [
                    "Ts buildinfo will be updated but will retain lib file errors from previous build and not others because they are emitted because of change which results in clearing their semantic diagnostics cache",
                    "But in clean build because of global diagnostics, semantic diagnostics are not queried so not cached in tsbuildinfo",
                ],
            },
            {
                subScenario: "Create output for class3",
                modifyFs: fs => fs.writeFileSync("/src/projects/project1/class3.d.ts", `declare class class3 {}`, "utf-8"),
            },
        ]
    });

    verifyTscWithEdits({
        scenario: "incremental",
        subScenario: "when project has strict true",
        commandLineArgs: ["-noEmit", "-p", `src/project`],
        fs: () => loadProjectFromFiles({
            "/src/project/tsconfig.json": JSON.stringify({
                compilerOptions: {
                    incremental: true,
                    strict: true,
                },
            }),
            "/src/project/class1.ts": `export class class1 {}`,
        }),
        edits: noChangeOnlyRuns,
        baselinePrograms: true
    });

    verifyTscWithEdits({
        scenario: "incremental",
        subScenario: "serializing error chains",
        commandLineArgs: ["-p", `src/project`],
        fs: () => loadProjectFromFiles({
            "/src/project/tsconfig.json": JSON.stringify({
                compilerOptions: {
                    incremental: true,
                    strict: true,
                    jsx: "react",
                    module: "esnext",
                },
            }),
            "/src/project/index.tsx": Utils.dedent`
                    declare namespace JSX {
                        interface ElementChildrenAttribute { children: {}; }
                        interface IntrinsicElements { div: {} }
                    }

                    declare var React: any;

                    declare function Component(props: never): any;
                    declare function Component(props: { children?: number }): any;
                    (<Component>
                        <div />
                        <div />
                    </Component>)`
        }, `\ninterface ReadonlyArray<T> { readonly length: number }`),
        edits: noChangeOnlyRuns,
    });

    verifyTsc({
        scenario: "incremental",
        subScenario: "ts file with no-default-lib that augments the global scope",
        fs: () => loadProjectFromFiles({
            "/src/project/src/main.ts": Utils.dedent`
                    /// <reference no-default-lib="true"/>
                    /// <reference lib="esnext" />

                    declare global {
                        interface Test {
                        }
                    }

                    export {};
                `,
            "/src/project/tsconfig.json": Utils.dedent`
                    {
                        "compilerOptions": {
                            "target": "ESNext",
                            "module": "ESNext",
                            "incremental": true,
                            "outDir": "dist",
                        },
                    }`,
        }),
        commandLineArgs: ["--p", "src/project", "--rootDir", "src/project/src"],
        modifyFs: (fs) => {
            fs.writeFileSync("/lib/lib.esnext.d.ts", libContent);
        }
    });

    verifyTscWithEdits({
        scenario: "incremental",
        subScenario: "change to type that gets used as global through export in another file",
        commandLineArgs: ["-p", `src/project`],
        fs: () => loadProjectFromFiles({
            "/src/project/tsconfig.json": JSON.stringify({ compilerOptions: { composite: true }, }),
            "/src/project/class1.ts": `const a: MagicNumber = 1;
console.log(a);`,
            "/src/project/constants.ts": "export default 1;",
            "/src/project/types.d.ts": `type MagicNumber = typeof import('./constants').default`,
        }),
        edits: [{
            subScenario: "Modify imports used in global file",
            modifyFs: fs => fs.writeFileSync("/src/project/constants.ts", "export default 2;"),
        }],
    });

    verifyTscWithEdits({
        scenario: "incremental",
        subScenario: "change to type that gets used as global through export in another file through indirect import",
        commandLineArgs: ["-p", `src/project`],
        fs: () => loadProjectFromFiles({
            "/src/project/tsconfig.json": JSON.stringify({ compilerOptions: { composite: true }, }),
            "/src/project/class1.ts": `const a: MagicNumber = 1;
console.log(a);`,
            "/src/project/constants.ts": "export default 1;",
            "/src/project/reexport.ts": `export { default as ConstantNumber } from "./constants"`,
            "/src/project/types.d.ts": `type MagicNumber = typeof import('./reexport').ConstantNumber`,
        }),
        edits: [{
            subScenario: "Modify imports used in global file",
            modifyFs: fs => fs.writeFileSync("/src/project/constants.ts", "export default 2;"),
        }],
    });

    function verifyModifierChange(declaration: boolean) {
        verifyTscWithEdits({
            scenario: "incremental",
            subScenario: `change to modifier of class expression field${declaration ? " with declaration emit enabled" : ""}`,
            commandLineArgs: ["-p", "src/project", "--incremental"],
            fs: () => loadProjectFromFiles({
                "/src/project/tsconfig.json": JSON.stringify({ compilerOptions: { declaration } }),
                "/src/project/main.ts": Utils.dedent`
                        import MessageablePerson from './MessageablePerson.js';
                        function logMessage( person: MessageablePerson ) {
                            console.log( person.message );
                        }`,
                "/src/project/MessageablePerson.ts": Utils.dedent`
                        const Messageable = () => {
                            return class MessageableClass {
                                public message = 'hello';
                            }
                        };
                        const wrapper = () => Messageable();
                        type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
                        export default MessageablePerson;`,
            }),
            modifyFs: fs => appendText(fs, "/lib/lib.d.ts", Utils.dedent`
                    type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
                    type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;`
            ),
            edits: [
                {
                    subScenario: "modify public to protected",
                    modifyFs: fs => replaceText(fs, "/src/project/MessageablePerson.ts", "public", "protected"),
                },
                {
                    subScenario: "modify protected to public",
                    modifyFs: fs => replaceText(fs, "/src/project/MessageablePerson.ts", "protected", "public"),
                },
            ],
        });
    }
    verifyModifierChange(/*declaration*/ false);
    verifyModifierChange(/*declaration*/ true);

    verifyTscWithEdits({
        scenario: "incremental",
        subScenario: `when declarationMap changes`,
        fs: () => loadProjectFromFiles({
            "/src/project/tsconfig.json": JSON.stringify({
                compilerOptions: {
                    noEmitOnError: true,
                    declaration: true,
                    composite: true,
                }
            }),
            "/src/project/a.ts": "const x = 10;",
            "/src/project/b.ts": "const y = 10;"
        }),
        commandLineArgs: ["--p", "/src/project"],
        edits: [
            {
                subScenario: "error and enable declarationMap",
                modifyFs: fs => replaceText(fs, "/src/project/a.ts", "x", "x: 20"),
                commandLineArgs: ["--p", "/src/project", "--declarationMap"],
                discrepancyExplanation: () => [
                    `Clean build does not emit any file so will have emitSignatures with all files since they are not emitted`,
                    `Incremental build has emitSignatures from before, so it will have a.ts with signature since file.version isnt same`,
                    `Incremental build will also have emitSignatureDtsMapDiffers for both files since the emitSignatures were without declarationMap but currentOptions have declrationMap`,
                ]
            },
            {
                subScenario: "fix error declarationMap",
                modifyFs: fs => replaceText(fs, "/src/project/a.ts", "x: 20", "x"),
                commandLineArgs: ["--p", "/src/project", "--declarationMap"],
            },
        ]
    });

    verifyTscWithEdits({
        scenario: "incremental",
        subScenario: `when declarationMap changes with outFile`,
        fs: () => loadProjectFromFiles({
            "/src/project/tsconfig.json": JSON.stringify({
                compilerOptions: {
                    noEmitOnError: true,
                    declaration: true,
                    composite: true,
                    outFile: "../outFile.js",
                }
            }),
            "/src/project/a.ts": "const x = 10;",
            "/src/project/b.ts": "const y = 10;"
        }),
        commandLineArgs: ["--p", "/src/project"],
        edits: [
            {
                subScenario: "error and enable declarationMap",
                modifyFs: fs => replaceText(fs, "/src/project/a.ts", "x", "x: 20"),
                commandLineArgs: ["--p", "/src/project", "--declarationMap"],
            },
            {
                subScenario: "fix error declarationMap",
                modifyFs: fs => replaceText(fs, "/src/project/a.ts", "x: 20", "x"),
                commandLineArgs: ["--p", "/src/project", "--declarationMap"],
            },
        ]
    });

    describe("different options::", () => {
        function withOptionChange(subScenario: string, ...options: readonly string[]): TestTscEdit {
            return {
                subScenario,
                modifyFs: ts.noop,
                commandLineArgs: ["--p", "/src/project", ...options],
            };
        }
        function noChangeWithSubscenario(subScenario: string): TestTscEdit {
            return { ...noChangeRun, subScenario };
        }
        function withOptionChangeAndDiscrepancyExplanation(subScenario: string, option: string): TestTscEdit {
            return {
                ...withOptionChange(subScenario, option),
                discrepancyExplanation: () => [
                    `Clean build tsbuildinfo will have compilerOptions with composite and ${option.replace(/\-/g, "")}`,
                    `Incremental build will detect that it doesnt need to rebuild so tsbuild info is from before which has option composite only`,
                ]
            };
        }
        function withEmitDeclarationOnlyChangeAndDiscrepancyExplanation(subScenario: string): TestTscEdit {
            const edit = withOptionChangeAndDiscrepancyExplanation(subScenario, "--emitDeclarationOnly");
            const discrepancyExplanation = edit.discrepancyExplanation!;
            edit.discrepancyExplanation = () => [
                ...discrepancyExplanation(),
                `Clean build info does not have js section because its fresh build`,
                `Incremental build info has js section from old build`
            ];
            return edit;
        }
        function withOptionChangeAndExportExplanation(subScenario: string, ...options: readonly string[]): TestTscEdit {
            return {
                ...withOptionChange(subScenario, ...options),
                discrepancyExplanation: noChangeWithExportsDiscrepancyRun.discrepancyExplanation,
            };
        }
        function nochangeWithIncrementalDeclarationFromBeforeExplaination(): TestTscEdit {
            return {
                ...noChangeRun,
                discrepancyExplanation: () => [
                    `Clean build tsbuildinfo will have compilerOptions {}`,
                    `Incremental build will detect that it doesnt need to rebuild so tsbuild info is from before which has option declaration and declarationMap`,
                ],
            };
        }
        function nochangeWithIncrementalOutDeclarationFromBeforeExplaination(): TestTscEdit {
            const edit = nochangeWithIncrementalDeclarationFromBeforeExplaination();
            const discrepancyExplanation = edit.discrepancyExplanation!;
            edit.discrepancyExplanation = () => [
                ...discrepancyExplanation(),
                `Clean build does not have dts bundle section`,
                `Incremental build contains the dts build section from before`,
            ];
            return edit;
        }
        function localChange(): TestTscEdit {
            return {
                subScenario: "local change",
                modifyFs: fs => replaceText(fs, "/src/project/a.ts", "Local = 1", "Local = 10"),
            };
        }
        function fs(options: ts.CompilerOptions) {
            return loadProjectFromFiles({
                "/src/project/tsconfig.json": JSON.stringify({ compilerOptions: compilerOptionsToConfigJson(options) }),
                "/src/project/a.ts": `export const a = 10;const aLocal = 10;`,
                "/src/project/b.ts": `export const b = 10;const bLocal = 10;`,
                "/src/project/c.ts": `import { a } from "./a";export const c = a;`,
                "/src/project/d.ts": `import { b } from "./b";export const d = b;`,
            });
        }
        function enableDeclarationMap(): TestTscEdit {
            return {
                subScenario: "declarationMap enabling",
                modifyFs: fs => {
                    const config = JSON.parse(fs.readFileSync("/src/project/tsconfig.json", "utf-8"));
                    config.compilerOptions.declarationMap = true;
                    fs.writeFileSync("/src/project/tsconfig.json", JSON.stringify(config));
                },
            };
        }
        verifyTscWithEdits({
            scenario: "incremental",
            subScenario: "different options",
            fs: () => fs({ composite: true }),
            commandLineArgs: ["--p", "/src/project"],
            edits: [
                withOptionChange("with sourceMap", "--sourceMap"),
                noChangeWithSubscenario("should re-emit only js so they dont contain sourcemap"),
                withOptionChangeAndDiscrepancyExplanation("with declaration should not emit anything", "--declaration"),
                noChangeRun,
                withOptionChange("with declaration and declarationMap", "--declaration", "--declarationMap"),
                noChangeWithSubscenario("should re-emit only dts so they dont contain sourcemap"),
                withOptionChangeAndDiscrepancyExplanation("with emitDeclarationOnly should not emit anything", "--emitDeclarationOnly"),
                noChangeRun,
                localChange(),
                withOptionChangeAndDiscrepancyExplanation("with declaration should not emit anything", "--declaration"),
                withOptionChange("with inlineSourceMap", "--inlineSourceMap"),
                withOptionChange("with sourceMap", "--sourceMap"),
                enableDeclarationMap(),
                withOptionChange("with sourceMap should not emit d.ts", "--sourceMap"),
            ],
            baselinePrograms: true,
        });
        verifyTscWithEdits({
            scenario: "incremental",
            subScenario: "different options with outFile",
            fs: () => fs({ composite: true, outFile: "../outFile.js", module: ts.ModuleKind.AMD }),
            commandLineArgs: ["--p", "/src/project"],
            edits: [
                withOptionChange("with sourceMap", "--sourceMap"),
                noChangeWithSubscenario("should re-emit only js so they dont contain sourcemap"),
                withOptionChangeAndDiscrepancyExplanation("with declaration should not emit anything", "--declaration"),
                noChangeRun,
                withOptionChange("with declaration and declarationMap", "--declaration", "--declarationMap"),
                noChangeWithSubscenario("should re-emit only dts so they dont contain sourcemap"),
                withEmitDeclarationOnlyChangeAndDiscrepancyExplanation("with emitDeclarationOnly should not emit anything"),
                noChangeRun,
                localChange(),
                withOptionChangeAndDiscrepancyExplanation("with declaration should not emit anything", "--declaration"),
                withOptionChange("with inlineSourceMap", "--inlineSourceMap"),
                withOptionChange("with sourceMap", "--sourceMap"),
                enableDeclarationMap(),
                withOptionChange("with sourceMap should not emit d.ts", "--sourceMap"),
            ],
            baselinePrograms: true,
        });
        verifyTscWithEdits({
            scenario: "incremental",
            subScenario: "different options with incremental",
            fs: () => fs({ incremental: true }),
            commandLineArgs: ["--p", "/src/project"],
            edits: [
                withOptionChangeAndExportExplanation("with sourceMap", "--sourceMap"),
                withOptionChangeAndExportExplanation("should re-emit only js so they dont contain sourcemap"),
                withOptionChange("with declaration, emit Dts and should not emit js", "--declaration"),
                withOptionChange("with declaration and declarationMap", "--declaration", "--declarationMap"),
                nochangeWithIncrementalDeclarationFromBeforeExplaination(),
                localChange(),
                withOptionChange("with declaration and declarationMap", "--declaration", "--declarationMap"),
                nochangeWithIncrementalDeclarationFromBeforeExplaination(),
                withOptionChange("with inlineSourceMap", "--inlineSourceMap"),
                withOptionChange("with sourceMap", "--sourceMap"),
                noChangeWithSubscenario("emit js files"),
                withOptionChange("with declaration and declarationMap", "--declaration", "--declarationMap"),
                withOptionChange("with declaration and declarationMap, should not re-emit", "--declaration", "--declarationMap"),
            ],
            baselinePrograms: true,
        });
        verifyTscWithEdits({
            scenario: "incremental",
            subScenario: "different options with incremental with outFile",
            fs: () => fs({ incremental: true, outFile: "../outFile.js", module: ts.ModuleKind.AMD }),
            commandLineArgs: ["--p", "/src/project"],
            edits: [
                withOptionChange("with sourceMap", "--sourceMap"),
                noChangeWithSubscenario("should re-emit only js so they dont contain sourcemap"),
                withOptionChange("with declaration, emit Dts and should not emit js", "--declaration"),
                withOptionChange("with declaration and declarationMap", "--declaration", "--declarationMap"),
                nochangeWithIncrementalOutDeclarationFromBeforeExplaination(),
                localChange(),
                withOptionChange("with declaration and declarationMap", "--declaration", "--declarationMap"),
                nochangeWithIncrementalOutDeclarationFromBeforeExplaination(),
                withOptionChange("with inlineSourceMap", "--inlineSourceMap"),
                withOptionChange("with sourceMap", "--sourceMap"),
                noChangeWithSubscenario("emit js files"),
                withOptionChange("with declaration and declarationMap", "--declaration", "--declarationMap"),
                withOptionChange("with declaration and declarationMap, should not re-emit", "--declaration", "--declarationMap"),
            ],
            baselinePrograms: true,
        });
    });

    verifyTscWithEdits({
        scenario: "incremental",
        subScenario: "when file is deleted",
        commandLineArgs: ["-p", `/src/project`],
        fs: () => loadProjectFromFiles({
            "/src/project/tsconfig.json": JSON.stringify({
                compilerOptions: {
                    composite: true,
                    outDir: "outDir",
                },
            }),
            "/src/project/file1.ts": `export class  C { }`,
            "/src/project/file2.ts": `export class D { }`,
        }),
        edits: [
            {
                subScenario: "delete file with imports",
                modifyFs: fs => fs.unlinkSync("/src/project/file2.ts"),
            },
        ]
    });
});

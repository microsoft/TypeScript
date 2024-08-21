import * as ts from "../../_namespaces/ts.js";
import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { compilerOptionsToConfigJson } from "../helpers/contents.js";
import {
    noChangeOnlyRuns,
    noChangeRun,
    TestTscEdit,
    verifyTsc,
} from "../helpers/tsc.js";
import {
    libFile,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsc:: incremental::", () => {
    verifyTsc({
        scenario: "incremental",
        subScenario: "when passing filename for buildinfo on commandline",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/src/project/src/main.ts": "export const x = 10;",
                "/src/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        target: "es5",
                        module: "commonjs",
                    },
                    include: [
                        "src/**/*.ts",
                    ],
                }),
            }, { currentDirectory: "/" }),
        commandLineArgs: ["--incremental", "--p", "src/project", "--tsBuildInfoFile", "src/project/.tsbuildinfo", "--explainFiles"],
        edits: noChangeOnlyRuns,
    });

    verifyTsc({
        scenario: "incremental",
        subScenario: "when passing rootDir from commandline",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/src/project/src/main.ts": "export const x = 10;",
                "/src/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        incremental: true,
                        outDir: "dist",
                    },
                }),
            }, { currentDirectory: "/" }),
        commandLineArgs: ["--p", "src/project", "--rootDir", "src/project/src"],
        edits: noChangeOnlyRuns,
    });

    verifyTsc({
        scenario: "incremental",
        subScenario: "with only dts files",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/src/project/src/main.d.ts": "export const x = 10;",
                "/src/project/src/another.d.ts": "export const y = 10;",
                "/src/project/tsconfig.json": "{}",
            }, { currentDirectory: "/" }),
        commandLineArgs: ["--incremental", "--p", "src/project"],
        edits: [
            noChangeRun,
            {
                caption: "incremental-declaration-doesnt-change",
                edit: sys => sys.appendFile("/src/project/src/main.d.ts", "export const xy = 100;"),
            },
        ],
    });

    verifyTsc({
        scenario: "incremental",
        subScenario: "when passing rootDir is in the tsconfig",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/src/project/src/main.ts": "export const x = 10;",
                "/src/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        incremental: true,
                        outDir: "./built",
                        rootDir: "./",
                    },
                }),
            }, { currentDirectory: "/" }),
        commandLineArgs: ["--p", "src/project"],
        edits: noChangeOnlyRuns,
    });

    verifyTsc({
        scenario: "incremental",
        subScenario: "tsbuildinfo has error",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/src/project/main.ts": "export const x = 10;",
                "/src/project/tsconfig.json": "{}",
                "/src/project/tsconfig.tsbuildinfo": "Some random string",
            }, { currentDirectory: "/" }),
        commandLineArgs: ["--p", "src/project", "-i"],
        edits: [{
            caption: "tsbuildinfo written has error",
            edit: sys => sys.prependFile("/src/project/tsconfig.tsbuildinfo", "Some random string"),
        }],
    });

    verifyTsc({
        scenario: "incremental",
        subScenario: `when global file is added, the signatures are updated`,
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/src/project/src/main.ts": dedent`
                    /// <reference path="./filePresent.ts"/>
                    /// <reference path="./fileNotFound.ts"/>
                    function main() { }
                `,
                "/src/project/src/anotherFileWithSameReferenes.ts": dedent`
                    /// <reference path="./filePresent.ts"/>
                    /// <reference path="./fileNotFound.ts"/>
                    function anotherFileWithSameReferenes() { }
                `,
                "/src/project/src/filePresent.ts": `function something() { return 10; }`,
                "/src/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: { composite: true },
                    include: ["src/**/*.ts"],
                }),
            }, { currentDirectory: "/" }),
        commandLineArgs: ["--p", "src/project"],
        edits: [
            noChangeRun,
            {
                caption: "Modify main file",
                edit: sys => sys.appendFile(`/src/project/src/main.ts`, `something();`),
            },
            {
                caption: "Modify main file again",
                edit: sys => sys.appendFile(`/src/project/src/main.ts`, `something();`),
            },
            {
                caption: "Add new file and update main file",
                edit: sys => {
                    sys.writeFile(`/src/project/src/newFile.ts`, "function foo() { return 20; }");
                    sys.prependFile(
                        `/src/project/src/main.ts`,
                        `/// <reference path="./newFile.ts"/>
`,
                    );
                    sys.appendFile(`/src/project/src/main.ts`, `foo();`);
                },
            },
            {
                caption: "Write file that could not be resolved",
                edit: sys => sys.writeFile(`/src/project/src/fileNotFound.ts`, "function something2() { return 20; }"),
            },
            {
                caption: "Modify main file",
                edit: sys => sys.appendFile(`/src/project/src/main.ts`, `something();`),
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
            scenario: "incremental",
            subScenario: "react-jsx-emit-mode with no backing types found doesn't crash",
            sys: () =>
                TestServerHost.createWatchedSystem({
                    "/src/project/node_modules/react/jsx-runtime.js": "export {}", // js needs to be present so there's a resolution result
                    "/src/project/node_modules/@types/react/index.d.ts": getJsxLibraryContent(), // doesn't contain a jsx-runtime definition
                    "/src/project/src/index.tsx": `export const App = () => <div propA={true}></div>;`,
                    "/src/project/tsconfig.json": jsonToReadableText({ compilerOptions: { module: "commonjs", jsx: "react-jsx", incremental: true, jsxImportSource: "react" } }),
                }, { currentDirectory: "/" }),
            commandLineArgs: ["--p", "src/project"],
        });

        verifyTsc({
            scenario: "incremental",
            subScenario: "react-jsx-emit-mode with no backing types found doesn't crash under --strict",
            sys: () =>
                TestServerHost.createWatchedSystem({
                    "/src/project/node_modules/react/jsx-runtime.js": "export {}", // js needs to be present so there's a resolution result
                    "/src/project/node_modules/@types/react/index.d.ts": getJsxLibraryContent(), // doesn't contain a jsx-runtime definition
                    "/src/project/src/index.tsx": `export const App = () => <div propA={true}></div>;`,
                    "/src/project/tsconfig.json": jsonToReadableText({ compilerOptions: { module: "commonjs", jsx: "react-jsx", incremental: true, jsxImportSource: "react" } }),
                }, { currentDirectory: "/" }),
            commandLineArgs: ["--p", "src/project", "--strict"],
        });
    });

    verifyTsc({
        scenario: "incremental",
        subScenario: "when new file is added to the referenced project",
        commandLineArgs: ["-i", "-p", `src/projects/project2`],
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/src/projects/project1/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        module: "none",
                        composite: true,
                    },
                    exclude: ["temp"],
                }),
                "/src/projects/project1/class1.ts": `class class1 {}`,
                "/src/projects/project1/class1.d.ts": `declare class class1 {}`,
                "/src/projects/project2/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        module: "none",
                        composite: true,
                    },
                    references: [
                        { path: "../project1" },
                    ],
                }),
                "/src/projects/project2/class2.ts": `class class2 {}`,
            }, { currentDirectory: "/" }),
        edits: [
            {
                caption: "Add class3 to project1 and build it",
                edit: sys => sys.writeFile("/src/projects/project1/class3.ts", `class class3 {}`),
                discrepancyExplanation: () => [
                    "Ts buildinfo will not be updated in incremental build so it will have semantic diagnostics cached from previous build",
                    "But in clean build because of global diagnostics, semantic diagnostics are not queried so not cached in tsbuildinfo",
                ],
            },
            {
                caption: "Add output of class3",
                edit: sys => sys.writeFile("/src/projects/project1/class3.d.ts", `declare class class3 {}`),
            },
            {
                caption: "Add excluded file to project1",
                edit: sys => {
                    sys.ensureFileOrFolder({ path: "/src/projects/project1/temp" });
                    sys.writeFile("/src/projects/project1/temp/file.d.ts", `declare class file {}`);
                },
            },
            {
                caption: "Delete output for class3",
                edit: sys => sys.deleteFile("/src/projects/project1/class3.d.ts"),
            },
            {
                caption: "Create output for class3",
                edit: sys => sys.writeFile("/src/projects/project1/class3.d.ts", `declare class class3 {}`),
            },
        ],
    });

    verifyTsc({
        scenario: "incremental",
        subScenario: "serializing error chains",
        commandLineArgs: ["-p", `src/project`],
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/src/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        incremental: true,
                        strict: true,
                        jsx: "react",
                        module: "esnext",
                    },
                }),
                "/src/project/index.tsx": dedent`
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
                    </Component>)`,
                [libFile.path]: `${libFile.content}\ninterface ReadonlyArray<T> { readonly length: number }`,
            }, { currentDirectory: "/" }),
        edits: noChangeOnlyRuns,
    });

    verifyTsc({
        scenario: "incremental",
        subScenario: "ts file with no-default-lib that augments the global scope",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/src/project/src/main.ts": dedent`
                    /// <reference no-default-lib="true"/>
                    /// <reference lib="esnext" />

                    declare global {
                        interface Test {
                        }
                    }

                    export {};
                `,
                "/src/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        target: "ESNext",
                        module: "ESNext",
                        incremental: true,
                        outDir: "dist",
                    },
                }),
            }, { currentDirectory: "/" }),
        commandLineArgs: ["--p", "src/project", "--rootDir", "src/project/src"],
    });

    verifyTsc({
        scenario: "incremental",
        subScenario: "change to type that gets used as global through export in another file",
        commandLineArgs: ["-p", `src/project`],
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/src/project/tsconfig.json": jsonToReadableText({ compilerOptions: { composite: true } }),
                "/src/project/class1.ts": `const a: MagicNumber = 1;
console.log(a);`,
                "/src/project/constants.ts": "export default 1;",
                "/src/project/types.d.ts": `type MagicNumber = typeof import('./constants').default`,
            }, { currentDirectory: "/" }),
        edits: [{
            caption: "Modify imports used in global file",
            edit: sys => sys.writeFile("/src/project/constants.ts", "export default 2;"),
        }],
    });

    verifyTsc({
        scenario: "incremental",
        subScenario: "change to type that gets used as global through export in another file through indirect import",
        commandLineArgs: ["-p", `src/project`],
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/src/project/tsconfig.json": jsonToReadableText({ compilerOptions: { composite: true } }),
                "/src/project/class1.ts": `const a: MagicNumber = 1;
console.log(a);`,
                "/src/project/constants.ts": "export default 1;",
                "/src/project/reexport.ts": `export { default as ConstantNumber } from "./constants"`,
                "/src/project/types.d.ts": `type MagicNumber = typeof import('./reexport').ConstantNumber`,
            }, { currentDirectory: "/" }),
        edits: [{
            caption: "Modify imports used in global file",
            edit: sys => sys.writeFile("/src/project/constants.ts", "export default 2;"),
        }],
    });

    function verifyModifierChange(declaration: boolean) {
        verifyTsc({
            scenario: "incremental",
            subScenario: `change to modifier of class expression field${declaration ? " with declaration emit enabled" : ""}`,
            commandLineArgs: ["-p", "src/project", "--incremental"],
            sys: () =>
                TestServerHost.createWatchedSystem({
                    "/src/project/tsconfig.json": jsonToReadableText({ compilerOptions: { declaration } }),
                    "/src/project/main.ts": dedent`
                        import MessageablePerson from './MessageablePerson.js';
                        function logMessage( person: MessageablePerson ) {
                            console.log( person.message );
                        }`,
                    "/src/project/MessageablePerson.ts": dedent`
                        const Messageable = () => {
                            return class MessageableClass {
                                public message = 'hello';
                            }
                        };
                        const wrapper = () => Messageable();
                        type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
                        export default MessageablePerson;`,
                }, { currentDirectory: "/" }),
            modifySystem: sys =>
                sys.appendFile(
                    libFile.path,
                    dedent`
                    type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
                    type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;`,
                ),
            edits: [
                noChangeRun,
                {
                    caption: "modify public to protected",
                    edit: sys => sys.replaceFileText("/src/project/MessageablePerson.ts", "public", "protected"),
                },
                noChangeRun,
                {
                    caption: "modify protected to public",
                    edit: sys => sys.replaceFileText("/src/project/MessageablePerson.ts", "protected", "public"),
                },
                noChangeRun,
            ],
        });
    }
    verifyModifierChange(/*declaration*/ false);
    verifyModifierChange(/*declaration*/ true);

    describe("different options::", () => {
        function withOptionChange(caption: string, ...options: readonly string[]): TestTscEdit {
            return {
                caption,
                edit: ts.noop,
                commandLineArgs: ["--p", "/src/project", ...options],
            };
        }
        function noChangeWithSubscenario(caption: string): TestTscEdit {
            return { ...noChangeRun, caption };
        }
        function withOptionChangeAndDiscrepancyExplanation(caption: string, option: string): TestTscEdit {
            return {
                ...withOptionChange(caption, option),
                discrepancyExplanation: () => [
                    `Clean build tsbuildinfo will have compilerOptions with composite and ${option.replace(/-/g, "")}`,
                    `Incremental build will detect that it doesnt need to rebuild so tsbuild info is from before which has option composite only`,
                ],
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
        function localChange(): TestTscEdit {
            return {
                caption: "local change",
                edit: sys => sys.replaceFileText("/src/project/a.ts", "Local = 1", "Local = 10"),
            };
        }
        function sys(options: ts.CompilerOptions) {
            return TestServerHost.createWatchedSystem({
                "/src/project/tsconfig.json": jsonToReadableText({ compilerOptions: compilerOptionsToConfigJson(options) }),
                "/src/project/a.ts": `export const a = 10;const aLocal = 10;`,
                "/src/project/b.ts": `export const b = 10;const bLocal = 10;`,
                "/src/project/c.ts": `import { a } from "./a";export const c = a;`,
                "/src/project/d.ts": `import { b } from "./b";export const d = b;`,
            }, { currentDirectory: "/" });
        }
        function enableDeclarationMap(): TestTscEdit {
            return {
                caption: "declarationMap enabling",
                edit: sys => {
                    const config = JSON.parse(sys.readFile("/src/project/tsconfig.json")!);
                    config.compilerOptions.declarationMap = true;
                    sys.writeFile("/src/project/tsconfig.json", jsonToReadableText(config));
                },
            };
        }
        function verify(options: ts.CompilerOptions) {
            function scenarioName(text: string) {
                return `${options.outFile ? "outFile" : "multiFile"}/${text}`;
            }
            verifyTsc({
                scenario: "incremental",
                subScenario: scenarioName("different options"),
                sys: () => sys({ composite: true, ...options }),
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
            verifyTsc({
                scenario: "incremental",
                subScenario: scenarioName("different options with incremental"),
                sys: () => sys({ incremental: true, ...options }),
                commandLineArgs: ["--p", "/src/project"],
                edits: [
                    withOptionChange("with sourceMap", "--sourceMap"),
                    noChangeWithSubscenario("should re-emit only js so they dont contain sourcemap"),
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
        }

        verify({});
        verify({ outFile: "../outFile.js", module: ts.ModuleKind.AMD });
    });

    verifyTsc({
        scenario: "incremental",
        subScenario: "when file is deleted",
        commandLineArgs: ["-p", `/src/project`],
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/src/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        outDir: "outDir",
                    },
                }),
                "/src/project/file1.ts": `export class  C { }`,
                "/src/project/file2.ts": `export class D { }`,
            }, { currentDirectory: "/" }),
        edits: [
            {
                caption: "delete file with imports",
                edit: sys => sys.deleteFile("/src/project/file2.ts"),
            },
        ],
    });

    verifyTsc({
        scenario: "incremental",
        subScenario: "generates typerefs correctly",
        commandLineArgs: ["-p", `/src/project`],
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/src/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        outDir: "outDir",
                        checkJs: true,
                    },
                    include: ["src"],
                }),
                "/src/project/src/box.ts": dedent`
                    export interface Box<T> {
                        unbox(): T
                    }
                `,
                "/src/project/src/bug.js": dedent`
                    import * as B from "./box.js"
                    import * as W from "./wrap.js"

                    /**
                     * @template {object} C
                     * @param {C} source
                     * @returns {W.Wrap<C>}
                     */
                    const wrap = source => {
                    throw source
                    }

                    /**
                     * @returns {B.Box<number>}
                     */
                    const box = (n = 0) => ({ unbox: () => n })

                    export const bug = wrap({ n: box(1) });
                `,
                "/src/project/src/wrap.ts": dedent`
                    export type Wrap<C> = {
                        [K in keyof C]: { wrapped: C[K] }
                    }
                `,
            }, { currentDirectory: "/" }),
        edits: [{
            caption: "modify js file",
            edit: sys => sys.appendFile("/src/project/src/bug.js", `export const something = 1;`),
        }],
    });

    describe("with const enums", () => {
        enum AliasType {
            None = "",
            SameFile = "aliased ",
            DifferentFile = "aliased in different file ",
        }
        function fileWithEnum(withAlias: AliasType) {
            return withAlias !== AliasType.DifferentFile ? "/src/project/b.d.ts" : "/src/project/worker.d.ts";
        }
        function verify(withAlias: AliasType, preserveConstEnums: boolean) {
            verifyTsc({
                scenario: "incremental",
                subScenario: `with ${withAlias}const enums${preserveConstEnums ? " with preserveConstEnums" : ""}`,
                commandLineArgs: ["-i", `/src/project/a.ts`, "--tsbuildinfofile", "/src/project/a.tsbuildinfo", ...preserveConstEnums ? ["--preserveConstEnums"] : []],
                sys: () =>
                    TestServerHost.createWatchedSystem({
                        "/src/project/a.ts": dedent`
                            import {A} from "./c"
                            let a = A.ONE
                        `,
                        "/src/project/b.d.ts": withAlias === AliasType.SameFile ?
                            dedent`
                                declare const enum AWorker {
                                    ONE = 1
                                }
                                export { AWorker as A };
                            ` :
                            withAlias === AliasType.DifferentFile ?
                            dedent`
                                export { AWorker as A } from "./worker";
                            ` :
                            dedent`
                                export const enum A {
                                    ONE = 1
                                }
                            `,
                        "/src/project/c.ts": dedent`
                            import {A} from "./b"
                            let b = A.ONE
                            export {A}
                        `,
                        "/src/project/worker.d.ts": dedent`
                            export const enum AWorker {
                                ONE = 1
                            }
                        `,
                    }, { currentDirectory: "/" }),
                edits: [
                    {
                        caption: "change enum value",
                        edit: sys => sys.replaceFileText(fileWithEnum(withAlias), "1", "2"),
                    },
                    {
                        caption: "change enum value again",
                        edit: sys => sys.replaceFileText(fileWithEnum(withAlias), "2", "3"),
                    },
                    {
                        caption: "something else changes in b.d.ts",
                        edit: sys => sys.appendFile("/src/project/b.d.ts", "export const randomThing = 10;"),
                    },
                    {
                        caption: "something else changes in b.d.ts again",
                        edit: sys => sys.appendFile("/src/project/b.d.ts", "export const randomThing2 = 10;"),
                    },
                ],
            });
        }
        verify(/*withAlias*/ AliasType.None, /*preserveConstEnums*/ false);
        verify(/*withAlias*/ AliasType.SameFile, /*preserveConstEnums*/ false);
        verify(/*withAlias*/ AliasType.DifferentFile, /*preserveConstEnums*/ false);
        verify(/*withAlias*/ AliasType.None, /*preserveConstEnums*/ true);
        verify(/*withAlias*/ AliasType.SameFile, /*preserveConstEnums*/ true);
        verify(/*withAlias*/ AliasType.DifferentFile, /*preserveConstEnums*/ true);
    });
});

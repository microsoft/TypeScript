package execute_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/testutil/stringtestutil"
)

func TestIncremental(t *testing.T) {
	t.Parallel()
	testCases := []*tscInput{
		{
			subScenario: "serializing error chain",
			files: FileMap{
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
                    "compilerOptions": {
                        "incremental": true,
                        "strict": true,
                        "jsx": "react",
                        "module": "esnext",
                    },
                }`),
				"/home/src/workspaces/project/index.tsx": stringtestutil.Dedent(`
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
                    </Component>)`),
			},
			edits: noChangeOnlyEdit,
		},
		{
			subScenario: "serializing composite project",
			files: FileMap{
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
                    "compilerOptions": {
                        "composite": true,
                        "strict": true,
                        "module": "esnext",
                    },
                }`),
				"/home/src/workspaces/project/index.tsx": `export const a = 1;`,
				"/home/src/workspaces/project/other.ts":  `export const b = 2;`,
			},
		},
		{
			subScenario: "change to modifier of class expression field with declaration emit enabled",
			files: FileMap{
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{ 
					"compilerOptions": {
						"module": "esnext",
						"declaration": true
					}
				}`),
				"/home/src/workspaces/project/main.ts": stringtestutil.Dedent(`
                        import MessageablePerson from './MessageablePerson.js';
                        function logMessage( person: MessageablePerson ) {
                            console.log( person.message );
                        }`),
				"/home/src/workspaces/project/MessageablePerson.ts": stringtestutil.Dedent(`
                        const Messageable = () => {
                            return class MessageableClass {
                                public message = 'hello';
                            }
                        };
                        const wrapper = () => Messageable();
                        type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
                        export default MessageablePerson;`),
				tscLibPath + "/lib.d.ts": tscDefaultLibContent + "\n" + stringtestutil.Dedent(`
					type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
                    type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;`),
			},
			commandLineArgs: []string{"--incremental"},
			edits: []*testTscEdit{
				noChange,
				{
					caption: "modify public to protected",
					edit: func(sys *testSys) {
						sys.replaceFileText("/home/src/workspaces/project/MessageablePerson.ts", "public", "protected")
					},
				},
				noChange,
				{
					caption: "modify protected to public",
					edit: func(sys *testSys) {
						sys.replaceFileText("/home/src/workspaces/project/MessageablePerson.ts", "protected", "public")
					},
				},
				noChange,
			},
		},
		{
			subScenario: "change to modifier of class expression field",
			files: FileMap{
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{ 
					"compilerOptions": { 
						"module": "esnext"
					}
				}`),
				"/home/src/workspaces/project/main.ts": stringtestutil.Dedent(`
					import MessageablePerson from './MessageablePerson.js';
					function logMessage( person: MessageablePerson ) {
						console.log( person.message );
					}`),
				"/home/src/workspaces/project/MessageablePerson.ts": stringtestutil.Dedent(`
					const Messageable = () => {
						return class MessageableClass {
							public message = 'hello';
						}
					};
					const wrapper = () => Messageable();
					type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
					export default MessageablePerson;`),
				tscLibPath + "/lib.d.ts": tscDefaultLibContent + "\n" + stringtestutil.Dedent(`
					type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
                    type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;`),
			},
			commandLineArgs: []string{"--incremental"},
			edits: []*testTscEdit{
				noChange,
				{
					caption: "modify public to protected",
					edit: func(sys *testSys) {
						sys.replaceFileText("/home/src/workspaces/project/MessageablePerson.ts", "public", "protected")
					},
				},
				noChange,
				{
					caption: "modify protected to public",
					edit: func(sys *testSys) {
						sys.replaceFileText("/home/src/workspaces/project/MessageablePerson.ts", "protected", "public")
					},
				},
				noChange,
			},
		},
		{
			subScenario: "when passing filename for buildinfo on commandline",
			files: FileMap{
				"/home/src/workspaces/project/src/main.ts": "export const x = 10;",
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
                    "compilerOptions": {
                        "target": "es5",
                        "module": "commonjs"
                    },
                    "include": [
                        "src/**/*.ts"
                    ],
                }`),
			},
			commandLineArgs: []string{"--incremental", "--tsBuildInfoFile", ".tsbuildinfo", "--explainFiles"},
			edits:           noChangeOnlyEdit,
		},
		{
			subScenario: "when passing rootDir from commandline",
			files: FileMap{
				"/home/src/workspaces/project/src/main.ts": "export const x = 10;",
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
                    "compilerOptions": {
                        "incremental": true,
                        "outDir": "dist"
                    }
                }`),
			},
			commandLineArgs: []string{"--rootDir", "src"},
			edits:           noChangeOnlyEdit,
		},
		{
			subScenario: "with only dts files",
			files: FileMap{
				"/home/src/workspaces/project/src/main.d.ts":    "export const x = 10;",
				"/home/src/workspaces/project/src/another.d.ts": "export const y = 10;",
				"/home/src/workspaces/project/tsconfig.json":    "{}",
			},
			commandLineArgs: []string{"--incremental"},
			edits: []*testTscEdit{
				noChange,
				{
					caption: "modify d.ts file",
					edit: func(sys *testSys) {
						sys.appendFile("/home/src/workspaces/project/src/main.d.ts", "export const xy = 100;")
					},
				},
			},
		},
		{
			subScenario: "when passing rootDir is in the tsconfig",
			files: FileMap{
				"/home/src/workspaces/project/src/main.ts": "export const x = 10;",
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
                    "compilerOptions": {
                        "incremental": true,
                        "outDir": "dist",
						"rootDir": "./"
                    }
                }`),
			},
			edits: noChangeOnlyEdit,
		},
		{
			subScenario: "tsbuildinfo has error",
			files: FileMap{
				"/home/src/workspaces/project/main.ts":              "export const x = 10;",
				"/home/src/workspaces/project/tsconfig.json":        "{}",
				"/home/src/workspaces/project/tsconfig.tsbuildinfo": "Some random string",
			},
			commandLineArgs: []string{"-i"},
			edits: []*testTscEdit{
				{
					caption: "tsbuildinfo written has error",
					edit: func(sys *testSys) {
						sys.prependFile("/home/src/workspaces/project/tsconfig.tsbuildinfo", "Some random string")
					},
				},
			},
		},
		{
			subScenario: "when global file is added, the signatures are updated",
			files: FileMap{
				"/home/src/workspaces/project/src/main.ts": stringtestutil.Dedent(`
                    /// <reference path="./filePresent.ts"/>
                    /// <reference path="./fileNotFound.ts"/>
                    function main() { }
                `),
				"/home/src/workspaces/project/src/anotherFileWithSameReferenes.ts": stringtestutil.Dedent(`
                    /// <reference path="./filePresent.ts"/>
                    /// <reference path="./fileNotFound.ts"/>
                    function anotherFileWithSameReferenes() { }
                `),
				"/home/src/workspaces/project/src/filePresent.ts": `function something() { return 10; }`,
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
                    "compilerOptions": { "composite": true },
                    "include": ["src/**/*.ts"],
                }`),
			},
			commandLineArgs: []string{},
			edits: []*testTscEdit{
				noChange,
				{
					caption: "Modify main file",
					edit: func(sys *testSys) {
						sys.appendFile(`/home/src/workspaces/project/src/main.ts`, `something();`)
					},
				},
				{
					caption: "Modify main file again",
					edit: func(sys *testSys) {
						sys.appendFile(`/home/src/workspaces/project/src/main.ts`, `something();`)
					},
				},
				{
					caption: "Add new file and update main file",
					edit: func(sys *testSys) {
						sys.writeFileNoError(`/home/src/workspaces/project/src/newFile.ts`, "function foo() { return 20; }", false)
						sys.prependFile(
							`/home/src/workspaces/project/src/main.ts`,
							`/// <reference path="./newFile.ts"/>
`,
						)
						sys.appendFile(`/home/src/workspaces/project/src/main.ts`, `foo();`)
					},
				},
				{
					caption: "Write file that could not be resolved",
					edit: func(sys *testSys) {
						sys.writeFileNoError(`/home/src/workspaces/project/src/fileNotFound.ts`, "function something2() { return 20; }", false)
					},
				},
				{
					caption: "Modify main file",
					edit: func(sys *testSys) {
						sys.appendFile(`/home/src/workspaces/project/src/main.ts`, `something();`)
					},
				},
			},
		},
		{
			subScenario: "react-jsx-emit-mode with no backing types found doesnt crash",
			files: FileMap{
				"/home/src/workspaces/project/node_modules/react/jsx-runtime.js": "export {}", // js needs to be present so there's a resolution result
				"/home/src/workspaces/project/node_modules/@types/react/index.d.ts": stringtestutil.Dedent(`
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
					}`), // doesn't contain a jsx-runtime definition
				"/home/src/workspaces/project/src/index.tsx": `export const App = () => <div propA={true}></div>;`,
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{ 
					"compilerOptions": { 
						"module": "commonjs",
						"jsx": "react-jsx", 
						"incremental": true, 
						"jsxImportSource": "react" 
					} 
				}`),
			},
		},
		{
			subScenario: "react-jsx-emit-mode with no backing types found doesnt crash under --strict",
			files: FileMap{
				"/home/src/workspaces/project/node_modules/react/jsx-runtime.js": "export {}", // js needs to be present so there's a resolution result
				"/home/src/workspaces/project/node_modules/@types/react/index.d.ts": stringtestutil.Dedent(`
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
					}`), // doesn't contain a jsx-runtime definition
				"/home/src/workspaces/project/src/index.tsx": `export const App = () => <div propA={true}></div>;`,
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{ 
					"compilerOptions": { 
						"module": "commonjs",
						"jsx": "react-jsx", 
						"incremental": true, 
						"jsxImportSource": "react" 
					} 
				}`),
			},
			commandLineArgs: []string{"--strict"},
		},
		{
			subScenario: "change to type that gets used as global through export in another file",
			files: FileMap{
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true
					}
				}`),
				"/home/src/workspaces/project/class1.ts": stringtestutil.Dedent(`
					const a: MagicNumber = 1;
					console.log(a);`),
				"/home/src/workspaces/project/constants.ts": "export default 1;",
				"/home/src/workspaces/project/types.d.ts":   `type MagicNumber = typeof import('./constants').default`,
			},
			edits: []*testTscEdit{
				{
					caption: "Modify imports used in global file",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/home/src/workspaces/project/constants.ts", "export default 2;", false)
					},
					expectedDiff: "Currently there is issue with d.ts emit for export default = 1 to widen in dts which is why we are not re-computing errors and results in incorrect error reporting",
				},
			},
		},
		{
			subScenario: "change to type that gets used as global through export in another file through indirect import",
			files: FileMap{
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true
					}
				}`),
				"/home/src/workspaces/project/class1.ts": stringtestutil.Dedent(`
					const a: MagicNumber = 1;
					console.log(a);`),
				"/home/src/workspaces/project/constants.ts": "export default 1;",
				"/home/src/workspaces/project/reexport.ts":  `export { default as ConstantNumber } from "./constants"`,
				"/home/src/workspaces/project/types.d.ts":   `type MagicNumber = typeof import('./reexport').ConstantNumber`,
			},
			edits: []*testTscEdit{
				{
					caption: "Modify imports used in global file",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/home/src/workspaces/project/constants.ts", "export default 2;", false)
					},
					expectedDiff: "Currently there is issue with d.ts emit for export default = 1 to widen in dts which is why we are not re-computing errors and results in incorrect error reporting",
				},
			},
		},
		{
			subScenario: "when file is deleted",
			files: FileMap{
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
						"outDir": "outDir"
					}
				}`),
				"/home/src/workspaces/project/file1.ts": `export class  C { }`,
				"/home/src/workspaces/project/file2.ts": `export class D { }`,
			},
			edits: []*testTscEdit{
				{
					caption: "delete file with imports",
					edit: func(sys *testSys) {
						err := sys.fsFromFileMap().Remove("/home/src/workspaces/project/file2.ts")
						if err != nil {
							panic(err)
						}
					},
				},
			},
		},
		{
			subScenario: "generates typerefs correctly",
			files: FileMap{
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
						"outDir": "outDir",
						"checkJs": true
					},
					"include": ["src"],
				}`),
				"/home/src/workspaces/project/src/box.ts": stringtestutil.Dedent(`
                    export interface Box<T> {
                        unbox(): T
                    }
                `),
				"/home/src/workspaces/project/src/bug.js": stringtestutil.Dedent(`
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
                `),
				"/home/src/workspaces/project/src/wrap.ts": stringtestutil.Dedent(`
                    export type Wrap<C> = {
                        [K in keyof C]: { wrapped: C[K] }
                    }
                `),
			},
			edits: []*testTscEdit{
				{
					caption: "modify js file",
					edit: func(sys *testSys) {
						sys.appendFile("/home/src/workspaces/project/src/bug.js", `export const something = 1;`)
					},
				},
			},
		},
		getConstEnumTest(`
			export const enum A {
				ONE = 1
			}
		`, "/home/src/workspaces/project/b.d.ts", ""),
		getConstEnumTest(`
			export const enum AWorker {
				ONE = 1
			}
			export { AWorker as A };
		`, "/home/src/workspaces/project/b.d.ts", " aliased"),
		getConstEnumTest(`export { AWorker as A } from "./worker";`, "/home/src/workspaces/project/worker.d.ts", " aliased in different file"),
		{
			subScenario: "option changes with composite",
			files: FileMap{
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
					}
				}`),
				"/home/src/workspaces/project/a.ts": `export const a = 10;const aLocal = 10;`,
				"/home/src/workspaces/project/b.ts": `export const b = 10;const bLocal = 10;`,
				"/home/src/workspaces/project/c.ts": `import { a } from "./a";export const c = a;`,
				"/home/src/workspaces/project/d.ts": `import { b } from "./b";export const d = b;`,
			},
			edits: []*testTscEdit{
				{
					caption:         "with sourceMap",
					commandLineArgs: []string{"--sourceMap"},
				},
				{
					caption: "should re-emit only js so they dont contain sourcemap",
				},
				{
					caption:         "with declaration should not emit anything",
					commandLineArgs: []string{"--declaration"},
					// discrepancyExplanation: () => [
					// 	`Clean build tsbuildinfo will have compilerOptions with composite and ${option.replace(/-/g, "")}`,
					// 	`Incremental build will detect that it doesnt need to rebuild so tsbuild info is from before which has option composite only`,
					// ],
				},
				noChange,
				{
					caption:         "with declaration and declarationMap",
					commandLineArgs: []string{"--declaration", "--declarationMap"},
				},
				{
					caption: "should re-emit only dts so they dont contain sourcemap",
				},
				{
					caption:         "with emitDeclarationOnly should not emit anything",
					commandLineArgs: []string{"--emitDeclarationOnly"},
					// discrepancyExplanation: () => [
					// 	`Clean build tsbuildinfo will have compilerOptions with composite and ${option.replace(/-/g, "")}`,
					// 	`Incremental build will detect that it doesnt need to rebuild so tsbuild info is from before which has option composite only`,
					// ],
				},
				noChange,
				{
					caption: "local change",
					edit: func(sys *testSys) {
						sys.replaceFileText("/home/src/workspaces/project/a.ts", "Local = 1", "Local = 10")
					},
				},
				{
					caption:         "with declaration should not emit anything",
					commandLineArgs: []string{"--declaration"},
					// discrepancyExplanation: () => [
					// 	`Clean build tsbuildinfo will have compilerOptions with composite and ${option.replace(/-/g, "")}`,
					// 	`Incremental build will detect that it doesnt need to rebuild so tsbuild info is from before which has option composite only`,
					// ],
				},
				{
					caption:         "with inlineSourceMap",
					commandLineArgs: []string{"--inlineSourceMap"},
				},
				{
					caption:         "with sourceMap",
					commandLineArgs: []string{"--sourceMap"},
				},
				{
					caption: "declarationMap enabling",
					edit: func(sys *testSys) {
						sys.replaceFileText("/home/src/workspaces/project/tsconfig.json", `"composite": true,`, `"composite": true,        "declarationMap": true`)
					},
				},
				{
					caption:         "with sourceMap should not emit d.ts",
					commandLineArgs: []string{"--sourceMap"},
				},
			},
		},
		{
			subScenario: "option changes with incremental",
			files: FileMap{
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"incremental": true,
					}
				}`),
				"/home/src/workspaces/project/a.ts": `export const a = 10;const aLocal = 10;`,
				"/home/src/workspaces/project/b.ts": `export const b = 10;const bLocal = 10;`,
				"/home/src/workspaces/project/c.ts": `import { a } from "./a";export const c = a;`,
				"/home/src/workspaces/project/d.ts": `import { b } from "./b";export const d = b;`,
			},
			edits: []*testTscEdit{
				{
					caption:         "with sourceMap",
					commandLineArgs: []string{"--sourceMap"},
				},
				{
					caption: "should re-emit only js so they dont contain sourcemap",
				},
				{
					caption:         "with declaration, emit Dts and should not emit js",
					commandLineArgs: []string{"--declaration"},
				},
				{
					caption:         "with declaration and declarationMap",
					commandLineArgs: []string{"--declaration", "--declarationMap"},
				},
				{
					caption: "no change",
					// discrepancyExplanation: () => [
					// 	`Clean build tsbuildinfo will have compilerOptions {}`,
					// 	`Incremental build will detect that it doesnt need to rebuild so tsbuild info is from before which has option declaration and declarationMap`,
					// ],
				},
				{
					caption: "local change",
					edit: func(sys *testSys) {
						sys.replaceFileText("/home/src/workspaces/project/a.ts", "Local = 1", "Local = 10")
					},
				},
				{
					caption:         "with declaration and declarationMap",
					commandLineArgs: []string{"--declaration", "--declarationMap"},
				},
				{
					caption: "no change",
					// discrepancyExplanation: () => [
					// 	`Clean build tsbuildinfo will have compilerOptions {}`,
					// 	`Incremental build will detect that it doesnt need to rebuild so tsbuild info is from before which has option declaration and declarationMap`,
					// ],
				},
				{
					caption:         "with inlineSourceMap",
					commandLineArgs: []string{"--inlineSourceMap"},
				},
				{
					caption:         "with sourceMap",
					commandLineArgs: []string{"--sourceMap"},
				},
				{
					caption: "emit js files",
				},
				{
					caption:         "with declaration and declarationMap",
					commandLineArgs: []string{"--declaration", "--declarationMap"},
				},
				{
					caption:         "with declaration and declarationMap, should not re-emit",
					commandLineArgs: []string{"--declaration", "--declarationMap"},
				},
			},
		},
	}

	for _, test := range testCases {
		test.run(t, "incremental")
	}
}

func getConstEnumTest(bdsContents string, changeEnumFile string, testSuffix string) *tscInput {
	return &tscInput{
		subScenario: "const enums" + testSuffix,
		files: FileMap{
			"/home/src/workspaces/project/a.ts": stringtestutil.Dedent(`
				import {A} from "./c"
				let a = A.ONE
			`),
			"/home/src/workspaces/project/b.d.ts": stringtestutil.Dedent(bdsContents),
			"/home/src/workspaces/project/c.ts": stringtestutil.Dedent(`
				import {A} from "./b"
				let b = A.ONE
				export {A}
			`),
			"/home/src/workspaces/project/worker.d.ts": stringtestutil.Dedent(`
				export const enum AWorker {
					ONE = 1
				}
			`),
		},
		commandLineArgs: []string{"-i", `a.ts`, "--tsbuildinfofile", "a.tsbuildinfo"},
		edits: []*testTscEdit{
			{
				caption: "change enum value",
				edit: func(sys *testSys) {
					sys.replaceFileText(changeEnumFile, "1", "2")
				},
			},
			{
				caption: "change enum value again",
				edit: func(sys *testSys) {
					sys.replaceFileText(changeEnumFile, "2", "3")
				},
			},
			{
				caption: "something else changes in b.d.ts",
				edit: func(sys *testSys) {
					sys.appendFile("/home/src/workspaces/project/b.d.ts", "export const randomThing = 10;")
				},
			},
			{
				caption: "something else changes in b.d.ts again",
				edit: func(sys *testSys) {
					sys.appendFile("/home/src/workspaces/project/b.d.ts", "export const randomThing2 = 10;")
				},
			},
		},
	}
}

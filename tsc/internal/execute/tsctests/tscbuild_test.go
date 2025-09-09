package tsctests

import (
	"fmt"
	"slices"
	"strings"
	"testing"
	"time"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/testutil/harnessutil"
	"github.com/microsoft/typescript-go/internal/testutil/stringtestutil"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestBuildCommandLine(t *testing.T) {
	t.Parallel()
	getBuildCommandLineDifferentOptionsMap := func(optionName string) FileMap {
		return FileMap{
			"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(fmt.Sprintf(`
			{
				"compilerOptions": {
					"%s": true
				}
			}`, optionName)),
			"/home/src/workspaces/project/a.ts": `export const a = 10;const aLocal = 10;`,
			"/home/src/workspaces/project/b.ts": `export const b = 10;const bLocal = 10;`,
			"/home/src/workspaces/project/c.ts": `import { a } from "./a";export const c = a;`,
			"/home/src/workspaces/project/d.ts": `import { b } from "./b";export const d = b;`,
		}
	}
	getBuildCommandLineEmitDeclarationOnlyMap := func(options []string) FileMap {
		compilerOptionsStr := strings.Join(core.Map(options, func(opt string) string {
			return fmt.Sprintf(`"%s": true`, opt)
		}), ", ")
		return FileMap{
			"/home/src/workspaces/solution/project1/src/tsconfig.json": stringtestutil.Dedent(fmt.Sprintf(`
			{
				"compilerOptions": { %s }
			}`, compilerOptionsStr)),
			"/home/src/workspaces/solution/project1/src/a.ts": `export const a = 10;const aLocal = 10;`,
			"/home/src/workspaces/solution/project1/src/b.ts": `export const b = 10;const bLocal = 10;`,
			"/home/src/workspaces/solution/project1/src/c.ts": `import { a } from "./a";export const c = a;`,
			"/home/src/workspaces/solution/project1/src/d.ts": `import { b } from "./b";export const d = b;`,
			"/home/src/workspaces/solution/project2/src/tsconfig.json": stringtestutil.Dedent(fmt.Sprintf(`
			{
				"compilerOptions": { %s },
				"references": [{ "path": "../../project1/src" }]
			}`, compilerOptionsStr)),
			"/home/src/workspaces/solution/project2/src/e.ts": `export const e = 10;`,
			"/home/src/workspaces/solution/project2/src/f.ts": `import { a } from "../../project1/src/a"; export const f = a;`,
			"/home/src/workspaces/solution/project2/src/g.ts": `import { b } from "../../project1/src/b"; export const g = b;`,
		}
	}
	getBuildCommandLineEmitDeclarationOnlyTestCases := func(options []string, suffix string) []*tscInput {
		return []*tscInput{
			{
				subScenario:     "emitDeclarationOnly on commandline" + suffix,
				files:           getBuildCommandLineEmitDeclarationOnlyMap(options),
				cwd:             "/home/src/workspaces/solution",
				commandLineArgs: []string{"--b", "project2/src", "--verbose", "--emitDeclarationOnly"},
				edits: []*tscEdit{
					noChange,
					{
						caption: "local change",
						edit: func(sys *testSys) {
							sys.appendFile("/home/src/workspaces/solution/project1/src/a.ts", "const aa = 10;")
						},
					},
					{
						caption: "non local change",
						edit: func(sys *testSys) {
							sys.appendFile("/home/src/workspaces/solution/project1/src/a.ts", "export const aaa = 10;")
						},
					},
					{
						caption:         "emit js files",
						commandLineArgs: []string{"--b", "project2/src", "--verbose"},
					},
					noChange,
					{
						caption: "js emit with change without emitDeclarationOnly",
						edit: func(sys *testSys) {
							sys.appendFile("/home/src/workspaces/solution/project1/src/b.ts", "const alocal = 10;")
						},
						commandLineArgs: []string{"--b", "project2/src", "--verbose"},
					},
					{
						caption: "local change",
						edit: func(sys *testSys) {
							sys.appendFile("/home/src/workspaces/solution/project1/src/b.ts", "const aaaa = 10;")
						},
					},
					{
						caption: "non local change",
						edit: func(sys *testSys) {
							sys.appendFile("/home/src/workspaces/solution/project1/src/b.ts", "export const aaaaa = 10;")
						},
					},
					{
						caption: "js emit with change without emitDeclarationOnly",
						edit: func(sys *testSys) {
							sys.appendFile("/home/src/workspaces/solution/project1/src/b.ts", "export const a2 = 10;")
						},
						commandLineArgs: []string{"--b", "project2/src", "--verbose"},
					},
				},
			},
			{
				subScenario:     "emitDeclarationOnly false on commandline" + suffix,
				files:           getBuildCommandLineEmitDeclarationOnlyMap(slices.Concat(options, []string{"emitDeclarationOnly"})),
				cwd:             "/home/src/workspaces/solution",
				commandLineArgs: []string{"--b", "project2/src", "--verbose"},
				edits: []*tscEdit{
					noChange,
					{
						caption: "change",
						edit: func(sys *testSys) {
							sys.appendFile("/home/src/workspaces/solution/project1/src/a.ts", "const aa = 10;")
						},
					},
					{
						caption:         "emit js files",
						commandLineArgs: []string{"--b", "project2/src", "--verbose", "--emitDeclarationOnly", "false"},
					},
					noChange,
					{
						caption:         "no change run with js emit",
						commandLineArgs: []string{"--b", "project2/src", "--verbose", "--emitDeclarationOnly", "false"},
					},
					{
						caption: "js emit with change",
						edit: func(sys *testSys) {
							sys.appendFile("/home/src/workspaces/solution/project1/src/b.ts", "const blocal = 10;")
						},
						commandLineArgs: []string{"--b", "project2/src", "--verbose", "--emitDeclarationOnly", "false"},
					},
				},
			},
		}
	}
	testCases := slices.Concat(
		[]*tscInput{
			{
				subScenario:     "help",
				files:           FileMap{},
				commandLineArgs: []string{"--build", "--help"},
			},
			{
				subScenario:     "different options",
				files:           getBuildCommandLineDifferentOptionsMap("composite"),
				commandLineArgs: []string{"--build", "--verbose"},
				edits: []*tscEdit{
					{
						caption:         "with sourceMap",
						commandLineArgs: []string{"--build", "--verbose", "--sourceMap"},
					},
					{
						caption: "should re-emit only js so they dont contain sourcemap",
					},
					{
						caption:         "with declaration should not emit anything",
						commandLineArgs: []string{"--build", "--verbose", "--declaration"},
					},
					noChange,
					{
						caption:         "with declaration and declarationMap",
						commandLineArgs: []string{"--build", "--verbose", "--declaration", "--declarationMap"},
					},
					{
						caption: "should re-emit only dts so they dont contain sourcemap",
					},
					{
						caption:         "with emitDeclarationOnly should not emit anything",
						commandLineArgs: []string{"--build", "--verbose", "--emitDeclarationOnly"},
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
						commandLineArgs: []string{"--build", "--verbose", "--declaration"},
					},
					{
						caption:         "with inlineSourceMap",
						commandLineArgs: []string{"--build", "--verbose", "--inlineSourceMap"},
					},
					{
						caption:         "with sourceMap",
						commandLineArgs: []string{"--build", "--verbose", "--sourceMap"},
					},
				},
			},
			{
				subScenario:     "different options with incremental",
				files:           getBuildCommandLineDifferentOptionsMap("incremental"),
				commandLineArgs: []string{"--build", "--verbose"},
				edits: []*tscEdit{
					{
						caption:         "with sourceMap",
						commandLineArgs: []string{"--build", "--verbose", "--sourceMap"},
					},
					{
						caption: "should re-emit only js so they dont contain sourcemap",
					},
					{
						caption:         "with declaration, emit Dts and should not emit js",
						commandLineArgs: []string{"--build", "--verbose", "--declaration"},
					},
					{
						caption:         "with declaration and declarationMap",
						commandLineArgs: []string{"--build", "--verbose", "--declaration", "--declarationMap"},
					},
					noChange,
					{
						caption: "local change",
						edit: func(sys *testSys) {
							sys.replaceFileText("/home/src/workspaces/project/a.ts", "Local = 1", "Local = 10")
						},
					},
					{
						caption:         "with declaration and declarationMap",
						commandLineArgs: []string{"--build", "--verbose", "--declaration", "--declarationMap"},
					},
					noChange,
					{
						caption:         "with inlineSourceMap",
						commandLineArgs: []string{"--build", "--verbose", "--inlineSourceMap"},
					},
					{
						caption:         "with sourceMap",
						commandLineArgs: []string{"--build", "--verbose", "--sourceMap"},
					},
					{
						caption: "emit js files",
					},
					{
						caption:         "with declaration and declarationMap",
						commandLineArgs: []string{"--build", "--verbose", "--declaration", "--declarationMap"},
					},
					{
						caption:         "with declaration and declarationMap, should not re-emit",
						commandLineArgs: []string{"--build", "--verbose", "--declaration", "--declarationMap"},
					},
				},
			},
		},
		getBuildCommandLineEmitDeclarationOnlyTestCases([]string{"composite"}, ""),
		getBuildCommandLineEmitDeclarationOnlyTestCases([]string{"incremental", "declaration"}, " with declaration and incremental"),
		getBuildCommandLineEmitDeclarationOnlyTestCases([]string{"declaration"}, " with declaration"),
	)

	for _, test := range testCases {
		test.run(t, "commandLine")
	}
}

func TestBuildClean(t *testing.T) {
	t.Parallel()
	testCases := []*tscInput{
		{
			subScenario: "file name and output name clashing",
			files: FileMap{
				"/home/src/workspaces/solution/index.js": "",
				"/home/src/workspaces/solution/bar.ts":   "",
				"/home/src/workspaces/solution/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": { "allowJs": true }
				}`),
			},
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--b", "--clean"},
		},
		{
			subScenario: "tsx with dts emit",
			files: FileMap{
				"/home/src/workspaces/solution/project/src/main.tsx": "export const x = 10;",
				"/home/src/workspaces/solution/project/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": { "declaration": true },
					"include": ["src/**/*.tsx", "src/**/*.ts"]
				}`),
			},
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--b", "project", "-v", "--explainFiles"},
			edits: []*tscEdit{
				noChange,
				{
					caption:         "clean build",
					commandLineArgs: []string{"-b", "project", "--clean"},
				},
			},
		},
	}

	for _, test := range testCases {
		test.run(t, "clean")
	}
}

func TestBuildConfigFileErrors(t *testing.T) {
	t.Parallel()
	testCases := []*tscInput{
		{
			subScenario: "when tsconfig extends the missing file",
			files: FileMap{
				"/home/src/workspaces/project/tsconfig.first.json": stringtestutil.Dedent(`
					{
						"extends": "./foobar.json",
						"compilerOptions": {
							"composite": true
						}
					}`),
				"/home/src/workspaces/project/tsconfig.second.json": stringtestutil.Dedent(`
					{
						"extends": "./foobar.json",
						"compilerOptions": {
							"composite": true
						}
					}`),
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
					{
						"compilerOptions": {
							"composite": true
						},
						"references": [
							{ "path": "./tsconfig.first.json" },
							{ "path": "./tsconfig.second.json" }
						]
					}`),
			},
			commandLineArgs: []string{"--b"},
		},
		{
			subScenario: "reports syntax errors in config file",
			files: FileMap{
				"/home/src/workspaces/project/a.ts": "export function foo() { }",
				"/home/src/workspaces/project/b.ts": "export function bar() { }",
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
					{
						"compilerOptions": {
							"composite": true,
						},
						"files": [
							"a.ts"
							"b.ts"
						]
					}`),
			},
			commandLineArgs: []string{"--b"},
			edits: []*tscEdit{
				{
					caption: "reports syntax errors after change to config file",
					edit: func(sys *testSys) {
						sys.replaceFileText("/home/src/workspaces/project/tsconfig.json", ",", `, "declaration": true`)
					},
				},
				{
					caption: "reports syntax errors after change to ts file",
					edit: func(sys *testSys) {
						sys.appendFile("/home/src/workspaces/project/a.ts", "export function fooBar() { }")
					},
				},
				noChange,
				{
					caption: "builds after fixing config file errors",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/home/src/workspaces/project/tsconfig.json", stringtestutil.Dedent(`
							{
								"compilerOptions": {
									"composite": true, "declaration": true
								},
								"files": [
									"a.ts",
									"b.ts"
								]
							}`), false)
					},
				},
			},
		},
		{
			subScenario:     "missing config file",
			files:           FileMap{},
			commandLineArgs: []string{"--b", "bogus.json"},
		},
		{
			subScenario: "reports syntax errors in config file",
			files: FileMap{
				"/home/src/workspaces/project/a.ts": "export function foo() { }",
				"/home/src/workspaces/project/b.ts": "export function bar() { }",
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
					{
						"compilerOptions": {
							"composite": true,
						},
						"files": [
							"a.ts"
							"b.ts"
						]
					}`),
			},
			commandLineArgs: []string{"--b", "-w"},
			edits: []*tscEdit{
				{
					caption: "reports syntax errors after change to config file",
					edit: func(sys *testSys) {
						sys.replaceFileText("/home/src/workspaces/project/tsconfig.json", ",", `, "declaration": true`)
					},
				},
				{
					caption: "reports syntax errors after change to ts file",
					edit: func(sys *testSys) {
						sys.appendFile("/home/src/workspaces/project/a.ts", "export function fooBar() { }")
					},
				},
				{
					caption: "reports error when there is no change to tsconfig file",
					edit: func(sys *testSys) {
						sys.replaceFileText("/home/src/workspaces/project/tsconfig.json", "", "")
					},
				},
				{
					caption: "builds after fixing config file errors",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/home/src/workspaces/project/tsconfig.json", stringtestutil.Dedent(`
							{
								"compilerOptions": {
									"composite": true, "declaration": true
								},
								"files": [
									"a.ts",
									"b.ts"
								]
							}`), false)
					},
				},
			},
		},
	}

	for _, test := range testCases {
		test.run(t, "configFileErrors")
	}
}

func TestBuildDemoProject(t *testing.T) {
	t.Parallel()

	getBuildDemoFileMap := func(modify func(FileMap)) FileMap {
		files := FileMap{
			"/user/username/projects/demo/animals/animal.ts": stringtestutil.Dedent(`
				export type Size = "small" | "medium" | "large";
				export default interface Animal {
					size: Size;
				}
			`),
			"/user/username/projects/demo/animals/dog.ts": stringtestutil.Dedent(`
				import Animal from '.';
				import { makeRandomName } from '../core/utilities';

				export interface Dog extends Animal {
					woof(): void;
					name: string;
				}

				export function createDog(): Dog {
					return ({
						size: "medium",
						woof: function(this: Dog) {
							console.log(` + "`" + `${ this.name } says "Woof"!` + "`" + `);
						},
						name: makeRandomName()
					});
				}
			`),
			"/user/username/projects/demo/animals/index.ts": stringtestutil.Dedent(`
				import Animal from './animal';

				export default Animal;
				import { createDog, Dog } from './dog';
				export { createDog, Dog };
			`),
			"/user/username/projects/demo/animals/tsconfig.json": stringtestutil.Dedent(`
				{
					"extends": "../tsconfig-base.json",
					"compilerOptions": {
						"outDir": "../lib/animals",
						"rootDir": "."
					},
					"references": [
						{ "path": "../core" }
					]
				}
			`),
			"/user/username/projects/demo/core/utilities.ts": stringtestutil.Dedent(`

				export function makeRandomName() {
					return "Bob!?! ";
				}

				export function lastElementOf<T>(arr: T[]): T | undefined {
					if (arr.length === 0) return undefined;
					return arr[arr.length - 1];
				}
			`),
			"/user/username/projects/demo/core/tsconfig.json": stringtestutil.Dedent(`
				{
					"extends": "../tsconfig-base.json",
					"compilerOptions": {
						"outDir": "../lib/core",
						"rootDir": "."
					},
				}
			`),
			"/user/username/projects/demo/zoo/zoo.ts": stringtestutil.Dedent(`
				import { Dog, createDog } from '../animals/index';

				export function createZoo(): Array<Dog> {
					return [
						createDog()
					];
				}
			`),
			"/user/username/projects/demo/zoo/tsconfig.json": stringtestutil.Dedent(`
				{
					"extends": "../tsconfig-base.json",
					"compilerOptions": {
						"outDir": "../lib/zoo",
						"rootDir": "."
					},
					"references": [
						{
							"path": "../animals"
						}
					]
				}
			`),
			"/user/username/projects/demo/tsconfig-base.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"declaration": true,
						"target": "es5",
						"module": "commonjs",
						"strict": true,
						"noUnusedLocals": true,
						"noUnusedParameters": true,
						"noImplicitReturns": true,
						"noFallthroughCasesInSwitch": true,
						"composite": true,
					},
				}
			`),
			"/user/username/projects/demo/tsconfig.json": stringtestutil.Dedent(`
				{
					"files": [],
					"references": [
						{
							"path": "./core"
						},
						{
							"path": "./animals",
						},
						{
							"path": "./zoo",
						},
					],
				}
			`),
		}
		if modify != nil {
			modify(files)
		}
		return files
	}
	testCases := []*tscInput{
		{
			subScenario:     "in master branch with everything setup correctly and reports no error",
			files:           getBuildDemoFileMap(nil),
			cwd:             "/user/username/projects/demo",
			commandLineArgs: []string{"--b", "--verbose"},
			edits:           noChangeOnlyEdit,
		},
		{
			subScenario: "in circular branch reports the error about it by stopping build",
			files: getBuildDemoFileMap(func(files FileMap) {
				files["/user/username/projects/demo/core/tsconfig.json"] = stringtestutil.Dedent(`
					{
						"extends": "../tsconfig-base.json",
						"compilerOptions": {
							"outDir": "../lib/core",
							"rootDir": "."
						},
						"references": [
							{
								"path": "../zoo",
							}
						]
					}
				`)
			}),
			cwd:             "/user/username/projects/demo",
			commandLineArgs: []string{"--b", "--verbose"},
		},
		{
			// !!! sheetal - this has missing errors from strada about files not in rootDir (3)
			subScenario: "in bad-ref branch reports the error about files not in rootDir at the import location",
			files: getBuildDemoFileMap(func(files FileMap) {
				files["/user/username/projects/demo/core/utilities.ts"] = `import * as A from '../animals'
` + files["/user/username/projects/demo/core/utilities.ts"].(string)
			}),
			cwd:             "/user/username/projects/demo",
			commandLineArgs: []string{"--b", "--verbose"},
		},
		{
			subScenario: "in circular is set in the reference",
			files: getBuildDemoFileMap(func(files FileMap) {
				files["/user/username/projects/demo/a/tsconfig.json"] = stringtestutil.Dedent(`
				{
					"extends": "../tsconfig-base.json",
					"compilerOptions": {
						"outDir": "../lib/a",
						"rootDir": "."
					},
					"references": [
						{
							"path": "../b",
							"circular": true
						}
					]
				}`)
				files["/user/username/projects/demo/b/tsconfig.json"] = stringtestutil.Dedent(`
				{
					"extends": "../tsconfig-base.json",
					"compilerOptions": {
						"outDir": "../lib/b",
						"rootDir": "."
					},
					"references": [
						{
							"path": "../a",
						}
					]
				}`)
				files["/user/username/projects/demo/a/index.ts"] = "export const a = 10;"
				files["/user/username/projects/demo/b/index.ts"] = "export const b = 10;"
				files["/user/username/projects/demo/tsconfig.json"] = stringtestutil.Dedent(`
				{
					"files": [],
					"references": [
						{
							"path": "./core"
						},
						{
							"path": "./animals",
						},
						{
							"path": "./zoo",
						},
						{
							"path": "./a",
						},
						{
							"path": "./b",
						},
					],
				}`)
			}),
			cwd:             "/user/username/projects/demo",
			commandLineArgs: []string{"--b", "--verbose"},
		},
		{
			subScenario: "updates with circular reference",
			files: getBuildDemoFileMap(func(files FileMap) {
				files["/user/username/projects/demo/core/tsconfig.json"] = stringtestutil.Dedent(`
					{
						"extends": "../tsconfig-base.json",
						"compilerOptions": {
							"outDir": "../lib/core",
							"rootDir": "."
						},
						"references": [
							{
								"path": "../zoo",
							}
						]
					}
				`)
			}),
			cwd:             "/user/username/projects/demo",
			commandLineArgs: []string{"--b", "-w", "--verbose"},
			edits: []*tscEdit{
				{
					caption: "Fix error",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/user/username/projects/demo/core/tsconfig.json", stringtestutil.Dedent(`
							{
								"extends": "../tsconfig-base.json",
								"compilerOptions": {
									"outDir": "../lib/core",
									"rootDir": "."
								},
							}
						`), false)
					},
				},
			},
		},
		{
			// !!! sheetal - this has missing errors from strada about files not in rootDir (3)
			subScenario: "updates with bad reference",
			files: getBuildDemoFileMap(func(files FileMap) {
				files["/user/username/projects/demo/core/utilities.ts"] = `import * as A from '../animals'
` + files["/user/username/projects/demo/core/utilities.ts"].(string)
			}),
			cwd:             "/user/username/projects/demo",
			commandLineArgs: []string{"--b", "-w", "--verbose"},
			edits: []*tscEdit{
				{
					caption: "Prepend a line",
					edit: func(sys *testSys) {
						sys.prependFile("/user/username/projects/demo/core/utilities.ts", "\n")
					},
				},
			},
		},
	}

	for _, test := range testCases {
		test.run(t, "demo")
	}
}

func TestBuildEmitDeclarationOnly(t *testing.T) {
	t.Parallel()
	getBuildEmitDeclarationOnlyImportFileMap := func(declarationMap bool, circularRef bool) FileMap {
		files := FileMap{
			"/home/src/workspaces/project/src/a.ts": stringtestutil.Dedent(`
				import { B } from "./b";

				export interface A {
					b: B;
				}
			`),
			"/home/src/workspaces/project/src/b.ts": stringtestutil.Dedent(`
				import { C } from "./c";

				export interface B {
					b: C;
				}
			`),
			"/home/src/workspaces/project/src/c.ts": stringtestutil.Dedent(`
				import { A } from "./a";

				export interface C {
					a: A;
				}
			`),
			"/home/src/workspaces/project/src/index.ts": stringtestutil.Dedent(`
				export { A } from "./a";
				export { B } from "./b";
				export { C } from "./c";
			`),
			"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(fmt.Sprintf(`
				{
					"compilerOptions": {
						"incremental": true,
						"target": "es5",
						"module": "commonjs",
						"declaration": true,
						"declarationMap": %t,
						"sourceMap": true,
						"outDir": "./lib",
						"composite": true,
						"strict": true,
						"esModuleInterop": true,
						"alwaysStrict": true,
						"rootDir": "src",
						"emitDeclarationOnly": true,
					},
				}`, declarationMap)),
		}
		if !circularRef {
			delete(files, "/home/src/workspaces/project/src/index.ts")
			files["/home/src/workspaces/project/src/a.ts"] = stringtestutil.Dedent(`
				export class B { prop = "hello"; }

				export interface A {
					b: B;
				}
			`)
		}
		return files
	}
	getBuildEmitDeclarationOnlyTestCase := func(declarationMap bool) *tscInput {
		return &tscInput{
			subScenario:     `only dts output in circular import project with emitDeclarationOnly` + core.IfElse(declarationMap, " and declarationMap", ""),
			files:           getBuildEmitDeclarationOnlyImportFileMap(declarationMap, true),
			commandLineArgs: []string{"--b", "--verbose"},
			edits: []*tscEdit{
				{
					caption: "incremental-declaration-changes",
					edit: func(sys *testSys) {
						sys.replaceFileText("/home/src/workspaces/project/src/a.ts", "b: B;", "b: B; foo: any;")
					},
				},
			},
		}
	}
	testCases := []*tscInput{
		getBuildEmitDeclarationOnlyTestCase(false),
		getBuildEmitDeclarationOnlyTestCase(true),
		{
			subScenario:     `only dts output in non circular imports project with emitDeclarationOnly`,
			files:           getBuildEmitDeclarationOnlyImportFileMap(true, false),
			commandLineArgs: []string{"--b", "--verbose"},
			edits: []*tscEdit{
				{
					caption: "incremental-declaration-doesnt-change",
					edit: func(sys *testSys) {
						sys.replaceFileText(
							"/home/src/workspaces/project/src/a.ts",
							"export interface A {",
							stringtestutil.Dedent(`
								class C { }
								export interface A {`),
						)
					},
				},
				{
					caption: "incremental-declaration-changes",
					edit: func(sys *testSys) {
						sys.replaceFileText("/home/src/workspaces/project/src/a.ts", "b: B;", "b: B; foo: any;")
					},
				},
			},
		},
	}

	for _, test := range testCases {
		test.run(t, "emitDeclarationOnly")
	}
}

func TestBuildFileDelete(t *testing.T) {
	t.Parallel()
	testCases := []*tscInput{
		{
			subScenario: "detects deleted file",
			files: FileMap{
				"/home/src/workspaces/solution/child/child.ts": stringtestutil.Dedent(`
					import { child2 } from "../child/child2";
					export function child() {
						child2();
					}
				`),
				"/home/src/workspaces/solution/child/child2.ts": stringtestutil.Dedent(`
					export function child2() {
					}
				`),
				"/home/src/workspaces/solution/child/tsconfig.json": stringtestutil.Dedent(`
					{
						"compilerOptions": { "composite": true }
					}
				`),
				"/home/src/workspaces/solution/main/main.ts": stringtestutil.Dedent(`
                    import { child } from "../child/child";
                    export function main() {
                        child();
                    }
                `),
				"/home/src/workspaces/solution/main/tsconfig.json": stringtestutil.Dedent(`
					{
						"compilerOptions": { "composite": true },
						"references": [{ "path": "../child" }],
					}
				`),
			},
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--b", "main/tsconfig.json", "-v", "--traceResolution", "--explainFiles"},
			edits: []*tscEdit{
				{
					caption: "delete child2 file",
					edit: func(sys *testSys) {
						sys.removeNoError("/home/src/workspaces/solution/child/child2.ts")
						sys.removeNoError("/home/src/workspaces/solution/child/child2.js")
						sys.removeNoError("/home/src/workspaces/solution/child/child2.d.ts")
					},
				},
			},
		},
		{
			subScenario: "deleted file without composite",
			files: FileMap{
				"/home/src/workspaces/solution/child/child.ts": stringtestutil.Dedent(`
					import { child2 } from "../child/child2";
					export function child() {
						child2();
					}
				`),
				"/home/src/workspaces/solution/child/child2.ts": stringtestutil.Dedent(`
					export function child2() {
					}
				`),
				"/home/src/workspaces/solution/child/tsconfig.json": stringtestutil.Dedent(`
					{
						"compilerOptions": { }
					}
				`),
			},
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--b", "child/tsconfig.json", "-v", "--traceResolution", "--explainFiles"},
			edits: []*tscEdit{
				{
					caption: "delete child2 file",
					edit: func(sys *testSys) {
						sys.removeNoError("/home/src/workspaces/solution/child/child2.ts")
						sys.removeNoError("/home/src/workspaces/solution/child/child2.js")
					},
				},
			},
		},
	}

	for _, test := range testCases {
		test.run(t, "fileDelete")
	}
}

func TestBuildInferredTypeFromTransitiveModule(t *testing.T) {
	t.Parallel()
	getBuildInferredTypeFromTransitiveModuleMap := func(isolatedModules bool, lazyExtraContents string) FileMap {
		return FileMap{
			"/home/src/workspaces/project/bar.ts": stringtestutil.Dedent(`
				interface RawAction {
					(...args: any[]): Promise<any> | void;
				}
				interface ActionFactory {
					<T extends RawAction>(target: T): T;
				}
				declare function foo<U extends any[] = any[]>(): ActionFactory;
				export default foo()(function foobar(param: string): void {
				});
			`),
			"/home/src/workspaces/project/bundling.ts": stringtestutil.Dedent(`
				export class LazyModule<TModule> {
					constructor(private importCallback: () => Promise<TModule>) {}
				}

				export class LazyAction<
					TAction extends (...args: any[]) => any,
					TModule
				>  {
					constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction) {
					}
				}
			`),
			"/home/src/workspaces/project/global.d.ts": stringtestutil.Dedent(`
				interface PromiseConstructor {
					new <T>(): Promise<T>;
				}
				declare var Promise: PromiseConstructor;
				interface Promise<T> {
				}
			`),
			"/home/src/workspaces/project/index.ts": stringtestutil.Dedent(`
				import { LazyAction, LazyModule } from './bundling';
				const lazyModule = new LazyModule(() =>
					import('./lazyIndex')
				);
				export const lazyBar = new LazyAction(lazyModule, m => m.bar);
			`),
			"/home/src/workspaces/project/lazyIndex.ts": stringtestutil.Dedent(`
				export { default as bar } from './bar';
			`) + lazyExtraContents,
			"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(fmt.Sprintf(`
				{
					"compilerOptions": {
						"target": "es5",
						"declaration": true,
						"outDir": "obj",
						"incremental": true,
						"isolatedModules": %t,
					},
				}`, isolatedModules)),
		}
	}
	testCases := []*tscInput{
		{
			subScenario:     "inferred type from transitive module",
			files:           getBuildInferredTypeFromTransitiveModuleMap(false, ""),
			commandLineArgs: []string{"--b", "--verbose"},
			edits: []*tscEdit{
				{
					caption: "incremental-declaration-changes",
					edit: func(sys *testSys) {
						sys.replaceFileText("/home/src/workspaces/project/bar.ts", "param: string", "")
					},
				},
				{
					caption: "incremental-declaration-changes",
					edit: func(sys *testSys) {
						sys.replaceFileText("/home/src/workspaces/project/bar.ts", "foobar()", "foobar(param: string)")
					},
				},
			},
		},
		{
			subScenario:     "inferred type from transitive module with isolatedModules",
			files:           getBuildInferredTypeFromTransitiveModuleMap(true, ""),
			commandLineArgs: []string{"--b", "--verbose"},
			edits: []*tscEdit{
				{
					caption: "incremental-declaration-changes",
					edit: func(sys *testSys) {
						sys.replaceFileText("/home/src/workspaces/project/bar.ts", "param: string", "")
					},
				},
				{
					caption: "incremental-declaration-changes",
					edit: func(sys *testSys) {
						sys.replaceFileText("/home/src/workspaces/project/bar.ts", "foobar()", "foobar(param: string)")
					},
				},
			},
		},
		{
			subScenario: "reports errors in files affected by change in signature with isolatedModules",
			files: getBuildInferredTypeFromTransitiveModuleMap(true, stringtestutil.Dedent(`
				import { default as bar } from './bar';
				bar("hello");
			`)),
			commandLineArgs: []string{"--b", "--verbose"},
			edits: []*tscEdit{
				{
					caption: "incremental-declaration-changes",
					edit: func(sys *testSys) {
						sys.replaceFileText("/home/src/workspaces/project/bar.ts", "param: string", "")
					},
				},
				{
					caption: "incremental-declaration-changes",
					edit: func(sys *testSys) {
						sys.replaceFileText("/home/src/workspaces/project/bar.ts", "foobar()", "foobar(param: string)")
					},
				},
				{
					caption: "incremental-declaration-changes",
					edit: func(sys *testSys) {
						sys.replaceFileText("/home/src/workspaces/project/bar.ts", "param: string", "")
					},
				},
				{
					caption: "Fix Error",
					edit: func(sys *testSys) {
						sys.replaceFileText("/home/src/workspaces/project/lazyIndex.ts", `bar("hello")`, "bar()")
					},
				},
			},
		},
	}

	for _, test := range testCases {
		test.run(t, "inferredTypeFromTransitiveModule")
	}
}

func TestBuildJavascriptProjectEmit(t *testing.T) {
	t.Parallel()
	testCases := []*tscInput{
		{
			// !!! sheetal errors seem different
			subScenario: "loads js-based projects and emits them correctly",
			files: FileMap{
				"/home/src/workspaces/solution/common/nominal.js": stringtestutil.Dedent(`
                    /**
                     * @template T, Name
                     * @typedef {T & {[Symbol.species]: Name}} Nominal
                     */
                    module.exports = {};
				`),
				"/home/src/workspaces/solution/common/tsconfig.json": stringtestutil.Dedent(`
					{
						"extends": "../tsconfig.base.json",
						"compilerOptions": {
							"composite": true,
						},
						"include": ["nominal.js"],
					}
				`),
				"/home/src/workspaces/solution/sub-project/index.js": stringtestutil.Dedent(`
                    import { Nominal } from '../common/nominal';

                    /**
                     * @typedef {Nominal<string, 'MyNominal'>} MyNominal
                     */
				`),
				"/home/src/workspaces/solution/sub-project/tsconfig.json": stringtestutil.Dedent(`
				{
					"extends": "../tsconfig.base.json",
					"compilerOptions": {
						"composite": true,
					},
					"references": [
						{ "path": "../common" },
					],
					"include": ["./index.js"],
				}`),
				"/home/src/workspaces/solution/sub-project-2/index.js": stringtestutil.Dedent(`
                    import { MyNominal } from '../sub-project/index';

                    const variable = {
                        key: /** @type {MyNominal} */('value'),
                    };

                    /**
                     * @return {keyof typeof variable}
                     */
                    export function getVar() {
                        return 'key';
                    }
				`),
				"/home/src/workspaces/solution/sub-project-2/tsconfig.json": stringtestutil.Dedent(`
				{
                    "extends": "../tsconfig.base.json",
                    "compilerOptions": {
                        "composite": true,
                    },
                    "references": [
                        { "path": "../sub-project" },
                    ],
                    "include": ["./index.js"],
                }`),
				"/home/src/workspaces/solution/tsconfig.json": stringtestutil.Dedent(`
				{
                    "compilerOptions": {
                        "composite": true,
                    },
                    "references": [
                        { "path": "./sub-project" },
                        { "path": "./sub-project-2" },
                    ],
                    "include": [],
                }`),
				"/home/src/workspaces/solution/tsconfig.base.json": stringtestutil.Dedent(`
				{
                    "compilerOptions": {
                        "skipLibCheck": true,
                        "rootDir": "./",
                        "outDir": "../lib",
                        "allowJs": true,
                        "checkJs": true,
                        "declaration": true,
                    },
                }`),
				tscLibPath + "/lib.d.ts": strings.Replace(tscDefaultLibContent, "interface SymbolConstructor {", "interface SymbolConstructor {\n    readonly species: symbol;", 1),
			},
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--b"},
		},
		{
			subScenario: `loads js-based projects with non-moved json files and emits them correctly`,
			files: FileMap{
				"/home/src/workspaces/solution/common/obj.json": stringtestutil.Dedent(`
				{
                    "val": 42,
                }`),
				"/home/src/workspaces/solution/common/index.ts": stringtestutil.Dedent(`
                    import x = require("./obj.json");
                    export = x;
                `),
				"/home/src/workspaces/solution/common/tsconfig.json": stringtestutil.Dedent(`
				{
                    "extends": "../tsconfig.base.json",
                    "compilerOptions": {
                        "outDir": null,
                        "composite": true,
                    },
                    "include": ["index.ts", "obj.json"],
                }`),
				"/home/src/workspaces/solution/sub-project/index.js": stringtestutil.Dedent(`
                    import mod from '../common';

                    export const m = mod;
				`),
				"/home/src/workspaces/solution/sub-project/tsconfig.json": stringtestutil.Dedent(`
				{
                    "extends": "../tsconfig.base.json",
                    "compilerOptions": {
                        "composite": true,
                    },
                    "references": [
                        { "path": "../common" },
                    ],
                    "include": ["./index.js"],
                }`),
				"/home/src/workspaces/solution/sub-project-2/index.js": stringtestutil.Dedent(`
                    import { m } from '../sub-project/index';

                    const variable = {
                        key: m,
                    };

                    export function getVar() {
                        return variable;
                    }
				`),
				"/home/src/workspaces/solution/sub-project-2/tsconfig.json": stringtestutil.Dedent(`
				{
					"extends": "../tsconfig.base.json",
					"compilerOptions": {
						"composite": true,
					},
                    "references": [
                        { "path": "../sub-project" },
                    ],
                    "include": ["./index.js"],
                }`),
				"/home/src/workspaces/solution/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
					},
					"references": [
						{ "path": "./sub-project" },
						{ "path": "./sub-project-2" },
                    ],
                    "include": [],
                }`),
				"/home/src/workspaces/solution/tsconfig.base.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"skipLibCheck": true,
						"rootDir": "./",
						"outDir": "../out",
						"allowJs": true,
						"checkJs": true,
						"resolveJsonModule": true,
						"esModuleInterop": true,
						"declaration": true,
					},
                }`),
			},
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"-b"},
		},
	}

	for _, test := range testCases {
		test.run(t, "javascriptProjectEmit")
	}
}

func TestBuildLateBoundSymbol(t *testing.T) {
	t.Parallel()
	testCases := []*tscInput{
		{
			subScenario: "interface is merged and contains late bound member",
			files: FileMap{
				"/home/src/workspaces/project/src/globals.d.ts": stringtestutil.Dedent(`
                    interface SymbolConstructor {
                        (description?: string | number): symbol;
                    }
                    declare var Symbol: SymbolConstructor;
                `),
				"/home/src/workspaces/project/src/hkt.ts": `export interface HKT<T> { }`,
				"/home/src/workspaces/project/src/main.ts": stringtestutil.Dedent(`
                    import { HKT } from "./hkt";

                    const sym = Symbol();

                    declare module "./hkt" {
                        interface HKT<T> {
                            [sym]: { a: T }
                        }
                    }
                    const x = 10;
                    type A = HKT<number>[typeof sym];
                `),
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
                    "compilerOptions": {
                        "rootDir": "src",
                        "incremental": true,
                    },
                }`),
			},
			commandLineArgs: []string{"--b", "--verbose"},
			edits: []*tscEdit{
				{
					caption: "incremental-declaration-doesnt-change",
					edit: func(sys *testSys) {
						sys.replaceFileText("/home/src/workspaces/project/src/main.ts", "const x = 10;", "")
					},
				},
				{
					caption: "incremental-declaration-doesnt-change",
					edit: func(sys *testSys) {
						sys.appendFile("/home/src/workspaces/project/src/main.ts", "const x = 10;")
					},
				},
			},
		},
	}

	for _, test := range testCases {
		test.run(t, "lateBoundSymbol")
	}
}

func TestBuildModuleSpecifiers(t *testing.T) {
	t.Parallel()
	testCases := []*tscInput{
		{
			subScenario: `synthesized module specifiers resolve correctly`,
			files: FileMap{
				"/home/src/workspaces/packages/solution/common/nominal.ts": stringtestutil.Dedent(`
                    export declare type Nominal<T, Name extends string> = T & {
                        [Symbol.species]: Name;
                    };
				`),
				"/home/src/workspaces/packages/solution/common/tsconfig.json": stringtestutil.Dedent(`
				{
                    "extends": "../../tsconfig.base.json",
                    "compilerOptions": {
                        "composite": true
                    },
                    "include": ["nominal.ts"]
				}
				`),
				"/home/src/workspaces/packages/solution/sub-project/index.ts": stringtestutil.Dedent(`
                    import { Nominal } from '../common/nominal';

                    export type MyNominal = Nominal<string, 'MyNominal'>;
				`),
				"/home/src/workspaces/packages/solution/sub-project/tsconfig.json": stringtestutil.Dedent(`
                    {
                        "extends": "../../tsconfig.base.json",
                        "compilerOptions": {
                            "composite": true
                        },
                        "references": [
                            { "path": "../common" }
                        ],
                        "include": ["./index.ts"]
                    }
                `),
				"/home/src/workspaces/packages/solution/sub-project-2/index.ts": stringtestutil.Dedent(`
                    import { MyNominal } from '../sub-project/index';

                    const variable = {
                        key: 'value' as MyNominal,
                    };

                    export function getVar(): keyof typeof variable {
                        return 'key';
                    }
				`),
				"/home/src/workspaces/packages/solution/sub-project-2/tsconfig.json": stringtestutil.Dedent(`
                    {
                        "extends": "../../tsconfig.base.json",
                        "compilerOptions": {
                            "composite": true
                        },
                        "references": [
                            { "path": "../sub-project" }
                        ],
                        "include": ["./index.ts"]
                    }
                `),
				"/home/src/workspaces/packages/solution/tsconfig.json": stringtestutil.Dedent(`
                    {
                        "compilerOptions": {
                            "composite": true
                        },
                        "references": [
                            { "path": "./sub-project" },
                            { "path": "./sub-project-2" }
                        ],
                        "include": []
                    }
                `),
				"/home/src/workspaces/packages/tsconfig.base.json": stringtestutil.Dedent(`
                    {
                        "compilerOptions": {
                            "skipLibCheck": true,
                            "rootDir": "./",
                            "outDir": "lib"
						}
                    }
                `),
				"/home/src/workspaces/packages/tsconfig.json": stringtestutil.Dedent(`
                    {
                        "compilerOptions": {
                            "composite": true
                        },
                        "references": [
                            { "path": "./solution" },
                        ],
                        "include": [],
                    }
                `),
				tscLibPath + "/lib.d.ts": strings.Replace(tscDefaultLibContent, "interface SymbolConstructor {", "interface SymbolConstructor {\n    readonly species: symbol;", 1),
			},
			cwd:             "/home/src/workspaces/packages",
			commandLineArgs: []string{"-b", "--verbose"},
		},
		{
			subScenario: `synthesized module specifiers across projects resolve correctly`,
			files: FileMap{
				"/home/src/workspaces/packages/src-types/index.ts": stringtestutil.Dedent(`
                    export * from './dogconfig.js';`),
				"/home/src/workspaces/packages/src-types/dogconfig.ts": stringtestutil.Dedent(`
                    export interface DogConfig {
                        name: string;
					}
				`),
				"/home/src/workspaces/packages/src-dogs/index.ts": stringtestutil.Dedent(`
                    export * from 'src-types';
                    export * from './lassie/lassiedog.js';
				`),
				"/home/src/workspaces/packages/src-dogs/dogconfig.ts": stringtestutil.Dedent(`
                    import { DogConfig } from 'src-types';

                    export const DOG_CONFIG: DogConfig = {
                        name: 'Default dog',
                    };
				`),
				"/home/src/workspaces/packages/src-dogs/dog.ts": stringtestutil.Dedent(`
                    import { DogConfig } from 'src-types';
                    import { DOG_CONFIG } from './dogconfig.js';
                    
                    export abstract class Dog {
                    
                        public static getCapabilities(): DogConfig {
                            return DOG_CONFIG;
                        }
                    }
				`),
				"/home/src/workspaces/packages/src-dogs/lassie/lassiedog.ts": stringtestutil.Dedent(`
                    import { Dog } from '../dog.js';
                    import { LASSIE_CONFIG } from './lassieconfig.js';
                    
                    export class LassieDog extends Dog {
                        protected static getDogConfig = () => LASSIE_CONFIG;
                    }
				`),
				"/home/src/workspaces/packages/src-dogs/lassie/lassieconfig.ts": stringtestutil.Dedent(`
                    import { DogConfig } from 'src-types';

                    export const LASSIE_CONFIG: DogConfig = { name: 'Lassie' };
				`),
				"/home/src/workspaces/packages/tsconfig-base.json": stringtestutil.Dedent(`
                    {
                        "compilerOptions": {
                            "declaration": true,
                            "module": "node16",
                        },
                    }
				`),
				"/home/src/workspaces/packages/src-types/package.json": stringtestutil.Dedent(`
				{
                    "type": "module",
                    "exports": "./index.js"
                }`),
				"/home/src/workspaces/packages/src-dogs/package.json": stringtestutil.Dedent(`
				{
                    "type": "module",
                    "exports": "./index.js"
                }`),
				"/home/src/workspaces/packages/src-types/tsconfig.json": stringtestutil.Dedent(`
				{
                    "extends": "../tsconfig-base.json",
                    "compilerOptions": {
                        "composite": true,
                    },
                    "include": [
                        "**/*",
                    ],
                }`),
				"/home/src/workspaces/packages/src-dogs/tsconfig.json": stringtestutil.Dedent(`
				{
                    "extends": "../tsconfig-base.json",
                    "compilerOptions": {
                        "composite": true,
                    },
                    "references": [
                        { "path": "../src-types" },
                    ],
                    "include": [
                        "**/*",
                    ],
                }`),
				"/home/src/workspaces/packages/src-types/node_modules": vfstest.Symlink("/home/src/workspaces/packages"),
				"/home/src/workspaces/packages/src-dogs/node_modules":  vfstest.Symlink("/home/src/workspaces/packages"),
			},
			cwd:             "/home/src/workspaces/packages",
			commandLineArgs: []string{"-b", "src-types", "src-dogs", "--verbose"},
		},
	}

	for _, test := range testCases {
		test.run(t, "moduleSpecifiers")
	}
}

func TestBuildOutputPaths(t *testing.T) {
	t.Parallel()
	type tscOutputPathScenario struct {
		subScenario      string
		files            FileMap
		expectedDtsNames []string
	}
	runOutputPaths := func(s *tscOutputPathScenario) {
		t.Helper()
		input := &tscInput{
			subScenario:     s.subScenario,
			files:           s.files,
			commandLineArgs: []string{"-b", "-v"},
			edits: []*tscEdit{
				noChange,
				{
					caption:         "Normal build without change, that does not block emit on error to show files that get emitted",
					commandLineArgs: []string{"-p", "/home/src/workspaces/project/tsconfig.json"},
				},
			},
		}
		input.run(t, "outputPaths")
		t.Run("GetOutputFileNames/"+s.subScenario, func(t *testing.T) {
			t.Parallel()
			sys := newTestSys(input, false)
			config, _ := tsoptions.GetParsedCommandLineOfConfigFile("/home/src/workspaces/project/tsconfig.json", &core.CompilerOptions{}, sys, nil)
			assert.DeepEqual(t, slices.Collect(config.GetOutputFileNames()), s.expectedDtsNames)
		})
	}
	testCases := []*tscOutputPathScenario{
		{
			subScenario: "when rootDir is not specified",
			files: FileMap{
				"/home/src/workspaces/project/src/index.ts": "export const x = 10;",
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
                    "compilerOptions": {
                        "outDir": "dist",
                    },
                }`),
			},
			expectedDtsNames: []string{
				"/home/src/workspaces/project/dist/index.js",
			},
		},
		{
			subScenario: "when rootDir is not specified and is composite",
			files: FileMap{
				"/home/src/workspaces/project/src/index.ts": "export const x = 10;",
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
                    "compilerOptions": {
                        "outDir": "dist",
						"composite": true,
                    },
                }`),
			},
			expectedDtsNames: []string{
				"/home/src/workspaces/project/dist/src/index.js",
				"/home/src/workspaces/project/dist/src/index.d.ts",
			},
		},
		{
			subScenario: "when rootDir is specified",
			files: FileMap{
				"/home/src/workspaces/project/src/index.ts": "export const x = 10;",
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
                    "compilerOptions": {
                        "outDir": "dist",
						"rootDir": "src",
                    },
                }`),
			},
			expectedDtsNames: []string{
				"/home/src/workspaces/project/dist/index.js",
			},
		},
		{
			// !!! sheetal error missing as not yet implemented
			subScenario: "when rootDir is specified but not all files belong to rootDir",
			files: FileMap{
				"/home/src/workspaces/project/src/index.ts":  "export const x = 10;",
				"/home/src/workspaces/project/types/type.ts": "export type t = string;",
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
                    "compilerOptions": {
                        "outDir": "dist",
						"rootDir": "src",
                    },
                }`),
			},
			expectedDtsNames: []string{
				"/home/src/workspaces/project/dist/index.js",
				"/home/src/workspaces/project/types/type.js",
			},
		},
		{
			// !!! sheetal error missing as not yet implemented
			subScenario: "when rootDir is specified but not all files belong to rootDir and is composite",
			files: FileMap{
				"/home/src/workspaces/project/src/index.ts":  "export const x = 10;",
				"/home/src/workspaces/project/types/type.ts": "export type t = string;",
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
                    "compilerOptions": {
                        "outDir": "dist",
						"rootDir": "src",
						"composite": true
                    },
                }`),
			},
			expectedDtsNames: []string{
				"/home/src/workspaces/project/dist/index.js",
				"/home/src/workspaces/project/dist/index.d.ts",
				"/home/src/workspaces/project/types/type.js",
				"/home/src/workspaces/project/types/type.d.ts",
			},
		},
	}
	for _, test := range testCases {
		runOutputPaths(test)
	}
}

func TestBuildProgramUpdates(t *testing.T) {
	t.Parallel()
	testCases := []*tscInput{
		{
			subScenario: "when referenced project change introduces error in the down stream project and then fixes it",
			files: FileMap{
				"/user/username/projects/sample1/Library/tsconfig.json": stringtestutil.Dedent(`
				{ 
					"compilerOptions": {
						"composite": true
					}
				}`),
				"/user/username/projects/sample1/Library/library.ts": stringtestutil.Dedent(`
					interface SomeObject
					{
						message: string;
					}

					export function createSomeObject(): SomeObject
					{
						return {
							message: "new Object"
						};
					}
				`),
				"/user/username/projects/sample1/App/tsconfig.json": stringtestutil.Dedent(`
				{ 
					"references": [{ "path": "../Library" }]
				}`),
				"/user/username/projects/sample1/App/app.ts": stringtestutil.Dedent(`
					import { createSomeObject } from "../Library/library";
					createSomeObject().message;
				`),
			},
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"-b", "-w", "App"},
			edits: []*tscEdit{
				{
					caption: "Introduce error",
					// Change message in library to message2
					edit: func(sys *testSys) {
						sys.replaceFileTextAll("/user/username/projects/sample1/Library/library.ts", "message", "message2")
					},
				},
				{
					caption: "Fix error",
					// Revert library changes
					edit: func(sys *testSys) {
						sys.replaceFileTextAll("/user/username/projects/sample1/Library/library.ts", "message2", "message")
					},
				},
			},
		},
		{
			subScenario: "declarationEmitErrors when fixing error files all files are emitted",
			files: FileMap{
				"/user/username/projects/solution/app/fileWithError.ts": stringtestutil.Dedent(`
					export var myClassWithError = class {
						tags() { }
						private p = 12
					};
				`),
				"/user/username/projects/solution/app/fileWithoutError.ts": "export class myClass { }",
				"/user/username/projects/solution/app/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true
					}
				}`),
			},
			cwd:             "/user/username/projects/solution",
			commandLineArgs: []string{"-b", "-w", "app"},
			edits: []*tscEdit{
				{
					caption: "Fix error",
					edit: func(sys *testSys) {
						sys.replaceFileText("/user/username/projects/solution/app/fileWithError.ts", "private p = 12", "")
					},
				},
			},
		},
		{
			subScenario: "declarationEmitErrors when file with no error changes",
			files: FileMap{
				"/user/username/projects/solution/app/fileWithError.ts": stringtestutil.Dedent(`
					export var myClassWithError = class {
						tags() { }
						private p = 12
					};
				`),
				"/user/username/projects/solution/app/fileWithoutError.ts": "export class myClass { }",
				"/user/username/projects/solution/app/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true
					}
				}`),
			},
			cwd:             "/user/username/projects/solution",
			commandLineArgs: []string{"-b", "-w", "app"},
			edits: []*tscEdit{
				{
					caption: "Change fileWithoutError",
					edit: func(sys *testSys) {
						sys.replaceFileTextAll("/user/username/projects/solution/app/fileWithoutError.ts", "myClass", "myClass2")
					},
				},
			},
		},
		{
			subScenario: "declarationEmitErrors introduceError when fixing errors only changed file is emitted",
			files: FileMap{
				"/user/username/projects/solution/app/fileWithError.ts": stringtestutil.Dedent(`
					export var myClassWithError = class {
						tags() { }
						
					};
				`),
				"/user/username/projects/solution/app/fileWithoutError.ts": "export class myClass { }",
				"/user/username/projects/solution/app/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true
					}
				}`),
			},
			cwd:             "/user/username/projects/solution",
			commandLineArgs: []string{"-b", "-w", "app"},
			edits: []*tscEdit{
				{
					caption: "Introduce error",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/user/username/projects/solution/app/fileWithError.ts", stringtestutil.Dedent(`
							export var myClassWithError = class {
								tags() { }
								private p = 12
							};
						`), false)
					},
				},
				{
					caption: "Fix error",
					edit: func(sys *testSys) {
						sys.replaceFileText("/user/username/projects/solution/app/fileWithError.ts", "private p = 12", "")
					},
				},
			},
		},
		{
			subScenario: "declarationEmitErrors introduceError when file with no error changes",
			files: FileMap{
				"/user/username/projects/solution/app/fileWithError.ts": stringtestutil.Dedent(`
					export var myClassWithError = class {
						tags() { }
						
					};
				`),
				"/user/username/projects/solution/app/fileWithoutError.ts": "export class myClass { }",
				"/user/username/projects/solution/app/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true
					}
				}`),
			},
			cwd:             "/user/username/projects/solution",
			commandLineArgs: []string{"-b", "-w", "app"},
			edits: []*tscEdit{
				{
					caption: "Introduce error",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/user/username/projects/solution/app/fileWithError.ts", stringtestutil.Dedent(`
							export var myClassWithError = class {
								tags() { }
								private p = 12
							};
						`), false)
					},
				},
				{
					caption: "Change fileWithoutError",
					edit: func(sys *testSys) {
						sys.replaceFileTextAll("/user/username/projects/solution/app/fileWithoutError.ts", "myClass", "myClass2")
					},
				},
			},
		},
		{
			subScenario: "works when noUnusedParameters changes to false",
			files: FileMap{
				"/user/username/projects/myproject/index.ts": `const fn = (a: string, b: string) => b;`,
				"/user/username/projects/myproject/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"noUnusedParameters": true,
					},
				}`),
			},
			cwd:             "/user/username/projects/myproject",
			commandLineArgs: []string{"-b", "-w"},

			edits: []*tscEdit{
				{
					caption: "Change tsconfig to set noUnusedParameters to false",
					edit: func(sys *testSys) {
						sys.writeFileNoError(
							`/user/username/projects/myproject/tsconfig.json`,
							stringtestutil.Dedent(`
							{
								"compilerOptions": {
									"noUnusedParameters": false,
								},
							}`),
							false,
						)
					},
				},
			},
		},
		{
			subScenario: "works with extended source files",
			cwd:         "/user/username/projects/project",
			files: FileMap{
				"/user/username/projects/project/commonFile1.ts":      "let x = 1",
				"/user/username/projects/project/commonFile2.ts":      "let y = 1",
				"/user/username/projects/project/alpha.tsconfig.json": "{}",
				"/user/username/projects/project/project1.tsconfig.json": stringtestutil.Dedent(`
					{
						"extends": "./alpha.tsconfig.json",
						"compilerOptions": {
							"composite": true,
						},
						"files": ["commonFile1.ts", "commonFile2.ts"],
					}
				`),
				"/user/username/projects/project/bravo.tsconfig.json": stringtestutil.Dedent(`
					{
						"extends": "./alpha.tsconfig.json",
					}
				`),
				"/user/username/projects/project/other.ts": "let z = 0;",
				"/user/username/projects/project/project2.tsconfig.json": stringtestutil.Dedent(`
					{
						"extends": "./bravo.tsconfig.json",
						"compilerOptions": {
							"composite": true,
						},
						"files": ["other.ts"],
					}
				`),
				"/user/username/projects/project/other2.ts": "let k = 0;",
				"/user/username/projects/project/extendsConfig1.tsconfig.json": stringtestutil.Dedent(`
					{
						"compilerOptions": {
							"composite": true,
						},
					}
				`),
				"/user/username/projects/project/extendsConfig2.tsconfig.json": stringtestutil.Dedent(`
					{
						"compilerOptions": {
							"strictNullChecks": false,
						},
					}
				`),
				"/user/username/projects/project/extendsConfig3.tsconfig.json": stringtestutil.Dedent(`
					{
						"compilerOptions": {
							"noImplicitAny": true,
						},
					}
				`),
				"/user/username/projects/project/project3.tsconfig.json": stringtestutil.Dedent(`
				{
                    "extends": [
                        "./extendsConfig1.tsconfig.json",
                        "./extendsConfig2.tsconfig.json",
                        "./extendsConfig3.tsconfig.json",
                    ],
                    "compilerOptions": {
                        "composite": false,
                    },
                    "files": ["other2.ts"],
                }`),
			},
			commandLineArgs: []string{"-b", "-w", "-v", "project1.tsconfig.json", "project2.tsconfig.json", "project3.tsconfig.json"},
			edits: []*tscEdit{
				{
					caption: "Modify alpha config",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/user/username/projects/project/alpha.tsconfig.json", stringtestutil.Dedent(`
						{
                            "compilerOptions": {
								"strict": true
							}
                        }`), false)
					},
				},
				{
					caption: "change bravo config",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/user/username/projects/project/bravo.tsconfig.json", stringtestutil.Dedent(`
						{
                            "extends": "./alpha.tsconfig.json",
                            "compilerOptions": { "strict": false }
                        }`), false)
					},
				},
				{
					caption: "project 2 extends alpha",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/user/username/projects/project/project2.tsconfig.json", stringtestutil.Dedent(`
						{
                            "extends": "./alpha.tsconfig.json",
                        }`), false)
					},
				},
				{
					caption: "update aplha config",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/user/username/projects/project/alpha.tsconfig.json", "{}", false)
					},
				},
				{
					caption: "Modify extendsConfigFile2",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/user/username/projects/project/extendsConfig2.tsconfig.json", stringtestutil.Dedent(`
						{
                            "compilerOptions": { "strictNullChecks": true }
                        }`), false)
					},
				},
				{
					caption: "Modify project 3",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/user/username/projects/project/project3.tsconfig.json", stringtestutil.Dedent(`
						{
                            "extends": ["./extendsConfig1.tsconfig.json", "./extendsConfig2.tsconfig.json"],
                            "compilerOptions": { "composite": false },
                            "files": ["other2.ts"],
                        }`), false)
					},
				},
				{
					caption: "Delete extendedConfigFile2 and report error",
					edit: func(sys *testSys) {
						sys.removeNoError("/user/username/projects/project/extendsConfig2.tsconfig.json")
					},
				},
			},
		},
		{
			subScenario: "works correctly when project with extended config is removed",
			files: FileMap{
				"/user/username/projects/project/commonFile1.ts": "let x = 1",
				"/user/username/projects/project/commonFile2.ts": "let y = 1",
				"/user/username/projects/project/alpha.tsconfig.json": stringtestutil.Dedent(`
				{
                    "compilerOptions": {
                        "strict": true,
                    },
                }`),
				"/user/username/projects/project/project1.tsconfig.json": stringtestutil.Dedent(`
				{
                    "extends": "./alpha.tsconfig.json",
                    "compilerOptions": {
                        "composite": true,
                    },
                    "files": ["commonFile1.ts", "commonFile2.ts"],
                }`),
				"/user/username/projects/project/bravo.tsconfig.json": stringtestutil.Dedent(`
				{
                    "compilerOptions": {
                        "strict": true,
                    },
                }`),
				"/user/username/projects/project/other.ts": "let z = 0;",
				"/user/username/projects/project/project2.tsconfig.json": stringtestutil.Dedent(`
				{
                    "extends": "./bravo.tsconfig.json",
                    "compilerOptions": {
                        "composite": true,
                    },
                    "files": ["other.ts"],
                }`),
				"/user/username/projects/project/tsconfig.json": stringtestutil.Dedent(`
				{
                    "references": [
                        {
                            "path": "./project1.tsconfig.json",
                        },
                        {
                            "path": "./project2.tsconfig.json",
                        },
                    ],
                    "files": [],
                }`),
			},
			cwd:             "/user/username/projects/project",
			commandLineArgs: []string{"-b", "-w", "-v"},
			edits: []*tscEdit{
				{
					caption: "Remove project2 from base config",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/user/username/projects/project/tsconfig.json", stringtestutil.Dedent(`
						{
                            "references": [
                                {
                                    "path": "./project1.tsconfig.json",
                                },
                            ],
                            "files": [],
                        }`), false)
					},
				},
			},
		},
		{
			subScenario: "tsbuildinfo has error",
			files: FileMap{
				"/user/username/projects/project/main.ts":              "export const x = 10;",
				"/user/username/projects/project/tsconfig.json":        "{}",
				"/user/username/projects/project/tsconfig.tsbuildinfo": "Some random string",
			},
			cwd:             "/user/username/projects/project",
			commandLineArgs: []string{"--b", "-i", "-w"},
		},
		{
			subScenario: "when root is source from project reference",
			files: FileMap{
				"/home/src/workspaces/project/lib/tsconfig.json": stringtestutil.Dedent(`
					{
						"compilerOptions": {
							"composite": true,
							"outDir": "./dist"
						}
					}`),
				"/home/src/workspaces/project/lib/foo.ts": `export const FOO: string = 'THEFOOEXPORT';`,
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
					{
						"references": [ { "path": "./lib" } ]
					}`),
				"/home/src/workspaces/project/index.ts": `import { FOO } from "./lib/foo";`,
			},
			commandLineArgs: []string{"--b"},
			edits: []*tscEdit{
				{
					caption: "dts doesnt change",
					edit: func(sys *testSys) {
						sys.appendFile("/home/src/workspaces/project/lib/foo.ts", "const Bar = 10;")
					},
				},
			},
			cwd: "/home/src/workspaces/project",
		},
		{
			subScenario: "when root is source from project reference with composite",
			files: FileMap{
				"/home/src/workspaces/project/lib/tsconfig.json": stringtestutil.Dedent(`
					{
						"compilerOptions": {
							"composite": true,
							"outDir": "./dist"
						}
					}`),
				"/home/src/workspaces/project/lib/foo.ts": `export const FOO: string = 'THEFOOEXPORT';`,
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
					{
						"compilerOptions": {
							"composite": true,
						},
						"references": [ { "path": "./lib" } ]
					}`),
				"/home/src/workspaces/project/index.ts": `import { FOO } from "./lib/foo";`,
			},
			commandLineArgs: []string{"--b"},
			edits: []*tscEdit{
				{
					caption: "dts doesnt change",
					edit: func(sys *testSys) {
						sys.appendFile("/home/src/workspaces/project/lib/foo.ts", "const Bar = 10;")
					},
				},
			},
			cwd: "/home/src/workspaces/project",
		},
	}
	for _, test := range testCases {
		test.run(t, "programUpdates")
	}
}

func TestBuildProjectsBuilding(t *testing.T) {
	t.Parallel()
	addPackageFiles := func(files FileMap, index int) {
		files[fmt.Sprintf(`/user/username/projects/myproject/pkg%d/index.ts`, index)] = fmt.Sprintf(`export const pkg%d = %d;`, index, index)
		var references string
		if index > 0 {
			references = `"references": [{ "path": "../pkg0" }],`
		}
		files[fmt.Sprintf(`/user/username/projects/myproject/pkg%d/tsconfig.json`, index)] = stringtestutil.Dedent(fmt.Sprintf(`
		{
			"compilerOptions": { "composite": true },
			%s
		}`, references))
	}
	addSolution := func(files FileMap, count int) {
		var pkgReferences []string
		for i := range count {
			pkgReferences = append(pkgReferences, fmt.Sprintf(`{ "path": "./pkg%d" }`, i))
		}
		files[`/user/username/projects/myproject/tsconfig.json`] = stringtestutil.Dedent(fmt.Sprintf(`
		{
			"compilerOptions": { "composite": true },
			"references": [
				%s
			]
		}`, strings.Join(pkgReferences, ",\n\t\t\t\t")))
	}
	files := func(count int) FileMap {
		files := FileMap{}
		for i := range count {
			addPackageFiles(files, i)
		}
		addSolution(files, count)
		return files
	}

	getTestCases := func(pkgCount int) []*tscInput {
		edits := []*tscEdit{
			{
				caption: "dts doesn't change",
				edit: func(sys *testSys) {
					sys.appendFile(`/user/username/projects/myproject/pkg0/index.ts`, `const someConst2 = 10;`)
				},
			},
			noChange,
			{
				caption: "dts change",
				edit: func(sys *testSys) {
					sys.appendFile(`/user/username/projects/myproject/pkg0/index.ts`, `export const someConst = 10;`)
				},
			},
			noChange,
		}
		return []*tscInput{
			{
				subScenario:     fmt.Sprintf(`when there are %d projects in a solution`, pkgCount),
				files:           files(pkgCount),
				cwd:             "/user/username/projects/myproject",
				commandLineArgs: []string{"-b", "-v"},
				edits:           edits,
			},
			{
				subScenario:     fmt.Sprintf(`when there are %d projects in a solution`, pkgCount),
				files:           files(pkgCount),
				cwd:             "/user/username/projects/myproject",
				commandLineArgs: []string{"-b", "-w", "-v"},
				edits:           edits,
			},
		}
	}

	testCases := slices.Concat(
		getTestCases(3),
		getTestCases(5),
		getTestCases(8),
		getTestCases(23),
	)

	for _, test := range testCases {
		test.run(t, "projectsBuilding")
	}
}

func TestBuildProjectReferenceWithRootDirInParent(t *testing.T) {
	t.Parallel()
	getBuildProjectReferenceWithRootDirInParentFileMap := func(modify func(files FileMap)) FileMap {
		files := FileMap{
			"/home/src/workspaces/solution/src/main/a.ts": stringtestutil.Dedent(`
				import { b } from './b';
				const a = b;
			`),
			"/home/src/workspaces/solution/src/main/b.ts": stringtestutil.Dedent(`
				export const b = 0;
			`),
			"/home/src/workspaces/solution/src/main/tsconfig.json": stringtestutil.Dedent(`
			{
				"extends": "../../tsconfig.base.json",
				"references": [
					{ "path": "../other" },
				],
			}`),
			"/home/src/workspaces/solution/src/other/other.ts": stringtestutil.Dedent(`
				export const Other = 0;
			`),
			"/home/src/workspaces/solution/src/other/tsconfig.json": stringtestutil.Dedent(`
			{
				"extends": "../../tsconfig.base.json",
			}
			`),
			"/home/src/workspaces/solution/tsconfig.base.json": stringtestutil.Dedent(`
			{
				"compilerOptions": {
					"composite": true,
					"declaration": true,
					"rootDir": "./src/",
					"outDir": "./dist/",
					"skipDefaultLibCheck": true,
				},
				"exclude": [
					"node_modules",
				],
			}`),
		}
		if modify != nil {
			modify(files)
		}
		return files
	}
	testCases := []*tscInput{
		{
			subScenario:     "builds correctly",
			files:           getBuildProjectReferenceWithRootDirInParentFileMap(nil),
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--b", "src/main", "/home/src/workspaces/solution/src/other"},
		},
		{
			subScenario: "reports error for same tsbuildinfo file because no rootDir in the base",
			files: getBuildProjectReferenceWithRootDirInParentFileMap(
				func(files FileMap) {
					text, _ := files["/home/src/workspaces/solution/tsconfig.base.json"]
					files["/home/src/workspaces/solution/tsconfig.base.json"] = strings.Replace(text.(string), `"rootDir": "./src/",`, "", 1)
				},
			),
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--b", "src/main", "--verbose"},
		},
		{
			subScenario: "reports error for same tsbuildinfo file",
			files: getBuildProjectReferenceWithRootDirInParentFileMap(
				func(files FileMap) {
					files["/home/src/workspaces/solution/src/main/tsconfig.json"] = stringtestutil.Dedent(`
                    {
                        "compilerOptions": { "composite": true, "outDir": "../../dist/" },
                        "references": [{ "path": "../other" }]
                    }`)
					files["/home/src/workspaces/solution/src/other/tsconfig.json"] = stringtestutil.Dedent(`
                    {
                        "compilerOptions": { "composite": true, "outDir": "../../dist/" },
                    }`)
				},
			),
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--b", "src/main", "--verbose"},
			edits:           noChangeOnlyEdit,
		},
		{
			subScenario: "reports error for same tsbuildinfo file without incremental",
			files: getBuildProjectReferenceWithRootDirInParentFileMap(
				func(files FileMap) {
					files["/home/src/workspaces/solution/src/main/tsconfig.json"] = stringtestutil.Dedent(`
                    {
                        "compilerOptions": { "outDir": "../../dist/" },
                        "references": [{ "path": "../other" }]
                    }`)
					files["/home/src/workspaces/solution/src/other/tsconfig.json"] = stringtestutil.Dedent(`
                    {
                        "compilerOptions": { "composite": true, "outDir": "../../dist/" },
                    }`)
				},
			),
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--b", "src/main", "--verbose"},
		},
		{
			subScenario: "reports error for same tsbuildinfo file without incremental with tsc",
			files: getBuildProjectReferenceWithRootDirInParentFileMap(
				func(files FileMap) {
					files["/home/src/workspaces/solution/src/main/tsconfig.json"] = stringtestutil.Dedent(`
                    {
                        "compilerOptions": { "outDir": "../../dist/" },
                        "references": [{ "path": "../other" }]
                    }`)
					files["/home/src/workspaces/solution/src/other/tsconfig.json"] = stringtestutil.Dedent(`
                    {
                        "compilerOptions": { "composite": true, "outDir": "../../dist/" },
                    }`)
				},
			),
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--b", "src/other", "--verbose"},
			edits: []*tscEdit{
				{
					caption:         "Running tsc on main",
					commandLineArgs: []string{"-p", "src/main"},
				},
			},
		},
		{
			subScenario: "reports no error when tsbuildinfo differ",
			files: getBuildProjectReferenceWithRootDirInParentFileMap(
				func(files FileMap) {
					delete(files, "/home/src/workspaces/solution/src/main/tsconfig.json")
					delete(files, "/home/src/workspaces/solution/src/other/tsconfig.json")
					files["/home/src/workspaces/solution/src/main/tsconfig.main.json"] = stringtestutil.Dedent(`
                    {
                        "compilerOptions": { "composite": true, "outDir": "../../dist/" },
                        "references": [{ "path": "../other/tsconfig.other.json" }]
                    }`)
					files["/home/src/workspaces/solution/src/other/tsconfig.other.json"] = stringtestutil.Dedent(`
                    {
                        "compilerOptions": { "composite": true, "outDir": "../../dist/" },
                    }`)
				},
			),
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--b", "src/main/tsconfig.main.json", "--verbose"},
			edits:           noChangeOnlyEdit,
		},
	}

	for _, test := range testCases {
		test.run(t, "projectReferenceWithRootDirInParent")
	}
}

func TestBuildReexport(t *testing.T) {
	t.Parallel()
	testCases := []*tscInput{
		{
			subScenario: "Reports errors correctly",
			files: FileMap{
				"/user/username/projects/reexport/src/tsconfig.json": stringtestutil.Dedent(`
				{
                    "files": [],
                    "include": [],
                    "references": [{ "path": "./pure" }, { "path": "./main" }],
                }`),
				"/user/username/projects/reexport/src/main/tsconfig.json": stringtestutil.Dedent(`
				{
                    "compilerOptions": {
                        "outDir": "../../out",
                        "rootDir": "../",
                    },
                    "include": ["**/*.ts"],
                    "references": [{ "path": "../pure" }],
                }`),
				"/user/username/projects/reexport/src/main/index.ts": stringtestutil.Dedent(`
                    import { Session } from "../pure";

                    export const session: Session = {
                        foo: 1
                    };
                `),
				"/user/username/projects/reexport/src/pure/tsconfig.json": stringtestutil.Dedent(`
				{
                    "compilerOptions": {
                        "composite": true,
                        "outDir": "../../out",
                        "rootDir": "../",
                    },
                    "include": ["**/*.ts"],
                }`),
				"/user/username/projects/reexport/src/pure/index.ts": `export * from "./session";`,
				"/user/username/projects/reexport/src/pure/session.ts": stringtestutil.Dedent(`
                    export interface Session {
                        foo: number;
                        // bar: number;
                    }
                `),
			},
			cwd:             `/user/username/projects/reexport`,
			commandLineArgs: []string{"-b", "-w", "-verbose", "src"},
			edits: []*tscEdit{
				{
					caption: "Introduce error",
					edit: func(sys *testSys) {
						sys.replaceFileText(`/user/username/projects/reexport/src/pure/session.ts`, "// ", "")
					},
				},
				{
					caption: "Fix error",
					edit: func(sys *testSys) {
						sys.replaceFileText(`/user/username/projects/reexport/src/pure/session.ts`, "bar: ", "// bar: ")
					},
				},
			},
		},
	}

	for _, test := range testCases {
		test.run(t, "reexport")
	}
}

func TestBuildResolveJsonModule(t *testing.T) {
	t.Parallel()
	type buildResolveJsonModuleScenario struct {
		subScenario               string
		tsconfigFiles             string
		additionalCompilerOptions string
		skipOutdir                bool
		modifyFiles               func(files FileMap)
		edits                     []*tscEdit
	}
	getBuildResolveJsonModuleFileMap := func(composite bool, s *buildResolveJsonModuleScenario) FileMap {
		var outDirStr string
		if !s.skipOutdir {
			outDirStr = `"outDir": "dist",`
		}
		files := FileMap{
			"/home/src/workspaces/solution/project/src/hello.json": stringtestutil.Dedent(`
			{
				"hello": "world"
			}`),
			"/home/src/workspaces/solution/project/src/index.ts": stringtestutil.Dedent(`
				import hello from "./hello.json"
				export default hello.hello
			`),
			"/home/src/workspaces/solution/project/tsconfig.json": stringtestutil.Dedent(fmt.Sprintf(`
			{
				"compilerOptions": {
					"composite": %t,
					"moduleResolution": "node",
					"module": "commonjs",
					"resolveJsonModule": true,
					"esModuleInterop": true,
					"allowSyntheticDefaultImports": true,
					%s
					"skipDefaultLibCheck": true,
					%s
				},
				%s
			}`, composite, outDirStr, s.additionalCompilerOptions, s.tsconfigFiles)),
		}
		if s.modifyFiles != nil {
			s.modifyFiles(files)
		}
		return files
	}
	getBuildResolveJsonModuleTestCases := func(scenarios []*buildResolveJsonModuleScenario) []*tscInput {
		testCases := make([]*tscInput, 0, len(scenarios)*2)
		for _, s := range scenarios {
			testCases = append(
				testCases,
				&tscInput{
					subScenario:     s.subScenario,
					files:           getBuildResolveJsonModuleFileMap(true, s),
					cwd:             "/home/src/workspaces/solution",
					commandLineArgs: []string{"--b", "project", "--v", "--explainFiles", "--listEmittedFiles"},
					edits:           s.edits,
				},
				&tscInput{
					subScenario:     s.subScenario + " non-composite",
					files:           getBuildResolveJsonModuleFileMap(false, s),
					cwd:             "/home/src/workspaces/solution",
					commandLineArgs: []string{"--b", "project", "--v", "--explainFiles", "--listEmittedFiles"},
					edits:           s.edits,
				},
			)
		}
		return testCases
	}
	scenarios := []*buildResolveJsonModuleScenario{
		{
			subScenario:   "include only",
			tsconfigFiles: `"include": [ "src/**/*" ],`,
		},
		{
			subScenario:   "include only without outDir",
			tsconfigFiles: `"include": [ "src/**/*" ],`,
			skipOutdir:    true,
		},
		{
			subScenario:               "include only with json not in rootDir",
			tsconfigFiles:             `"include": [ "src/**/*" ],`,
			additionalCompilerOptions: `"rootDir": "src",`,
			modifyFiles: func(files FileMap) {
				text, _ := files["/home/src/workspaces/solution/project/src/hello.json"]
				delete(files, "/home/src/workspaces/solution/project/src/hello.json")
				files["/home/src/workspaces/solution/project/hello.json"] = text
				text, _ = files["/home/src/workspaces/solution/project/src/index.ts"]
				files["/home/src/workspaces/solution/project/src/index.ts"] = strings.Replace(text.(string), "./hello.json", "../hello.json", 1)
			},
		},
		{
			subScenario:   "include only with json without rootDir but outside configDirectory",
			tsconfigFiles: `"include": [ "src/**/*" ],`,
			modifyFiles: func(files FileMap) {
				text, _ := files["/home/src/workspaces/solution/project/src/hello.json"]
				delete(files, "/home/src/workspaces/solution/project/src/hello.json")
				files["/home/src/workspaces/solution/hello.json"] = text
				text, _ = files["/home/src/workspaces/solution/project/src/index.ts"]
				files["/home/src/workspaces/solution/project/src/index.ts"] = strings.Replace(text.(string), "./hello.json", "../../hello.json", 1)
			},
		},
		{
			subScenario:   "include of json along with other include",
			tsconfigFiles: `"include": [ "src/**/*", "src/**/*.json" ],`,
		},
		{
			subScenario:   "include of json along with other include and file name matches ts file",
			tsconfigFiles: `"include": [ "src/**/*", "src/**/*.json" ],`,
			modifyFiles: func(files FileMap) {
				text, _ := files["/home/src/workspaces/solution/project/src/hello.json"]
				delete(files, "/home/src/workspaces/solution/project/src/hello.json")
				files["/home/src/workspaces/solution/project/src/index.json"] = text
				text, _ = files["/home/src/workspaces/solution/project/src/index.ts"]
				files["/home/src/workspaces/solution/project/src/index.ts"] = strings.Replace(text.(string), "./hello.json", "./index.json", 1)
			},
		},
		{
			subScenario:   "files containing json file",
			tsconfigFiles: `"files": [ "src/index.ts", "src/hello.json", ],`,
		},
		{
			subScenario:   "include and files",
			tsconfigFiles: `"files": [ "src/hello.json" ], "include": [ "src/**/*" ],`,
		},
		{
			subScenario:               "sourcemap",
			tsconfigFiles:             `"files": [ "src/index.ts", "src/hello.json", ],`,
			additionalCompilerOptions: `"sourceMap": true,`,
			edits:                     noChangeOnlyEdit,
		},
		{
			subScenario:   "without outDir",
			tsconfigFiles: `"files": [ "src/index.ts", "src/hello.json", ],`,
			skipOutdir:    true,
			edits:         noChangeOnlyEdit,
		},
	}
	testCases := slices.Concat(
		getBuildResolveJsonModuleTestCases(scenarios),
		[]*tscInput{
			{
				subScenario: "importing json module from project reference",
				files: FileMap{
					"/home/src/workspaces/solution/project/strings/foo.json": stringtestutil.Dedent(`
						{
							"foo": "bar baz"
						}
					`),
					"/home/src/workspaces/solution/project/strings/tsconfig.json": stringtestutil.Dedent(`
						{
							"extends": "../tsconfig.json",
							"include": ["foo.json"],
							"references": [],
						}
					`),
					"/home/src/workspaces/solution/project/main/index.ts": stringtestutil.Dedent(`
						import { foo } from '../strings/foo.json';
						console.log(foo);
					`),
					"/home/src/workspaces/solution/project/main/tsconfig.json": stringtestutil.Dedent(`
						{
							"extends": "../tsconfig.json",
							"include": [
								"./**/*.ts",
							],
							"references": [{
								"path": "../strings/tsconfig.json",
							}],
						}
					`),
					"/home/src/workspaces/solution/project/tsconfig.json": stringtestutil.Dedent(`
						{
							"compilerOptions": {
								"target": "es5",
								"module": "commonjs",
								"rootDir": "./",
								"composite": true,
								"resolveJsonModule": true,
								"strict": true,
								"esModuleInterop": true,
							},
							"references": [
								{ "path": "./strings/tsconfig.json" },
								{ "path": "./main/tsconfig.json" },
							],
							"files": [],
						}
					`),
				},
				cwd:             "/home/src/workspaces/solution",
				commandLineArgs: []string{"--b", "project", "--verbose", "--explainFiles"},
				edits:           noChangeOnlyEdit,
			},
		},
	)

	for _, test := range testCases {
		test.run(t, "resolveJsonModule")
	}
}

func TestBuildRoots(t *testing.T) {
	t.Parallel()
	getBuildRootsFromProjectReferencedProjectFileMap := func(serverFirst bool) FileMap {
		include := core.IfElse(serverFirst, `"src/**/*.ts", "../shared/src/**/*.ts"`, `"../shared/src/**/*.ts", "src/**/*.ts"`)
		return FileMap{
			"/home/src/workspaces/solution/tsconfig.json": stringtestutil.Dedent(`
			{
				"compilerOptions": {
					"composite": true,
				},
				"references": [
					{ "path": "projects/server" },
					{ "path": "projects/shared" },
				],
			}`),
			"/home/src/workspaces/solution/projects/shared/src/myClass.ts": `export class MyClass { }`,
			"/home/src/workspaces/solution/projects/shared/src/logging.ts": stringtestutil.Dedent(`
				export function log(str: string) {
					console.log(str);
				}
			`),
			"/home/src/workspaces/solution/projects/shared/src/random.ts": stringtestutil.Dedent(`
				export function randomFn(str: string) {
					console.log(str);
				}
			`),
			"/home/src/workspaces/solution/projects/shared/tsconfig.json": stringtestutil.Dedent(`
			{
				"extends": "../../tsconfig.json",
				"compilerOptions": {
					"outDir": "./dist",
				},
				"include": ["src/**/*.ts"],
			}`),
			"/home/src/workspaces/solution/projects/server/src/server.ts": stringtestutil.Dedent(`
				import { MyClass } from ':shared/myClass.js';
				console.log('Hello, world!');
			`),
			"/home/src/workspaces/solution/projects/server/tsconfig.json": stringtestutil.Dedent(fmt.Sprintf(`
			{
				"extends": "../../tsconfig.json",
				"compilerOptions": {
					"rootDir": "..",
					"outDir": "./dist",
					"paths": {
						":shared/*": ["./src/../../shared/src/*"],
					},
				},
				"include": [ %s ],
				"references": [
					{ "path": "../shared" },
				],
			}`, include)),
		}
	}
	getBuildRootsFromProjectReferencedProjectTestEdits := func() []*tscEdit {
		return []*tscEdit{
			noChange,
			{
				caption: "edit logging file",
				edit: func(sys *testSys) {
					sys.appendFile("/home/src/workspaces/solution/projects/shared/src/logging.ts", "export const x = 10;")
				},
			},
			noChange,
			{
				caption: "delete random file",
				edit: func(sys *testSys) {
					sys.removeNoError("/home/src/workspaces/solution/projects/shared/src/random.ts")
				},
			},
			noChange,
		}
	}
	testCases := []*tscInput{
		{
			subScenario: `when two root files are consecutive`,
			files: FileMap{
				"/home/src/workspaces/project/file1.ts": `export const x = "hello";`,
				"/home/src/workspaces/project/file2.ts": `export const y = "world";`,
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
                    "compilerOptions": { "composite": true },
                    "include": ["*.ts"],
                }`),
			},
			commandLineArgs: []string{"--b", "-v"},
			edits: []*tscEdit{
				{
					caption: "delete file1",
					edit: func(sys *testSys) {
						sys.removeNoError("/home/src/workspaces/project/file1.ts")
						sys.removeNoError("/home/src/workspaces/project/file1.js")
						sys.removeNoError("/home/src/workspaces/project/file1.d.ts")
					},
				},
			},
		},
		{
			subScenario: `when multiple root files are consecutive`,
			files: FileMap{
				"/home/src/workspaces/project/file1.ts": `export const x = "hello";`,
				"/home/src/workspaces/project/file2.ts": `export const y = "world";`,
				"/home/src/workspaces/project/file3.ts": `export const y = "world";`,
				"/home/src/workspaces/project/file4.ts": `export const y = "world";`,
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
                    "compilerOptions": { "composite": true },
                    "include": ["*.ts"],
                }`),
			},
			commandLineArgs: []string{"--b", "-v"},
			edits: []*tscEdit{
				{
					caption: "delete file1",
					edit: func(sys *testSys) {
						sys.removeNoError("/home/src/workspaces/project/file1.ts")
						sys.removeNoError("/home/src/workspaces/project/file1.js")
						sys.removeNoError("/home/src/workspaces/project/file1.d.ts")
					},
				},
			},
		},
		{
			subScenario: `when files are not consecutive`,
			files: FileMap{
				"/home/src/workspaces/project/file1.ts":    `export const x = "hello";`,
				"/home/src/workspaces/project/random.d.ts": `export const random = "world";`,
				"/home/src/workspaces/project/file2.ts": stringtestutil.Dedent(`
                    import { random } from "./random";
                    export const y = "world";
                `),
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
                    "compilerOptions": { "composite": true },
                    "include": ["file*.ts"],
                }`),
			},
			commandLineArgs: []string{"--b", "-v"},
			edits: []*tscEdit{
				{
					caption: "delete file1",
					edit: func(sys *testSys) {
						sys.removeNoError("/home/src/workspaces/project/file1.ts")
						sys.removeNoError("/home/src/workspaces/project/file1.js")
						sys.removeNoError("/home/src/workspaces/project/file1.d.ts")
					},
				},
			},
		},
		{
			subScenario: `when consecutive and non consecutive are mixed`,
			files: FileMap{
				"/home/src/workspaces/project/file1.ts":    `export const x = "hello";`,
				"/home/src/workspaces/project/file2.ts":    `export const y = "world";`,
				"/home/src/workspaces/project/random.d.ts": `export const random = "hello";`,
				"/home/src/workspaces/project/nonconsecutive.ts": stringtestutil.Dedent(`
                import { random } from "./random";
					export const nonConsecutive = "hello";
				`),
				"/home/src/workspaces/project/random1.d.ts": `export const random = "hello";`,
				"/home/src/workspaces/project/asArray1.ts": stringtestutil.Dedent(`
					import { random } from "./random1";
					export const x = "hello";
				`),
				"/home/src/workspaces/project/asArray2.ts":  `export const x = "hello";`,
				"/home/src/workspaces/project/asArray3.ts":  `export const x = "hello";`,
				"/home/src/workspaces/project/random2.d.ts": `export const random = "hello";`,
				"/home/src/workspaces/project/anotherNonConsecutive.ts": stringtestutil.Dedent(`
					import { random } from "./random2";
					export const nonConsecutive = "hello";
				`),
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
                    "compilerOptions": { "composite": true },
                    "include": ["file*.ts", "nonconsecutive*.ts", "asArray*.ts", "anotherNonConsecutive.ts"],
                }`),
			},
			commandLineArgs: []string{"--b", "-v"},
			edits: []*tscEdit{
				{
					caption: "delete file1",
					edit: func(sys *testSys) {
						sys.removeNoError("/home/src/workspaces/project/file1.ts")
						sys.removeNoError("/home/src/workspaces/project/file1.js")
						sys.removeNoError("/home/src/workspaces/project/file1.d.ts")
					},
				},
			},
		},
		{
			subScenario:     "when root file is from referenced project",
			files:           getBuildRootsFromProjectReferencedProjectFileMap(true),
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--b", "projects/server", "-v", "--traceResolution", "--explainFiles"},
			edits:           getBuildRootsFromProjectReferencedProjectTestEdits(),
		},
		{
			subScenario:     "when root file is from referenced project and shared is first",
			files:           getBuildRootsFromProjectReferencedProjectFileMap(false),
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--b", "projects/server", "-v", "--traceResolution", "--explainFiles"},
			edits:           getBuildRootsFromProjectReferencedProjectTestEdits(),
		},
		{
			subScenario:     "when root file is from referenced project",
			files:           getBuildRootsFromProjectReferencedProjectFileMap(true),
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--b", "-w", "projects/server", "-v", "--traceResolution", "--explainFiles"},
			edits:           getBuildRootsFromProjectReferencedProjectTestEdits(),
		},
		{
			subScenario:     "when root file is from referenced project and shared is first",
			files:           getBuildRootsFromProjectReferencedProjectFileMap(false),
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--b", "-w", "projects/server", "-v", "--traceResolution", "--explainFiles"},
			edits:           getBuildRootsFromProjectReferencedProjectTestEdits(),
		},
	}

	for _, test := range testCases {
		test.run(t, "roots")
	}
}

func TestBuildSample(t *testing.T) {
	t.Parallel()

	getLogicConfig := func() string {
		return stringtestutil.Dedent(`
			{
				"compilerOptions": {
					"composite": true,
					"declaration": true,
					"sourceMap": true,
					"skipDefaultLibCheck": true,
				},
				"references": [
					{ "path": "../core" },
				],
			}`)
	}

	getBuildSampleFileMap := func(modify func(files FileMap)) FileMap {
		files := FileMap{
			"/user/username/projects/sample1/core/tsconfig.json": stringtestutil.Dedent(`
			{
				"compilerOptions": {
					"composite": true,
					"declaration": true,
					"declarationMap": true,
					"skipDefaultLibCheck": true,
				},
			}`),
			"/user/username/projects/sample1/core/index.ts": stringtestutil.Dedent(`
				export const someString: string = "HELLO WORLD";
				export function leftPad(s: string, n: number) { return s + n; }
				export function multiply(a: number, b: number) { return a * b; }
			`),
			"/user/username/projects/sample1/core/some_decl.d.ts":   `declare const dts: any;`,
			"/user/username/projects/sample1/core/anotherModule.ts": `export const World = "hello";`,
			"/user/username/projects/sample1/logic/tsconfig.json":   getLogicConfig(),
			"/user/username/projects/sample1/logic/index.ts": stringtestutil.Dedent(`
				import * as c from '../core/index';
				export function getSecondsInDay() {
					return c.multiply(10, 15);
				}
				import * as mod from '../core/anotherModule';
				export const m = mod;
			`),
			"/user/username/projects/sample1/tests/tsconfig.json": stringtestutil.Dedent(`
			{
				"references": [
					{ "path": "../core" },
					{ "path": "../logic" },
				],
				"files": ["index.ts"],
				"compilerOptions": {
					"composite": true,
					"declaration": true,
					"skipDefaultLibCheck": true,
				},
			}`),
			"/user/username/projects/sample1/tests/index.ts": stringtestutil.Dedent(`
				import * as c from '../core/index';
				import * as logic from '../logic/index';

				c.leftPad("", 10);
				logic.getSecondsInDay();

				import * as mod from '../core/anotherModule';
				export const m = mod;
			`),
		}
		if modify != nil {
			modify(files)
		}
		return files
	}
	getStopBuildOnErrorTests := func(options []string) []*tscInput {
		noChange := core.IfElse(options == nil, noChangeOnlyEdit, nil)
		return []*tscInput{
			{
				subScenario: "skips builds downstream projects if upstream projects have errors with stopBuildOnErrors",
				files: getBuildSampleFileMap(func(files FileMap) {
					text, _ := files["/user/username/projects/sample1/core/index.ts"]
					files["/user/username/projects/sample1/core/index.ts"] = text.(string) + `multiply();`
				}),
				cwd:             "/user/username/projects/sample1",
				commandLineArgs: slices.Concat([]string{"--b", "tests", "--verbose", "--stopBuildOnErrors"}, options),
				edits: slices.Concat(
					noChange,
					[]*tscEdit{
						{
							caption: "fix error",
							edit: func(sys *testSys) {
								sys.replaceFileText("/user/username/projects/sample1/core/index.ts", "multiply();", "")
							},
						},
					},
				),
			},
			{
				subScenario: "skips builds downstream projects if upstream projects have errors with stopBuildOnErrors when test does not reference core",
				files: getBuildSampleFileMap(func(files FileMap) {
					files["/user/username/projects/sample1/tests/tsconfig.json"] = stringtestutil.Dedent(`
					{
						"references": [
							{ "path": "../logic" },
						],
						"files": ["index.ts"],
						"compilerOptions": {
							"composite": true,
							"declaration": true,
							"skipDefaultLibCheck": true,
						},
					}`)
					text, _ := files["/user/username/projects/sample1/core/index.ts"]
					files["/user/username/projects/sample1/core/index.ts"] = text.(string) + `multiply();`
				}),
				cwd:             "/user/username/projects/sample1",
				commandLineArgs: slices.Concat([]string{"--b", "tests", "--verbose", "--stopBuildOnErrors"}, options),
				edits: slices.Concat(
					noChange,
					[]*tscEdit{
						{
							caption: "fix error",
							edit: func(sys *testSys) {
								sys.replaceFileText("/user/username/projects/sample1/core/index.ts", "multiply();", "")
							},
						},
					},
				),
			},
		}
	}
	getBuildSampleCoreChangeEdits := func() []*tscEdit {
		return []*tscEdit{
			{
				caption: "incremental-declaration-changes",
				edit: func(sys *testSys) {
					sys.appendFile(
						"/user/username/projects/sample1/core/index.ts",
						`
export class someClass { }`,
					)
				},
			},
			{
				caption: "incremental-declaration-doesnt-change",
				edit: func(sys *testSys) {
					sys.appendFile(
						"/user/username/projects/sample1/core/index.ts",
						`
class someClass2 { }`,
					)
				},
			},
			noChange,
		}
	}
	getBuildSampleWatchDtsChangingEdits := func() []*tscEdit {
		return []*tscEdit{
			{
				caption: "Make change to core",
				edit: func(sys *testSys) {
					sys.appendFile("/user/username/projects/sample1/core/index.ts", "\nexport class someClass { }")
				},
			},
			{
				caption: "Revert core file",
				edit: func(sys *testSys) {
					sys.replaceFileText("/user/username/projects/sample1/core/index.ts", "\nexport class someClass { }", "")
				},
			},
			{
				caption: "Make two changes",
				edit: func(sys *testSys) {
					sys.appendFile("/user/username/projects/sample1/core/index.ts", "\nexport class someClass { }")
					sys.appendFile("/user/username/projects/sample1/core/index.ts", "\nexport class someClass2 { }")
				},
			},
		}
	}
	getBuildSampleWatchNonDtsChangingEdits := func() []*tscEdit {
		return []*tscEdit{
			{
				caption: "Make local change to core",
				edit: func(sys *testSys) {
					sys.appendFile("/user/username/projects/sample1/core/index.ts", "\nfunction foo() { }")
				},
			},
		}
	}
	getBuildSampleWatchNewFileEdits := func() []*tscEdit {
		return []*tscEdit{
			{
				caption: "Change to new File and build core",
				edit: func(sys *testSys) {
					sys.writeFileNoError("/user/username/projects/sample1/core/newfile.ts", `export const newFileConst = 30;`, false)
				},
			},
			{
				caption: "Change to new File and build core",
				edit: func(sys *testSys) {
					sys.writeFileNoError("/user/username/projects/sample1/core/newfile.ts", "\nexport class someClass2 { }", false)
				},
			},
		}
	}
	makeCircularReferences := func(files FileMap) {
		files["/user/username/projects/sample1/core/tsconfig.json"] = stringtestutil.Dedent(`
		{
			"compilerOptions": {
				"composite": true,
				"declaration": true
			},
			"references": [
				{ "path": "../tests", "circular": true }
			],
		}`)
	}
	getIncrementalErrorTest := func(subScenario string, options []string) *tscInput {
		var expectedDiffWithLogicError string
		if slices.Contains(options, "--stopBuildOnErrors") {
			expectedDiffWithLogicError = stringtestutil.Dedent(`
				Clean build will stop on error in core and will not report error in logic
				Watch build will retain previous errors from logic and report it
			`)
		}
		return &tscInput{
			subScenario:     "reportErrors " + subScenario,
			files:           getBuildSampleFileMap(nil),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: slices.Concat([]string{"-b", "-w", "tests"}, options),
			edits: []*tscEdit{
				{
					caption: "change logic",
					edit: func(sys *testSys) {
						sys.appendFile("/user/username/projects/sample1/logic/index.ts", "\nlet y: string = 10;")
					},
				},
				{
					caption: "change core",
					edit: func(sys *testSys) {
						sys.appendFile("/user/username/projects/sample1/core/index.ts", "\nlet x: string = 10;")
					},
					expectedDiff: expectedDiffWithLogicError,
				},
				{
					caption: "fix error in logic",
					edit: func(sys *testSys) {
						sys.replaceFileText("/user/username/projects/sample1/logic/index.ts", "\nlet y: string = 10;", "")
					},
				},
			},
		}
	}
	testCases := slices.Concat([]*tscInput{
		{
			subScenario: "builds correctly when outDir is specified",
			files: getBuildSampleFileMap(func(files FileMap) {
				files["/user/username/projects/sample1/logic/tsconfig.json"] = stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
						"declaration": true,
						"sourceMap": true,
						"outDir": "outDir",
					},
					"references": [
						{ "path": "../core" },
					],
				}`)
			}),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "tests"},
		},
		{
			subScenario: "builds correctly when declarationDir is specified",
			files: getBuildSampleFileMap(func(files FileMap) {
				files["/user/username/projects/sample1/logic/tsconfig.json"] = stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
						"declaration": true,
						"sourceMap": true,
						"declarationDir": "out/decls",
					},
					"references": [
						{ "path": "../core" },
					],
				}`)
			}),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "tests"},
		},
		{
			subScenario: "builds correctly when project is not composite or doesnt have any references",
			files: getBuildSampleFileMap(func(files FileMap) {
				text, _ := files["/user/username/projects/sample1/core/tsconfig.json"]
				files["/user/username/projects/sample1/core/tsconfig.json"] = strings.Replace(text.(string), `"composite": true,`, "", 1)
			}),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "core", "--verbose"},
		},
		{
			subScenario:     "does not write any files in a dry build",
			files:           getBuildSampleFileMap(nil),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "tests", "--dry"},
		},
		{
			subScenario:     "removes all files it built",
			files:           getBuildSampleFileMap(nil),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "tests"},
			edits: []*tscEdit{
				{
					caption:         "removes all files it built",
					commandLineArgs: []string{"--b", "tests", "--clean"},
				},
				{
					caption:         "no change --clean",
					commandLineArgs: []string{"--b", "tests", "--clean"},
				},
			},
		},
		{
			subScenario:     "cleaning project in not build order doesnt throw error",
			files:           getBuildSampleFileMap(nil),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "logic2", "--clean"},
		},
		{
			subScenario:     "always builds under with force option",
			files:           getBuildSampleFileMap(nil),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "tests", "--force"},
			edits:           noChangeOnlyEdit,
		},
		{
			subScenario:     "can detect when and what to rebuild",
			files:           getBuildSampleFileMap(nil),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "tests", "--verbose"},
			edits: []*tscEdit{
				noChange,
				{
					// Update a file in the leaf node (tests), only it should rebuild the last one
					caption: "Only builds the leaf node project",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/user/username/projects/sample1/tests/index.ts", "const m = 10;", false)
					},
				},
				{
					// Update a file in the parent (without affecting types), should get fast downstream builds
					caption: "Detects type-only changes in upstream projects",
					edit: func(sys *testSys) {
						sys.replaceFileText("/user/username/projects/sample1/core/index.ts", "HELLO WORLD", "WELCOME PLANET")
					},
				},
				{
					caption: "rebuilds when tsconfig changes",
					edit: func(sys *testSys) {
						sys.replaceFileText("/user/username/projects/sample1/tests/tsconfig.json", `"composite": true`, `"composite": true, "target": "es2020"`)
					},
				},
			},
		},
		{
			subScenario:     "when input file text does not change but its modified time changes",
			files:           getBuildSampleFileMap(nil),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "tests", "--verbose"},
			edits: []*tscEdit{
				{
					caption: "upstream project changes without changing file text",
					edit: func(sys *testSys) {
						err := sys.FS().Chtimes("/user/username/projects/sample1/core/index.ts", time.Time{}, sys.Now())
						if err != nil {
							panic(err)
						}
					},
				},
			},
		},
		{
			subScenario:     "when declarationMap changes",
			files:           getBuildSampleFileMap(nil),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "tests", "--verbose"},
			edits: []*tscEdit{
				{
					caption: "Disable declarationMap",
					edit: func(sys *testSys) {
						sys.replaceFileText("/user/username/projects/sample1/core/tsconfig.json", `"declarationMap": true,`, `"declarationMap": false,`)
					},
				},
				{
					caption: "Enable declarationMap",
					edit: func(sys *testSys) {
						sys.replaceFileText("/user/username/projects/sample1/core/tsconfig.json", `"declarationMap": false,`, `"declarationMap": true,`)
					},
				},
			},
		},
		{
			subScenario:     "indicates that it would skip builds during a dry build",
			files:           getBuildSampleFileMap(nil),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "tests"},
			edits: []*tscEdit{
				{
					caption:         "--dry",
					commandLineArgs: []string{"--b", "tests", "--dry"},
				},
			},
		},
		{
			subScenario:     "rebuilds from start if force option is set",
			files:           getBuildSampleFileMap(nil),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "tests"},
			edits: []*tscEdit{
				{
					caption:         "--force build",
					commandLineArgs: []string{"--b", "tests", "--verbose", "--force"},
				},
			},
		},
		{
			subScenario: "tsbuildinfo has error",
			files: FileMap{
				"/home/src/workspaces/project/main.ts":              "export const x = 10;",
				"/home/src/workspaces/project/tsconfig.json":        "{}",
				"/home/src/workspaces/project/tsconfig.tsbuildinfo": "Some random string",
			},
			commandLineArgs: []string{"--b", "-i", "-v"},
			edits: []*tscEdit{
				{
					caption: "tsbuildinfo written has error",
					edit: func(sys *testSys) {
						// This is to ensure the non incremental doesnt crash - as it wont have tsbuildInfo
						if !sys.forIncrementalCorrectness {
							sys.prependFile("/home/src/workspaces/project/tsconfig.tsbuildinfo", "Some random string")
							sys.replaceFileText("/home/src/workspaces/project/tsconfig.tsbuildinfo", fmt.Sprintf(`"version":"%s"`, core.Version()), fmt.Sprintf(`"version":"%s"`, harnessutil.FakeTSVersion)) // build info won't parse, need to manually sterilize for baseline
						}
					},
				},
			},
		},
		{
			subScenario:     "rebuilds completely when version in tsbuildinfo doesnt match ts version",
			files:           getBuildSampleFileMap(nil),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "tests", "--verbose"},
			edits: []*tscEdit{
				{
					caption: "convert tsbuildInfo version to something that is say to previous version",
					edit: func(sys *testSys) {
						// This is to ensure the non incremental doesnt crash - as it wont have tsbuildInfo
						if !sys.forIncrementalCorrectness {
							sys.replaceFileText("/user/username/projects/sample1/core/tsconfig.tsbuildinfo", fmt.Sprintf(`"version":"%s"`, harnessutil.FakeTSVersion), fmt.Sprintf(`"version":"%s"`, "FakeTsPreviousVersion"))
							sys.replaceFileText("/user/username/projects/sample1/logic/tsconfig.tsbuildinfo", fmt.Sprintf(`"version":"%s"`, harnessutil.FakeTSVersion), fmt.Sprintf(`"version":"%s"`, "FakeTsPreviousVersion"))
							sys.replaceFileText("/user/username/projects/sample1/tests/tsconfig.tsbuildinfo", fmt.Sprintf(`"version":"%s"`, harnessutil.FakeTSVersion), fmt.Sprintf(`"version":"%s"`, "FakeTsPreviousVersion"))
						}
					},
				},
			},
		},
		{
			subScenario: "rebuilds when extended config file changes",
			files: getBuildSampleFileMap(func(files FileMap) {
				files["/user/username/projects/sample1/tests/tsconfig.base.json"] = stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"target": "es5"
					}
				}`)
				text, _ := files["/user/username/projects/sample1/tests/tsconfig.json"]
				files["/user/username/projects/sample1/tests/tsconfig.json"] = strings.Replace(text.(string), `"references": [`, `"extends": "./tsconfig.base.json", "references": [`, 1)
			}),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "tests", "--verbose"},
			edits: []*tscEdit{
				{
					caption: "change extended file",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/user/username/projects/sample1/tests/tsconfig.base.json", stringtestutil.Dedent(`
						{
							"compilerOptions": { }
						}`), false)
					},
				},
			},
		},
		{
			subScenario:     "building project in not build order doesnt throw error",
			files:           getBuildSampleFileMap(nil),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "logic2/tsconfig.json", "--verbose"},
		},
		{
			subScenario: "builds downstream projects even if upstream projects have errors",
			files: getBuildSampleFileMap(func(files FileMap) {
				text, _ := files["/user/username/projects/sample1/logic/index.ts"]
				files["/user/username/projects/sample1/logic/index.ts"] = strings.Replace(text.(string), "c.multiply(10, 15)", `c.muitply()`, 1)
			}),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "tests", "--verbose"},
			edits:           noChangeOnlyEdit,
		},
		{
			subScenario:     "listFiles",
			files:           getBuildSampleFileMap(nil),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "tests", "--listFiles"},
			edits:           getBuildSampleCoreChangeEdits(),
		},
		{
			subScenario:     "listEmittedFiles",
			files:           getBuildSampleFileMap(nil),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "tests", "--listEmittedFiles"},
			edits:           getBuildSampleCoreChangeEdits(),
		},
		{
			subScenario:     "explainFiles",
			files:           getBuildSampleFileMap(nil),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "tests", "--explainFiles", "--v"},
			edits:           getBuildSampleCoreChangeEdits(),
		},
		{
			subScenario:     "sample",
			files:           getBuildSampleFileMap(nil),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "tests", "--verbose"},
			edits: slices.Concat(
				getBuildSampleCoreChangeEdits(),
				[]*tscEdit{
					{
						caption: "when logic config changes declaration dir",
						edit: func(sys *testSys) {
							sys.replaceFileText(
								"/user/username/projects/sample1/logic/tsconfig.json",
								`"declaration": true,`,
								`"declaration": true,
        "declarationDir": "decls",`,
							)
						},
					},
					noChange,
				},
			),
		},
		{
			subScenario: "when logic specifies tsBuildInfoFile",
			files: getBuildSampleFileMap(func(files FileMap) {
				text, _ := files["/user/username/projects/sample1/logic/tsconfig.json"]
				files["/user/username/projects/sample1/logic/tsconfig.json"] = strings.Replace(
					text.(string),
					`"composite": true,`,
					`"composite": true,
    "tsBuildInfoFile": "ownFile.tsbuildinfo",`,
					1,
				)
			}),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "tests", "--verbose"},
		},
		{
			subScenario: "when declaration option changes",
			files: getBuildSampleFileMap(func(files FileMap) {
				files["/user/username/projects/sample1/core/tsconfig.json"] = stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"incremental": true,
						"skipDefaultLibCheck": true,
					},
				}`)
			}),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "core", "--verbose"},
			edits: []*tscEdit{
				{
					caption: "incremental-declaration-changes",
					edit: func(sys *testSys) {
						sys.replaceFileText("/user/username/projects/sample1/core/tsconfig.json", `"incremental": true,`, `"incremental": true, "declaration": true,`)
					},
				},
			},
		},
		{
			subScenario: "when target option changes",
			files: getBuildSampleFileMap(func(files FileMap) {
				files[getTestLibPathFor("esnext.full")] = `/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />`
				files[tscLibPath+"/lib.d.ts"] = `/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />`
				files["/user/username/projects/sample1/core/tsconfig.json"] = stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"incremental": true,
						"listFiles": true,
						"listEmittedFiles": true,
						"target": "esnext",
					},
				}`)
			}),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "core", "--verbose"},
			edits: []*tscEdit{
				{
					caption: "incremental-declaration-changes",
					edit: func(sys *testSys) {
						sys.replaceFileText("/user/username/projects/sample1/core/tsconfig.json", `esnext`, `es5`)
					},
				},
			},
		},
		{
			subScenario: "when module option changes",
			files: getBuildSampleFileMap(func(files FileMap) {
				files["/user/username/projects/sample1/core/tsconfig.json"] = stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"incremental": true,
						"module": "node18",
					},
				}`)
			}),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "core", "--verbose"},
			edits: []*tscEdit{
				{
					caption: "incremental-declaration-changes",
					edit: func(sys *testSys) {
						sys.replaceFileText("/user/username/projects/sample1/core/tsconfig.json", `node18`, `nodenext`)
					},
				},
			},
		},
		{
			subScenario: "when esModuleInterop option changes",
			files: getBuildSampleFileMap(func(files FileMap) {
				files["/user/username/projects/sample1/tests/tsconfig.json"] = stringtestutil.Dedent(`
				{
					"references": [
						{ "path": "../core" },
						{ "path": "../logic" },
					],
					"files": ["index.ts"],
					"compilerOptions": {
						"composite": true,
						"declaration": true,
						"skipDefaultLibCheck": true,
						"esModuleInterop": false,
					},
				}`)
			}),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "tests", "--verbose"},
			edits: []*tscEdit{
				{
					caption: "incremental-declaration-changes",
					edit: func(sys *testSys) {
						sys.replaceFileText("/user/username/projects/sample1/tests/tsconfig.json", `"esModuleInterop": false`, `"esModuleInterop": true`)
					},
				},
			},
		},
		{
			// !!! sheetal this is not reporting error as file not found is not yet implemented
			subScenario: "reports error if input file is missing",
			files: getBuildSampleFileMap(func(files FileMap) {
				files["/user/username/projects/sample1/core/tsconfig.json"] = stringtestutil.Dedent(`
				{
					 "compilerOptions": { "composite": true },
					 "files": ["anotherModule.ts", "index.ts", "some_decl.d.ts"],
				}`)
				delete(files, "/user/username/projects/sample1/core/anotherModule.ts")
			}),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "tests", "--verbose"},
		},
		{
			// !!! sheetal this is not reporting error as file not found is not yet implemented
			subScenario: "reports error if input file is missing with force",
			files: getBuildSampleFileMap(func(files FileMap) {
				files["/user/username/projects/sample1/core/tsconfig.json"] = stringtestutil.Dedent(`
				{
					 "compilerOptions": { "composite": true },
					 "files": ["anotherModule.ts", "index.ts", "some_decl.d.ts"],
				}`)
				delete(files, "/user/username/projects/sample1/core/anotherModule.ts")
			}),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "tests", "--verbose", "--force"},
		},
		{
			subScenario:     "change builds changes and reports found errors message",
			files:           getBuildSampleFileMap(nil),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "-w", "tests"},
			edits:           getBuildSampleWatchDtsChangingEdits(),
		},
		{
			subScenario:     "non local change does not start build of referencing projects",
			files:           getBuildSampleFileMap(nil),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "-w", "tests"},
			edits:           getBuildSampleWatchNonDtsChangingEdits(),
		},
		{
			subScenario:     "builds when new file is added, and its subsequent updates",
			files:           getBuildSampleFileMap(nil),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "-w", "tests"},
			edits:           getBuildSampleWatchNewFileEdits(),
		},
		{
			subScenario:     "change builds changes and reports found errors message with circular references",
			files:           getBuildSampleFileMap(makeCircularReferences),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "-w", "tests"},
			edits:           getBuildSampleWatchDtsChangingEdits(),
		},
		{
			subScenario:     "non local change does not start build of referencing projects with circular references",
			files:           getBuildSampleFileMap(makeCircularReferences),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "-w", "tests"},
			edits:           getBuildSampleWatchNonDtsChangingEdits(),
		},
		{
			subScenario:     "builds when new file is added, and its subsequent updates with circular references",
			files:           getBuildSampleFileMap(makeCircularReferences),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "-w", "tests"},
			edits:           getBuildSampleWatchNewFileEdits(),
		},
		{
			subScenario: "watches config files that are not present",
			files: getBuildSampleFileMap(func(files FileMap) {
				delete(files, "/user/username/projects/sample1/logic/tsconfig.json")
			}),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "-w", "tests"},
			edits: []*tscEdit{
				{
					caption: "Write logic",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/user/username/projects/sample1/logic/tsconfig.json", getLogicConfig(), false)
					},
				},
			},
		},
		getIncrementalErrorTest("when preserveWatchOutput is not used", nil),
		getIncrementalErrorTest("when preserveWatchOutput is passed on command line", []string{"--preserveWatchOutput"}),
		getIncrementalErrorTest("when stopBuildOnErrors is passed on command line", []string{"--stopBuildOnErrors"}),
		{
			subScenario:     "incremental updates in verbose mode",
			files:           getBuildSampleFileMap(nil),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "-w", "tests", "--verbose"},
			edits: []*tscEdit{
				{
					caption: "Make non dts change",
					edit: func(sys *testSys) {
						sys.appendFile("/user/username/projects/sample1/logic/index.ts", "\nfunction someFn() { }")
					},
				},
				{
					caption: "Make dts change",
					edit: func(sys *testSys) {
						sys.replaceFileText("/user/username/projects/sample1/logic/index.ts", "\nfunction someFn() { }", "\nexport function someFn() { }")
					},
				},
			},
		},
		{
			subScenario:     "should not trigger recompilation because of program emit",
			files:           getBuildSampleFileMap(nil),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "-w", "core", "--verbose"},
			edits: []*tscEdit{
				noChange,
				{
					caption: "Add new file",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/user/username/projects/sample1/core/file3.ts", `export const y = 10;`, false)
					},
				},
				noChange,
			},
		},
		{
			subScenario: "should not trigger recompilation because of program emit with outDir specified",
			files: getBuildSampleFileMap(func(files FileMap) {
				files["/user/username/projects/sample1/core/tsconfig.json"] = stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
						"outDir": "outDir"
					}
                }`)
			}),
			cwd:             "/user/username/projects/sample1",
			commandLineArgs: []string{"--b", "-w", "core", "--verbose"},
			edits: []*tscEdit{
				noChange,
				{
					caption: "Add new file",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/user/username/projects/sample1/core/file3.ts", `export const y = 10;`, false)
					},
				},
				noChange,
			},
		},
	}, getStopBuildOnErrorTests(nil), getStopBuildOnErrorTests([]string{"--watch"}))

	for _, test := range testCases {
		test.run(t, "sample")
	}
}

func TestBuildTransitiveReferences(t *testing.T) {
	t.Parallel()

	getBuildTransitiveReferencesFileMap := func(modify func(files FileMap)) FileMap {
		files := FileMap{
			"/user/username/projects/transitiveReferences/refs/a.d.ts": stringtestutil.Dedent(`
				export class X {}
				export class A {}
			`),
			"/user/username/projects/transitiveReferences/a.ts": stringtestutil.Dedent(`
				export class A {}
			`),
			"/user/username/projects/transitiveReferences/b.ts": stringtestutil.Dedent(`
				import {A} from '@ref/a';
				export const b = new A();
			`),
			"/user/username/projects/transitiveReferences/c.ts": stringtestutil.Dedent(`
				import {b} from './b';
				import {X} from "@ref/a";
				b;
				X;
			`),
			"/user/username/projects/transitiveReferences/tsconfig.a.json": stringtestutil.Dedent(`
			{
				"files": ["a.ts"],
				"compilerOptions": {
					"composite": true,
				},
			}`),
			"/user/username/projects/transitiveReferences/tsconfig.b.json": stringtestutil.Dedent(`
			{
				"files": ["b.ts"],
				"compilerOptions": {
					"composite": true,
					"paths": {
						"@ref/*": ["./*"],
					},
				},
				"references": [{ "path": "tsconfig.a.json" }],
			}`),
			"/user/username/projects/transitiveReferences/tsconfig.c.json": stringtestutil.Dedent(`
			{
				"files": ["c.ts"],
				"compilerOptions": {
					"paths": {
						"@ref/*": ["./refs/*"],
					},
				},
				"references": [{ "path": "tsconfig.b.json" }],
			}`),
		}
		if modify != nil {
			modify(files)
		}
		return files
	}
	testCases := []*tscInput{
		{
			subScenario:     "builds correctly",
			files:           getBuildTransitiveReferencesFileMap(nil),
			cwd:             "/user/username/projects/transitiveReferences",
			commandLineArgs: []string{"--b", "tsconfig.c.json", "--listFiles"},
		},
		{
			subScenario: "reports error about module not found with node resolution with external module name",
			files: getBuildTransitiveReferencesFileMap(func(files FileMap) {
				files["/user/username/projects/transitiveReferences/b.ts"] = `import {A} from 'a';
export const b = new A();`
				files["/user/username/projects/transitiveReferences/tsconfig.b.json"] = stringtestutil.Dedent(`
				{
					"files": ["b.ts"],
					"compilerOptions": {
						"composite": true,
						"module": "nodenext",
					},
					"references": [{ "path": "tsconfig.a.json" }],
				}`)
			}),
			cwd:             "/user/username/projects/transitiveReferences",
			commandLineArgs: []string{"--b", "tsconfig.c.json", "--listFiles"},
		},
	}

	for _, test := range testCases {
		test.run(t, "transitiveReferences")
	}
}

func TestBuildSolutionProject(t *testing.T) {
	t.Parallel()
	testCases := []*tscInput{
		{
			subScenario: "verify that subsequent builds after initial build doesnt build anything",
			files: FileMap{
				"/home/src/workspaces/solution/src/folder/index.ts": `export const x = 10;`,
				"/home/src/workspaces/solution/src/folder/tsconfig.json": stringtestutil.Dedent(`
                    {
                        "files": ["index.ts"],
                        "compilerOptions": {
                            "composite": true
                        }
                    }
                `),
				"/home/src/workspaces/solution/src/folder2/index.ts": `export const x = 10;`,
				"/home/src/workspaces/solution/src/folder2/tsconfig.json": stringtestutil.Dedent(`
                    {
                        "files": ["index.ts"],
                        "compilerOptions": {
                            "composite": true
                        }
                    }
                `),
				"/home/src/workspaces/solution/src/tsconfig.json": stringtestutil.Dedent(`
                    {
                        "files": [],
                        "compilerOptions": {
                            "composite": true
                        },
						"references": [
							{ "path": "./folder" },
							{ "path": "./folder2" },
						]
                }`),
				"/home/src/workspaces/solution/tests/index.ts": `export const x = 10;`,
				"/home/src/workspaces/solution/tests/tsconfig.json": stringtestutil.Dedent(`
                    {
                        "files": ["index.ts"],
                        "compilerOptions": {
                            "composite": true
                        },
                        "references": [
                            { "path": "../src" }
                        ]
                    }
                `),
				"/home/src/workspaces/solution/tsconfig.json": stringtestutil.Dedent(`
                    {
                        "files": [],
                        "compilerOptions": {
                            "composite": true
                        },
                        "references": [
                            { "path": "./src" },
                            { "path": "./tests" }
                        ]
                    }
                `),
			},
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--b", "--v"},
			edits:           noChangeOnlyEdit,
		},
		{
			subScenario: "when solution is referenced indirectly",
			files: FileMap{
				"/home/src/workspaces/solution/project1/tsconfig.json": stringtestutil.Dedent(`
                    {
                        "compilerOptions": { "composite": true },
                        "references": []
                    }
                `),
				"/home/src/workspaces/solution/project2/tsconfig.json": stringtestutil.Dedent(`
                    {
                        "compilerOptions": { "composite": true },
                        "references": []
                    }
                `),
				"/home/src/workspaces/solution/project2/src/b.ts": "export const b = 10;",
				"/home/src/workspaces/solution/project3/tsconfig.json": stringtestutil.Dedent(`
                    {
                        "compilerOptions": { "composite": true },
                        "references": [
							{ "path": "../project1" },
							{ "path": "../project2" }
						]
                    }
                `),
				"/home/src/workspaces/solution/project3/src/c.ts": "export const c = 10;",
				"/home/src/workspaces/solution/project4/tsconfig.json": stringtestutil.Dedent(`
                    {
                        "compilerOptions": { "composite": true },
                        "references": [{ "path": "../project3" }]
                    }
                `),
				"/home/src/workspaces/solution/project4/src/d.ts": "export const d = 10;",
			},
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--b", "project4", "--verbose", "--explainFiles"},
			edits: []*tscEdit{
				{
					caption: "modify project3 file",
					edit: func(sys *testSys) {
						sys.replaceFileText("/home/src/workspaces/solution/project3/src/c.ts", "c = ", "cc = ")
					},
				},
			},
		},
		{
			subScenario: "has empty files diagnostic when files is empty and no references are provided",
			files: FileMap{
				"/home/src/workspaces/solution/no-references/tsconfig.json": stringtestutil.Dedent(`
                    {
                        "references": [],
                        "files": [],
                        "compilerOptions": {
                            "composite": true,
                            "declaration": true,
                            "forceConsistentCasingInFileNames": true,
                            "skipDefaultLibCheck": true,
                        },
                    }`),
			},
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--b", "no-references"},
		},
		{
			subScenario: "does not have empty files diagnostic when files is empty and references are provided",
			files: FileMap{
				"/home/src/workspaces/solution/core/index.ts": "export function multiply(a: number, b: number) { return a * b; }",
				"/home/src/workspaces/solution/core/tsconfig.json": stringtestutil.Dedent(`
                    {
                        "compilerOptions": {
                            "composite": true,
                            "declaration": true,
                            "declarationMap": true,
                            "skipDefaultLibCheck": true,
                        },
                    }`),
				"/home/src/workspaces/solution/with-references/tsconfig.json": stringtestutil.Dedent(`
                    {
                        "references": [
                            { "path": "../core" },
                        ],
                        "files": [],
                        "compilerOptions": {
                            "composite": true,
                            "declaration": true,
                            "forceConsistentCasingInFileNames": true,
                            "skipDefaultLibCheck": true,
                        },
                    }`),
			},
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--b", "with-references"},
		},
	}

	for _, test := range testCases {
		test.run(t, "solution")
	}
}

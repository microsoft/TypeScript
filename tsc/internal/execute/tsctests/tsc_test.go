package tsctests

import (
	"fmt"
	"slices"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/testutil/stringtestutil"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
)

func TestTscCommandline(t *testing.T) {
	t.Parallel()
	testCases := []*tscInput{
		{
			subScenario: "show help with ExitStatus.DiagnosticsPresent_OutputsSkipped",
			env: map[string]string{
				"TS_TEST_TERMINAL_WIDTH": "120",
			},
			commandLineArgs: nil,
		},
		{
			subScenario:     "show help with ExitStatus.DiagnosticsPresent_OutputsSkipped when host cannot provide terminal width",
			commandLineArgs: nil,
		},
		{
			subScenario: "does not add color when NO_COLOR is set",
			env: map[string]string{
				"NO_COLOR": "true",
			},
			commandLineArgs: nil,
		},
		{
			subScenario:     "when build not first argument",
			commandLineArgs: []string{"--verbose", "--build"},
		},
		{
			subScenario:     "help",
			commandLineArgs: []string{"--help"},
		},
		{
			subScenario:     "help all",
			commandLineArgs: []string{"--help", "--all"},
		},
		{
			subScenario:     "Parse --lib option with file name",
			files:           FileMap{"/home/src/workspaces/project/first.ts": `export const Key = Symbol()`},
			commandLineArgs: []string{"--lib", "es6 ", "first.ts"},
		},
		{
			subScenario: "Project is empty string",
			files: FileMap{
				"/home/src/workspaces/project/first.ts": `export const a = 1`,
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"strict": true,
						"noEmit": true
					}
				}`),
			},
			commandLineArgs: []string{},
		},
		{
			subScenario: "Parse -p",
			files: FileMap{
				"/home/src/workspaces/project/first.ts": `export const a = 1`,
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"strict": true,
						"noEmit": true
					}
				}`),
			},
			commandLineArgs: []string{"-p", "."},
		},
		{
			subScenario: "Parse -p with path to tsconfig file",
			files: FileMap{
				"/home/src/workspaces/project/first.ts": `export const a = 1`,
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"strict": true,
						"noEmit": true
					}
				}`),
			},
			commandLineArgs: []string{"-p", "/home/src/workspaces/project/tsconfig.json"},
		},
		{
			subScenario: "Parse -p with path to tsconfig folder",
			files: FileMap{
				"/home/src/workspaces/project/first.ts": `export const a = 1`,
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"strict": true,
						"noEmit": true
					}
				}`),
			},
			commandLineArgs: []string{"-p", "/home/src/workspaces/project"},
		},
		{
			subScenario:     "Parse enum type options",
			commandLineArgs: []string{"--moduleResolution", "nodenext ", "first.ts", "--module", "nodenext", "--target", "esnext", "--moduleDetection", "auto", "--jsx", "react", "--newLine", "crlf"},
		},
		{
			subScenario: "Parse watch interval option",
			files: FileMap{
				"/home/src/workspaces/project/first.ts": `export const a = 1`,
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"strict": true,
						"noEmit": true
					}
				}`),
			},
			commandLineArgs: []string{"-w", "--watchInterval", "1000"},
		},
		{
			subScenario:     "Parse watch interval option without tsconfig.json",
			commandLineArgs: []string{"-w", "--watchInterval", "1000"},
		},
		{
			subScenario: "Config with references and empty file and refers to config with noEmit",
			files: FileMap{
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`{
					"files": [],
					"references": [
						{
							"path": "./packages/pkg1"
						},
					],
				}`),
				"/home/src/workspaces/project/packages/pkg1/tsconfig.json": stringtestutil.Dedent(`{
					"compilerOptions": {
						"composite": true,
						"noEmit": true
					},
					"files": [
						"./index.ts",
					],
				}`),
				"/home/src/workspaces/project/packages/pkg1/index.ts": `export const a = 1;`,
			},
			commandLineArgs: []string{"-p", "."},
		},
	}

	for _, testCase := range testCases {
		testCase.run(t, "commandLine")
	}
}

func TestTscComposite(t *testing.T) {
	t.Parallel()
	testCases := []*tscInput{
		{
			subScenario: "when setting composite false on command line",
			files: FileMap{
				"/home/src/workspaces/project/src/main.ts": "export const x = 10;",
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"target": "es5",
						"module": "commonjs",
						"composite": true,
					},
					"include": [
						"src/**/*.ts",
					],
				}`),
			},
			commandLineArgs: []string{"--composite", "false"},
		},
		{
			// !!! sheetal null is not reflected in final options
			subScenario: "when setting composite null on command line",
			files: FileMap{
				"/home/src/workspaces/project/src/main.ts": "export const x = 10;",
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"target": "es5",
						"module": "commonjs",
						"composite": true,
					},
					"include": [
						"src/**/*.ts",
					],
				}`),
			},
			commandLineArgs: []string{"--composite", "null"},
		},
		{
			subScenario: "when setting composite false on command line but has tsbuild info in config",
			files: FileMap{
				"/home/src/workspaces/project/src/main.ts": "export const x = 10;",
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"target": "es5",
						"module": "commonjs",
						"composite": true,
						"tsBuildInfoFile": "tsconfig.json.tsbuildinfo",
					},
					"include": [
						"src/**/*.ts",
					],
				}`),
			},
			commandLineArgs: []string{"--composite", "false"},
		},
		{
			subScenario: "when setting composite false and tsbuildinfo as null on command line but has tsbuild info in config",
			files: FileMap{
				"/home/src/workspaces/project/src/main.ts": "export const x = 10;",
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"target": "es5",
						"module": "commonjs",
						"composite": true,
						"tsBuildInfoFile": "tsconfig.json.tsbuildinfo",
					},
					"include": [
						"src/**/*.ts",
					],
				}`),
			},
			commandLineArgs: []string{"--composite", "false", "--tsBuildInfoFile", "null"},
		},
		{
			subScenario: "converting to modules",
			files: FileMap{
				"/home/src/workspaces/project/src/main.ts": "const x = 10;",
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"module": "none",
						"composite": true,
					},
				}`),
			},
			edits: []*tscEdit{
				{
					caption: "convert to modules",
					edit: func(sys *testSys) {
						sys.replaceFileText("/home/src/workspaces/project/tsconfig.json", "none", "es2015")
					},
				},
			},
		},
		{
			subScenario: "synthetic jsx import of ESM module from CJS module no crash no jsx element",
			files: FileMap{
				"/home/src/projects/project/src/main.ts": "export default 42;",
				"/home/src/projects/project/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
						"module": "Node16",
						"jsx": "react-jsx",
						"jsxImportSource": "solid-js",
					},
				}`),
				"/home/src/projects/project/node_modules/solid-js/package.json": stringtestutil.Dedent(`
					{
						"name": "solid-js",
						"type": "module"
					}
				`),
				"/home/src/projects/project/node_modules/solid-js/jsx-runtime.d.ts": stringtestutil.Dedent(`
					export namespace JSX {
						type IntrinsicElements = { div: {}; };
					}
				`),
			},
			cwd: "/home/src/projects/project",
		},
		{
			subScenario: "synthetic jsx import of ESM module from CJS module error on jsx element",
			files: FileMap{
				"/home/src/projects/project/src/main.tsx": "export default <div/>;",
				"/home/src/projects/project/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
						"module": "Node16",
						"jsx": "react-jsx",
						"jsxImportSource": "solid-js",
					},
				}`),
				"/home/src/projects/project/node_modules/solid-js/package.json": stringtestutil.Dedent(`
					{
						"name": "solid-js",
						"type": "module"
					}
				`),
				"/home/src/projects/project/node_modules/solid-js/jsx-runtime.d.ts": stringtestutil.Dedent(`
					export namespace JSX {
						type IntrinsicElements = { div: {}; };
					}
				`),
			},
			cwd: "/home/src/projects/project",
		},
	}

	for _, testCase := range testCases {
		testCase.run(t, "composite")
	}
}

func TestTscDeclarationEmit(t *testing.T) {
	t.Parallel()
	getBuildDeclarationEmitDtsReferenceAsTrippleSlashMap := func(useNoRef bool) FileMap {
		files := FileMap{
			"/home/src/workspaces/solution/tsconfig.base.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"rootDir": "./",
						"outDir": "lib",
					},
				}`),
			"/home/src/workspaces/solution/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": { "composite": true },
					"references": [{ "path": "./src" }],
					"include": [],
				}`),
			"/home/src/workspaces/solution/src/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": { "composite": true },
					"references": [{ "path": "./subProject" }, { "path": "./subProject2" }],
					"include": [],
				}`),
			"/home/src/workspaces/solution/src/subProject/tsconfig.json": stringtestutil.Dedent(`
				{
					"extends": "../../tsconfig.base.json",
					"compilerOptions": { "composite": true },
					"references": [{ "path": "../common" }],
					"include": ["./index.ts"],
				}`),
			"/home/src/workspaces/solution/src/subProject/index.ts": stringtestutil.Dedent(`
				import { Nominal } from '../common/nominal';
				export type MyNominal = Nominal<string, 'MyNominal'>;`),
			"/home/src/workspaces/solution/src/subProject2/tsconfig.json": stringtestutil.Dedent(`
				{
					"extends": "../../tsconfig.base.json",
					"compilerOptions": { "composite": true },
					"references": [{ "path": "../subProject" }],
					"include": ["./index.ts"],
				}`),
			"/home/src/workspaces/solution/src/subProject2/index.ts": stringtestutil.Dedent(`
				import { MyNominal } from '../subProject/index';
				const variable = {
					key: 'value' as MyNominal,
				};
				export function getVar(): keyof typeof variable {
					return 'key';
				}`),
			"/home/src/workspaces/solution/src/common/tsconfig.json": stringtestutil.Dedent(`
				{
					"extends": "../../tsconfig.base.json",
					"compilerOptions": { "composite": true },
					"include": ["./nominal.ts"],
				}`),
			"/home/src/workspaces/solution/src/common/nominal.ts": stringtestutil.Dedent(`
				/// <reference path="./types.d.ts" preserve="true" />
				export declare type Nominal<T, Name extends string> = MyNominal<T, Name>;`),
			"/home/src/workspaces/solution/src/common/types.d.ts": stringtestutil.Dedent(`
				declare type MyNominal<T, Name extends string> = T & {
					specialKey: Name;
				};`),
		}
		if useNoRef {
			files["/home/src/workspaces/solution/tsconfig.json"] = stringtestutil.Dedent(`
			{
				"extends": "./tsconfig.base.json",
				"compilerOptions": { "composite": true },
				"include": ["./src/**/*.ts"],
			}`)
		}
		return files
	}

	getTscDeclarationEmitDtsErrorsFileMap := func(composite bool, incremental bool) FileMap {
		return FileMap{
			"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(fmt.Sprintf(`
				{
					"compilerOptions": {
						"module": "NodeNext",
						"moduleResolution": "NodeNext",
						"composite": %t,
						"incremental": %t,
						"declaration": true,
						"skipLibCheck": true,
						"skipDefaultLibCheck": true,
					},
				}`, composite, incremental)),
			"/home/src/workspaces/project/index.ts": stringtestutil.Dedent(`
				import ky from 'ky';
				export const api = ky.extend({});
			`),
			"/home/src/workspaces/project/package.json": stringtestutil.Dedent(`
				{
					"type": "module"
				}`),
			"/home/src/workspaces/project/node_modules/ky/distribution/index.d.ts": stringtestutil.Dedent(`
				type KyInstance = {
					extend(options: Record<string,unknown>): KyInstance;
				}
				declare const ky: KyInstance;
				export default ky;
			`),
			"/home/src/workspaces/project/node_modules/ky/package.json": stringtestutil.Dedent(`
				{
					"name": "ky",
					"type": "module",
					"main": "./distribution/index.js"
				}
			`),
		}
	}

	pluginOneConfig := func() string {
		return stringtestutil.Dedent(`
		{
			"compilerOptions": {
				"target": "es5",
				"declaration": true,
				"traceResolution": true,
			},
		}`)
	}

	pluginOneIndex := func() string {
		return `import pluginTwo from "plugin-two"; // include this to add reference to symlink`
	}

	pluginOneAction := func() string {
		return stringtestutil.Dedent(`
			import { actionCreatorFactory } from "typescript-fsa"; // Include version of shared lib
			const action = actionCreatorFactory("somekey");
			const featureOne = action<{ route: string }>("feature-one");
			export const actions = { featureOne };`)
	}

	pluginTwoDts := func() string {
		return stringtestutil.Dedent(`
			declare const _default: {
				features: {
					featureOne: {
						actions: {
							featureOne: {
								(payload: {
									name: string;
									order: number;
								}, meta?: {
									[key: string]: any;
								}): import("typescript-fsa").Action<{
									name: string;
									order: number;
								}>;
							};
						};
						path: string;
					};
				};
			};
			export default _default;`)
	}

	fsaPackageJson := func() string {
		return stringtestutil.Dedent(`
			{
				"name": "typescript-fsa",
				"version": "3.0.0-beta-2"
			}`)
	}

	fsaIndex := func() string {
		return stringtestutil.Dedent(`
			export interface Action<Payload> {
				type: string;
				payload: Payload;
			}
			export declare type ActionCreator<Payload> = {
				type: string;
				(payload: Payload): Action<Payload>;
			}
			export interface ActionCreatorFactory {
				<Payload = void>(type: string): ActionCreator<Payload>;
			}
			export declare function actionCreatorFactory(prefix?: string | null): ActionCreatorFactory;
			export default actionCreatorFactory;`)
	}
	testCases := []*tscInput{
		{
			subScenario:     "when declaration file is referenced through triple slash",
			files:           getBuildDeclarationEmitDtsReferenceAsTrippleSlashMap(false),
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--b", "--verbose"},
		},
		{
			subScenario:     "when declaration file is referenced through triple slash but uses no references",
			files:           getBuildDeclarationEmitDtsReferenceAsTrippleSlashMap(true),
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--b", "--verbose"},
		},
		{
			subScenario: "when declaration file used inferred type from referenced project",
			files: FileMap{
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
					{
						"compilerOptions": {
							"composite": true,
							"paths": { "@fluentui/*": ["./packages/*/src"] },
						},
					}`),
				"/home/src/workspaces/project/packages/pkg1/src/index.ts": stringtestutil.Dedent(`
					export interface IThing {
						a: string;
					}
					export interface IThings {
						thing1: IThing;
					}
				`),
				"/home/src/workspaces/project/packages/pkg1/tsconfig.json": stringtestutil.Dedent(`
					{
						"extends": "../../tsconfig",
						"compilerOptions": { "outDir": "lib" },
						"include": ["src"],
					}
				`),
				"/home/src/workspaces/project/packages/pkg2/src/index.ts": stringtestutil.Dedent(`
					import { IThings } from '@fluentui/pkg1';
					export function fn4() {
						const a: IThings = { thing1: { a: 'b' } };
						return a.thing1;
					}
				`),
				"/home/src/workspaces/project/packages/pkg2/tsconfig.json": stringtestutil.Dedent(`
					{
						"extends": "../../tsconfig",
						"compilerOptions": { "outDir": "lib" },
						"include": ["src"],
						"references": [{ "path": "../pkg1" }],
					}
				`),
			},
			commandLineArgs: []string{"--b", "packages/pkg2/tsconfig.json", "--verbose"},
		},
		{
			subScenario:     "reports dts generation errors",
			files:           getTscDeclarationEmitDtsErrorsFileMap(false, false),
			commandLineArgs: []string{"-b", "--explainFiles", "--listEmittedFiles", "--v"},
			edits:           noChangeOnlyEdit,
		},
		{
			subScenario:     "reports dts generation errors with incremental",
			files:           getTscDeclarationEmitDtsErrorsFileMap(false, true),
			commandLineArgs: []string{"-b", "--explainFiles", "--listEmittedFiles", "--v"},
			edits:           noChangeOnlyEdit,
		},
		{
			subScenario:     "reports dts generation errors",
			files:           getTscDeclarationEmitDtsErrorsFileMap(false, false),
			commandLineArgs: []string{"--explainFiles", "--listEmittedFiles"},
			edits: []*tscEdit{
				noChange,
				{
					caption:         "build -b",
					commandLineArgs: []string{"-b", "--explainFiles", "--listEmittedFiles", "--v"},
				},
			},
		},
		{
			subScenario:     "reports dts generation errors with incremental",
			files:           getTscDeclarationEmitDtsErrorsFileMap(true, true),
			commandLineArgs: []string{"--explainFiles", "--listEmittedFiles"},
			edits: []*tscEdit{
				noChange,
				{
					caption:         "build -b",
					commandLineArgs: []string{"-b", "--explainFiles", "--listEmittedFiles", "--v"},
				},
			},
		},
		{
			subScenario: "when using Windows paths and uppercase letters",
			files: FileMap{
				"D:/Work/pkg1/package.json": stringtestutil.Dedent(`
				{
					"name": "ts-specifier-bug",
					"version": "1.0.0",
					"main": "index.js"
				}`),
				"D:/Work/pkg1/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"declaration": true,
						"target": "es2017",
						"outDir": "./dist",
					},
					"include": ["src"],
				}`),
				"D:/Work/pkg1/src/main.ts": stringtestutil.Dedent(`
					import { PartialType } from './utils';

					class Common {}
					
					export class Sub extends PartialType(Common) {
						id: string;
					}
				`),
				"D:/Work/pkg1/src/utils/index.ts": stringtestutil.Dedent(`
					import { MyType, MyReturnType } from './type-helpers';

					export function PartialType<T>(classRef: MyType<T>) {
						abstract class PartialClassType {
							constructor() {}
						}
					
						return PartialClassType as MyReturnType;
					}
				`),
				"D:/Work/pkg1/src/utils/type-helpers.ts": stringtestutil.Dedent(`
					export type MyReturnType = {	
						new (...args: any[]): any;
					};
				
					export interface MyType<T = any> extends Function {
						new (...args: any[]): T;
					}
				`),
			},
			cwd:              "D:/Work/pkg1",
			windowsStyleRoot: "D:/",
			ignoreCase:       true,
			commandLineArgs:  []string{"-p", "D:\\Work\\pkg1", "--explainFiles"},
		},
		{
			// !!! sheetal redirected files not yet implemented
			subScenario: "when same version is referenced through source and another symlinked package",
			files: FileMap{
				`/user/username/projects/myproject/plugin-two/index.d.ts`:                               pluginTwoDts(),
				`/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/package.json`: fsaPackageJson(),
				`/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/index.d.ts`:   fsaIndex(),
				`/user/username/projects/myproject/plugin-one/tsconfig.json`:                            pluginOneConfig(),
				`/user/username/projects/myproject/plugin-one/index.ts`:                                 pluginOneIndex(),
				`/user/username/projects/myproject/plugin-one/action.ts`:                                pluginOneAction(),
				`/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/package.json`: fsaPackageJson(),
				`/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/index.d.ts`:   fsaIndex(),
				`/user/username/projects/myproject/plugin-one/node_modules/plugin-two`:                  vfstest.Symlink(`/user/username/projects/myproject/plugin-two`),
			},
			cwd:             "/user/username/projects/myproject",
			commandLineArgs: []string{"-p", "plugin-one", "--explainFiles"},
		},
		{
			// !!! sheetal redirected files not yet implemented
			subScenario: "when same version is referenced through source and another symlinked package with indirect link",
			files: FileMap{
				`/user/username/projects/myproject/plugin-two/package.json`: stringtestutil.Dedent(`
				{
					"name": "plugin-two",
					"version": "0.1.3",
					"main": "dist/commonjs/index.js"
				}`),
				`/user/username/projects/myproject/plugin-two/dist/commonjs/index.d.ts`:                 pluginTwoDts(),
				`/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/package.json`: fsaPackageJson(),
				`/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/index.d.ts`:   fsaIndex(),
				`/user/username/projects/myproject/plugin-one/tsconfig.json`:                            pluginOneConfig(),
				`/user/username/projects/myproject/plugin-one/index.ts`:                                 pluginOneIndex() + "\n" + pluginOneAction(),
				`/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/package.json`: fsaPackageJson(),
				`/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/index.d.ts`:   fsaIndex(),
				`/temp/yarn/data/link/plugin-two`:                                                       vfstest.Symlink(`/user/username/projects/myproject/plugin-two`),
				`/user/username/projects/myproject/plugin-one/node_modules/plugin-two`:                  vfstest.Symlink(`/temp/yarn/data/link/plugin-two`),
			},
			cwd:             "/user/username/projects/myproject",
			commandLineArgs: []string{"-p", "plugin-one", "--explainFiles"},
		},
		{
			// !!! sheetal strada has error for d.ts generation in pkg3/src/keys.ts but corsa doesnt have that
			subScenario: "when pkg references sibling package through indirect symlink",
			files: FileMap{
				`/user/username/projects/myproject/pkg1/dist/index.d.ts`: `export * from './types';`,
				`/user/username/projects/myproject/pkg1/dist/types.d.ts`: stringtestutil.Dedent(`
					export declare type A = {
						id: string;
					};
					export declare type B = {
						id: number;
					};
					export declare type IdType = A | B;
					export declare class MetadataAccessor<T, D extends IdType = IdType> {
						readonly key: string;
						private constructor();
						toString(): string;
						static create<T, D extends IdType = IdType>(key: string): MetadataAccessor<T, D>;
					}`),
				`/user/username/projects/myproject/pkg1/package.json`: stringtestutil.Dedent(`
					{
						"name": "@raymondfeng/pkg1",
						"version": "1.0.0",
						"main": "dist/index.js",
						"typings": "dist/index.d.ts"
					}`),
				`/user/username/projects/myproject/pkg2/dist/index.d.ts`: `export * from './types';`,
				`/user/username/projects/myproject/pkg2/dist/types.d.ts`: `export {MetadataAccessor} from '@raymondfeng/pkg1';`,
				`/user/username/projects/myproject/pkg2/package.json`: stringtestutil.Dedent(`
					{
						"name": "@raymondfeng/pkg2",
						"version": "1.0.0",
						"main": "dist/index.js",
						"typings": "dist/index.d.ts"
					}`),
				`/user/username/projects/myproject/pkg3/src/index.ts`: `export * from './keys';`,
				`/user/username/projects/myproject/pkg3/src/keys.ts`: stringtestutil.Dedent(`
					import {MetadataAccessor} from "@raymondfeng/pkg2";
					export const ADMIN = MetadataAccessor.create<boolean>('1');`),
				`/user/username/projects/myproject/pkg3/tsconfig.json`: stringtestutil.Dedent(`
                    {
                        "compilerOptions": {
                            "outDir": "dist",
                            "rootDir": "src",
                            "target": "es5",
                            "module": "commonjs",
                            "strict": true,
                            "esModuleInterop": true,
                            "declaration": true,
                        },
                    }`),
				`/user/username/projects/myproject/pkg2/node_modules/@raymondfeng/pkg1`: vfstest.Symlink(`/user/username/projects/myproject/pkg1`),
				`/user/username/projects/myproject/pkg3/node_modules/@raymondfeng/pkg2`: vfstest.Symlink(`/user/username/projects/myproject/pkg2`),
			},
			cwd:             "/user/username/projects/myproject",
			commandLineArgs: []string{"-p", "pkg3", "--explainFiles"},
		},
	}

	for _, test := range testCases {
		test.run(t, "declarationEmit")
	}
}

func TestTscExtends(t *testing.T) {
	t.Parallel()
	getBuildConfigFileExtendsFileMap := func() FileMap {
		return FileMap{
			"/home/src/workspaces/solution/tsconfig.json": stringtestutil.Dedent(`
				{
					"references": [
						{ "path": "./shared/tsconfig.json" },
						{ "path": "./webpack/tsconfig.json" },
					],
					"files": [],
				}`),
			"/home/src/workspaces/solution/shared/tsconfig-base.json": stringtestutil.Dedent(`
				{
					"include": ["./typings-base/"],
				}`),
			"/home/src/workspaces/solution/shared/typings-base/globals.d.ts": `type Unrestricted = any;`,
			"/home/src/workspaces/solution/shared/tsconfig.json": stringtestutil.Dedent(`
				{
					"extends": "./tsconfig-base.json",
					"compilerOptions": {
						"composite": true,
						"outDir": "../target-tsc-build/",
						"rootDir": "..",
					},
					"files": ["./index.ts"],
				}`),
			"/home/src/workspaces/solution/shared/index.ts": `export const a: Unrestricted = 1;`,
			"/home/src/workspaces/solution/webpack/tsconfig.json": stringtestutil.Dedent(`
				{
					"extends": "../shared/tsconfig-base.json",
					"compilerOptions": {
						"composite": true,
						"outDir": "../target-tsc-build/",
						"rootDir": "..",
					},
					"files": ["./index.ts"],
					"references": [{ "path": "../shared/tsconfig.json" }],
				}`),
			"/home/src/workspaces/solution/webpack/index.ts": `export const b: Unrestricted = 1;`,
		}
	}
	getTscExtendsWithSymlinkTestCase := func(builtType string) *tscInput {
		return &tscInput{
			subScenario: "resolves the symlink path",
			files: FileMap{
				"/users/user/projects/myconfigs/node_modules/@something/tsconfig-node/tsconfig.json": stringtestutil.Dedent(`
					{
						"extends": "@something/tsconfig-base/tsconfig.json",
						"compilerOptions": {
							"removeComments": true
						}
					}
				`),
				"/users/user/projects/myconfigs/node_modules/@something/tsconfig-base/tsconfig.json": stringtestutil.Dedent(`
					{
						"compilerOptions": { "composite": true }
					}
				`),
				"/users/user/projects/myproject/src/index.ts": stringtestutil.Dedent(`
					// some comment
					export const x = 10;
				`),
				"/users/user/projects/myproject/src/tsconfig.json": stringtestutil.Dedent(`
					{
						"extends": "@something/tsconfig-node/tsconfig.json"
					}`),
				"/users/user/projects/myproject/node_modules/@something/tsconfig-node": vfstest.Symlink("/users/user/projects/myconfigs/node_modules/@something/tsconfig-node"),
			},
			cwd:             "/users/user/projects/myproject",
			commandLineArgs: []string{builtType, "src", "--extendedDiagnostics"},
		}
	}
	getTscExtendsConfigDirTestCase := func(subScenarioSufix string, commandLineArgs []string, edits []*tscEdit) *tscInput {
		return &tscInput{
			subScenario: "configDir template" + subScenarioSufix,
			files: FileMap{
				"/home/src/projects/configs/first/tsconfig.json": stringtestutil.Dedent(`
				{
					"extends": "../second/tsconfig.json",
					"include": ["${configDir}/src"],
					"compilerOptions": {
						"typeRoots": ["root1", "${configDir}/root2", "root3"],
						"types": [],
					},
				}`),
				"/home/src/projects/configs/second/tsconfig.json": stringtestutil.Dedent(`
				{
					"files": ["${configDir}/main.ts"],
					"compilerOptions": {
						"declarationDir": "${configDir}/decls",
						"paths": {
							"@myscope/*": ["${configDir}/types/*"],
						},
					},
					"watchOptions": {
						"excludeFiles": ["${configDir}/main.ts"],
					},
				}`),
				"/home/src/projects/myproject/tsconfig.json": stringtestutil.Dedent(`
				{
					"extends": "../configs/first/tsconfig.json",
					"compilerOptions": {
						"declaration": true,
						"outDir": "outDir",
						"traceResolution": true,
					},
				}`),
				"/home/src/projects/myproject/main.ts": stringtestutil.Dedent(`
					// some comment
					export const y = 10;
					import { x } from "@myscope/sometype";
				`),
				"/home/src/projects/myproject/types/sometype.ts": stringtestutil.Dedent(`
					export const x = 10;
				`),
			},
			cwd:             "/home/src/projects/myproject",
			commandLineArgs: commandLineArgs,
			edits:           edits,
		}
	}
	testCases := []*tscInput{
		{
			subScenario:     "when building solution with projects extends config with include",
			files:           getBuildConfigFileExtendsFileMap(),
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--b", "--v", "--listFiles"},
		},
		{
			subScenario:     "when building project uses reference and both extend config with include",
			files:           getBuildConfigFileExtendsFileMap(),
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--b", "webpack/tsconfig.json", "--v", "--listFiles"},
		},
		getTscExtendsWithSymlinkTestCase("-p"),
		getTscExtendsWithSymlinkTestCase("-b"),
		getTscExtendsConfigDirTestCase("", []string{"--explainFiles"}, nil),
		getTscExtendsConfigDirTestCase(" showConfig", []string{"--showConfig"}, nil),
		getTscExtendsConfigDirTestCase(" with commandline", []string{"--explainFiles", "--outDir", "${configDir}/outDir"}, nil),
		getTscExtendsConfigDirTestCase("", []string{"--b", "--explainFiles", "--v"}, nil),
		getTscExtendsConfigDirTestCase("", []string{"--b", "-w", "--explainFiles", "--v"}, []*tscEdit{
			{
				caption: "edit extended config file",
				edit: func(sys *testSys) {
					sys.writeFileNoError(
						"/home/src/projects/configs/first/tsconfig.json",
						stringtestutil.Dedent(`
						{
							"extends": "../second/tsconfig.json",
							"include": ["${configDir}/src"],
							"compilerOptions": {
								"typeRoots": ["${configDir}/root2"],
								"types": [],
							},
						}`),
						false,
					)
				},
			},
		}),
	}

	for _, test := range testCases {
		test.run(t, "extends")
	}
}

func TestTscIncremental(t *testing.T) {
	t.Parallel()
	getConstEnumTest := func(bdsContents string, changeEnumFile string, testSuffix string) *tscInput {
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
			edits: []*tscEdit{
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
			edits: []*tscEdit{
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
			edits: []*tscEdit{
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
			edits: []*tscEdit{
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
			edits: []*tscEdit{
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
			edits: []*tscEdit{
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
			edits: []*tscEdit{
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
			edits: []*tscEdit{
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
			edits: []*tscEdit{
				{
					caption: "delete file with imports",
					edit: func(sys *testSys) {
						sys.removeNoError("/home/src/workspaces/project/file2.ts")
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
			edits: []*tscEdit{
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
			edits: []*tscEdit{
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
			edits: []*tscEdit{
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
		{
			subScenario: "when there is bind diagnostics thats ignored",
			files: FileMap{
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"skipLibCheck": true,
						"incremental": true,
					}
				}`),
				"/home/src/workspaces/project/a.ts": `export const a = 10;`,
				"/home/src/workspaces/project/b.d.ts": stringtestutil.Dedent(`
					interface NoName {
						Profiler: new ({ sampleInterval: number, maxBufferSize: number }) => {
							stop: () => Promise<any>;
						};
					}
				`),
			},
			commandLineArgs: []string{""},
			edits: []*tscEdit{
				noChange,
				{
					caption:         "no change and tsc -b",
					commandLineArgs: []string{"-b", "-v"},
				},
			},
		},
	}

	for _, test := range testCases {
		test.run(t, "incremental")
	}
}

func TestTscLibraryResolution(t *testing.T) {
	t.Parallel()
	getTscLibraryResolutionFileMap := func(libReplacement bool) FileMap {
		files := FileMap{
			"/home/src/workspace/projects/project1/utils.d.ts": `export const y = 10;`,
			"/home/src/workspace/projects/project1/file.ts":    `export const file = 10;`,
			"/home/src/workspace/projects/project1/core.d.ts":  `export const core = 10;`,
			"/home/src/workspace/projects/project1/index.ts":   `export const x = "type1";`,
			"/home/src/workspace/projects/project1/file2.ts": stringtestutil.Dedent(`
				/// <reference lib="webworker"/>
				/// <reference lib="scripthost"/>
				/// <reference lib="es5"/>
			`),
			"/home/src/workspace/projects/project1/tsconfig.json": stringtestutil.Dedent(fmt.Sprintf(`
				{
					"compilerOptions": {
						"composite": true,
						"typeRoots": ["./typeroot1"],
						"lib": ["es5", "dom"],
						"traceResolution": true,
						"libReplacement": %t
					}
				}
			`, libReplacement)),
			"/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts": `export type TheNum = "type1";`,
			"/home/src/workspace/projects/project2/utils.d.ts":                    `export const y = 10;`,
			"/home/src/workspace/projects/project2/index.ts":                      `export const y = 10`,
			"/home/src/workspace/projects/project2/tsconfig.json": stringtestutil.Dedent(fmt.Sprintf(`
				{
					"compilerOptions": {
						"composite": true,
						"lib": ["es5", "dom"],
						"traceResolution": true,
						"libReplacement": %t
					}
				}
			`, libReplacement)),
			"/home/src/workspace/projects/project3/utils.d.ts": `export const y = 10;`,
			"/home/src/workspace/projects/project3/index.ts":   `export const z = 10`,
			"/home/src/workspace/projects/project3/tsconfig.json": stringtestutil.Dedent(fmt.Sprintf(`
				{
					"compilerOptions": {
						"composite": true,
						"lib": ["es5", "dom"],
						"traceResolution": true,
						"libReplacement": %t
					}
				}
			`, libReplacement)),
			"/home/src/workspace/projects/project4/utils.d.ts": `export const y = 10;`,
			"/home/src/workspace/projects/project4/index.ts":   `export const z = 10`,
			"/home/src/workspace/projects/project4/tsconfig.json": stringtestutil.Dedent(fmt.Sprintf(`
				{
					"compilerOptions": {
						"composite": true,
						"lib": ["esnext", "dom", "webworker"],
						"traceResolution": true,
						"libReplacement": %t
					}
				}
			`, libReplacement)),
			getTestLibPathFor("dom"):        "interface DOMInterface { }",
			getTestLibPathFor("webworker"):  "interface WebWorkerInterface { }",
			getTestLibPathFor("scripthost"): "interface ScriptHostInterface { }",
			"/home/src/workspace/projects/node_modules/@typescript/unlreated/index.d.ts": "export const unrelated = 10;",
		}
		if libReplacement {
			files["/home/src/workspace/projects/node_modules/@typescript/lib-es5/index.d.ts"] = tscDefaultLibContent
			files["/home/src/workspace/projects/node_modules/@typescript/lib-esnext/index.d.ts"] = tscDefaultLibContent
			files["/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts"] = "interface DOMInterface { }"
			files["/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts"] = "interface WebWorkerInterface { }"
			files["/home/src/workspace/projects/node_modules/@typescript/lib-scripthost/index.d.ts"] = "interface ScriptHostInterface { }"
		}
		return files
	}
	getTscLibResolutionTestCases := func(commandLineArgs []string) []*tscInput {
		return []*tscInput{
			{
				subScenario:     "with config",
				files:           getTscLibraryResolutionFileMap(false),
				cwd:             "/home/src/workspace/projects",
				commandLineArgs: commandLineArgs,
			},
			{
				subScenario:     "with config with libReplacement",
				files:           getTscLibraryResolutionFileMap(true),
				cwd:             "/home/src/workspace/projects",
				commandLineArgs: commandLineArgs,
			},
		}
	}
	getTscLibraryResolutionUnknown := func() FileMap {
		return FileMap{
			"/home/src/workspace/projects/project1/utils.d.ts": `export const y = 10;`,
			"/home/src/workspace/projects/project1/file.ts":    `export const file = 10;`,
			"/home/src/workspace/projects/project1/core.d.ts":  `export const core = 10;`,
			"/home/src/workspace/projects/project1/index.ts":   `export const x = "type1";`,
			"/home/src/workspace/projects/project1/file2.ts": stringtestutil.Dedent(`
				/// <reference lib="webworker2"/>
				/// <reference lib="unknownlib"/>
				/// <reference lib="scripthost"/>
			`),
			"/home/src/workspace/projects/project1/tsconfig.json": stringtestutil.Dedent(`
			{
				"compilerOptions": {
					"composite": true,
					"traceResolution": true,
					"libReplacement": true
				}
			}`),
			getTestLibPathFor("webworker"):  "interface WebWorkerInterface { }",
			getTestLibPathFor("scripthost"): "interface ScriptHostInterface { }",
		}
	}
	testCases := slices.Concat(
		getTscLibResolutionTestCases([]string{"-b", "project1", "project2", "project3", "project4", "--verbose", "--explainFiles"}),
		getTscLibResolutionTestCases([]string{"-p", "project1", "--explainFiles"}),
		getTscLibResolutionTestCases([]string{"-b", "-w", "project1", "project2", "project3", "project4", "--verbose", "--explainFiles"}),
		[]*tscInput{
			{
				subScenario:     "unknown lib",
				files:           getTscLibraryResolutionUnknown(),
				cwd:             "/home/src/workspace/projects",
				commandLineArgs: []string{"-p", "project1", "--explainFiles"},
			},
			{
				subScenario: "when noLib toggles",
				files: FileMap{
					"/home/src/workspaces/project/a.d.ts": `declare const a = "hello";`,
					"/home/src/workspaces/project/b.ts":   `const b = 10;`,
					"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
                    {
                        "compilerOptions": {
                            "declaration": true,
                            "incremental": true,
                            "lib": ["es6"],
                        },
                    }
                `),
				},
				edits: []*tscEdit{
					{
						caption:         "with --noLib",
						commandLineArgs: []string{"--noLib"},
					},
				},
			},
		},
	)

	for _, test := range testCases {
		test.run(t, "libraryResolution")
	}
}

func TestTscListFilesOnly(t *testing.T) {
	t.Parallel()
	testCases := []*tscInput{
		{
			subScenario: "loose file",
			files: FileMap{
				"/home/src/workspaces/project/test.ts": "export const x = 1;",
			},
			commandLineArgs: []string{"test.ts", "--listFilesOnly"},
		},
		{
			subScenario: "combined with incremental",
			files: FileMap{
				"/home/src/workspaces/project/test.ts":       "export const x = 1;",
				"/home/src/workspaces/project/tsconfig.json": "{}",
			},
			commandLineArgs: []string{"--incremental", "--listFilesOnly"},
			edits: []*tscEdit{
				{
					caption:         "incremental actual build",
					commandLineArgs: []string{"--incremental"},
				},
				noChange,
				{
					caption:         "incremental should not build",
					commandLineArgs: []string{"--incremental"},
				},
			},
		},
	}

	for _, testCase := range testCases {
		testCase.run(t, "listFilesOnly")
	}
}

func TestTscModuleResolution(t *testing.T) {
	t.Parallel()
	getBuildModuleResolutionInProjectRefTestCase := func(preserveSymlinks bool) *tscInput {
		return &tscInput{
			subScenario: `resolves specifier in output declaration file from referenced project correctly` + core.IfElse(preserveSymlinks, " with preserveSymlinks", ""),
			files: FileMap{
				`/user/username/projects/myproject/packages/pkg1/index.ts`: stringtestutil.Dedent(`
					import type { TheNum } from 'pkg2'
					export const theNum: TheNum = 42;`),
				`/user/username/projects/myproject/packages/pkg1/tsconfig.json`: stringtestutil.Dedent(fmt.Sprintf(`
					{
						"compilerOptions": { 
							"outDir": "build",
							"preserveSymlinks": %t
						},
						"references": [{ "path": "../pkg2" }]
					}
				`, preserveSymlinks)),
				`/user/username/projects/myproject/packages/pkg2/const.ts`: stringtestutil.Dedent(`
					export type TheNum = 42;
				`),
				`/user/username/projects/myproject/packages/pkg2/index.ts`: stringtestutil.Dedent(`
					export type { TheNum } from 'const';
				`),
				`/user/username/projects/myproject/packages/pkg2/tsconfig.json`: stringtestutil.Dedent(fmt.Sprintf(`
					{
						"compilerOptions": {
							"composite": true,
							"outDir": "build",
							"paths": {
								"const": ["./const"]
							},
							"preserveSymlinks": %t,
						},
					}
				`, preserveSymlinks)),
				`/user/username/projects/myproject/packages/pkg2/package.json`: stringtestutil.Dedent(`
					{
						"name": "pkg2",
						"version": "1.0.0",
						"main": "build/index.js"
					}
				`),
				`/user/username/projects/myproject/node_modules/pkg2`: vfstest.Symlink(`/user/username/projects/myproject/packages/pkg2`),
			},
			cwd:             "/user/username/projects/myproject",
			commandLineArgs: []string{"-b", "packages/pkg1", "--verbose", "--traceResolution"},
		}
	}
	getTscModuleResolutionSharingFileMap := func() FileMap {
		return FileMap{
			"/home/src/workspaces/project/packages/a/index.js":      `export const a = 'a';`,
			"/home/src/workspaces/project/packages/a/test/index.js": `import 'a';`,
			"/home/src/workspaces/project/packages/a/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"checkJs": true,
						"composite": true,
						"declaration": true,
						"emitDeclarationOnly": true,
						"module": "nodenext",
						"outDir": "types",
					},
				}`),
			"/home/src/workspaces/project/packages/a/package.json": stringtestutil.Dedent(`
				{
					"name": "a",
					"version": "0.0.0",
					"type": "module",
					"exports": {
						".": {
							"types": "./types/index.d.ts",
							"default": "./index.js"
						}
					}
				}`),
			"/home/src/workspaces/project/packages/b/index.js": `export { a } from 'a';`,
			"/home/src/workspaces/project/packages/b/tsconfig.json": stringtestutil.Dedent(`
				{
				"references": [{ "path": "../a" }],
					"compilerOptions": {
						"checkJs": true,
						"module": "nodenext",
						"noEmit": true,
						"noImplicitAny": true,
					},
				}`),
			"/home/src/workspaces/project/packages/b/package.json": stringtestutil.Dedent(`
				{
					"name": "b",
					"version": "0.0.0",
					"type": "module"
				}`),
			"/home/src/workspaces/project/node_modules/a": vfstest.Symlink("/home/src/workspaces/project/packages/a"),
		}
	}
	getTscModuleResolutionAlternateResultAtTypesPackageJson := func(packageName string, addTypesCondition bool) string {
		var typesString string
		if addTypesCondition {
			typesString = `"types": "./index.d.ts",`
		}
		return stringtestutil.Dedent(fmt.Sprintf(`
			{
				"name": "@types/%s",
				"version": "1.0.0",
				"types": "index.d.ts",
				"exports": {
					".": {
						%s
						"require": "./index.d.ts"
					}
				}
			}`, packageName, typesString))
	}
	getTscModuleResolutionAlternateResultPackageJson := func(packageName string, addTypes bool, addTypesCondition bool) string {
		var types string
		if addTypes {
			types = `"types": "index.d.ts",`
		}
		var typesString string
		if addTypesCondition {
			typesString = `"types": "./index.d.ts",`
		}
		return stringtestutil.Dedent(fmt.Sprintf(`
		{
			"name": "%s",
			"version": "1.0.0",
			"main": "index.js",
			%s
			"exports": {
				".": {
					%s
					"import": "./index.mjs",
					"require": "./index.js"
				}
			}
		}`, packageName, types, typesString))
	}
	getTscModuleResolutionAlternateResultDts := func(packageName string) string {
		return fmt.Sprintf(`export declare const %s: number;`, packageName)
	}
	getTscModuleResolutionAlternateResultJs := func(packageName string) string {
		return fmt.Sprintf(`module.exports = { %s: 1 };`, packageName)
	}
	getTscModuleResolutionAlternateResultMjs := func(packageName string) string {
		return fmt.Sprintf(`export const %s = 1;`, packageName)
	}
	testCases := []*tscInput{
		getBuildModuleResolutionInProjectRefTestCase(false),
		getBuildModuleResolutionInProjectRefTestCase(true),
		{
			subScenario: `type reference resolution uses correct options for different resolution options referenced project`,
			files: FileMap{
				"/home/src/workspaces/project/packages/pkg1_index.ts": `export const theNum: TheNum = "type1";`,
				"/home/src/workspaces/project/packages/pkg1.tsconfig.json": stringtestutil.Dedent(`
                    {
                        "compilerOptions": {
                            "composite": true,
                            "typeRoots": ["./typeroot1"]
                        },
                        "files": ["./pkg1_index.ts"],
                    }
                `),
				"/home/src/workspaces/project/packages/typeroot1/sometype/index.d.ts": `declare type TheNum = "type1";`,
				"/home/src/workspaces/project/packages/pkg2_index.ts":                 `export const theNum: TheNum2 = "type2";`,
				"/home/src/workspaces/project/packages/pkg2.tsconfig.json": stringtestutil.Dedent(`
                    {
                        "compilerOptions": {
                            "composite": true,
                            "typeRoots": ["./typeroot2"]
                        },
                        "files": ["./pkg2_index.ts"],
                    }
                `),
				"/home/src/workspaces/project/packages/typeroot2/sometype/index.d.ts": `declare type TheNum2 = "type2";`,
			},
			commandLineArgs: []string{"-b", "packages/pkg1.tsconfig.json", "packages/pkg2.tsconfig.json", "--verbose", "--traceResolution"},
		},
		{
			subScenario: "impliedNodeFormat differs between projects for shared file",
			files: FileMap{
				"/home/src/workspaces/project/a/src/index.ts": "",
				"/home/src/workspaces/project/a/tsconfig.json": stringtestutil.Dedent(`
				{
                    "compilerOptions": {
						"strict": true
					}
				}
                `),
				"/home/src/workspaces/project/b/src/index.ts": stringtestutil.Dedent(`
                    import pg from "pg";
                    pg.foo();
                `),
				"/home/src/workspaces/project/b/tsconfig.json": stringtestutil.Dedent(`
				{
                    "compilerOptions": { 
						"strict": true,
						"module": "node16"
					},
                }`),
				"/home/src/workspaces/project/b/package.json": stringtestutil.Dedent(`
				{
                    "name": "b",
                    "type": "module"
                }`),
				"/home/src/workspaces/project/node_modules/@types/pg/index.d.ts": "export function foo(): void;",
				"/home/src/workspaces/project/node_modules/@types/pg/package.json": stringtestutil.Dedent(`
				{
                    "name": "@types/pg",
                    "types": "index.d.ts"
                }`),
			},
			commandLineArgs: []string{"-b", "a", "b", "--verbose", "--traceResolution", "--explainFiles"},
			edits:           noChangeOnlyEdit,
		},
		{
			subScenario:     "shared resolution should not report error",
			files:           getTscModuleResolutionSharingFileMap(),
			commandLineArgs: []string{"-b", "packages/b", "--verbose", "--traceResolution", "--explainFiles"},
		},
		{
			subScenario:     "when resolution is not shared",
			files:           getTscModuleResolutionSharingFileMap(),
			commandLineArgs: []string{"-b", "packages/a", "--verbose", "--traceResolution", "--explainFiles"},
			edits: []*tscEdit{
				{
					caption:         "build b",
					commandLineArgs: []string{"-b", "packages/b", "--verbose", "--traceResolution", "--explainFiles"},
				},
			},
		},
		{
			subScenario: "pnpm style layout",
			files: FileMap{
				// button@0.0.1
				"/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button/src/index.ts": stringtestutil.Dedent(`
                    export interface Button {
                        a: number;
                        b: number;
                    }
                    export function createButton(): Button {
                        return {
                            a: 0,
                            b: 1,
                        };
                    }
                `),
				"/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button/package.json": stringtestutil.Dedent(`
					{
						"name": "@component-type-checker/button",
						"version": "0.0.1",
						"main": "./src/index.ts"
					}`),

				// button@0.0.2
				"/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/src/index.ts": stringtestutil.Dedent(`
                    export interface Button {
                        a: number;
                        c: number;
                    }
                    export function createButton(): Button {
                        return {
                            a: 0,
                            c: 2,
                        };
                    }
                `),
				"/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/package.json": stringtestutil.Dedent(`
                    {
                        "name": "@component-type-checker/button",
                        "version": "0.0.2",
                        "main": "./src/index.ts"
                    }`),

				// @component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1
				"/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button": vfstest.Symlink(
					"/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button",
				),
				"/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/src/index.ts": stringtestutil.Dedent(`
                    export { createButton, Button } from "@component-type-checker/button";
                `),
				"/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/package.json": stringtestutil.Dedent(`
					{
						"name": "@component-type-checker/components",
						"version": "0.0.1",
						"main": "./src/index.ts",
						"peerDependencies": {
							"@component-type-checker/button": "*"
						},
						"devDependencies": {
							"@component-type-checker/button": "0.0.2"
						}
					}`),

				// @component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2
				"/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button": vfstest.Symlink(
					"/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button",
				),
				"/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/src/index.ts": stringtestutil.Dedent(`
                    export { createButton, Button } from "@component-type-checker/button";
                `),
				"/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/package.json": stringtestutil.Dedent(`
					{
						"name": "@component-type-checker/components",
						"version": "0.0.1",
						"main": "./src/index.ts",
						"peerDependencies": {
							"@component-type-checker/button": "*"
						},
						"devDependencies": {
							"@component-type-checker/button": "0.0.2"
						}
					}`),

				// sdk => @component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1
				"/home/src/projects/component-type-checker/packages/sdk/src/index.ts": stringtestutil.Dedent(`
                    export { Button, createButton } from "@component-type-checker/components";
                    export const VERSION = "0.0.2";
                `),
				"/home/src/projects/component-type-checker/packages/sdk/package.json": stringtestutil.Dedent(`
                    {
                        "name": "@component-type-checker/sdk1",
                        "version": "0.0.2",
                        "main": "./src/index.ts",
                        "dependencies": {
                            "@component-type-checker/components": "0.0.1",
                            "@component-type-checker/button": "0.0.1"
                        }
                    }`),
				"/home/src/projects/component-type-checker/packages/sdk/node_modules/@component-type-checker/button": vfstest.Symlink(
					"/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button",
				),
				"/home/src/projects/component-type-checker/packages/sdk/node_modules/@component-type-checker/components": vfstest.Symlink(
					"/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components",
				),

				// app => @component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2
				"/home/src/projects/component-type-checker/packages/app/src/app.tsx": stringtestutil.Dedent(`
                    import { VERSION } from "@component-type-checker/sdk";
                    import { Button } from "@component-type-checker/components";
                    import { createButton } from "@component-type-checker/button";
                    const button: Button = createButton();
                `),
				"/home/src/projects/component-type-checker/packages/app/package.json": stringtestutil.Dedent(`
					{
						"name": "app",
						"version": "1.0.0",
						"dependencies": {
							"@component-type-checker/button": "0.0.2",
							"@component-type-checker/components": "0.0.1",
							"@component-type-checker/sdk": "0.0.2"
						}
					}`),
				"/home/src/projects/component-type-checker/packages/app/tsconfig.json": stringtestutil.Dedent(`
					{
						"compilerOptions": {
							"target": "es5",
							"module": "esnext",
							"lib": ["ES5"],
							"moduleResolution": "node",
							"outDir": "dist",
						},
						"include": ["src"],
					}`),
				"/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/button": vfstest.Symlink(
					"/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button",
				),
				"/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/components": vfstest.Symlink(
					"/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components",
				),
				"/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/sdk": vfstest.Symlink(
					"/home/src/projects/component-type-checker/packages/sdk",
				),
			},
			cwd:             "/home/src/projects/component-type-checker/packages/app",
			commandLineArgs: []string{"--traceResolution", "--explainFiles"},
		},
		{
			subScenario: "package json scope",
			files: FileMap{
				"/home/src/workspaces/project/src/tsconfig.json": stringtestutil.Dedent(`
					{
						"compilerOptions": {
							"target": "ES2016",
							"composite": true,
							"module": "Node16",
							"traceResolution": true,
						},
						"files": [
							"main.ts",
							"fileA.ts",
							"fileB.mts",
						],
					}`),
				"/home/src/workspaces/project/src/main.ts": "export const x = 10;",
				"/home/src/workspaces/project/src/fileA.ts": stringtestutil.Dedent(`
                    import { foo } from "./fileB.mjs";
                    foo();
                `),
				"/home/src/workspaces/project/src/fileB.mts": "export function foo() {}",
				"/home/src/workspaces/project/package.json": stringtestutil.Dedent(`
                    {
                        "name": "app",
                        "version": "1.0.0"
                    }
                `),
			},
			commandLineArgs: []string{"-p", "src", "--explainFiles", "--extendedDiagnostics"},
			edits: []*tscEdit{
				{
					caption: "Delete package.json",
					edit: func(sys *testSys) {
						sys.removeNoError("/home/src/workspaces/project/package.json")
					},
					// !!! repopulateInfo on diagnostics not yet implemented
					expectedDiff: "Currently we arent repopulating error chain so errors will be different",
				},
			},
		},
		{
			subScenario: "alternateResult",
			files: FileMap{
				"/home/src/projects/project/node_modules/@types/bar/package.json":  getTscModuleResolutionAlternateResultAtTypesPackageJson("bar" /*addTypesCondition*/, false),
				"/home/src/projects/project/node_modules/@types/bar/index.d.ts":    getTscModuleResolutionAlternateResultDts("bar"),
				"/home/src/projects/project/node_modules/bar/package.json":         getTscModuleResolutionAlternateResultPackageJson("bar" /*addTypes*/, false /*addTypesCondition*/, false),
				"/home/src/projects/project/node_modules/bar/index.js":             getTscModuleResolutionAlternateResultJs("bar"),
				"/home/src/projects/project/node_modules/bar/index.mjs":            getTscModuleResolutionAlternateResultMjs("bar"),
				"/home/src/projects/project/node_modules/foo/package.json":         getTscModuleResolutionAlternateResultPackageJson("foo" /*addTypes*/, true /*addTypesCondition*/, false),
				"/home/src/projects/project/node_modules/foo/index.js":             getTscModuleResolutionAlternateResultJs("foo"),
				"/home/src/projects/project/node_modules/foo/index.mjs":            getTscModuleResolutionAlternateResultMjs("foo"),
				"/home/src/projects/project/node_modules/foo/index.d.ts":           getTscModuleResolutionAlternateResultDts("foo"),
				"/home/src/projects/project/node_modules/@types/bar2/package.json": getTscModuleResolutionAlternateResultAtTypesPackageJson("bar2" /*addTypesCondition*/, true),
				"/home/src/projects/project/node_modules/@types/bar2/index.d.ts":   getTscModuleResolutionAlternateResultDts("bar2"),
				"/home/src/projects/project/node_modules/bar2/package.json":        getTscModuleResolutionAlternateResultPackageJson("bar2" /*addTypes*/, false /*addTypesCondition*/, false),
				"/home/src/projects/project/node_modules/bar2/index.js":            getTscModuleResolutionAlternateResultJs("bar2"),
				"/home/src/projects/project/node_modules/bar2/index.mjs":           getTscModuleResolutionAlternateResultMjs("bar2"),
				"/home/src/projects/project/node_modules/foo2/package.json":        getTscModuleResolutionAlternateResultPackageJson("foo2" /*addTypes*/, true /*addTypesCondition*/, true),
				"/home/src/projects/project/node_modules/foo2/index.js":            getTscModuleResolutionAlternateResultJs("foo2"),
				"/home/src/projects/project/node_modules/foo2/index.mjs":           getTscModuleResolutionAlternateResultMjs("foo2"),
				"/home/src/projects/project/node_modules/foo2/index.d.ts":          getTscModuleResolutionAlternateResultDts("foo2"),
				"/home/src/projects/project/index.mts": stringtestutil.Dedent(`
					import { foo } from "foo";
					import { bar } from "bar";
					import { foo2 } from "foo2";
					import { bar2 } from "bar2";
				`),
				"/home/src/projects/project/tsconfig.json": stringtestutil.Dedent(`
					{
						"compilerOptions": {
							"module": "node16",
							"moduleResolution": "node16",
							"traceResolution": true,
							"incremental": true,
							"strict": true,
							"types": [],
						},
						"files": ["index.mts"],
					}`),
			},
			cwd: "/home/src/projects/project",
			edits: []*tscEdit{
				{
					caption: "delete the alternateResult in @types",
					edit: func(sys *testSys) {
						sys.removeNoError("/home/src/projects/project/node_modules/@types/bar/index.d.ts")
					},
					// !!! repopulateInfo on diagnostics not yet implemented
					expectedDiff: "Currently we arent repopulating error chain so errors will be different",
				},
				{
					caption: "delete the node10Result in package/types",
					edit: func(sys *testSys) {
						sys.removeNoError("/home/src/projects/project/node_modules/foo/index.d.ts")
					},
					// !!! repopulateInfo on diagnostics not yet implemented
					expectedDiff: "Currently we arent repopulating error chain so errors will be different",
				},
				{
					caption: "add the alternateResult in @types",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/home/src/projects/project/node_modules/@types/bar/index.d.ts", getTscModuleResolutionAlternateResultDts("bar"), false)
					},
					// !!! repopulateInfo on diagnostics not yet implemented
					expectedDiff: "Currently we arent repopulating error chain so errors will be different",
				},
				{
					caption: "add the alternateResult in package/types",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/home/src/projects/project/node_modules/foo/index.d.ts", getTscModuleResolutionAlternateResultDts("foo"), false)
					},
				},
				{
					caption: "update package.json from @types so error is fixed",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/home/src/projects/project/node_modules/@types/bar/package.json", getTscModuleResolutionAlternateResultAtTypesPackageJson("bar" /*addTypesCondition*/, true), false)
					},
				},
				{
					caption: "update package.json so error is fixed",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/home/src/projects/project/node_modules/foo/package.json", getTscModuleResolutionAlternateResultPackageJson("foo" /*addTypes*/, true /*addTypesCondition*/, true), false)
					},
				},
				{
					caption: "update package.json from @types so error is introduced",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/home/src/projects/project/node_modules/@types/bar2/package.json", getTscModuleResolutionAlternateResultAtTypesPackageJson("bar2" /*addTypesCondition*/, false), false)
					},
				},
				{
					caption: "update package.json so error is introduced",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/home/src/projects/project/node_modules/foo2/package.json", getTscModuleResolutionAlternateResultPackageJson("foo2" /*addTypes*/, true /*addTypesCondition*/, false), false)
					},
				},
				{
					caption: "delete the alternateResult in @types",
					edit: func(sys *testSys) {
						sys.removeNoError("/home/src/projects/project/node_modules/@types/bar2/index.d.ts")
					},
					// !!! repopulateInfo on diagnostics not yet implemented
					expectedDiff: "Currently we arent repopulating error chain so errors will be different",
				},
				{
					caption: "delete the node10Result in package/types",
					edit: func(sys *testSys) {
						sys.removeNoError("/home/src/projects/project/node_modules/foo2/index.d.ts")
					},
					// !!! repopulateInfo on diagnostics not yet implemented
					expectedDiff: "Currently we arent repopulating error chain so errors will be different",
				},
				{
					caption: "add the alternateResult in @types",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/home/src/projects/project/node_modules/@types/bar2/index.d.ts", getTscModuleResolutionAlternateResultDts("bar2"), false)
					},
					// !!! repopulateInfo on diagnostics not yet implemented
					expectedDiff: "Currently we arent repopulating error chain so errors will be different",
				},
				{
					caption: "add the ndoe10Result in package/types",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/home/src/projects/project/node_modules/foo2/index.d.ts", getTscModuleResolutionAlternateResultDts("foo2"), false)
					},
				},
			},
		},
		{
			subScenario: "handles the cache correctly when two projects use different module resolution settings",
			files: FileMap{
				`/user/username/projects/myproject/project1/index.ts`:                     `import { foo } from "file";`,
				`/user/username/projects/myproject/project1/node_modules/file/index.d.ts`: "export const foo = 10;",
				`/user/username/projects/myproject/project1/tsconfig.json`: stringtestutil.Dedent(`
				   {
                       "compilerOptions": {
						   "composite": true,
						   "types": ["foo", "bar"]
					   },
                       "files": ["index.ts"],
                   }`),
				`/user/username/projects/myproject/project2/index.ts`:                     `import { foo } from "file";`,
				`/user/username/projects/myproject/project2/node_modules/file/index.d.ts`: "export const foo = 10;",
				`/user/username/projects/myproject/project2/tsconfig.json`: stringtestutil.Dedent(`
				   {
                       "compilerOptions": {
						   "composite": true,
						   "types": ["foo"],
						   "module": "nodenext",
						   "moduleResolution": "nodenext"
					   },
                       "files": ["index.ts"],
                   }`),
				`/user/username/projects/myproject/node_modules/@types/foo/index.d.ts`: "export const foo = 10;",
				`/user/username/projects/myproject/node_modules/@types/bar/index.d.ts`: "export const bar = 10;",
				`/user/username/projects/myproject/tsconfig.json`: stringtestutil.Dedent(`
				   {
						"files": [],
						"references": [
							{ "path": "./project1" },
							{ "path": "./project2" },
						],
                   }`),
			},
			cwd:             "/user/username/projects/myproject",
			commandLineArgs: []string{"--b", "-w", "-v"},
			edits: []*tscEdit{
				{
					caption: "Append text",
					edit: func(sys *testSys) {
						sys.appendFile(`/user/username/projects/myproject/project1/index.ts`, "const bar = 10;")
					},
				},
			},
		},
		{
			// !!! sheetal package.json watches not yet implemented
			subScenario: `resolves specifier in output declaration file from referenced project correctly with cts and mts extensions`,
			files: FileMap{
				`/user/username/projects/myproject/packages/pkg1/package.json`: stringtestutil.Dedent(`
					{
						"name": "pkg1",
						"version": "1.0.0",
						"main": "build/index.js",
						"type": "module"
					}`),
				`/user/username/projects/myproject/packages/pkg1/index.ts`: stringtestutil.Dedent(`
					import type { TheNum } from 'pkg2'
					export const theNum: TheNum = 42;`),
				`/user/username/projects/myproject/packages/pkg1/tsconfig.json`: stringtestutil.Dedent(`
					{
						"compilerOptions": {
							"outDir": "build",
							"module": "node16",
						},
						"references": [{ "path": "../pkg2" }],
					}`),
				`/user/username/projects/myproject/packages/pkg2/const.cts`: `export type TheNum = 42;`,
				`/user/username/projects/myproject/packages/pkg2/index.ts`:  `export type { TheNum } from './const.cjs';`,
				`/user/username/projects/myproject/packages/pkg2/tsconfig.json`: stringtestutil.Dedent(`
					{
						"compilerOptions": {
							"composite": true,
							"outDir": "build",
							"module": "node16",
						},
					}`),
				`/user/username/projects/myproject/packages/pkg2/package.json`: stringtestutil.Dedent(`
					{
						"name": "pkg2",
						"version": "1.0.0",
						"main": "build/index.js",
						"type": "module"
					}`),
				`/user/username/projects/myproject/node_modules/pkg2`: vfstest.Symlink(`/user/username/projects/myproject/packages/pkg2`),
			},
			cwd:             "/user/username/projects/myproject",
			commandLineArgs: []string{"-b", "packages/pkg1", "-w", "--verbose", "--traceResolution"},
			edits: []*tscEdit{
				{
					caption: "reports import errors after change to package file",
					edit: func(sys *testSys) {
						sys.replaceFileText(`/user/username/projects/myproject/packages/pkg1/package.json`, `"module"`, `"commonjs"`)
					},
					expectedDiff: "Package.json watch pending, so no change detected yet",
				},
				{
					caption: "removes those errors when a package file is changed back",
					edit: func(sys *testSys) {
						sys.replaceFileText(`/user/username/projects/myproject/packages/pkg1/package.json`, `"commonjs"`, `"module"`)
					},
				},
				{
					caption: "reports import errors after change to package file",
					edit: func(sys *testSys) {
						sys.replaceFileText(`/user/username/projects/myproject/packages/pkg1/package.json`, `"module"`, `"commonjs"`)
					},
					expectedDiff: "Package.json watch pending, so no change detected yet",
				},
				{
					caption: "removes those errors when a package file is changed to cjs extensions",
					edit: func(sys *testSys) {
						sys.replaceFileText(`/user/username/projects/myproject/packages/pkg2/package.json`, `"build/index.js"`, `"build/index.cjs"`)
						sys.renameFileNoError(`/user/username/projects/myproject/packages/pkg2/index.ts`, `/user/username/projects/myproject/packages/pkg2/index.cts`)
					},
				},
			},
		},
		{
			subScenario: `build mode watches for changes to package-json main fields`,
			files: FileMap{
				`/user/username/projects/myproject/packages/pkg1/package.json`: stringtestutil.Dedent(`
					{
                        "name": "pkg1",
                        "version": "1.0.0",
                        "main": "build/index.js"
                    }`),
				`/user/username/projects/myproject/packages/pkg1/index.ts`: stringtestutil.Dedent(`
                    import type { TheNum } from 'pkg2'
                    export const theNum: TheNum = 42;`),
				`/user/username/projects/myproject/packages/pkg1/tsconfig.json`: stringtestutil.Dedent(`
					{
                        "compilerOptions": {
                            "outDir": "build",
                        },
                        "references": [{ "path": "../pkg2" }],
                    }`),
				`/user/username/projects/myproject/packages/pkg2/tsconfig.json`: stringtestutil.Dedent(`
					{
                        "compilerOptions": {
                            "composite": true,
                            "outDir": "build",
                        },
                    }`),
				`/user/username/projects/myproject/packages/pkg2/const.ts`: `export type TheNum = 42;`,
				`/user/username/projects/myproject/packages/pkg2/index.ts`: `export type { TheNum } from './const.js';`,
				`/user/username/projects/myproject/packages/pkg2/other.ts`: `export type TheStr = string;`,
				`/user/username/projects/myproject/packages/pkg2/package.json`: stringtestutil.Dedent(`
					{
						"name": "pkg2",
                        "version": "1.0.0",
                        "main": "build/index.js"
                    }`),
				`/user/username/projects/myproject/node_modules/pkg2`: vfstest.Symlink(`/user/username/projects/myproject/packages/pkg2`),
			},
			cwd:             "/user/username/projects/myproject",
			commandLineArgs: []string{"-b", "packages/pkg1", "--verbose", "-w", "--traceResolution"},
			edits: []*tscEdit{
				{
					caption: "reports import errors after change to package file",
					edit: func(sys *testSys) {
						sys.replaceFileText(`/user/username/projects/myproject/packages/pkg2/package.json`, `index.js`, `other.js`)
					},
					expectedDiff: "Package.json watch pending, so no change detected yet",
				},
				{
					caption: "removes those errors when a package file is changed back",
					edit: func(sys *testSys) {
						sys.replaceFileText(`/user/username/projects/myproject/packages/pkg2/package.json`, `other.js`, `index.js`)
					},
				},
			},
		},
		{
			subScenario: "resolution from d.ts of referenced project",
			files: FileMap{
				"/home/src/workspaces/project/common.d.ts": "export type OnValue = (value: number) => void",
				"/home/src/workspaces/project/producer/index.ts": stringtestutil.Dedent(`
                    export { ValueProducerDeclaration } from "./in-js"
                    import { OnValue } from "@common"
                    export interface ValueProducerFromTs {
                        onValue: OnValue;
                    }
                `),
				"/home/src/workspaces/project/producer/in-js.d.ts": stringtestutil.Dedent(`
                    import { OnValue } from "@common"
                    export interface ValueProducerDeclaration {
                        onValue: OnValue;
                    }
                `),
				"/home/src/workspaces/project/producer/tsconfig.json": stringtestutil.Dedent(`
				{
                    "compilerOptions": {
                        "strict": true,
                        "composite": true,
                        "module": "nodenext",
                        "moduleResolution": "nodenext",
                        "paths": {
                            "@common": ["../common.d.ts"],
                        },
                    },
                }`),
				"/home/src/workspaces/project/consumer/index.ts": stringtestutil.Dedent(`
                    import { ValueProducerDeclaration, ValueProducerFromTs } from "@producer"
                    declare let v: ValueProducerDeclaration;
					// n is implicitly any because onValue is actually any (despite what the tooltip says)
					v.onValue = (n) => {
                    }
                    // n is implicitly number as expected
                    declare let v2: ValueProducerFromTs;
                    v2.onValue = (n) => {
                    }`),
				"/home/src/workspaces/project/consumer/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"strict": true,
						"module": "nodenext",
						"moduleResolution": "nodenext",
						"paths": {
							"@producer": ["../producer/index"],
						},
					},
					"references": [
						{ "path": "../producer" },
                    ],
                }`),
			},
			commandLineArgs: []string{"--b", "consumer", "--traceResolution", "-v"},
		},
	}

	for _, test := range testCases {
		test.run(t, "moduleResolution")
	}
}

func TestTscNoCheck(t *testing.T) {
	t.Parallel()
	type noCheckScenario struct {
		subScenario string
		aText       string
	}
	getTscNoCheckTestCase := func(scenario *noCheckScenario, incremental bool, commandLineArgs []string) *tscInput {
		noChangeWithCheck := &tscEdit{
			caption:         "No Change run with checking",
			commandLineArgs: commandLineArgs,
		}
		fixErrorNoCheck := &tscEdit{
			caption: "Fix `a` error with noCheck",
			edit: func(sys *testSys) {
				sys.writeFileNoError("/home/src/workspaces/project/a.ts", `export const a = "hello";`, false)
			},
		}
		addErrorNoCheck := &tscEdit{
			caption: "Introduce error with noCheck",
			edit: func(sys *testSys) {
				sys.writeFileNoError("/home/src/workspaces/project/a.ts", scenario.aText, false)
			},
		}
		return &tscInput{
			subScenario: scenario.subScenario + core.IfElse(incremental, " with incremental", ""),
			files: FileMap{
				"/home/src/workspaces/project/a.ts": scenario.aText,
				"/home/src/workspaces/project/b.ts": `export const b = 10;`,
				"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(fmt.Sprintf(`
				{
					"compilerOptions": {
						"declaration": true,
						"incremental": %t
					}
				}`, incremental)),
			},
			commandLineArgs: slices.Concat(commandLineArgs, []string{"--noCheck"}),
			edits: []*tscEdit{
				noChange,
				fixErrorNoCheck,   // Fix error with noCheck
				noChange,          // Should be no op
				noChangeWithCheck, // Check errors - should not report any errors - update buildInfo
				noChangeWithCheck, // Should be no op
				noChange,          // Should be no op
				addErrorNoCheck,
				noChange,          // Should be no op
				noChangeWithCheck, // Should check errors and update buildInfo
				fixErrorNoCheck,   // Fix error with noCheck
				noChangeWithCheck, // Should check errors and update buildInfo
				{
					caption: "Add file with error",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/home/src/workspaces/project/c.ts", `export const c: number = "hello";`, false)
					},
					commandLineArgs: commandLineArgs,
				},
				addErrorNoCheck,
				fixErrorNoCheck,
				noChangeWithCheck,
				noChange,          // Should be no op
				noChangeWithCheck, // Should be no op
			},
		}
	}

	cases := []noCheckScenario{
		{"syntax errors", `export const a = "hello`},
		{"semantic errors", `export const a: number = "hello";`},
		{"dts errors", `export const a = class { private p = 10; };`},
	}
	testCases := core.FlatMap(cases, func(c noCheckScenario) []*tscInput {
		return []*tscInput{
			getTscNoCheckTestCase(&c, false, []string{}),
			getTscNoCheckTestCase(&c, true, []string{}),
			getTscNoCheckTestCase(&c, false, []string{"-b", "-v"}),
			getTscNoCheckTestCase(&c, true, []string{"-b", "-v"}),
		}
	})
	for _, test := range testCases {
		test.run(t, "noCheck")
	}
}

func TestTscNoEmit(t *testing.T) {
	t.Parallel()
	type tscNoEmitScenario struct {
		subScenario string
		aText       string
		dtsEnabled  bool
	}
	noEmitScenarios := []*tscNoEmitScenario{
		{
			subScenario: "syntax errors",
			aText:       `const a = "hello`,
		},
		{
			subScenario: "semantic errors",
			aText:       `const a: number = "hello"`,
		},
		{
			subScenario: "dts errors",
			aText:       `const a = class { private p = 10; };`,
			dtsEnabled:  true,
		},
		{
			subScenario: "dts errors without dts enabled",
			aText:       `const a = class { private p = 10; };`,
		},
	}
	getTscNoEmitAndErrorsFileMap := func(scenario *tscNoEmitScenario, incremental bool, asModules bool, modify func(FileMap)) FileMap {
		files := FileMap{
			"/home/src/projects/project/a.ts": core.IfElse(asModules, `export `, "") + scenario.aText,
			"/home/src/projects/project/tsconfig.json": stringtestutil.Dedent(fmt.Sprintf(`
				{
					"compilerOptions": {
						"incremental": %t,
						"declaration": %t
					}
				}
		`, incremental, scenario.dtsEnabled)),
		}
		if asModules {
			files["/home/src/projects/project/b.ts"] = `export const b = 10;`
		}
		if modify != nil {
			modify(files)
		}
		return files
	}
	getTscNoEmitAndErrorsTestCasesWorker := func(commandLineArgs []string, addNoEmitOnCommandLine bool, modify func(FileMap), edits func(scenario *tscNoEmitScenario, commandLineArgs []string, asModules bool) []*tscEdit) []*tscInput {
		testingCases := make([]*tscInput, 0, len(noEmitScenarios)*3)
		commandLineArgsForInput := commandLineArgs
		if addNoEmitOnCommandLine {
			commandLineArgsForInput = slices.Concat(commandLineArgs, []string{"--noEmit"})
		}
		for _, scenario := range noEmitScenarios {
			testingCases = append(
				testingCases,
				&tscInput{
					subScenario:     scenario.subScenario,
					commandLineArgs: commandLineArgsForInput,
					files:           getTscNoEmitAndErrorsFileMap(scenario, false, false, modify),
					cwd:             "/home/src/projects/project",
					edits:           edits(scenario, commandLineArgs, false),
				},
				&tscInput{
					subScenario:     scenario.subScenario + " with incremental",
					commandLineArgs: commandLineArgsForInput,
					files:           getTscNoEmitAndErrorsFileMap(scenario, true, false, modify),
					cwd:             "/home/src/projects/project",
					edits:           edits(scenario, commandLineArgs, false),
				},
				&tscInput{
					subScenario:     scenario.subScenario + " with incremental as modules",
					commandLineArgs: commandLineArgsForInput,
					files:           getTscNoEmitAndErrorsFileMap(scenario, true, true, modify),
					cwd:             "/home/src/projects/project",
					edits:           edits(scenario, commandLineArgs, true),
				},
			)
		}
		return testingCases
	}
	getTscNoEmitAndErrorsTestCases := func(commandLineArgs []string) []*tscInput {
		return getTscNoEmitAndErrorsTestCasesWorker(
			commandLineArgs,
			true,
			nil,
			func(scenario *tscNoEmitScenario, commandLineArgs []string, asModules bool) []*tscEdit {
				fixedATsContent := core.IfElse(asModules, "export ", "") + `const a = "hello";`
				return []*tscEdit{
					noChange,
					{
						caption: "Fix error",
						edit: func(sys *testSys) {
							sys.writeFileNoError("/home/src/projects/project/a.ts", fixedATsContent, false)
						},
					},
					noChange,
					{
						caption:         "Emit after fixing error",
						commandLineArgs: commandLineArgs,
					},
					noChange,
					{
						caption: "Introduce error",
						edit: func(sys *testSys) {
							sys.writeFileNoError("/home/src/projects/project/a.ts", scenario.aText, false)
						},
					},
					{
						caption:         "Emit when error",
						commandLineArgs: commandLineArgs,
					},
					noChange,
				}
			},
		)
	}
	getTscNoEmitAndErrorsWatchTestCases := func(commandLineArgs []string) []*tscInput {
		return getTscNoEmitAndErrorsTestCasesWorker(
			commandLineArgs,
			false,
			func(files FileMap) {
				files["/home/src/projects/project/tsconfig.json"] = strings.Replace(files["/home/src/projects/project/tsconfig.json"].(string), "}", `, "noEmit": true }`, 1)
			},
			func(scenario *tscNoEmitScenario, commandLineArgs []string, asModules bool) []*tscEdit {
				fixedATsContent := core.IfElse(asModules, "export ", "") + `const a = "hello";`
				return []*tscEdit{
					{
						caption: "Fix error",
						edit: func(sys *testSys) {
							sys.writeFileNoError("/home/src/projects/project/a.ts", fixedATsContent, false)
						},
					},
					{
						caption: "Emit after fixing error",
						edit: func(sys *testSys) {
							sys.replaceFileText("/home/src/projects/project/tsconfig.json", `"noEmit": true`, `"noEmit": false`)
						},
					},
					{
						caption: "no Emit run after fixing error",
						edit: func(sys *testSys) {
							sys.replaceFileText("/home/src/projects/project/tsconfig.json", `"noEmit": false`, `"noEmit": true`)
						},
					},
					{
						caption: "Introduce error",
						edit: func(sys *testSys) {
							sys.writeFileNoError("/home/src/projects/project/a.ts", scenario.aText, false)
						},
					},
					{
						caption: "Emit when error",
						edit: func(sys *testSys) {
							sys.replaceFileText("/home/src/projects/project/tsconfig.json", `"noEmit": true`, `"noEmit": false`)
						},
					},
					{
						caption: "no Emit run when error",
						edit: func(sys *testSys) {
							sys.replaceFileText("/home/src/projects/project/tsconfig.json", `"noEmit": false`, `"noEmit": true`)
						},
					},
				}
			},
		)
	}
	getTscNoEmitChangesFileMap := func(optionsStr string) FileMap {
		return FileMap{
			"/home/src/workspaces/project/src/class.ts": stringtestutil.Dedent(`
				export class classC {
					prop = 1;
				}`),
			"/home/src/workspaces/project/src/indirectClass.ts": stringtestutil.Dedent(`
				import { classC } from './class';
				export class indirectClass {
					classC = new classC();
				}`),
			"/home/src/workspaces/project/src/directUse.ts": stringtestutil.Dedent(`
				import { indirectClass } from './indirectClass';
				new indirectClass().classC.prop;`),
			"/home/src/workspaces/project/src/indirectUse.ts": stringtestutil.Dedent(`
				import { indirectClass } from './indirectClass';
				new indirectClass().classC.prop;`),
			"/home/src/workspaces/project/src/noChangeFile.ts": stringtestutil.Dedent(`
				export function writeLog(s: string) {
				}`),
			"/home/src/workspaces/project/src/noChangeFileWithEmitSpecificError.ts": stringtestutil.Dedent(`
				function someFunc(arguments: boolean, ...rest: any[]) {
				}`),
			"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(fmt.Sprintf(`
				{
					"compilerOptions":  { %s }
				}`, optionsStr)),
		}
	}

	type tscNoEmitChangesScenario struct {
		subScenario   string
		optionsString string
	}
	noEmitChangesScenarios := []*tscNoEmitChangesScenario{
		{
			// !!! sheetal missing initial reporting of Duplicate_identifier_arguments_Compiler_uses_arguments_to_initialize_rest_parameters is absent
			subScenario:   "composite",
			optionsString: `"composite": true`,
		},
		{
			subScenario:   "incremental declaration",
			optionsString: `"incremental": true, "declaration": true`,
		},
		{
			subScenario:   "incremental",
			optionsString: `"incremental": true`,
		},
	}
	getTscNoEmitChangesTestCases := func(commandLineArgs []string) []*tscInput {
		noChangeWithNoEmit := &tscEdit{
			caption:         "No Change run with noEmit",
			commandLineArgs: slices.Concat(commandLineArgs, []string{"--noEmit"}),
		}
		noChangeWithEmit := &tscEdit{
			caption:         "No Change run with emit",
			commandLineArgs: commandLineArgs,
		}
		introduceError := func(sys *testSys) {
			sys.replaceFileText("/home/src/workspaces/project/src/class.ts", "prop", "prop1")
		}
		fixError := func(sys *testSys) {
			sys.replaceFileText("/home/src/workspaces/project/src/class.ts", "prop1", "prop")
		}
		testCases := make([]*tscInput, 0, len(noEmitChangesScenarios))
		for _, scenario := range noEmitChangesScenarios {
			testCases = append(
				testCases,
				&tscInput{
					subScenario:     "changes " + scenario.subScenario,
					commandLineArgs: commandLineArgs,
					files:           getTscNoEmitChangesFileMap(scenario.optionsString),
					edits: []*tscEdit{
						noChangeWithNoEmit,
						noChangeWithNoEmit,
						{
							caption:         "Introduce error but still noEmit",
							commandLineArgs: noChangeWithNoEmit.commandLineArgs,
							edit:            introduceError,
						},
						{
							caption: "Fix error and emit",
							edit:    fixError,
						},
						noChangeWithEmit,
						noChangeWithNoEmit,
						noChangeWithNoEmit,
						noChangeWithEmit,
						{
							caption: "Introduce error and emit",
							edit:    introduceError,
						},
						noChangeWithEmit,
						noChangeWithNoEmit,
						noChangeWithNoEmit,
						noChangeWithEmit,
						{
							caption:         "Fix error and no emit",
							commandLineArgs: noChangeWithNoEmit.commandLineArgs,
							edit:            fixError,
						},
						noChangeWithEmit,
						noChangeWithNoEmit,
						noChangeWithNoEmit,
						noChangeWithEmit,
					},
				},
				&tscInput{
					subScenario:     "changes with initial noEmit " + scenario.subScenario,
					commandLineArgs: noChangeWithNoEmit.commandLineArgs,
					files:           getTscNoEmitChangesFileMap(scenario.optionsString),
					edits: []*tscEdit{
						noChangeWithEmit,
						{
							caption:         "Introduce error with emit",
							commandLineArgs: commandLineArgs,
							edit:            introduceError,
						},
						{
							caption: "Fix error and no emit",
							edit:    fixError,
						},
						noChangeWithEmit,
					},
				},
			)
		}
		return testCases
	}
	getTscNoEmitDtsChangesFileMap := func(incremental bool, asModules bool) FileMap {
		files := FileMap{
			"/home/src/projects/project/a.ts": core.IfElse(asModules, `export const a = class { private p = 10; };`, `const a = class { private p = 10; };`),
			"/home/src/projects/project/tsconfig.json": stringtestutil.Dedent(fmt.Sprintf(`
				{
					"compilerOptions": {
						"incremental": %t,
					}
				}
		`, incremental)),
		}
		if asModules {
			files["/home/src/projects/project/b.ts"] = `export const b = 10;`
		}
		return files
	}
	getTscNoEmitDtsChangesEdits := func(commandLineArgs []string) []*tscEdit {
		return []*tscEdit{
			noChange,
			{
				caption:         "With declaration enabled noEmit - Should report errors",
				commandLineArgs: slices.Concat(commandLineArgs, []string{"--noEmit", "--declaration"}),
			},
			{
				caption:         "With declaration and declarationMap noEmit - Should report errors",
				commandLineArgs: slices.Concat(commandLineArgs, []string{"--noEmit", "--declaration", "--declarationMap"}),
			},
			noChange,
			{
				caption:         "Dts Emit with error",
				commandLineArgs: slices.Concat(commandLineArgs, []string{"--declaration"}),
			},
			{
				caption: "Fix the error",
				edit: func(sys *testSys) {
					sys.replaceFileText("/home/src/projects/project/a.ts", "private", "public")
				},
			},
			{
				caption:         "With declaration enabled noEmit",
				commandLineArgs: slices.Concat(commandLineArgs, []string{"--noEmit", "--declaration"}),
			},
			{
				caption:         "With declaration and declarationMap noEmit",
				commandLineArgs: slices.Concat(commandLineArgs, []string{"--noEmit", "--declaration", "--declarationMap"}),
			},
		}
	}
	getTscNoEmitDtsChangesTestCases := func() []*tscInput {
		return []*tscInput{
			{
				subScenario:     "dts errors with declaration enable changes",
				commandLineArgs: []string{"-b", "-v", "--noEmit"},
				files:           getTscNoEmitDtsChangesFileMap(false, false),
				cwd:             "/home/src/projects/project",
				edits:           getTscNoEmitDtsChangesEdits([]string{"-b", "-v"}),
			},
			{
				subScenario:     "dts errors with declaration enable changes with incremental",
				commandLineArgs: []string{"-b", "-v", "--noEmit"},
				files:           getTscNoEmitDtsChangesFileMap(true, false),
				cwd:             "/home/src/projects/project",
				edits:           getTscNoEmitDtsChangesEdits([]string{"-b", "-v"}),
			},
			{
				subScenario:     "dts errors with declaration enable changes with incremental as modules",
				commandLineArgs: []string{"-b", "-v", "--noEmit"},
				files:           getTscNoEmitDtsChangesFileMap(true, true),
				cwd:             "/home/src/projects/project",
				edits:           getTscNoEmitDtsChangesEdits([]string{"-b", "-v"}),
			},
		}
	}
	getTscNoEmitDtsChangesMultiFileErrorsTestCases := func(commandLineArgs []string) []*tscInput {
		aContent := `export const a = class { private p = 10; };`
		return []*tscInput{
			{
				subScenario:     "dts errors with declaration enable changes with multiple files",
				commandLineArgs: slices.Concat(commandLineArgs, []string{"--noEmit"}),
				files: FileMap{
					"/home/src/projects/project/a.ts": aContent,
					"/home/src/projects/project/b.ts": `export const b = 10;`,
					"/home/src/projects/project/c.ts": strings.Replace(aContent, "a", "c", 1),
					"/home/src/projects/project/d.ts": strings.Replace(aContent, "a", "d", 1),
					"/home/src/projects/project/tsconfig.json": stringtestutil.Dedent(`
						{
							"compilerOptions": {
								"incremental": true,
							}
						}
				`),
				},
				cwd: "/home/src/projects/project",
				edits: slices.Concat(
					getTscNoEmitDtsChangesEdits(commandLineArgs),
					[]*tscEdit{
						{
							caption: "Fix the another ",
							edit: func(sys *testSys) {
								sys.replaceFileText("/home/src/projects/project/c.ts", "private", "public")
							},
							commandLineArgs: slices.Concat(commandLineArgs, []string{"--noEmit", "--declaration", "--declarationMap"}),
						},
					},
				),
			},
		}
	}
	getTscNoEmitLoopTestCase := func(suffix string, commandLineArgs []string) *tscInput {
		return &tscInput{
			subScenario: "does not go in loop when watching when no files are emitted" + suffix,
			files: FileMap{
				"/user/username/projects/myproject/a.js": "",
				"/user/username/projects/myproject/b.ts": "",
				"/user/username/projects/myproject/tsconfig.json": stringtestutil.Dedent(`
					{
                        "compilerOptions": {
                            "allowJs": true,
                            "noEmit": true,
                        },
                    }`),
			},
			cwd:             "/user/username/projects/myproject",
			commandLineArgs: commandLineArgs,
			edits: []*tscEdit{
				{
					caption: "No change",
					edit: func(sys *testSys) {
						sys.writeFileNoError(`/user/username/projects/myproject/a.js`, sys.readFileNoError(`/user/username/projects/myproject/a.js`), false)
					},
				},
				{
					caption: "change",
					edit: func(sys *testSys) {
						sys.writeFileNoError(`/user/username/projects/myproject/a.js`, "const x = 10;", false)
					},
				},
			},
		}
	}
	testCases := slices.Concat(
		[]*tscInput{
			{
				subScenario: "when project has strict true",
				files: FileMap{
					"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
						{
							"compilerOptions": {
								"incremental": true,
								"strict": true
							}
						}`),
					"/home/src/workspaces/project/class1.ts": `export class class1 {}`,
				},
				commandLineArgs: []string{"--noEmit"},
				edits:           noChangeOnlyEdit,
			},
			getTscNoEmitLoopTestCase("", []string{"-b", "-w", "-verbose"}),
			getTscNoEmitLoopTestCase(" with incremental", []string{"-b", "-w", "-verbose", "--incremental"}),
		},
		getTscNoEmitAndErrorsTestCases([]string{}),
		getTscNoEmitAndErrorsTestCases([]string{"-b", "-v"}),
		getTscNoEmitChangesTestCases([]string{}),
		getTscNoEmitChangesTestCases([]string{"-b", "-v"}),
		getTscNoEmitDtsChangesTestCases(),
		getTscNoEmitDtsChangesMultiFileErrorsTestCases([]string{}),
		getTscNoEmitDtsChangesMultiFileErrorsTestCases([]string{"-b", "-v"}),
		getTscNoEmitAndErrorsWatchTestCases([]string{"-b", "-verbose", "-w"}),
	)

	for _, test := range testCases {
		test.run(t, "noEmit")
	}
}

func TestTscNoEmitOnError(t *testing.T) {
	t.Parallel()
	type tscNoEmitOnErrorScenario struct {
		subScenario       string
		mainErrorContent  string
		fixedErrorContent string
	}
	getTscNoEmitOnErrorFileMap := func(scenario *tscNoEmitOnErrorScenario, declaration bool, incremental bool) FileMap {
		return FileMap{
			"/user/username/projects/noEmitOnError/tsconfig.json": stringtestutil.Dedent(fmt.Sprintf(`
			{
				"compilerOptions": {
					"outDir": "./dev-build",
					"declaration": %t,
					"incremental": %t,
					"noEmitOnError": true,
				},
			}`, declaration, incremental)),
			"/user/username/projects/noEmitOnError/shared/types/db.ts": stringtestutil.Dedent(`
				export interface A {
					name: string;
				}
			`),
			"/user/username/projects/noEmitOnError/src/main.ts": scenario.mainErrorContent,
			"/user/username/projects/noEmitOnError/src/other.ts": stringtestutil.Dedent(`
				console.log("hi");
				export { }
			`),
		}
	}
	getTscNoEmitOnErrorTestCases := func(scenarios []*tscNoEmitOnErrorScenario, commandLineArgs []string) []*tscInput {
		testCases := make([]*tscInput, 0, len(scenarios)*4)
		for _, scenario := range scenarios {
			edits := []*tscEdit{
				noChange,
				{
					caption: "Fix error",
					edit: func(sys *testSys) {
						sys.writeFileNoError("/user/username/projects/noEmitOnError/src/main.ts", scenario.fixedErrorContent, false)
					},
				},
				noChange,
			}
			testCases = append(
				testCases,
				&tscInput{
					subScenario:     scenario.subScenario,
					files:           getTscNoEmitOnErrorFileMap(scenario, false, false),
					cwd:             "/user/username/projects/noEmitOnError",
					commandLineArgs: commandLineArgs,
					edits:           edits,
				},
				&tscInput{
					subScenario:     scenario.subScenario + " with declaration",
					files:           getTscNoEmitOnErrorFileMap(scenario, true, false),
					cwd:             "/user/username/projects/noEmitOnError",
					commandLineArgs: commandLineArgs,
					edits:           edits,
				},
				&tscInput{
					subScenario:     scenario.subScenario + " with incremental",
					files:           getTscNoEmitOnErrorFileMap(scenario, false, true),
					cwd:             "/user/username/projects/noEmitOnError",
					commandLineArgs: commandLineArgs,
					edits:           edits,
				},
				&tscInput{
					subScenario:     scenario.subScenario + " with declaration with incremental",
					files:           getTscNoEmitOnErrorFileMap(scenario, true, true),
					cwd:             "/user/username/projects/noEmitOnError",
					commandLineArgs: commandLineArgs,
					edits:           edits,
				},
			)
		}
		return testCases
	}
	getTscWatchNoEmitOnErrorTestCases := func(scenarios []*tscNoEmitOnErrorScenario, commandLineArgs []string) []*tscInput {
		var edits []*tscEdit
		for _, scenario := range scenarios {
			if edits != nil {
				edits = append(edits, &tscEdit{
					caption: scenario.subScenario,
					edit: func(sys *testSys) {
						sys.writeFileNoError(`/user/username/projects/noEmitOnError/src/main.ts`, scenario.mainErrorContent, false)
					},
				})
			}
			edits = append(edits,
				&tscEdit{
					caption: "No Change",
					edit: func(sys *testSys) {
						sys.writeFileNoError(`/user/username/projects/noEmitOnError/src/main.ts`, sys.readFileNoError(`/user/username/projects/noEmitOnError/src/main.ts`), false)
					},
				},
				&tscEdit{
					caption: "Fix " + scenario.subScenario,
					edit: func(sys *testSys) {
						sys.writeFileNoError("/user/username/projects/noEmitOnError/src/main.ts", scenario.fixedErrorContent, false)
					},
				},
				&tscEdit{
					caption: "No Change",
					edit: func(sys *testSys) {
						sys.writeFileNoError(`/user/username/projects/noEmitOnError/src/main.ts`, sys.readFileNoError(`/user/username/projects/noEmitOnError/src/main.ts`), false)
					},
				},
			)
		}
		return []*tscInput{
			{
				subScenario:     "noEmitOnError",
				files:           getTscNoEmitOnErrorFileMap(scenarios[0], false, false),
				cwd:             "/user/username/projects/noEmitOnError",
				commandLineArgs: commandLineArgs,
				edits:           edits,
			},
			{
				subScenario:     "noEmitOnError with declaration",
				files:           getTscNoEmitOnErrorFileMap(scenarios[0], true, false),
				cwd:             "/user/username/projects/noEmitOnError",
				commandLineArgs: commandLineArgs,
				edits:           edits,
			},
			{
				subScenario:     "noEmitOnError with incremental",
				files:           getTscNoEmitOnErrorFileMap(scenarios[0], false, true),
				cwd:             "/user/username/projects/noEmitOnError",
				commandLineArgs: commandLineArgs,
				edits:           edits,
			},
			{
				subScenario:     "noEmitOnError with declaration with incremental",
				files:           getTscNoEmitOnErrorFileMap(scenarios[0], true, true),
				cwd:             "/user/username/projects/noEmitOnError",
				commandLineArgs: commandLineArgs,
				edits:           edits,
			},
		}
	}
	scenarios := []*tscNoEmitOnErrorScenario{
		{
			subScenario: "syntax errors",
			mainErrorContent: stringtestutil.Dedent(`
                import { A } from "../shared/types/db";
                const a = {
                    lastName: 'sdsd'
                ;
            `),
			fixedErrorContent: stringtestutil.Dedent(`
                import { A } from "../shared/types/db";
                const a = {
                    lastName: 'sdsd'
                };`),
		},
		{
			subScenario: "semantic errors",
			mainErrorContent: stringtestutil.Dedent(`
                import { A } from "../shared/types/db";
                const a: string = 10;`),
			fixedErrorContent: stringtestutil.Dedent(`
                import { A } from "../shared/types/db";
                const a: string = "hello";`),
		},
		{
			subScenario: "dts errors",
			mainErrorContent: stringtestutil.Dedent(`
                import { A } from "../shared/types/db";
                export const a = class { private p = 10; };
            `),
			fixedErrorContent: stringtestutil.Dedent(`
                import { A } from "../shared/types/db";
                export const a = class { p = 10; };
            `),
		},
	}
	testCases := slices.Concat(
		getTscNoEmitOnErrorTestCases(scenarios, []string{}),
		getTscNoEmitOnErrorTestCases(scenarios, []string{"-b", "-v"}),
		[]*tscInput{
			{
				subScenario: `when declarationMap changes`,
				files: FileMap{
					"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
						{
							"compilerOptions": {
								"noEmitOnError": true,
								"declaration": true,
								"composite": true,
							},
						}`),
					"/home/src/workspaces/project/a.ts": "const x = 10;",
					"/home/src/workspaces/project/b.ts": "const y = 10;",
				},
				edits: []*tscEdit{
					{
						caption: "error and enable declarationMap",
						edit: func(sys *testSys) {
							sys.replaceFileText("/home/src/workspaces/project/a.ts", "x", "x: 20")
						},
						commandLineArgs: []string{"--declarationMap"},
					},
					{
						caption: "fix error declarationMap",
						edit: func(sys *testSys) {
							sys.replaceFileText("/home/src/workspaces/project/a.ts", "x: 20", "x")
						},
						commandLineArgs: []string{"--declarationMap"},
					},
				},
			},
			{
				subScenario: "file deleted before fixing error with noEmitOnError",
				files: FileMap{
					"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
						{
							"compilerOptions": {
								"outDir": "outDir",
								"noEmitOnError": true,
							},
						}`),
					"/home/src/workspaces/project/file1.ts": `export const x: 30 = "hello";`,
					"/home/src/workspaces/project/file2.ts": `export class D { }`,
				},
				commandLineArgs: []string{"-i"},
				edits: []*tscEdit{
					{
						caption: "delete file without error",
						edit: func(sys *testSys) {
							sys.removeNoError("/home/src/workspaces/project/file2.ts")
						},
					},
				},
			},
		},
		getTscWatchNoEmitOnErrorTestCases(scenarios, []string{"-b", "-w", "-v"}),
	)

	for _, test := range testCases {
		test.run(t, "noEmitOnError")
	}
}

func TestTscProjectReferences(t *testing.T) {
	t.Parallel()
	cases := []tscInput{
		{
			subScenario: "when project references composite project with noEmit",
			files: FileMap{
				"/home/src/workspaces/solution/utils/index.ts": "export const x = 10;",
				"/home/src/workspaces/solution/utils/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
						"noEmit": true
					}
				}`),
				"/home/src/workspaces/solution/project/index.ts": `import { x } from "../utils";`,
				"/home/src/workspaces/solution/project/tsconfig.json": stringtestutil.Dedent(`
				{
					"references": [
						{ "path": "../utils" },
					],
				}`),
			},
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--p", "project"},
		},
		{
			subScenario: "when project references composite",
			files: FileMap{
				"/home/src/workspaces/solution/utils/index.ts":   "export const x = 10;",
				"/home/src/workspaces/solution/utils/index.d.ts": "export declare const x = 10;",
				"/home/src/workspaces/solution/utils/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true
					}
				}`),
				"/home/src/workspaces/solution/project/index.ts": `import { x } from "../utils";`,
				"/home/src/workspaces/solution/project/tsconfig.json": stringtestutil.Dedent(`
				{
					"references": [
						{ "path": "../utils" },
					],
				}`),
			},
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--p", "project"},
		},
		{
			subScenario: "when project reference is not built",
			files: FileMap{
				"/home/src/workspaces/solution/utils/index.ts": "export const x = 10;",
				"/home/src/workspaces/solution/utils/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true
					}
				}`),
				"/home/src/workspaces/solution/project/index.ts": `import { x } from "../utils";`,
				"/home/src/workspaces/solution/project/tsconfig.json": stringtestutil.Dedent(`
				{
					"references": [
						{ "path": "../utils" },
					],
				}`),
			},
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--p", "project"},
		},
		{
			subScenario: "when project contains invalid project reference",
			files: FileMap{
				"/home/src/workspaces/solution/project/index.ts": `export const x = 10;`,
				"/home/src/workspaces/solution/project/tsconfig.json": stringtestutil.Dedent(`
				{
					"references": [
						{ "path": "../utils" },
					],
				}`),
			},
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--p", "project"},
		},
		{
			subScenario: "default import interop uses referenced project settings",
			files: FileMap{
				"/home/src/workspaces/project/node_modules/ambiguous-package/package.json": stringtestutil.Dedent(`
				{
					"name": "ambiguous-package"
				}`),
				"/home/src/workspaces/project/node_modules/ambiguous-package/index.d.ts": "export declare const ambiguous: number;",
				"/home/src/workspaces/project/node_modules/esm-package/package.json": stringtestutil.Dedent(`
				{
					"name": "esm-package",
					"type": "module"
				}`),
				"/home/src/workspaces/project/node_modules/esm-package/index.d.ts": "export declare const esm: number;",
				"/home/src/workspaces/project/lib/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
						"declaration": true,
						"rootDir": "src",
						"outDir": "dist",
						"module": "esnext",
						"moduleResolution": "bundler",
					},
					"include": ["src"],
				}`),
				"/home/src/workspaces/project/lib/src/a.ts":    "export const a = 0;",
				"/home/src/workspaces/project/lib/dist/a.d.ts": "export declare const a = 0;",
				"/home/src/workspaces/project/app/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"module": "esnext",
						"moduleResolution": "bundler",
						"rootDir": "src",
						"outDir": "dist",
					},
					"include": ["src"],
					"references": [
						{ "path": "../lib" },
					],
				}`),
				"/home/src/workspaces/project/app/src/local.ts": "export const local = 0;",
				"/home/src/workspaces/project/app/src/index.ts": stringtestutil.Dedent(`
					import local from "./local"; // Error
					import esm from "esm-package"; // Error
					import referencedSource from "../../lib/src/a"; // Error
					import referencedDeclaration from "../../lib/dist/a"; // Error
					import ambiguous from "ambiguous-package"; // Ok`),
			},
			commandLineArgs: []string{"--p", "app", "--pretty", "false"},
		},
		{
			subScenario: "referencing ambient const enum from referenced project with preserveConstEnums",
			files: FileMap{
				"/home/src/workspaces/solution/utils/index.ts":   "export const enum E { A = 1 }",
				"/home/src/workspaces/solution/utils/index.d.ts": "export declare const enum E { A = 1 }",
				"/home/src/workspaces/solution/utils/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
						"declaration": true,
						"preserveConstEnums": true,
					},
				}`),
				"/home/src/workspaces/solution/project/index.ts": `import { E } from "../utils"; E.A;`,
				"/home/src/workspaces/solution/project/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"isolatedModules": true,
					},
					"references": [
						{ "path": "../utils" },
					],
				}`),
			},
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--p", "project"},
		},
		{
			subScenario: "importing const enum from referenced project with preserveConstEnums and verbatimModuleSyntax",
			files: FileMap{
				"/home/src/workspaces/solution/preserve/index.ts":   "export const enum E { A = 1 }",
				"/home/src/workspaces/solution/preserve/index.d.ts": "export declare const enum E { A = 1 }",
				"/home/src/workspaces/solution/preserve/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
						"declaration": true,
						"preserveConstEnums": true,
					},
				}`),
				"/home/src/workspaces/solution/no-preserve/index.ts":   "export const enum E { A = 1 }",
				"/home/src/workspaces/solution/no-preserve/index.d.ts": "export declare const enum F { A = 1 }",
				"/home/src/workspaces/solution/no-preserve/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
						"declaration": true,
						"preserveConstEnums": false,
					},
				}`),
				"/home/src/workspaces/solution/project/index.ts": stringtestutil.Dedent(`
					import { E } from "../preserve";
					import { F } from "../no-preserve";
					E.A;
					F.A;`),
				"/home/src/workspaces/solution/project/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"module": "preserve",
						"verbatimModuleSyntax": true,
					},
					"references": [
						{ "path": "../preserve" },
						{ "path": "../no-preserve" },
					],
				}`),
			},
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--p", "project", "--pretty", "false"},
		},
		{
			subScenario: "rewriteRelativeImportExtensionsProjectReferences1",
			files: FileMap{
				"/home/src/workspaces/packages/common/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
						"rootDir": "src",
						"outDir": "dist", 
						"module": "nodenext"
					}
				}`),
				"/home/src/workspaces/packages/common/package.json": stringtestutil.Dedent(`
				{
						"name": "common",
						"version": "1.0.0",
						"type": "module",
						"exports": {
							".": {
								"source": "./src/index.ts",
								"default": "./dist/index.js"
							}
						}
				}`),
				"/home/src/workspaces/packages/common/src/index.ts":    "export {};",
				"/home/src/workspaces/packages/common/dist/index.d.ts": "export {};",
				"/home/src/workspaces/packages/main/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"module": "nodenext",
						"rewriteRelativeImportExtensions": true,
						"rootDir": "src",
						"outDir": "dist"
					},
					"references": [
						{ "path": "../common" }
					]
				}`),
				"/home/src/workspaces/packages/main/package.json": stringtestutil.Dedent(`
				{
					"type": "module"
				}`),
				"/home/src/workspaces/packages/main/src/index.ts": `import {} from "../../common/src/index.ts";`,
			},
			cwd:             "/home/src/workspaces",
			commandLineArgs: []string{"-p", "packages/main", "--pretty", "false"},
		},
		{
			subScenario: "rewriteRelativeImportExtensionsProjectReferences2",
			files: FileMap{
				"/home/src/workspaces/solution/src/tsconfig-base.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"module": "nodenext",
						"composite": true,
						"rootDir": ".",
						"outDir": "../dist",
						"rewriteRelativeImportExtensions": true
					}
				}`),
				"/home/src/workspaces/solution/src/compiler/tsconfig.json": stringtestutil.Dedent(`
				{
					"extends": "../tsconfig-base.json",
					"compilerOptions": {}
				}`),
				"/home/src/workspaces/solution/src/compiler/parser.ts":    "export {};",
				"/home/src/workspaces/solution/dist/compiler/parser.d.ts": "export {};",
				"/home/src/workspaces/solution/src/services/tsconfig.json": stringtestutil.Dedent(`
				{
					"extends": "../tsconfig-base.json",
					"compilerOptions": {},
					"references": [
						{ "path": "../compiler" }
					]
				}`),
				"/home/src/workspaces/solution/src/services/services.ts": `import {} from "../compiler/parser.ts";`,
			},
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--p", "src/services", "--pretty", "false"},
		},
		{
			subScenario: "rewriteRelativeImportExtensionsProjectReferences3",
			files: FileMap{
				"/home/src/workspaces/solution/src/tsconfig-base.json": stringtestutil.Dedent(`
				{
					"compilerOptions": { 
						"module": "nodenext",
						"composite": true,
						"rewriteRelativeImportExtensions": true
					}
				}`),
				"/home/src/workspaces/solution/src/compiler/tsconfig.json": stringtestutil.Dedent(`
				{
					"extends": "../tsconfig-base.json",
					"compilerOptions": {
						"rootDir": ".",
						"outDir": "../../dist/compiler"
					}
				}`),
				"/home/src/workspaces/solution/src/compiler/parser.ts":    "export {};",
				"/home/src/workspaces/solution/dist/compiler/parser.d.ts": "export {};",
				"/home/src/workspaces/solution/src/services/tsconfig.json": stringtestutil.Dedent(`
				{
					"extends": "../tsconfig-base.json",
					"compilerOptions": {
						"rootDir": ".", 
						"outDir": "../../dist/services"
					},
					"references": [
						{ "path": "../compiler" }
					]
				}`),
				"/home/src/workspaces/solution/src/services/services.ts": `import {} from "../compiler/parser.ts";`,
			},
			cwd:             "/home/src/workspaces/solution",
			commandLineArgs: []string{"--p", "src/services", "--pretty", "false"},
		},
		{
			subScenario: "default setup was created correctly",
			files: FileMap{
				"/home/src/workspaces/project/primary/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
						"outDir": "bin",
					}
				}`),
				"/home/src/workspaces/project/primary/a.ts": "export { };",
				"/home/src/workspaces/project/secondary/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
						"outDir": "bin",
					},
					"references": [{
						"path": "../primary"
					}]
				}`),
				"/home/src/workspaces/project/secondary/b.ts": `import * as mod_1 from "../primary/a";`,
			},
			commandLineArgs: []string{"--p", "primary/tsconfig.json"},
		},
		{
			subScenario: "errors when declaration = false",
			files: FileMap{
				"/home/src/workspaces/project/primary/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
						"outDir": "bin",
						"declaration": false
					}
				}`),
				"/home/src/workspaces/project/primary/a.ts": "export { };",
			},
			commandLineArgs: []string{"--p", "primary/tsconfig.json"},
		},
		{
			subScenario: "errors when the referenced project doesnt have composite",
			files: FileMap{
				"/home/src/workspaces/project/primary/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": false,
						"outDir": "bin",
					}
				}`),
				"/home/src/workspaces/project/primary/a.ts": "export { };",
				"/home/src/workspaces/project/reference/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
						"outDir": "bin",
					},
					"files": [ "b.ts" ],
					"references": [ { "path": "../primary" } ]
				}`),
				"/home/src/workspaces/project/reference/b.ts": `import * as mod_1 from "../primary/a";`,
			},
			commandLineArgs: []string{"--p", "reference/tsconfig.json"},
		},
		{
			subScenario: "does not error when the referenced project doesnt have composite if its a container project",
			files: FileMap{
				"/home/src/workspaces/project/primary/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": false,
						"outDir": "bin",
					}
				}`),
				"/home/src/workspaces/project/primary/a.ts": "export { };",
				"/home/src/workspaces/project/reference/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
						"outDir": "bin",
					},
					"files": [ ],
					"references": [{
						"path": "../primary"
					}]
				}`),
				"/home/src/workspaces/project/reference/b.ts": `import * as mod_1 from "../primary/a";`,
			},
			commandLineArgs: []string{"--p", "reference/tsconfig.json"},
		},
		{
			subScenario: "errors when the file list is not exhaustive",
			files: FileMap{
				"/home/src/workspaces/project/primary/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
						"outDir": "bin",
					},
					"files": [ "a.ts" ]
				}`),
				"/home/src/workspaces/project/primary/a.ts": "import * as b from './b'",
				"/home/src/workspaces/project/primary/b.ts": "export {}",
			},
			commandLineArgs: []string{"--p", "primary/tsconfig.json"},
		},
		{
			subScenario: "errors when the referenced project doesnt exist",
			files: FileMap{
				"/home/src/workspaces/project/primary/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
						"outDir": "bin",
					},
					"references": [{
						"path": "../foo"
					}]
				}`),
				"/home/src/workspaces/project/primary/a.ts": "export { };",
			},
			commandLineArgs: []string{"--p", "primary/tsconfig.json"},
		},
		{
			subScenario: "redirects to the output dts file",
			files: FileMap{
				"/home/src/workspaces/project/alpha/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
						"outDir": "bin",
					}
				}`),
				"/home/src/workspaces/project/alpha/a.ts":       "export const m: number = 3;",
				"/home/src/workspaces/project/alpha/bin/a.d.ts": "export { };",
				"/home/src/workspaces/project/beta/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
						"outDir": "bin",
					},
					"references": [ { "path": "../alpha" } ]
				}`),
				"/home/src/workspaces/project/beta/b.ts": "import { m } from '../alpha/a'",
			},
			commandLineArgs: []string{"--p", "beta/tsconfig.json", "--explainFiles"},
		},
		{
			subScenario: "issues a nice error when the input file is missing",
			files: FileMap{
				"/home/src/workspaces/project/alpha/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
						"outDir": "bin",
					},
					"references": []
				}`),
				"/home/src/workspaces/project/alpha/a.ts": "export const m: number = 3;",
				"/home/src/workspaces/project/beta/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
						"outDir": "bin",
					},
					"references": [ { "path": "../alpha" } ]
				}`),
				"/home/src/workspaces/project/beta/b.ts": "import { m } from '../alpha/a'",
			},
			commandLineArgs: []string{"--p", "beta/tsconfig.json"},
		},
		{
			subScenario: "issues a nice error when the input file is missing when module reference is not relative",
			files: FileMap{
				"/home/src/workspaces/project/alpha/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
						"outDir": "bin",
					}
				}`),
				"/home/src/workspaces/project/alpha/a.ts": "export const m: number = 3;",
				"/home/src/workspaces/project/beta/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
						"outDir": "bin",
						"paths": {
                            "@alpha/*": ["../alpha/*"],
                        },
					},
					"references": [ { "path": "../alpha" } ]
				}`),
				"/home/src/workspaces/project/beta/b.ts": "import { m } from '@alpha/a'",
			},
			commandLineArgs: []string{"--p", "beta/tsconfig.json"},
		},
		{
			subScenario: "doesnt infer the rootDir from source paths",
			files: FileMap{
				"/home/src/workspaces/project/alpha/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
						"outDir": "bin",
					},
					"references": []
				}`),
				"/home/src/workspaces/project/alpha/src/a.ts": "export const m: number = 3;",
			},
			commandLineArgs: []string{"--p", "alpha/tsconfig.json"},
		},
		{
			// !!! sheetal rootDir error not reported
			subScenario: "errors when a file is outside the rootdir",
			files: FileMap{
				"/home/src/workspaces/project/alpha/tsconfig.json": stringtestutil.Dedent(`
				{
					"compilerOptions": {
						"composite": true,
						"outDir": "bin",
					},
					"references": []
				}`),
				"/home/src/workspaces/project/alpha/src/a.ts": "import * as b from '../../beta/b'",
				"/home/src/workspaces/project/beta/b.ts":      "export { }",
			},
			commandLineArgs: []string{"--p", "alpha/tsconfig.json"},
		},
	}

	for _, c := range cases {
		c.run(t, "projectReferences")
	}
}

func TestTypeAcquisition(t *testing.T) {
	t.Parallel()
	(&tscInput{
		subScenario: "parse tsconfig with typeAcquisition",
		files: FileMap{
			"/home/src/workspaces/project/tsconfig.json": stringtestutil.Dedent(`
			{
				"compilerOptions": {
					"composite": true,
					"noEmit": true,
				},
				"typeAcquisition": {
					"enable": true,
					"include": ["0.d.ts", "1.d.ts"],
					"exclude": ["0.js", "1.js"],
					"disableFilenameBasedTypeAcquisition": true,
				},
			}`),
		},
		commandLineArgs: []string{},
	}).run(t, "typeAcquisition")
}

package execute_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
)

func TestProjectReferences(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		// Without embedding, we'd need to read all of the lib files out from disk into the MapFS.
		// Just skip this for now.
		t.Skip("bundled files are not embedded")
	}

	cases := []tscInput{
		// !!! sheetal todo verifyCompilerOptions - check for noEmit
		{
			subScenario: "when project references composite project with noEmit",
			sys: newTestSys(FileMap{
				"/home/src/workspaces/solution/utils/index.ts": "export const x = 10;",
				"/home/src/workspaces/solution/utils/tsconfig.json": `{
			"compilerOptions": {
				"composite": true,
				"noEmit": true,
			},
		}`,
				"/home/src/workspaces/solution/project/index.ts": `import { x } from "../utils";`,
				"/home/src/workspaces/solution/project/tsconfig.json": `{
			"references": [
				{ "path": "../utils" },
			],
		}`,
			},
				"/home/src/workspaces/solution",
			),
			commandLineArgs: []string{"--p", "project"},
		},
		{
			subScenario: "when project references composite",
			sys: newTestSys(FileMap{
				"/home/src/workspaces/solution/utils/index.ts":   "export const x = 10;",
				"/home/src/workspaces/solution/utils/index.d.ts": "export declare const x = 10;",
				"/home/src/workspaces/solution/utils/tsconfig.json": `{
	"compilerOptions": {
		"composite": true,
	},
}`,
				"/home/src/workspaces/solution/project/index.ts": `import { x } from "../utils";`,
				"/home/src/workspaces/solution/project/tsconfig.json": `{
	"references": [
		{ "path": "../utils" },
	],
}`,
			}, "/home/src/workspaces/solution"),
			commandLineArgs: []string{"--p", "project"},
		},
		{
			subScenario: "when project reference is not built",
			sys: newTestSys(FileMap{
				"/home/src/workspaces/solution/utils/index.ts": "export const x = 10;",
				"/home/src/workspaces/solution/utils/tsconfig.json": `{
	"compilerOptions": {
		"composite": true,
	},
}`,
				"/home/src/workspaces/solution/project/index.ts": `import { x } from "../utils";`,
				"/home/src/workspaces/solution/project/tsconfig.json": `{
	"references": [
		{ "path": "../utils" },
	],
}`,
			}, "/home/src/workspaces/solution"),
			commandLineArgs: []string{"--p", "project"},
		},
		{
			// !!! sheetal verifyProjectReferences - checks this
			subScenario: "when project contains invalid project reference",
			sys: newTestSys(FileMap{
				"/home/src/workspaces/solution/project/index.ts": `export const x = 10;`,
				"/home/src/workspaces/solution/project/tsconfig.json": `{
	"references": [
		{ "path": "../utils" },
	],
}`,
			}, "/home/src/workspaces/solution"),
			commandLineArgs: []string{"--p", "project"},
		},
		{
			subScenario: "default import interop uses referenced project settings",
			sys: newTestSys(FileMap{
				"/home/src/workspaces/project/node_modules/ambiguous-package/package.json": `{ "name": "ambiguous-package" }`,
				"/home/src/workspaces/project/node_modules/ambiguous-package/index.d.ts":   "export declare const ambiguous: number;",
				"/home/src/workspaces/project/node_modules/esm-package/package.json":       `{ "name": "esm-package", "type": "module" }`,
				"/home/src/workspaces/project/node_modules/esm-package/index.d.ts":         "export declare const esm: number;",
				"/home/src/workspaces/project/lib/tsconfig.json": `{
					"compilerOptions": {
						"composite": true,
						"declaration": true,
						"rootDir": "src",
						"outDir": "dist",
						"module": "esnext",
						"moduleResolution": "bundler",
					},
					"include": ["src"],
				}`,
				"/home/src/workspaces/project/lib/src/a.ts":    "export const a = 0;",
				"/home/src/workspaces/project/lib/dist/a.d.ts": "export declare const a = 0;",
				"/home/src/workspaces/project/app/tsconfig.json": `{
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
				}`,
				"/home/src/workspaces/project/app/src/local.ts": "export const local = 0;",
				"/home/src/workspaces/project/app/src/index.ts": `
					import local from "./local"; // Error
					import esm from "esm-package"; // Error
					import referencedSource from "../../lib/src/a"; // Error
					import referencedDeclaration from "../../lib/dist/a"; // Error
					import ambiguous from "ambiguous-package"; // Ok`,
			}, "/home/src/workspaces/project"),
			commandLineArgs: []string{"--p", "app", "--pretty", "false"},
		},
		{
			subScenario: "referencing ambient const enum from referenced project with preserveConstEnums",
			sys: newTestSys(FileMap{
				"/home/src/workspaces/solution/utils/index.ts":   "export const enum E { A = 1 }",
				"/home/src/workspaces/solution/utils/index.d.ts": "export declare const enum E { A = 1 }",
				"/home/src/workspaces/solution/utils/tsconfig.json": `{
					"compilerOptions": {
						"composite": true,
						"declaration": true,
						"preserveConstEnums": true,
					},
				}`,
				"/home/src/workspaces/solution/project/index.ts": `import { E } from "../utils"; E.A;`,
				"/home/src/workspaces/solution/project/tsconfig.json": `{
					"compilerOptions": {
						"isolatedModules": true,
					},
					"references": [
						{ "path": "../utils" },
					],
				}`,
			}, "/home/src/workspaces/solution"),
			commandLineArgs: []string{"--p", "project"},
		},
		{
			subScenario: "importing const enum from referenced project with preserveConstEnums and verbatimModuleSyntax",
			sys: newTestSys(FileMap{
				"/home/src/workspaces/solution/preserve/index.ts":   "export const enum E { A = 1 }",
				"/home/src/workspaces/solution/preserve/index.d.ts": "export declare const enum E { A = 1 }",
				"/home/src/workspaces/solution/preserve/tsconfig.json": `{
					"compilerOptions": {
						"composite": true,
						"declaration": true,
						"preserveConstEnums": true,
					},
				}`,
				"/home/src/workspaces/solution/no-preserve/index.ts":   "export const enum E { A = 1 }",
				"/home/src/workspaces/solution/no-preserve/index.d.ts": "export declare const enum F { A = 1 }",
				"/home/src/workspaces/solution/no-preserve/tsconfig.json": `{
					"compilerOptions": {
						"composite": true,
						"declaration": true,
						"preserveConstEnums": false,
					},
				}`,
				"/home/src/workspaces/solution/project/index.ts": `
				import { E } from "../preserve";
				import { F } from "../no-preserve";
				E.A;
				F.A;`,
				"/home/src/workspaces/solution/project/tsconfig.json": `{
					"compilerOptions": {
						"module": "preserve",
						"verbatimModuleSyntax": true,
					},
					"references": [
						{ "path": "../preserve" },
						{ "path": "../no-preserve" },
					],
				}`,
			}, "/home/src/workspaces/solution"),
			commandLineArgs: []string{"--p", "project", "--pretty", "false"},
		},
	}

	for _, c := range cases {
		c.verify(t, "projectReferences")
	}
}

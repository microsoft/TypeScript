package execute_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/testutil/stringtestutil"
)

func TestTscCommandline(t *testing.T) {
	t.Parallel()
	testCases := []*tscInput{
		{
			subScenario: "show help with ExitStatus.DiagnosticsPresent_OutputsSkipped",
			// , {
			// 	environmentVariables: new Map([["TS_TEST_TERMINAL_WIDTH", "120"]]),
			// }),
			commandLineArgs: nil,
		},
		{
			subScenario:     "show help with ExitStatus.DiagnosticsPresent_OutputsSkipped when host cannot provide terminal width",
			commandLineArgs: nil,
		},
		{
			subScenario: "does not add color when NO_COLOR is set",
			// , {
			// 		environmentVariables: new Map([["NO_COLOR", "true"]]),
			// 	}),
			commandLineArgs: nil,
		},
		{
			subScenario: "does not add color when NO_COLOR is set",
			// , {
			// 	environmentVariables: new Map([["NO_COLOR", "true"]]),
			// }
			// ),
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
	}

	for _, testCase := range testCases {
		testCase.run(t, "commandLine")
	}
}

func TestNoEmit(t *testing.T) {
	t.Parallel()
	(&tscInput{
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
	}).run(t, "noEmit")
}

func TestExtends(t *testing.T) {
	t.Parallel()
	extendsSysScenario := func(subScenario string, commandlineArgs []string) *tscInput {
		return &tscInput{
			subScenario:     subScenario,
			commandLineArgs: commandlineArgs,
			files: FileMap{
				"/home/src/projects/configs/first/tsconfig.json": stringtestutil.Dedent(`
				{
					"extends": "../second/tsconfig.json",
					"include": ["${configDir}/src"],
					"compilerOptions": {
						"typeRoots": ["root1", "${configDir}/root2", "root3"],
						"types": [],
					}
				}`),
				"/home/src/projects/configs/second/tsconfig.json": stringtestutil.Dedent(`
				{
					"files": ["${configDir}/main.ts"],
					"compilerOptions": {
						"declarationDir": "${configDir}/decls",
						"paths": {
							"@myscope/*": ["${configDir}/types/*"],
							"other/*": ["other/*"],
						},
						"baseUrl": "${configDir}",
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
				"/home/src/projects/myproject/src/secondary.ts": stringtestutil.Dedent(`
					// some comment
					export const z = 10;
					import { k } from "other/sometype2";
				`),
				"/home/src/projects/myproject/types/sometype.ts": stringtestutil.Dedent(`
					// some comment
					export const x = 10;
				`),
				"/home/src/projects/myproject/root2/other/sometype2/index.d.ts": stringtestutil.Dedent(`
					export const k = 10;
				`),
			},
			cwd: "/home/src/projects/myproject",
		}
	}

	cases := []*tscInput{
		extendsSysScenario("configDir template", []string{"--explainFiles"}),
		extendsSysScenario("configDir template showConfig", []string{"--showConfig"}),
		extendsSysScenario("configDir template with commandline", []string{"--explainFiles", "--outDir", "${configDir}/outDir"}),
	}

	for _, c := range cases {
		c.run(t, "extends")
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

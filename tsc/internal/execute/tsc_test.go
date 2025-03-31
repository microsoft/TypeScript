package execute_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
)

func TestTsc(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		// Without embedding, we'd need to read all of the lib files out from disk into the MapFS.
		// Just skip this for now.
		t.Skip("bundled files are not embedded")
	}

	testCases := []*tscInput{
		{
			subScenario: "show help with ExitStatus.DiagnosticsPresent_OutputsSkipped",
			sys:         newTestSys(nil, ""),
			// , {
			// 	environmentVariables: new Map([["TS_TEST_TERMINAL_WIDTH", "120"]]),
			// }),
			commandLineArgs: nil,
		},
		{
			subScenario:     "show help with ExitStatus.DiagnosticsPresent_OutputsSkipped when host cannot provide terminal width",
			sys:             newTestSys(nil, ""),
			commandLineArgs: nil,
		},
		{
			subScenario: "does not add color when NO_COLOR is set",
			sys:         newTestSys(nil, ""),
			// , {
			// 		environmentVariables: new Map([["NO_COLOR", "true"]]),
			// 	}),
			commandLineArgs: nil,
		},
		{
			subScenario: "does not add color when NO_COLOR is set",
			sys:         newTestSys(nil, ""),
			// , {
			// 	environmentVariables: new Map([["NO_COLOR", "true"]]),
			// }
			// ),
			commandLineArgs: nil,
		},
		{
			subScenario:     "when build not first argument",
			sys:             newTestSys(nil, ""),
			commandLineArgs: []string{"--verbose", "--build"},
		},
		{
			subScenario:     "help",
			sys:             newTestSys(nil, ""),
			commandLineArgs: []string{"--help"},
		},
		{
			subScenario:     "help all",
			sys:             newTestSys(nil, ""),
			commandLineArgs: []string{"--help", "--all"},
		},
		{
			subScenario:     "Parse --lib option with file name",
			sys:             newTestSys(FileMap{"/home/src/workspaces/project/first.ts": `export const Key = Symbol()`}, ""),
			commandLineArgs: []string{"--lib", "es6 ", "first.ts"},
		},
		{
			subScenario: "Project is empty string",
			sys: newTestSys(FileMap{
				"/home/src/workspaces/project/first.ts":      `export const a = 1`,
				"/home/src/workspaces/project/tsconfig.json": `{ "compilerOptions": { "strict": true, "noEmit": true  } }`,
			}, ""),
			commandLineArgs: []string{},
		},
		{
			subScenario: "Parse -p",
			sys: newTestSys(FileMap{
				"/home/src/workspaces/project/first.ts":      `export const a = 1`,
				"/home/src/workspaces/project/tsconfig.json": `{ "compilerOptions": { "strict": true, "noEmit": true  } }`,
			}, ""),
			commandLineArgs: []string{"-p", "."},
		},
		{
			subScenario: "Parse -p with path to tsconfig file",
			sys: newTestSys(FileMap{
				"/home/src/workspaces/project/first.ts":      `export const a = 1`,
				"/home/src/workspaces/project/tsconfig.json": `{ "compilerOptions": { "strict": true, "noEmit": true } }`,
			}, ""),
			commandLineArgs: []string{"-p", "/home/src/workspaces/project/tsconfig.json"},
		},
		{
			subScenario: "Parse -p with path to tsconfig folder",
			sys: newTestSys(FileMap{
				"/home/src/workspaces/project/first.ts":      `export const a = 1`,
				"/home/src/workspaces/project/tsconfig.json": `{ "compilerOptions": { "strict": true, "noEmit": true  } }`,
			}, ""),
			commandLineArgs: []string{"-p", "/home/src/workspaces/project"},
		},
		{
			subScenario:     "Parse enum type options",
			sys:             newTestSys(nil, ""),
			commandLineArgs: []string{"--moduleResolution", "nodenext ", "first.ts", "--module", "nodenext", "--target", "esnext", "--moduleDetection", "auto", "--jsx", "react", "--newLine", "crlf"},
		},
		{
			subScenario: "Parse watch interval option",
			sys: newTestSys(FileMap{
				"/home/src/workspaces/project/first.ts":      `export const a = 1`,
				"/home/src/workspaces/project/tsconfig.json": `{ "compilerOptions": { "strict": true, "noEmit": true  } }`,
			}, ""),
			commandLineArgs: []string{"-w", "--watchInterval", "1000"},
		},
		{
			subScenario:     "Parse watch interval option without tsconfig.json",
			sys:             newTestSys(nil, ""),
			commandLineArgs: []string{"-w", "--watchInterval", "1000"},
		},
	}

	for _, testCase := range testCases {
		testCase.verifyCommandLineParsing(t, "commandLine")
	}
}

func TestNoEmit(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		// Without embedding, we'd need to read all of the lib files out from disk into the MapFS.
		// Just skip this for now.
		t.Skip("bundled files are not embedded")
	}

	(&tscInput{
		subScenario: "when project has strict true",
		sys: newTestSys(FileMap{
			"/home/src/workspaces/project/tsconfig.json": `{
	"compilerOptions": {
		"incremental": true,
		"strict": true,
	},
}`,
			"/home/src/workspaces/project/class1.ts": `export class class1 {}`,
		}, ""),
		commandLineArgs: []string{"--noEmit"},
	}).verify(t, "noEmit")
}

func TestProjectReferences(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		// Without embedding, we'd need to read all of the lib files out from disk into the MapFS.
		// Just skip this for now.
		t.Skip("bundled files are not embedded")
	}

	(&tscInput{
		subScenario: "when project references composite project with noEmit",
		sys: newTestSys(FileMap{
			"/home/src/workspaces/solution/src/utils/index.ts": "export const x = 10;",
			"/home/src/workspaces/solution/src/utils/tsconfig.json": `{
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
	}).verify(t, "projectReferences")
}

func TestExtends(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		// Without embedding, we'd need to read all of the lib files out from disk into the MapFS.
		// Just skip this for now.
		t.Skip("bundled files are not embedded")
	}

	extendsSysFiles := FileMap{
		"/home/src/projects/configs/first/tsconfig.json": `{
	"extends": "../second/tsconfig.json",
	"include": ["${configDir}/src"],
	"compilerOptions": {
		"typeRoots": ["root1", "${configDir}/root2", "root3"],
		"types": [],
	},
}`,
		"/home/src/projects/configs/second/tsconfig.json": `{
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
}`,
		"/home/src/projects/myproject/tsconfig.json": `{
	"extends": "../configs/first/tsconfig.json",
	"compilerOptions": {
		"declaration": true,
		"outDir": "outDir",
		"traceResolution": true,
	},
}`,

		"/home/src/projects/myproject/main.ts": `
	// some comment
	export const y = 10;
	import { x } from "@myscope/sometype";
`,
		"/home/src/projects/myproject/src/secondary.ts": `
	// some comment
	export const z = 10;
	import { k } from "other/sometype2";
`,
		"/home/src/projects/myproject/types/sometype.ts": `
	export const x = 10;
`,
		"/home/src/projects/myproject/root2/other/sometype2/index.d.ts": `
	export const k = 10;
`,
	}

	cases := []tscInput{{
		subScenario:     "configDir template",
		sys:             newTestSys(extendsSysFiles, "/home/src/projects/myproject"),
		commandLineArgs: []string{"--explainFiles"},
	}, {
		subScenario:     "configDir template showConfig",
		sys:             newTestSys(extendsSysFiles, "/home/src/projects/myproject"),
		commandLineArgs: []string{"--showConfig"},
	}, {
		subScenario:     "configDir template with commandline",
		sys:             newTestSys(extendsSysFiles, "/home/src/projects/myproject"),
		commandLineArgs: []string{"--explainFiles", "--outDir", "${configDir}/outDir"},
	}}

	for _, c := range cases {
		c.verify(t, "extends")
	}
}

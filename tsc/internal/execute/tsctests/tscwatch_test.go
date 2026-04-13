package tsctests

import (
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
)

func TestWatch(t *testing.T) {
	t.Parallel()
	testCases := []*tscInput{
		{
			subScenario: "watch with no tsconfig",
			files: FileMap{
				"/home/src/workspaces/project/index.ts": "",
			},
			commandLineArgs: []string{"index.ts", "--watch"},
		},
		{
			subScenario: "watch with tsconfig and incremental",
			files: FileMap{
				"/home/src/workspaces/project/index.ts":      "",
				"/home/src/workspaces/project/tsconfig.json": "{}",
			},
			commandLineArgs: []string{"--watch", "--incremental"},
		},
		{
			subScenario: "watch skips build when no files change",
			files: FileMap{
				"/home/src/workspaces/project/index.ts":      `const x: number = 1;`,
				"/home/src/workspaces/project/tsconfig.json": "{}",
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				noChange,
			},
		},
		{
			subScenario: "watch rebuilds when file is modified",
			files: FileMap{
				"/home/src/workspaces/project/index.ts":      `const x: number = 1;`,
				"/home/src/workspaces/project/tsconfig.json": "{}",
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				newTscEdit("modify file", func(sys *TestSys) {
					sys.writeFileNoError("/home/src/workspaces/project/index.ts", `const x: number = 2;`)
				}),
			},
		},
		{
			subScenario: "watch rebuilds when source file is deleted",
			files: FileMap{
				"/home/src/workspaces/project/a.ts":          `import { b } from "./b";`,
				"/home/src/workspaces/project/b.ts":          `export const b = 1;`,
				"/home/src/workspaces/project/tsconfig.json": "{}",
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				{
					caption: "delete imported file",
					edit: func(sys *TestSys) {
						sys.removeNoError("/home/src/workspaces/project/b.ts")
					},
					expectedDiff: "incremental resolves to .js output from prior build (TS7016) while clean build cannot find module at all (TS2307)",
				},
			},
		},
		{
			subScenario: "watch detects new file resolving failed import",
			files: FileMap{
				"/home/src/workspaces/project/a.ts":          `import { b } from "./b";`,
				"/home/src/workspaces/project/tsconfig.json": "{}",
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				newTscEdit("create missing file", func(sys *TestSys) {
					sys.writeFileNoError("/home/src/workspaces/project/b.ts", `export const b = 1;`)
				}),
			},
		},
		// Directory-level change detection via imports
		{
			subScenario: "watch detects imported file added in new directory",
			files: FileMap{
				"/home/src/workspaces/project/index.ts":      `import { util } from "./lib/util";`,
				"/home/src/workspaces/project/tsconfig.json": "{}",
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				newTscEdit("create directory and imported file", func(sys *TestSys) {
					sys.writeFileNoError("/home/src/workspaces/project/lib/util.ts", `export const util = "hello";`)
				}),
			},
		},
		{
			subScenario: "watch detects imported directory removed",
			files: FileMap{
				"/home/src/workspaces/project/index.ts":      `import { util } from "./lib/util";`,
				"/home/src/workspaces/project/lib/util.ts":   `export const util = "hello";`,
				"/home/src/workspaces/project/tsconfig.json": "{}",
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				{
					caption: "remove directory with imported file",
					edit: func(sys *TestSys) {
						sys.removeNoError("/home/src/workspaces/project/lib/util.ts")
					},
					expectedDiff: "incremental resolves to .js output from prior build (TS7016) while clean build cannot find module at all (TS2307)",
				},
			},
		},
		{
			subScenario: "watch detects import path restructured",
			files: FileMap{
				"/home/src/workspaces/project/index.ts":      `import { util } from "./lib/util";`,
				"/home/src/workspaces/project/lib/util.ts":   `export const util = "v1";`,
				"/home/src/workspaces/project/tsconfig.json": "{}",
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				newTscEdit("move file to new path and update import", func(sys *TestSys) {
					sys.removeNoError("/home/src/workspaces/project/lib/util.ts")
					sys.writeFileNoError("/home/src/workspaces/project/src/util.ts", `export const util = "v2";`)
					sys.writeFileNoError("/home/src/workspaces/project/index.ts", `import { util } from "./src/util";`)
				}),
			},
		},
		// tsconfig include/exclude change detection
		{
			subScenario: "watch rebuilds when tsconfig include pattern adds file",
			files: FileMap{
				"/home/src/workspaces/project/index.ts": `const x = 1;`,
				"/home/src/workspaces/project/tsconfig.json": `{
	"compilerOptions": {},
	"include": ["*.ts"]
}`,
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				newTscEdit("widen include pattern to add src dir", func(sys *TestSys) {
					sys.writeFileNoError("/home/src/workspaces/project/src/extra.ts", `export const extra = 2;`)
					sys.writeFileNoError("/home/src/workspaces/project/tsconfig.json", `{
	"compilerOptions": {},
	"include": ["*.ts", "src/**/*.ts"]
}`)
				}),
			},
		},
		{
			subScenario: "watch rebuilds when tsconfig is modified to change strict",
			files: FileMap{
				"/home/src/workspaces/project/index.ts":      `const x = null; const y: string = x;`,
				"/home/src/workspaces/project/tsconfig.json": `{}`,
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				newTscEdit("enable strict mode", func(sys *TestSys) {
					sys.writeFileNoError("/home/src/workspaces/project/tsconfig.json", `{"compilerOptions": {"strict": true}}`)
				}),
			},
		},
		// Path resolution: tsconfig include pointing to non-existent directory
		{
			subScenario: "watch detects file added to previously non-existent include path",
			files: FileMap{
				"/home/src/workspaces/project/index.ts": `const x = 1;`,
				"/home/src/workspaces/project/tsconfig.json": `{
	"compilerOptions": {},
	"include": ["index.ts", "src/**/*.ts"]
}`,
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				newTscEdit("create src dir with ts file matching include", func(sys *TestSys) {
					sys.writeFileNoError("/home/src/workspaces/project/src/helper.ts", `export const helper = "added";`)
				}),
			},
		},
		{
			subScenario: "watch detects new file in existing include directory",
			files: FileMap{
				"/home/src/workspaces/project/src/a.ts": `export const a = 1;`,
				"/home/src/workspaces/project/tsconfig.json": `{
	"compilerOptions": {},
	"include": ["src/**/*.ts"]
}`,
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				newTscEdit("add new file to existing src directory", func(sys *TestSys) {
					sys.writeFileNoError("/home/src/workspaces/project/src/b.ts", `export const b = 2;`)
				}),
			},
		},
		// Wildcard include: nested subdirectory detection
		{
			subScenario: "watch detects file added in new nested subdirectory",
			files: FileMap{
				"/home/src/workspaces/project/src/a.ts": `export const a = 1;`,
				"/home/src/workspaces/project/tsconfig.json": `{
	"compilerOptions": {},
	"include": ["src/**/*.ts"]
}`,
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				newTscEdit("create nested dir with ts file", func(sys *TestSys) {
					sys.writeFileNoError("/home/src/workspaces/project/src/deep/nested/util.ts", `export const util = "nested";`)
				}),
			},
		},
		{
			subScenario: "watch detects file added in multiple new subdirectories simultaneously",
			files: FileMap{
				"/home/src/workspaces/project/src/a.ts": `export const a = 1;`,
				"/home/src/workspaces/project/tsconfig.json": `{
	"compilerOptions": {},
	"include": ["src/**/*.ts"]
}`,
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				newTscEdit("create multiple new subdirs with files", func(sys *TestSys) {
					sys.writeFileNoError("/home/src/workspaces/project/src/models/user.ts", `export interface User { name: string; }`)
					sys.writeFileNoError("/home/src/workspaces/project/src/utils/format.ts", `export function format(s: string): string { return s.trim(); }`)
				}),
			},
		},
		{
			subScenario: "watch detects nested subdirectory removed and recreated",
			files: FileMap{
				"/home/src/workspaces/project/src/lib/helper.ts": `export const helper = "v1";`,
				"/home/src/workspaces/project/tsconfig.json": `{
	"compilerOptions": {},
	"include": ["src/**/*.ts"]
}`,
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				{
					caption:      "remove nested dir",
					expectedDiff: "incremental has prior state and does not report no-inputs error",
					edit: func(sys *TestSys) {
						sys.removeNoError("/home/src/workspaces/project/src/lib/helper.ts")
					},
				},
				newTscEdit("recreate nested dir with new content", func(sys *TestSys) {
					sys.writeFileNoError("/home/src/workspaces/project/src/lib/helper.ts", `export const helper = "v2";`)
				}),
			},
		},
		// Path resolution: import from non-existent node_modules package
		{
			subScenario: "watch detects node modules package added",
			files: FileMap{
				"/home/src/workspaces/project/index.ts":      `import { lib } from "mylib";`,
				"/home/src/workspaces/project/tsconfig.json": `{}`,
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				newTscEdit("install package in node_modules", func(sys *TestSys) {
					sys.writeFileNoError("/home/src/workspaces/project/node_modules/mylib/package.json", `{"name": "mylib", "main": "index.js", "types": "index.d.ts"}`)
					sys.writeFileNoError("/home/src/workspaces/project/node_modules/mylib/index.js", `exports.lib = "hello";`)
					sys.writeFileNoError("/home/src/workspaces/project/node_modules/mylib/index.d.ts", `export declare const lib: string;`)
				}),
			},
		},
		// Path resolution: node_modules package removed
		{
			subScenario: "watch detects node modules package removed",
			files: FileMap{
				"/home/src/workspaces/project/index.ts":                        `import { lib } from "mylib";`,
				"/home/src/workspaces/project/tsconfig.json":                   `{}`,
				"/home/src/workspaces/project/node_modules/mylib/package.json": `{"name": "mylib", "main": "index.js", "types": "index.d.ts"}`,
				"/home/src/workspaces/project/node_modules/mylib/index.js":     `exports.lib = "hello";`,
				"/home/src/workspaces/project/node_modules/mylib/index.d.ts":   `export declare const lib: string;`,
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				{
					caption: "remove node_modules package",
					edit: func(sys *TestSys) {
						sys.removeNoError("/home/src/workspaces/project/node_modules/mylib/index.d.ts")
						sys.removeNoError("/home/src/workspaces/project/node_modules/mylib/index.js")
						sys.removeNoError("/home/src/workspaces/project/node_modules/mylib/package.json")
					},
				},
			},
		},
		// Config file lifecycle
		{
			subScenario: "watch handles tsconfig deleted",
			files: FileMap{
				"/home/src/workspaces/project/index.ts":      `const x = 1;`,
				"/home/src/workspaces/project/tsconfig.json": `{}`,
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				{
					caption:      "delete tsconfig",
					expectedDiff: "incremental reports config read error while clean build without tsconfig prints usage help",
					edit: func(sys *TestSys) {
						sys.removeNoError("/home/src/workspaces/project/tsconfig.json")
					},
				},
			},
		},
		{
			subScenario: "watch handles tsconfig with extends base modified",
			files: FileMap{
				"/home/src/workspaces/project/index.ts": `const x = null; const y: string = x;`,
				"/home/src/workspaces/project/base.json": `{
	"compilerOptions": { "strict": false }
}`,
				"/home/src/workspaces/project/tsconfig.json": `{
	"extends": "./base.json"
}`,
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				newTscEdit("modify base config to enable strict", func(sys *TestSys) {
					sys.writeFileNoError("/home/src/workspaces/project/base.json", `{
	"compilerOptions": { "strict": true }
}`)
				}),
			},
		},
		{
			subScenario: "watch rebuilds when tsconfig is touched but content unchanged",
			files: FileMap{
				"/home/src/workspaces/project/index.ts":      `const x = 1;`,
				"/home/src/workspaces/project/tsconfig.json": `{}`,
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				newTscEdit("touch tsconfig without changing content", func(sys *TestSys) {
					content := sys.readFileNoError("/home/src/workspaces/project/tsconfig.json")
					sys.writeFileNoError("/home/src/workspaces/project/tsconfig.json", content)
				}),
			},
		},
		{
			subScenario: "watch with tsconfig files list entry deleted",
			files: FileMap{
				"/home/src/workspaces/project/a.ts": `export const a = 1;`,
				"/home/src/workspaces/project/b.ts": `export const b = 2;`,
				"/home/src/workspaces/project/tsconfig.json": `{
	"compilerOptions": {},
	"files": ["a.ts", "b.ts"]
}`,
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				newTscEdit("delete file listed in files array", func(sys *TestSys) {
					sys.removeNoError("/home/src/workspaces/project/b.ts")
				}),
			},
		},
		// Module resolution & dependencies
		{
			subScenario: "watch detects module going missing then coming back",
			files: FileMap{
				"/home/src/workspaces/project/index.ts":      `import { util } from "./util";`,
				"/home/src/workspaces/project/util.ts":       `export const util = "v1";`,
				"/home/src/workspaces/project/tsconfig.json": `{}`,
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				{
					caption: "delete util module",
					edit: func(sys *TestSys) {
						sys.removeNoError("/home/src/workspaces/project/util.ts")
					},
					expectedDiff: "incremental resolves to .js output from prior build while clean build cannot find module",
				},
				newTscEdit("recreate util module with new content", func(sys *TestSys) {
					sys.writeFileNoError("/home/src/workspaces/project/util.ts", `export const util = "v2";`)
				}),
			},
		},
		{
			subScenario: "watch detects scoped package installed",
			files: FileMap{
				"/home/src/workspaces/project/index.ts":      `import { lib } from "@scope/mylib";`,
				"/home/src/workspaces/project/tsconfig.json": `{}`,
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				newTscEdit("install scoped package", func(sys *TestSys) {
					sys.writeFileNoError("/home/src/workspaces/project/node_modules/@scope/mylib/package.json", `{"name": "@scope/mylib", "types": "index.d.ts"}`)
					sys.writeFileNoError("/home/src/workspaces/project/node_modules/@scope/mylib/index.d.ts", `export declare const lib: string;`)
				}),
			},
		},
		{
			subScenario: "watch detects package json types field edited",
			files: FileMap{
				"/home/src/workspaces/project/index.ts":                        `import { lib } from "mylib";`,
				"/home/src/workspaces/project/tsconfig.json":                   `{}`,
				"/home/src/workspaces/project/node_modules/mylib/package.json": `{"name": "mylib", "types": "old.d.ts"}`,
				"/home/src/workspaces/project/node_modules/mylib/old.d.ts":     `export declare const lib: number;`,
				"/home/src/workspaces/project/node_modules/mylib/new.d.ts":     `export declare const lib: string;`,
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				newTscEdit("change package.json types field", func(sys *TestSys) {
					sys.writeFileNoError("/home/src/workspaces/project/node_modules/mylib/package.json", `{"name": "mylib", "types": "new.d.ts"}`)
				}),
			},
		},
		{
			subScenario: "watch detects at-types package installed later",
			files: FileMap{
				"/home/src/workspaces/project/index.ts":                          `import * as lib from "untyped-lib";`,
				"/home/src/workspaces/project/tsconfig.json":                     `{}`,
				"/home/src/workspaces/project/node_modules/untyped-lib/index.js": `module.exports = {};`,
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				newTscEdit("install @types for the library", func(sys *TestSys) {
					sys.writeFileNoError("/home/src/workspaces/project/node_modules/@types/untyped-lib/index.d.ts", `declare module "untyped-lib" { export const value: string; }`)
					sys.writeFileNoError("/home/src/workspaces/project/node_modules/@types/untyped-lib/package.json", `{"name": "@types/untyped-lib", "types": "index.d.ts"}`)
				}),
			},
		},
		// File operations
		{
			subScenario: "watch detects file renamed and renamed back",
			files: FileMap{
				"/home/src/workspaces/project/index.ts":      `import { helper } from "./helper";`,
				"/home/src/workspaces/project/helper.ts":     `export const helper = 1;`,
				"/home/src/workspaces/project/tsconfig.json": `{}`,
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				{
					caption: "rename helper to helper2",
					edit: func(sys *TestSys) {
						sys.renameFileNoError("/home/src/workspaces/project/helper.ts", "/home/src/workspaces/project/helper2.ts")
					},
					expectedDiff: "incremental resolves to .js output from prior build while clean build cannot find module",
				},
				newTscEdit("rename back to helper", func(sys *TestSys) {
					sys.renameFileNoError("/home/src/workspaces/project/helper2.ts", "/home/src/workspaces/project/helper.ts")
				}),
			},
		},
		{
			subScenario: "watch detects file deleted and new file added simultaneously",
			files: FileMap{
				"/home/src/workspaces/project/a.ts":          `import { b } from "./b";`,
				"/home/src/workspaces/project/b.ts":          `export const b = 1;`,
				"/home/src/workspaces/project/tsconfig.json": `{}`,
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				newTscEdit("delete b.ts and create c.ts with updated import", func(sys *TestSys) {
					sys.removeNoError("/home/src/workspaces/project/b.ts")
					sys.writeFileNoError("/home/src/workspaces/project/c.ts", `export const c = 2;`)
					sys.writeFileNoError("/home/src/workspaces/project/a.ts", `import { c } from "./c";`)
				}),
			},
		},
		{
			subScenario: "watch handles file rapidly recreated",
			files: FileMap{
				"/home/src/workspaces/project/index.ts":      `import { val } from "./data";`,
				"/home/src/workspaces/project/data.ts":       `export const val = "original";`,
				"/home/src/workspaces/project/tsconfig.json": `{}`,
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				newTscEdit("delete and immediately recreate with new content", func(sys *TestSys) {
					sys.removeNoError("/home/src/workspaces/project/data.ts")
					sys.writeFileNoError("/home/src/workspaces/project/data.ts", `export const val = "recreated";`)
				}),
			},
		},
		// Symlinks
		{
			subScenario: "watch detects change in symlinked file",
			files: FileMap{
				"/home/src/workspaces/project/index.ts":      `import { shared } from "./link";`,
				"/home/src/workspaces/shared/index.ts":       `export const shared = "v1";`,
				"/home/src/workspaces/project/link.ts":       vfstest.Symlink("/home/src/workspaces/shared/index.ts"),
				"/home/src/workspaces/project/tsconfig.json": `{}`,
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				newTscEdit("modify symlink target", func(sys *TestSys) {
					sys.writeFileNoError("/home/src/workspaces/shared/index.ts", `export const shared = "v2";`)
				}),
			},
		},
	}

	for _, test := range testCases {
		test.run(t, "commandLineWatch")
	}
}

func listToTsconfig(base string, tsconfigOpts ...string) (string, string) {
	optionString := strings.Join(tsconfigOpts, ",\n            ")
	tsconfigText := `{
	"compilerOptions": {
`
	after := "            "
	if base != "" {
		tsconfigText += "            " + base
		after = ",\n            "
	}
	if len(tsconfigOpts) != 0 {
		tsconfigText += after + optionString
	}
	tsconfigText += `
	}
}`
	return tsconfigText, optionString
}

func toTsconfig(base string, compilerOpts string) string {
	tsconfigText, _ := listToTsconfig(base, compilerOpts)
	return tsconfigText
}

func noEmitWatchTestInput(
	subScenario string,
	commandLineArgs []string,
	aText string,
	tsconfigOptions []string,
) *tscInput {
	noEmitOpt := `"noEmit": true`
	tsconfigText, optionString := listToTsconfig(noEmitOpt, tsconfigOptions...)
	return &tscInput{
		subScenario:     subScenario,
		commandLineArgs: commandLineArgs,
		files: FileMap{
			"/home/src/workspaces/project/a.ts":          aText,
			"/home/src/workspaces/project/tsconfig.json": tsconfigText,
		},
		edits: []*tscEdit{
			newTscEdit("fix error", func(sys *TestSys) {
				sys.writeFileNoError("/home/src/workspaces/project/a.ts", `const a = "hello";`)
			}),
			newTscEdit("emit after fixing error", func(sys *TestSys) {
				sys.writeFileNoError("/home/src/workspaces/project/tsconfig.json", toTsconfig("", optionString))
			}),
			newTscEdit("no emit run after fixing error", func(sys *TestSys) {
				sys.writeFileNoError("/home/src/workspaces/project/tsconfig.json", toTsconfig(noEmitOpt, optionString))
			}),
			newTscEdit("introduce error", func(sys *TestSys) {
				sys.writeFileNoError("/home/src/workspaces/project/a.ts", aText)
			}),
			newTscEdit("emit when error", func(sys *TestSys) {
				sys.writeFileNoError("/home/src/workspaces/project/tsconfig.json", toTsconfig("", optionString))
			}),
			newTscEdit("no emit run when error", func(sys *TestSys) {
				sys.writeFileNoError("/home/src/workspaces/project/tsconfig.json", toTsconfig(noEmitOpt, optionString))
			}),
		},
	}
}

func newTscEdit(name string, edit func(sys *TestSys)) *tscEdit {
	return &tscEdit{caption: name, edit: edit}
}

func TestTscNoEmitWatch(t *testing.T) {
	t.Parallel()

	testCases := []*tscInput{
		noEmitWatchTestInput("syntax errors",
			[]string{"-w"},
			`const a = "hello`,
			nil,
		),
		noEmitWatchTestInput(
			"semantic errors",
			[]string{"-w"},
			`const a: number = "hello"`,
			nil,
		),
		noEmitWatchTestInput(
			"dts errors without dts enabled",
			[]string{"-w"},
			`const a = class { private p = 10; };`,
			nil,
		),
		noEmitWatchTestInput(
			"dts errors",
			[]string{"-w"},
			`const a = class { private p = 10; };`,
			[]string{`"declaration": true`},
		),
	}

	for _, test := range testCases {
		test.run(t, "noEmit")
	}
}

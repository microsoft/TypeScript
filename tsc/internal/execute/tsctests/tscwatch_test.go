package tsctests

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"sync/atomic"
	"testing"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/execute"
	"github.com/microsoft/TypeScript/tsc/internal/execute/incremental"
	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/osvfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestWatch(t *testing.T) {
	t.Parallel()
	bunDependencyTest := func() *tscInput {
		files := FileMap{}
		var index strings.Builder
		var fileNames strings.Builder
		fileNames.WriteString(`"index.ts"`)
		for i := range 12 {
			name := fmt.Sprintf("pkg%d", i)
			value := fmt.Sprintf("value%d", i)
			index.WriteString(fmt.Sprintf(`import { %[1]s } from "./node_modules/.bun/%[2]s/index"; %[1]s;`, value, name))
			index.WriteString("\n")
			files["/home/src/workspaces/project/node_modules/.bun/"+name+"/index.ts"] = fmt.Sprintf("export const %s = %d;", value, i)
			fileNames.WriteString(fmt.Sprintf(`, "node_modules/.bun/%s/index.ts"`, name))
		}
		files["/home/src/workspaces/project/index.ts"] = index.String()
		files["/home/src/workspaces/project/tsconfig.json"] = fmt.Sprintf(`{
	"compilerOptions": {},
	"files": [%s]
}`, fileNames.String())
		return &tscInput{
			subScenario:     "watch handles many bun dependency files",
			files:           files,
			commandLineArgs: []string{"--watch"},
		}
	}
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
		bunDependencyTest(),
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
		// Path resolution: node_modules removed then reinstalled (npm ci after rm -rf)
		{
			subScenario: "watch detects node modules reinstalled after deletion",
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
					caption: "delete node_modules entirely",
					edit: func(sys *TestSys) {
						sys.removeNoError("/home/src/workspaces/project/node_modules/mylib/index.d.ts")
						sys.removeNoError("/home/src/workspaces/project/node_modules/mylib/index.js")
						sys.removeNoError("/home/src/workspaces/project/node_modules/mylib/package.json")
					},
				},
				newTscEdit("reinstall node_modules", func(sys *TestSys) {
					sys.writeFileNoError("/home/src/workspaces/project/node_modules/mylib/package.json", `{"name": "mylib", "main": "index.js", "types": "index.d.ts"}`)
					sys.writeFileNoError("/home/src/workspaces/project/node_modules/mylib/index.js", `exports.lib = "hello";`)
					sys.writeFileNoError("/home/src/workspaces/project/node_modules/mylib/index.d.ts", `export declare const lib: string;`)
				}),
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
		// Symlinks — only node_modules symlinks are resolved via Realpath,
		// matching the TypeScript compiler's behavior (see program.ts:2119).
		{
			subScenario: "watch detects change in symlinked node_modules file",
			files: FileMap{
				"/home/src/workspaces/project/index.ts":                     `import { shared } from "shared";`,
				"/home/src/workspaces/shared/index.ts":                      `export const shared = "v1";`,
				"/home/src/workspaces/project/node_modules/shared/index.ts": vfstest.Symlink("/home/src/workspaces/shared/index.ts"),
				"/home/src/workspaces/project/tsconfig.json":                `{}`,
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				newTscEdit("modify symlink target", func(sys *TestSys) {
					sys.writeFileNoError("/home/src/workspaces/shared/index.ts", `export const shared = "v2";`)
				}),
			},
		},
		// Ancestor fallback stability — when a tsconfig include references a
		// directory that doesn't exist
		{
			subScenario: "watch stability with ancestor directory fallback",
			files: FileMap{
				"/home/src/workspaces/project/index.ts":      `const x: number = 1;`,
				"/home/src/workspaces/project/tsconfig.json": `{ "include": ["*.ts", "missing/**/*"] }`,
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				newTscEdit("trivial file change", func(sys *TestSys) {
					sys.writeFileNoError("/home/src/workspaces/project/index.ts", `const x: number = 2;`)
				}),
			},
		},
		// Global (script) files: commenting out a global declaration in one
		// file must surface the resulting error in another file that used it.
		{
			subScenario: "watch detects error across global script files when global decl removed",
			files: FileMap{
				"/home/src/workspaces/project/a.ts":          `console.log(a);`,
				"/home/src/workspaces/project/x.ts":          `const a = 1;`,
				"/home/src/workspaces/project/tsconfig.json": `{}`,
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				newTscEdit("comment out global declaration", func(sys *TestSys) {
					sys.writeFileNoError("/home/src/workspaces/project/x.ts", `// const a = 1;`)
				}),
				newTscEdit("restore global declaration", func(sys *TestSys) {
					sys.writeFileNoError("/home/src/workspaces/project/x.ts", `const a = 1;`)
				}),
			},
		},
		// Ancestor fallback: creating deeply nested directories that didn't
		// exist at initial build time should trigger a rebuild and re-watch.
		{
			subScenario: "watch detects file added in deeply nested non-existent include path",
			files: FileMap{
				"/home/src/workspaces/project/index.ts":      `const x: number = 1;`,
				"/home/src/workspaces/project/tsconfig.json": `{ "include": ["*.ts", "deep/nested/dir/**/*"] }`,
			},
			commandLineArgs: []string{"--watch"},
			edits: []*tscEdit{
				newTscEdit("create deeply nested file matching include", func(sys *TestSys) {
					sys.writeFileNoError("/home/src/workspaces/project/deep/nested/dir/added.ts", `export const added = 1;`)
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
		noEmitWatchTestInput(
			"syntax errors",
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

type aliasWatchSystem struct {
	*TestSys
}

func (s *aliasWatchSystem) FS() vfs.FS                     { return osvfs.FS() }
func (s *aliasWatchSystem) Now() time.Time                 { return time.Now() }
func (s *aliasWatchSystem) OnProgram(*incremental.Program) {}
func (s *aliasWatchSystem) OnEmittedFiles(*compiler.EmitResult, *collections.SyncMap[tspath.Path, time.Time]) {
}

var aliasWatchDirectoryID atomic.Uint64

func aliasWatchDirectory(t *testing.T) string {
	t.Helper()
	dir, err := filepath.Abs(fmt.Sprintf(".watch-alias-%d-%d", os.Getpid(), aliasWatchDirectoryID.Add(1)))
	if err != nil {
		t.Fatal(err)
	}
	if err := os.Mkdir(dir, 0o755); err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _ = os.RemoveAll(dir) })
	return filepath.ToSlash(dir)
}

func writeAliasWatchFile(t *testing.T, name, text string) {
	t.Helper()
	if err := os.MkdirAll(filepath.Dir(name), 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(name, []byte(text), 0o644); err != nil {
		t.Fatal(err)
	}
}

func sendAliasWatchEvent(t *testing.T, backend *MockWatchBackend, event fswatch.Event) {
	t.Helper()
	for _, watch := range backend.Dirs {
		if watch.Closed || !osvfs.FS().DirectoryExists(watch.Path) {
			continue
		}
		comparer, err := fswatch.PathComparerForPath(watch.Path)
		if err != nil {
			t.Fatal(err)
		}
		opts := tspath.ComparePathsOptions{UseCaseSensitiveFileNames: osvfs.FS().UseCaseSensitiveFileNames()}
		_, covered := comparer.Rebase(event.Path, watch.Path, watch.Path)
		if !covered && !tspath.ContainsPath(watch.Path, event.Path, opts) {
			continue
		}
		parent := filepath.ToSlash(filepath.Dir(event.Path))
		if !watch.Recursive && comparer.Key(parent) != comparer.Key(watch.Path) &&
			tspath.GetCanonicalFileName(parent, opts.UseCaseSensitiveFileNames) != tspath.GetCanonicalFileName(watch.Path, opts.UseCaseSensitiveFileNames) {
			continue
		}
		watch.Callback([]fswatch.Event{event}, nil)
		return
	}
	t.Fatalf("no covering watch for %q", event.Path)
}

func TestWatchRealpathAliases(t *testing.T) {
	t.Parallel()
	for _, build := range []bool{false, true} {
		for _, shape := range []string{"file", "directory", "delete-directory", "delete-file-target-directory", "retarget-file", "retarget-directory"} {
			t.Run(fmt.Sprintf("build=%v/%s", build, shape), func(t *testing.T) {
				t.Parallel()
				root := aliasWatchDirectory(t)
				dependency := root + "/physical/value.ts"
				writeAliasWatchFile(t, dependency, "export const value = 1;")
				target, link := root+"/physical", root+"/linked"
				imported := "./linked/value"
				if shape == "file" || shape == "delete-file-target-directory" || shape == "retarget-file" {
					target, link = dependency, root+"/linked.ts"
					imported = "./linked"
				}
				if err := os.Symlink(target, link); err != nil {
					t.Skipf("symlinks unavailable: %v", err)
				}
				writeAliasWatchFile(t, root+"/main.ts", fmt.Sprintf(`import {value} from %q; const x: number = value;`, imported))
				writeAliasWatchFile(t, root+"/lib.es5.d.ts", tscDefaultLibContent)
				writeAliasWatchFile(t, root+"/tsconfig.json", fmt.Sprintf(`{"compilerOptions":{"lib":["es5"],"noEmit":true,"preserveSymlinks":true,"incremental":%v},"files":["main.ts"],"include":[]}`, build))
				base := newTestSys(&tscInput{files: FileMap{}, cwd: root}, false)
				base.defaultLibraryPath = root
				base.mockWatchBackend.DirectoryExists = osvfs.FS().DirectoryExists
				base.mockWatchBackend.UseCaseSensitiveFileNames = osvfs.FS().UseCaseSensitiveFileNames()
				sys := &aliasWatchSystem{TestSys: base}
				args := []string{"--watch", "--project", root + "/tsconfig.json"}
				if build {
					args = []string{"--build", "--watch", root + "/tsconfig.json"}
				}
				result := execute.CommandLine(context.Background(), sys, args, sys)
				if result.Watcher == nil || !strings.Contains(base.currentWrite.String(), "Found 0 errors") {
					t.Fatalf("initial compilation failed: %s", base.currentWrite.String())
				}
				originalInfo, statErr := os.Stat(dependency)
				if statErr != nil {
					t.Fatal(statErr)
				}
				base.currentWrite.Reset()
				writeAliasWatchFile(t, dependency, `export const value = "changed";`)
				event := fswatch.Event{Path: dependency, Kind: fswatch.EventUpdate}
				want := "TS2322"
				if strings.HasPrefix(shape, "retarget-") {
					dependency = root + "/replacement/value.ts"
					writeAliasWatchFile(t, dependency, `export const value = "retargeted";`)
					if err := os.Chtimes(dependency, originalInfo.ModTime(), originalInfo.ModTime()); err != nil {
						t.Fatal(err)
					}
					assertTarget := root + "/replacement"
					if shape == "retarget-file" {
						assertTarget = dependency
					}
					if err := os.Remove(link); err != nil {
						t.Fatal(err)
					}
					if err := os.Symlink(assertTarget, link); err != nil {
						t.Fatal(err)
					}
					event.Path = link
				}
				if strings.HasPrefix(shape, "delete-") {
					event = fswatch.Event{Path: root + "/physical", Kind: fswatch.EventDelete}
					if err := os.RemoveAll(event.Path); err != nil {
						t.Fatal(err)
					}
					want = "TS2307"
				}
				sendAliasWatchEvent(t, base.mockWatchBackend, event)
				result.Watcher.DoCycle()
				if !strings.Contains(base.currentWrite.String(), want) {
					t.Fatalf("watch retained stale symlink dependency: %s", base.currentWrite.String())
				}
				if strings.HasPrefix(shape, "retarget-") {
					base.currentWrite.Reset()
					writeAliasWatchFile(t, dependency, `export const value = 2;`)
					sendAliasWatchEvent(t, base.mockWatchBackend, fswatch.Event{Path: dependency, Kind: fswatch.EventUpdate})
					result.Watcher.DoCycle()
					if !strings.Contains(base.currentWrite.String(), "Found 0 errors") {
						t.Fatalf("watch retained old symlink target: %s", base.currentWrite.String())
					}
				}
			})
		}
	}
}

func TestWatchFilesystemAliases(t *testing.T) {
	t.Parallel()
	for _, build := range []bool{false, true} {
		for _, shape := range []string{"filename", "descendant", "root", "multiple", "delete-directory"} {
			for _, pair := range []struct{ name, disk, alias string }{
				{"ascii", "ASCII", "ascii"},
				{"long-s", "s", "\u017f"},
				{"sigma", "\u03c3", "\u03c2"},
				{"sharp-s", "SS", "\u00df"},
				{"dotted-i", "i\u0307", "\u0130"},
				{"ligature", "ffi", "\ufb03"},
				{"normalization", "\u00e9", "e\u0301"},
			} {
				t.Run(fmt.Sprintf("build=%v/%s/%s", build, shape, pair.name), func(t *testing.T) {
					t.Parallel()
					if shape == "multiple" && pair.name == "ascii" {
						t.Skip("ASCII spellings intentionally share one compiler identity")
					}
					dir := aliasWatchDirectory(t)
					comparer, err := fswatch.PathComparerForPath(dir)
					if err != nil {
						t.Fatal(err)
					}
					if pair.name != "ascii" && comparer.Key(pair.disk) != comparer.Key(pair.alias) {
						t.Skip("native watcher does not equate these Unicode spellings")
					}
					root, requestedRoot := dir, dir
					dependency, imported := pair.disk, pair.alias
					include := "[]"
					if shape == "descendant" || shape == "delete-directory" {
						dependency += "/value"
						imported += "/value"
						include = `["**/*.unmatched"]`
					} else if shape == "root" {
						root += "/" + pair.disk
						requestedRoot += "/" + pair.alias
						dependency, imported = "value", "value"
					}
					dependency = root + "/" + dependency + ".ts"
					writeAliasWatchFile(t, dependency, "export const value = 1;")
					diskInfo, err := os.Stat(dependency)
					if err != nil {
						t.Fatal(err)
					}
					aliasInfo, err := os.Stat(requestedRoot + "/" + imported + ".ts")
					if err != nil || !os.SameFile(diskInfo, aliasInfo) {
						t.Skip("volume does not equate these filename spellings")
					}
					main := fmt.Sprintf(`import { value } from "./%s"; const x: number = value;`, imported)
					if shape == "multiple" {
						main += fmt.Sprintf(`import { value as other } from "./%s"; const y: number = other;`, pair.disk)
					}
					writeAliasWatchFile(t, root+"/main.ts", main)
					writeAliasWatchFile(t, root+"/lib.es5.d.ts", tscDefaultLibContent)
					writeAliasWatchFile(t, root+"/tsconfig.json", fmt.Sprintf(`{"compilerOptions":{"lib":["es5"],"noEmit":true,"incremental":%v},"files":["main.ts"],"include":%s}`, build, include))
					base := newTestSys(&tscInput{files: FileMap{}, cwd: requestedRoot}, false)
					base.defaultLibraryPath = root
					base.mockWatchBackend.DirectoryExists = osvfs.FS().DirectoryExists
					base.mockWatchBackend.UseCaseSensitiveFileNames = osvfs.FS().UseCaseSensitiveFileNames()
					sys := &aliasWatchSystem{TestSys: base}
					args := []string{"--watch", "--project", requestedRoot + "/tsconfig.json"}
					if build {
						args = []string{"--build", "--watch", requestedRoot + "/tsconfig.json"}
					}
					result := execute.CommandLine(context.Background(), sys, args, sys)
					if result.Watcher == nil || !strings.Contains(base.currentWrite.String(), "Found 0 errors") {
						t.Fatalf("initial compilation failed: %s", base.currentWrite.String())
					}
					base.currentWrite.Reset()
					writeAliasWatchFile(t, dependency, `export const value = "changed";`)
					event := fswatch.Event{Path: dependency, Kind: fswatch.EventUpdate}
					wantDiagnostic := "TS2322"
					if shape == "delete-directory" {
						event.Path = filepath.ToSlash(filepath.Dir(dependency))
						event.Kind = fswatch.EventDelete
						if err := os.RemoveAll(event.Path); err != nil {
							t.Fatal(err)
						}
						wantDiagnostic = "TS2307"
					}
					// Deliver the physical spelling through a genuinely covering
					// subscription, as a recursive native backend does.
					sendAliasWatchEvent(t, base.mockWatchBackend, event)
					result.Watcher.DoCycle()
					if !strings.Contains(base.currentWrite.String(), wantDiagnostic) {
						t.Fatalf("watch retained stale aliased dependency: %s", base.currentWrite.String())
					}

					if shape == "multiple" && strings.Count(base.currentWrite.String(), "TS2322") != 2 {
						t.Fatalf("both compiler identities must be invalidated: %s", base.currentWrite.String())
					}
				})
			}
		}
	}
}

func TestWatchFilesystemAliasLookups(t *testing.T) {
	t.Parallel()
	for _, build := range []bool{false, true} {
		for _, lookup := range []string{"config", "package", "package-directory-delete", "discovery"} {
			t.Run(fmt.Sprintf("build=%v/%s", build, lookup), func(t *testing.T) {
				t.Parallel()
				root := aliasWatchDirectory(t)
				comparer, err := fswatch.PathComparerForPath(root)
				if err != nil {
					t.Fatal(err)
				}
				if comparer.Key("s") != comparer.Key("\u017f") {
					t.Skip("native watcher does not equate these Unicode spellings")
				}
				writeAliasWatchFile(t, root+"/s/marker", "")
				disk, err := os.Stat(root + "/s")
				if err != nil {
					t.Fatal(err)
				}
				alias, err := os.Stat(root + "/\u017f")
				if err != nil || !os.SameFile(disk, alias) {
					t.Skip("volume does not equate these filename spellings")
				}
				main := `import {value} from "ſ"; const x: number = value;`
				extra := ""
				include := "[]"
				event := fswatch.Event{Path: root + "/node_modules/s/package.json", Kind: fswatch.EventUpdate}
				change := func() {
					writeAliasWatchFile(t, event.Path, `{"types":"string.d.ts"}`)
				}
				want := "TS2322"
				switch lookup {
				case "config":
					main = `const x: string = null;`
					extra = `,"extends":"./ſ/base.json"`
					event.Path = root + "/s/base.json"
					writeAliasWatchFile(t, event.Path, `{"compilerOptions":{"strictNullChecks":false}}`)
					change = func() {
						writeAliasWatchFile(t, event.Path, `{"compilerOptions":{"strictNullChecks":true}}`)
					}
				case "discovery":
					main = `import {value} from "./ſ/new"; const x: number = value;`
					include = `["**/*.ts"]`
					event.Path = root + "/s/new.ts"
					change = func() { writeAliasWatchFile(t, event.Path, `export const value = "changed";`) }
				default:
					writeAliasWatchFile(t, event.Path, `{"types":"number.d.ts"}`)
					writeAliasWatchFile(t, root+"/node_modules/s/number.d.ts", `export declare const value: number;`)
					writeAliasWatchFile(t, root+"/node_modules/s/string.d.ts", `export declare const value: string;`)
					if lookup == "package-directory-delete" {
						event.Path = root + "/node_modules/s"
						event.Kind = fswatch.EventDelete
						change = func() {
							if removeErr := os.RemoveAll(event.Path); removeErr != nil {
								t.Fatal(removeErr)
							}
						}
						want = "TS2307"
					}
				}
				writeAliasWatchFile(t, root+"/main.ts", main)
				writeAliasWatchFile(t, root+"/lib.es5.d.ts", tscDefaultLibContent)
				writeAliasWatchFile(t, root+"/tsconfig.json", fmt.Sprintf(`{"compilerOptions":{"lib":["es5"],"module":"nodenext","noEmit":true,"incremental":%v},"files":["main.ts"],"include":%s%s}`, build, include, extra))
				base := newTestSys(&tscInput{files: FileMap{}, cwd: root}, false)
				base.defaultLibraryPath = root
				base.mockWatchBackend.DirectoryExists = osvfs.FS().DirectoryExists
				sys := &aliasWatchSystem{TestSys: base}
				args := []string{"--watch", "--project", root + "/tsconfig.json"}
				if build {
					args = []string{"--build", "--watch", root + "/tsconfig.json"}
				}
				result := execute.CommandLine(context.Background(), sys, args, sys)
				initial := "Found 0 errors"
				if lookup == "discovery" {
					initial = "TS2307"
				}
				if result.Watcher == nil || !strings.Contains(base.currentWrite.String(), initial) {
					t.Fatalf("initial compilation failed: %s", base.currentWrite.String())
				}
				base.currentWrite.Reset()
				change()
				sendAliasWatchEvent(t, base.mockWatchBackend, event)
				result.Watcher.DoCycle()
				if !strings.Contains(base.currentWrite.String(), want) {
					t.Fatalf("watch retained stale %s lookup: %s", lookup, base.currentWrite.String())
				}
			})
		}
	}
}

func TestWatchConfigRetargetWithEqualTime(t *testing.T) {
	t.Parallel()
	for _, build := range []bool{false, true} {
		for _, extended := range []bool{false, true} {
			t.Run(fmt.Sprintf("build=%v/extended=%v", build, extended), func(t *testing.T) {
				t.Parallel()
				root := aliasWatchDirectory(t)
				config := root + "/tsconfig.json"
				link := config
				baseConfig := fmt.Sprintf(`"compilerOptions":{"lib":["es5"],"noEmit":true,"incremental":%v,"noImplicitAny":%%v},"files":["main.ts"],"include":[]`, build)
				if extended {
					link = root + "/options.json"
					writeAliasWatchFile(t, config, fmt.Sprintf(`{%s,"extends":"./options.json"}`, fmt.Sprintf(baseConfig, true)))
					baseConfig = `"compilerOptions":{"strictNullChecks":%v}`
				}
				writeAliasWatchFile(t, root+"/one.json", "{"+fmt.Sprintf(baseConfig, false)+"}")
				writeAliasWatchFile(t, root+"/two.json", "{"+fmt.Sprintf(baseConfig, true)+"}")
				text, diagnostic := "export function f(x) { return x; }", "TS7006"
				if extended {
					text, diagnostic = "export const x: string = null;", "TS2322"
				}
				writeAliasWatchFile(t, root+"/main.ts", text)
				writeAliasWatchFile(t, root+"/lib.es5.d.ts", tscDefaultLibContent)
				stamp := time.Unix(1700000000, 0)
				assert.NilError(t, os.Chtimes(root+"/one.json", stamp, stamp))
				assert.NilError(t, os.Chtimes(root+"/two.json", stamp, stamp))
				if err := os.Symlink(root+"/one.json", link); err != nil {
					t.Skipf("symlinks unavailable: %v", err)
				}
				base := newTestSys(&tscInput{files: FileMap{}, cwd: root}, false)
				base.defaultLibraryPath = root
				base.mockWatchBackend.DirectoryExists = osvfs.FS().DirectoryExists
				base.mockWatchBackend.UseCaseSensitiveFileNames = osvfs.FS().UseCaseSensitiveFileNames()
				sys := &aliasWatchSystem{TestSys: base}
				args := []string{"--watch", "--project", config}
				if build {
					args = []string{"--build", "--watch", config}
				}
				result := execute.CommandLine(context.Background(), sys, args, sys)
				assert.Assert(t, result.Watcher != nil)
				assert.Assert(t, strings.Contains(base.currentWrite.String(), "Found 0 errors"), base.currentWrite.String())
				base.currentWrite.Reset()
				assert.NilError(t, os.Remove(link))
				assert.NilError(t, os.Symlink(root+"/two.json", link))
				sendAliasWatchEvent(t, base.mockWatchBackend, fswatch.Event{Path: link, Kind: fswatch.EventUpdate})
				result.Watcher.DoCycle()
				assert.Assert(t, strings.Contains(base.currentWrite.String(), diagnostic), base.currentWrite.String())
			})
		}
	}
}

type lifecycleWatchSystem struct {
	*aliasWatchSystem
	filesystem vfs.FS
}

func (s *lifecycleWatchSystem) FS() vfs.FS { return s.filesystem }

type failedConfigReadFS struct {
	vfs.FS
	config string
	fail   atomic.Bool
}

func (f *failedConfigReadFS) ReadFile(name string) (string, bool) {
	if name == f.config && f.fail.Swap(false) {
		return "", false
	}
	return f.FS.ReadFile(name)
}

func startPhysicalAliasWatch(t *testing.T, root string, build bool, filesystem vfs.FS) (*TestSys, func()) {
	t.Helper()
	writeAliasWatchFile(t, root+"/lib.es5.d.ts", tscDefaultLibContent)
	base := newTestSys(&tscInput{files: FileMap{}, cwd: root}, false)
	base.defaultLibraryPath = root
	base.mockWatchBackend.DirectoryExists = osvfs.FS().DirectoryExists
	base.mockWatchBackend.UseCaseSensitiveFileNames = osvfs.FS().UseCaseSensitiveFileNames()
	sys := &lifecycleWatchSystem{aliasWatchSystem: &aliasWatchSystem{TestSys: base}, filesystem: filesystem}
	args := []string{"--watch", "--project", root + "/tsconfig.json"}
	if build {
		args = []string{"--build", "--watch", root + "/tsconfig.json"}
	}
	result := execute.CommandLine(context.Background(), sys, args, sys)
	assert.Assert(t, result.Watcher != nil)
	assert.Assert(t, strings.Contains(base.currentWrite.String(), "Found 0 errors"), base.currentWrite.String())
	return base, result.Watcher.DoCycle
}

func TestWatchRetargetIdenticalSourceText(t *testing.T) {
	t.Parallel()
	for _, build := range []bool{false, true} {
		t.Run(strconv.FormatBool(build), func(t *testing.T) {
			t.Parallel()
			root := aliasWatchDirectory(t)
			stamp := time.Unix(1700000000, 0)
			for _, target := range []string{"one", "two"} {
				writeAliasWatchFile(t, root+"/"+target+"/index.ts", `export {value} from "./dep";`)
				value := "1"
				if target == "two" {
					value = `"two"`
				}
				writeAliasWatchFile(t, root+"/"+target+"/dep.ts", "export const value = "+value+";")
				for _, name := range []string{"index.ts", "dep.ts"} {
					assert.NilError(t, os.Chtimes(root+"/"+target+"/"+name, stamp, stamp))
				}
			}
			link := root + "/linked"
			if err := os.Symlink(root+"/one", link); err != nil {
				t.Skipf("symlinks unavailable: %v", err)
			}
			writeAliasWatchFile(t, root+"/main.ts", `import {value} from "./linked/index"; const x: number = value;`)
			writeAliasWatchFile(t, root+"/tsconfig.json", fmt.Sprintf(`{"compilerOptions":{"lib":["es5"],"noEmit":true,"preserveSymlinks":true,"incremental":%v},"files":["main.ts"],"include":[]}`, build))
			base, cycle := startPhysicalAliasWatch(t, root, build, osvfs.FS())
			base.currentWrite.Reset()
			assert.NilError(t, os.Remove(link))
			assert.NilError(t, os.Symlink(root+"/two", link))
			sendAliasWatchEvent(t, base.mockWatchBackend, fswatch.Event{Path: link, Kind: fswatch.EventUpdate})
			cycle()
			assert.Assert(t, strings.Contains(base.currentWrite.String(), "TS2322"), base.currentWrite.String())
			base.currentWrite.Reset()
			writeAliasWatchFile(t, root+"/two/dep.ts", "export const value = 2;")
			sendAliasWatchEvent(t, base.mockWatchBackend, fswatch.Event{Path: root + "/two/dep.ts", Kind: fswatch.EventUpdate})
			cycle()
			assert.Assert(t, strings.Contains(base.currentWrite.String(), "Found 0 errors"), base.currentWrite.String())
		})
	}
}

func TestWatchRetargetConfigErrorRecovery(t *testing.T) {
	t.Parallel()
	for _, build := range []bool{false, true} {
		t.Run(strconv.FormatBool(build), func(t *testing.T) {
			t.Parallel()
			root := aliasWatchDirectory(t)
			config := fmt.Sprintf(`{"compilerOptions":{"lib":["es5"],"noEmit":true,"incremental":%v},"files":["main.ts"],"include":[]}`, build)
			writeAliasWatchFile(t, root+"/one/config.json", config)
			writeAliasWatchFile(t, root+"/two/config.json", "{")
			stamp := time.Unix(1700000000, 0)
			assert.NilError(t, os.Chtimes(root+"/one/config.json", stamp, stamp))
			assert.NilError(t, os.Chtimes(root+"/two/config.json", stamp, stamp))
			link := root + "/tsconfig.json"
			if err := os.Symlink(root+"/one/config.json", link); err != nil {
				t.Skipf("symlinks unavailable: %v", err)
			}
			writeAliasWatchFile(t, root+"/main.ts", "export const value = 1;")
			base, cycle := startPhysicalAliasWatch(t, root, build, osvfs.FS())
			base.currentWrite.Reset()
			assert.NilError(t, os.Remove(link))
			assert.NilError(t, os.Symlink(root+"/two/config.json", link))
			sendAliasWatchEvent(t, base.mockWatchBackend, fswatch.Event{Path: link, Kind: fswatch.EventUpdate})
			cycle()
			assert.Assert(t, strings.Contains(base.currentWrite.String(), "TS1005"), base.currentWrite.String())
			base.currentWrite.Reset()
			writeAliasWatchFile(t, root+"/two/config.json", config)
			sendAliasWatchEvent(t, base.mockWatchBackend, fswatch.Event{Path: root + "/two/config.json", Kind: fswatch.EventUpdate})
			cycle()
			assert.Assert(t, strings.Contains(base.currentWrite.String(), "Found 0 errors"), base.currentWrite.String())
		})
	}
}

func TestWatchRetargetConfigReadFailureRecovery(t *testing.T) {
	t.Parallel()
	for _, build := range []bool{false, true} {
		t.Run(strconv.FormatBool(build), func(t *testing.T) {
			t.Parallel()
			root := aliasWatchDirectory(t)
			config := fmt.Sprintf(`{"compilerOptions":{"lib":["es5"],"noEmit":true,"incremental":%v},"files":["main.ts"],"include":[]}`, build)
			writeAliasWatchFile(t, root+"/one/config.json", config)
			writeAliasWatchFile(t, root+"/two/config.json", config)
			link := root + "/tsconfig.json"
			if err := os.Symlink(root+"/one/config.json", link); err != nil {
				t.Skipf("symlinks unavailable: %v", err)
			}
			writeAliasWatchFile(t, root+"/main.ts", "export const value = 1;")
			fs := &failedConfigReadFS{FS: osvfs.FS(), config: link}
			base, cycle := startPhysicalAliasWatch(t, root, build, fs)
			base.currentWrite.Reset()
			assert.NilError(t, os.Remove(link))
			assert.NilError(t, os.Symlink(root+"/two/config.json", link))
			fs.fail.Store(true)
			sendAliasWatchEvent(t, base.mockWatchBackend, fswatch.Event{Path: link, Kind: fswatch.EventUpdate})
			cycle()
			diagnostic := "TS5083"
			if build {
				diagnostic = "TS6053"
			}
			assert.Assert(t, strings.Contains(base.currentWrite.String(), diagnostic), base.currentWrite.String())
			base.currentWrite.Reset()
			sendAliasWatchEvent(t, base.mockWatchBackend, fswatch.Event{Path: root + "/two/config.json", Kind: fswatch.EventUpdate})
			cycle()
			assert.Assert(t, strings.Contains(base.currentWrite.String(), "Found 0 errors"), base.currentWrite.String())
		})
	}
}

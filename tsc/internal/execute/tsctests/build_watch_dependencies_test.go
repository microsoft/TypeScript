package tsctests

import (
	"fmt"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/execute"
	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/fsbaselineutil"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

const (
	dependencyProject = "/home/src/workspaces/project/"
	dependencyShared  = "/home/src/workspaces/shared/"
)

func dependencyFiles() FileMap {
	return FileMap{
		dependencyProject + "tsconfig.json": `{"compilerOptions":{"outDir":"out","rootDir":"..","module":"nodenext","target":"es2022"},"files":["index.ts"]}`,
		dependencyProject + "package.json":  `{"type":"module"}`,
		dependencyProject + "index.ts":      `import { value } from "./other.js"; export const result = value;`,
		dependencyProject + "other.ts":      `export const value = "before";`,
		dependencyShared + "other.ts":       `export const value = "before";`,
	}
}

func startDependencyWatch(t *testing.T, files FileMap, args []string, prebuild bool, expectedError string) (*TestSys, interface{ DoCycle() }) {
	t.Helper()
	sys := newTestSys(&tscInput{files: files, cwd: "/home/src/workspaces/project"}, false)
	if prebuild {
		result := execute.CommandLine(t.Context(), sys, []string{"--build"}, sys)
		assert.Equal(t, int(result.Status), 0, "prebuild must succeed:\n%s", sys.getOutput(false))
		sys.clearOutput()
	}
	result := execute.CommandLine(t.Context(), sys, args, sys)
	assert.Assert(t, result.Watcher != nil)
	output := sys.getOutput(false)
	assert.Assert(t, !strings.Contains(output, "Cannot find global type"), "the fixture must provide global types:\n%s", output)
	if expectedError == "" {
		assert.Equal(t, int(result.Status), 0, "startup must succeed:\n%s", output)
		assert.Assert(t, strings.Contains(output, "Found 0 errors"))
		if prebuild {
			assert.Assert(t, strings.Contains(output, "is up to date"), "startup must actually skip compilation:\n%s", output)
			assert.Assert(t, !strings.Contains(output, "Building project"))
		}
	} else {
		assert.Assert(t, int(result.Status) != 0)
		assert.Assert(t, strings.Contains(output, expectedError), "expected %q:\n%s", expectedError, output)
	}
	sys.clearOutput()
	return sys, result.Watcher
}

func dependencyEvent(sys *TestSys, watcher interface{ DoCycle() }, kind fswatch.EventKind, path string) {
	sys.mockWatchBackend.SendChangedPaths([]fsbaselineutil.FileChange{{Path: path, Deleted: kind == fswatch.EventDelete}})
	watcher.DoCycle()
}

func checkDependencyOutput(t *testing.T, sys *TestSys, path, expected string) {
	t.Helper()
	output := sys.readFileNoError(path)
	assert.Assert(t, strings.Contains(output, expected), "%s must contain %q:\n%s\nwatch output:\n%s", path, expected, output, sys.getOutput(false))
}

func checkDependencySuccess(t *testing.T, sys *TestSys) {
	t.Helper()
	assert.Assert(t, strings.Contains(sys.getOutput(false), "Found 0 errors"), "the change must compile successfully:\n%s", sys.getOutput(false))
	assert.Assert(t, !strings.Contains(sys.getOutput(true), "error"))
}

func TestBuildWatchDependencies(t *testing.T) {
	t.Parallel()
	for _, external := range []bool{false, true} {
		for _, prebuild := range []bool{false, true} {
			t.Run(fmt.Sprintf("external=%v/prebuild=%v", external, prebuild), func(t *testing.T) {
				t.Parallel()
				files := dependencyFiles()
				input := dependencyProject + "other.ts"
				output := dependencyProject + "out/project/other.js"
				if external {
					files[dependencyProject+"index.ts"] = `import { value } from "../shared/other.js"; export const result = value;`
					input = dependencyShared + "other.ts"
					output = dependencyProject + "out/shared/other.js"
				}
				sys, watcher := startDependencyWatch(t, files, []string{"--build", "--watch", "--verbose"}, prebuild, "")
				checkDependencyOutput(t, sys, output, `"before"`)
				sys.writeFileNoError(input, `export const value = "after";`)
				dependencyEvent(sys, watcher, fswatch.EventUpdate, input)
				checkDependencySuccess(t, sys)
				checkDependencyOutput(t, sys, output, `"after"`)
			})
		}
	}
}

func TestBuildWatchDependencyGraphChanges(t *testing.T) {
	t.Parallel()
	sys, watcher := startDependencyWatch(t, dependencyFiles(), []string{"--build", "--watch", "--verbose"}, false, "")
	sys.writeFileNoError(dependencyProject+"tsconfig.json", `{"compilerOptions":{"outDir":"changed","rootDir":"..","module":"nodenext","target":"es2022"},"files":["index.ts"]}`)
	dependencyEvent(sys, watcher, fswatch.EventUpdate, dependencyProject+"tsconfig.json")
	checkDependencySuccess(t, sys)
	checkDependencyOutput(t, sys, dependencyProject+"changed/project/other.js", `"before"`)
	sys.clearOutput()
	sys.writeFileNoError(dependencyProject+"index.ts", `import { value } from "../shared/other.js"; export const changed = value;`)
	dependencyEvent(sys, watcher, fswatch.EventUpdate, dependencyProject+"index.ts")
	checkDependencySuccess(t, sys)
	assert.Assert(t, isWatched(sys, "/home/src/workspaces/shared"))
	sys.clearOutput()
	sys.writeFileNoError(dependencyShared+"other.ts", `export const value = "after";`)
	dependencyEvent(sys, watcher, fswatch.EventUpdate, dependencyShared+"other.ts")
	checkDependencySuccess(t, sys)
	checkDependencyOutput(t, sys, dependencyProject+"changed/shared/other.js", `"after"`)
	sys.clearOutput()
	sys.writeFileNoError(dependencyProject+"index.ts", `export const removed = true;`)
	dependencyEvent(sys, watcher, fswatch.EventUpdate, dependencyProject+"index.ts")
	checkDependencySuccess(t, sys)
	assert.Assert(t, !isWatched(sys, "/home/src/workspaces/shared"))
	sys.clearOutput()
	sys.writeFileNoError(dependencyShared+"other.ts", `export const value = "unrelated";`)
	dependencyEvent(sys, watcher, fswatch.EventUpdate, dependencyShared+"other.ts")
	assert.Equal(t, sys.getOutput(false), "")
}

func TestBuildWatchMissingDependencies(t *testing.T) {
	t.Parallel()
	for _, external := range []bool{false, true} {
		for _, initiallyMissing := range []bool{false, true} {
			t.Run(fmt.Sprintf("external=%v/missing=%v", external, initiallyMissing), func(t *testing.T) {
				t.Parallel()
				files := dependencyFiles()
				input := dependencyProject + "other.ts"
				output := dependencyProject + "out/project/other.js"
				if external {
					files[dependencyProject+"index.ts"] = `import { value } from "../shared/other.js"; export const result = value;`
					input = dependencyShared + "other.ts"
					output = dependencyProject + "out/shared/other.js"
				}
				expectedError := ""
				if initiallyMissing {
					delete(files, input)
					expectedError = "Cannot find module"
				}
				sys, watcher := startDependencyWatch(t, files, []string{"--build", "--watch", "--verbose"}, false, expectedError)
				if !initiallyMissing {
					sys.removeNoError(input)
					dependencyEvent(sys, watcher, fswatch.EventDelete, input)
					assert.Assert(t, strings.Contains(sys.getOutput(true), "Cannot find module"), "deleting a dependency must be diagnosed:\n%s", sys.getOutput(false))
					sys.clearOutput()
				}
				sys.writeFileNoError(input, `export const value = "restored";`)
				dependencyEvent(sys, watcher, fswatch.EventUpdate, input)
				checkDependencySuccess(t, sys)
				checkDependencyOutput(t, sys, output, `"restored"`)
			})
		}
	}
}

func TestBuildWatchMissingDependencyDirectory(t *testing.T) {
	t.Parallel()
	files := dependencyFiles()
	files[dependencyProject+"index.ts"] = `import { value } from "../missing/deep/other.js"; export const result = value;`
	sys, watcher := startDependencyWatch(t, files, []string{"--build", "--watch", "--verbose"}, false, "Cannot find module")
	sys.writeFileNoError("/home/src/workspaces/missing/deep/other.ts", `export const value = "created";`)
	dependencyEvent(sys, watcher, fswatch.EventUpdate, "/home/src/workspaces/missing")
	checkDependencySuccess(t, sys)
	checkDependencyOutput(t, sys, dependencyProject+"out/missing/deep/other.js", `"created"`)
}

func TestBuildWatchFailedDependencyRecovery(t *testing.T) {
	t.Parallel()
	files := dependencyFiles()
	files[dependencyProject+"index.ts"] = `import { value } from "./other.js"; export const result: number = value;`
	files[dependencyProject+"tsconfig.json"] = `{"compilerOptions":{"outDir":"out","rootDir":"..","noEmitOnError":true},"files":["index.ts"]}`
	sys, watcher := startDependencyWatch(t, files, []string{"--build", "--watch", "--verbose"}, false, "not assignable")
	sys.removeNoError(dependencyProject + "other.ts")
	dependencyEvent(sys, watcher, fswatch.EventDelete, dependencyProject+"other.ts")
	assert.Assert(t, strings.Contains(sys.getOutput(true), "Cannot find module"))
	sys.clearOutput()
	sys.writeFileNoError(dependencyProject+"other.ts", `export const value = 42;`)
	dependencyEvent(sys, watcher, fswatch.EventUpdate, dependencyProject+"other.ts")
	checkDependencySuccess(t, sys)
	checkDependencyOutput(t, sys, dependencyProject+"out/project/other.js", "42")
}

func TestBuildWatchDependenciesBeforeStartup(t *testing.T) {
	t.Parallel()
	sys := newTestSys(&tscInput{files: dependencyFiles(), cwd: "/home/src/workspaces/project"}, false)
	result := execute.CommandLine(t.Context(), sys, []string{"--build"}, sys)
	assert.Equal(t, int(result.Status), 0, "%s", sys.getOutput(false))
	sys.writeFileNoError(dependencyProject+"other.ts", `export const value = "changed";`)
	sys.clearOutput()
	result = execute.CommandLine(t.Context(), sys, []string{"--build", "--watch", "--verbose"}, sys)
	assert.Equal(t, int(result.Status), 0)
	assert.Assert(t, result.Watcher != nil)
	checkDependencyOutput(t, sys, dependencyProject+"out/project/other.js", `"changed"`)
}

func TestBuildWatchDependencyControls(t *testing.T) {
	t.Parallel()
	for _, mode := range []string{"incremental", "composite"} {
		t.Run(mode, func(t *testing.T) {
			t.Parallel()
			files := dependencyFiles()
			args := []string{"--build", "--watch", "--verbose"}
			input := dependencyProject + "other.ts"
			output := dependencyProject + "out/project/other.js"
			content := `export const value = "after";`
			switch mode {
			case "incremental":
				files[dependencyProject+"tsconfig.json"] = `{"compilerOptions":{"outDir":"out","rootDir":"..","incremental":true},"files":["index.ts"]}`
			case "composite":
				files[dependencyProject+"tsconfig.json"] = `{"compilerOptions":{"outDir":"out","rootDir":"..","composite":true},"files":["index.ts"]}`
				delete(files, input)
				input = dependencyProject + "other.d.ts"
				files[input] = `export const value: "before";`
				content = `export const value: "after";`
				output = dependencyProject + "out/project/index.d.ts"
			}
			sys, watcher := startDependencyWatch(t, files, args, false, "")
			sys.writeFileNoError(input, content)
			dependencyEvent(sys, watcher, fswatch.EventUpdate, input)
			checkDependencySuccess(t, sys)
			checkDependencyOutput(t, sys, output, `"after"`)
		})
	}
}

func TestBuildWatchReplacementLibrary(t *testing.T) {
	t.Parallel()
	for _, incremental := range []bool{false, true} {
		t.Run(fmt.Sprintf("incremental=%v", incremental), func(t *testing.T) {
			t.Parallel()
			files := FileMap{
				dependencyProject + "tsconfig.json":                                 fmt.Sprintf(`{"compilerOptions":{"outDir":"out","noEmitOnError":true,"lib":["es2022","dom"],"libReplacement":true,"incremental":%v},"files":["index.ts"]}`, incremental),
				dependencyProject + "index.ts":                                      `export const result: number = libValue;`,
				dependencyProject + "node_modules/@typescript/lib-dom/package.json": `{"name":"@typescript/lib-dom","version":"1.0.0","types":"index.d.ts"}`,
				dependencyProject + "node_modules/@typescript/lib-dom/index.d.ts":   `declare const libValue: string;`,
			}
			sys, watcher := startDependencyWatch(t, files, []string{"--build", "--watch", "--verbose"}, false, "not assignable")
			sys.writeFileNoError(dependencyProject+"node_modules/@typescript/lib-dom/index.d.ts", `declare const libValue: number;`)
			dependencyEvent(sys, watcher, fswatch.EventUpdate, dependencyProject+"node_modules/@typescript/lib-dom/index.d.ts")
			checkDependencySuccess(t, sys)
			checkDependencyOutput(t, sys, dependencyProject+"out/index.js", "libValue")
			sys.clearOutput()
			sys.writeFileNoError(dependencyProject+"node_modules/@typescript/lib-dom/index.d.ts", `declare const libValue: string;`)
			dependencyEvent(sys, watcher, fswatch.EventUpdate, dependencyProject+"node_modules/@typescript/lib-dom/index.d.ts")
			assert.Assert(t, strings.Contains(sys.getOutput(false), "not assignable"))
		})
	}
}

func TestBuildWatchUnrelatedDependencyEvents(t *testing.T) {
	t.Parallel()
	files := dependencyFiles()
	files[dependencyProject+"index.ts"] = `import { value } from "../shared/other.js"; export const result = value;`
	sys, watcher := startDependencyWatch(t, files, []string{"--build", "--watch", "--verbose"}, false, "")
	for _, path := range []string{dependencyProject + "unused.ts", dependencyShared + "unused.ts", dependencyProject + "note.txt"} {
		sys.writeFileNoError(path, "unrelated")
		dependencyEvent(sys, watcher, fswatch.EventUpdate, path)
		assert.Equal(t, sys.getOutput(false), "", "unrelated file %s must not start a cycle", path)
	}
}

func TestBuildWatchDependencyRootChanges(t *testing.T) {
	t.Parallel()
	files := dependencyFiles()
	files[dependencyProject+"tsconfig.json"] = `{"compilerOptions":{"outDir":"out","rootDir":".."},"include":["*.ts"]}`
	sys, watcher := startDependencyWatch(t, files, []string{"--build", "--watch", "--verbose"}, false, "")
	sys.writeFileNoError(dependencyProject+"added.ts", `export const added = 123;`)
	dependencyEvent(sys, watcher, fswatch.EventUpdate, dependencyProject+"added.ts")
	checkDependencySuccess(t, sys)
	checkDependencyOutput(t, sys, dependencyProject+"out/project/added.js", "123")
	sys.clearOutput()
	sys.removeNoError(dependencyProject + "added.ts")
	dependencyEvent(sys, watcher, fswatch.EventDelete, dependencyProject+"added.ts")
	checkDependencySuccess(t, sys)
}

func TestBuildDependencyBeforeRestart(t *testing.T) {
	t.Parallel()
	for _, watch := range []bool{false, true} {
		for _, deleted := range []bool{false, true} {
			t.Run(fmt.Sprintf("watch=%v/deleted=%v", watch, deleted), func(t *testing.T) {
				t.Parallel()
				sys := newTestSys(&tscInput{files: dependencyFiles(), cwd: strings.TrimSuffix(dependencyProject, "/")}, false)
				result := execute.CommandLine(t.Context(), sys, []string{"--build"}, sys)
				assert.Equal(t, int(result.Status), 0, "%s", sys.getOutput(false))
				if deleted {
					sys.removeNoError(dependencyProject + "other.ts")
				} else {
					sys.writeFileNoError(dependencyProject+"other.ts", `export const value = "restarted";`)
				}
				sys.clearOutput()
				args := []string{"--build", "--verbose"}
				if watch {
					args = append(args, "--watch")
				}
				result = execute.CommandLine(t.Context(), sys, args, sys)
				if deleted {
					assert.Assert(t, int(result.Status) != 0)
					assert.Assert(t, strings.Contains(sys.getOutput(false), "Cannot find module"))
				} else {
					assert.Equal(t, int(result.Status), 0, "%s", sys.getOutput(false))
					checkDependencyOutput(t, sys, dependencyProject+"out/project/other.js", `"restarted"`)
				}
			})
		}
	}
}

func TestBuildWatchDependencyConfiguration(t *testing.T) {
	t.Parallel()
	files := dependencyFiles()
	files[dependencyProject+"base.json"] = `{"compilerOptions":{"outDir":"out","rootDir":"..","incremental":false}}`
	files[dependencyProject+"tsconfig.json"] = `{"extends":"./base.json","files":["index.ts"]}`
	sys, watcher := startDependencyWatch(t, files, []string{"--build", "--watch", "--verbose"}, true, "")
	for _, incremental := range []bool{true, false} {
		sys.writeFileNoError(dependencyProject+"base.json", fmt.Sprintf(`{"compilerOptions":{"outDir":"out","rootDir":"..","incremental":%v}}`, incremental))
		dependencyEvent(sys, watcher, fswatch.EventUpdate, dependencyProject+"base.json")
		checkDependencySuccess(t, sys)
		sys.clearOutput()
		content := fmt.Sprintf(`export const value = "incremental=%v";`, incremental)
		sys.writeFileNoError(dependencyProject+"other.ts", content)
		dependencyEvent(sys, watcher, fswatch.EventUpdate, dependencyProject+"other.ts")
		checkDependencySuccess(t, sys)
		checkDependencyOutput(t, sys, dependencyProject+"out/project/other.js", fmt.Sprintf(`"incremental=%v"`, incremental))
		sys.clearOutput()
	}
}

func TestBuildWatchDependencyPackages(t *testing.T) {
	t.Parallel()
	for _, incremental := range []bool{false, true} {
		t.Run(fmt.Sprintf("incremental=%v", incremental), func(t *testing.T) {
			t.Parallel()
			files := dependencyFiles()
			files[dependencyProject+"tsconfig.json"] = fmt.Sprintf(`{"compilerOptions":{"outDir":"out","declaration":true,"incremental":%v},"files":["index.ts"]}`, incremental)
			files[dependencyProject+"index.ts"] = `import { value } from "widget"; export const result = value;`
			pkg := dependencyProject + "node_modules/widget/"
			files[pkg+"package.json"] = `{"types":"first.d.ts"}`
			files[pkg+"first.d.ts"] = `export const value: 1;`
			files[pkg+"second.d.ts"] = `export const value: 2;`
			files[pkg+"index.d.ts"] = `export const value: 3;`
			sys, watcher := startDependencyWatch(t, files, []string{"--build", "--watch", "--verbose"}, true, "")
			for _, path := range []string{dependencyProject + "node_modules/unused/index.d.ts", dependencyProject + "node_modules/unused/package.json", dependencyProject + "unused/deep/note.txt"} {
				sys.writeFileNoError(path, "unrelated")
				dependencyEvent(sys, watcher, fswatch.EventUpdate, path)
				assert.Equal(t, sys.getOutput(false), "", "unrelated package/directory event: %s", path)
			}
			sys.writeFileNoError(pkg+"package.json", `{"types":"second.d.ts"}`)
			dependencyEvent(sys, watcher, fswatch.EventUpdate, pkg+"package.json")
			checkDependencySuccess(t, sys)
			checkDependencyOutput(t, sys, dependencyProject+"out/index.d.ts", "result: 2")
			sys.clearOutput()
			sys.removeNoError(pkg + "package.json")
			dependencyEvent(sys, watcher, fswatch.EventDelete, pkg+"package.json")
			checkDependencySuccess(t, sys)
			checkDependencyOutput(t, sys, dependencyProject+"out/index.d.ts", "result: 3")
			sys.clearOutput()
			sys.writeFileNoError(pkg+"package.json", `{"types":"first.d.ts"}`)
			dependencyEvent(sys, watcher, fswatch.EventUpdate, pkg+"package.json")
			checkDependencySuccess(t, sys)
			checkDependencyOutput(t, sys, dependencyProject+"out/index.d.ts", "result: 1")
		})
	}
}

func TestBuildWatchMissingDependencyPackage(t *testing.T) {
	t.Parallel()
	files := dependencyFiles()
	files[dependencyProject+"index.ts"] = `import { value } from "widget"; export const result = value;`
	files[dependencyProject+"tsconfig.json"] = `{"compilerOptions":{"outDir":"out","declaration":true},"files":["index.ts"]}`
	sys, watcher := startDependencyWatch(t, files, []string{"--build", "--watch", "--verbose"}, false, "Cannot find module")
	path := dependencyProject + "node_modules/widget/index.d.ts"
	sys.writeFileNoError(path, `export const value: 42;`)
	dependencyEvent(sys, watcher, fswatch.EventUpdate, path)
	checkDependencySuccess(t, sys)
	checkDependencyOutput(t, sys, dependencyProject+"out/index.d.ts", "result: 42")
}

func TestBuildWatchDependencyResolutionChanges(t *testing.T) {
	t.Parallel()
	for _, incremental := range []bool{false, true} {
		t.Run(fmt.Sprintf("incremental=%v", incremental), func(t *testing.T) {
			t.Parallel()
			files := dependencyFiles()
			delete(files, dependencyProject+"other.ts")
			files[dependencyProject+"other.d.ts"] = `export const value: "declaration";`
			files[dependencyProject+"tsconfig.json"] = fmt.Sprintf(`{"compilerOptions":{"outDir":"out","declaration":true,"incremental":%v},"files":["index.ts"]}`, incremental)
			sys, watcher := startDependencyWatch(t, files, []string{"--build", "--watch", "--verbose"}, true, "")
			sys.writeFileNoError(dependencyProject+"other.ts", `export const value = "source";`)
			dependencyEvent(sys, watcher, fswatch.EventUpdate, dependencyProject+"other.ts")
			checkDependencySuccess(t, sys)
			checkDependencyOutput(t, sys, dependencyProject+"out/other.js", `"source"`)
			sys.clearOutput()
			sys.writeFileNoError(dependencyProject+"index.ts", `export const removed = true;`)
			sys.writeFileNoError(dependencyProject+"other.d.ts", `export const value: "unused";`)
			sys.mockWatchBackend.SendChangedPaths([]fsbaselineutil.FileChange{{Path: dependencyProject + "index.ts"}, {Path: dependencyProject + "other.d.ts"}})
			watcher.DoCycle()
			checkDependencySuccess(t, sys)
			sys.clearOutput()
			sys.writeFileNoError(dependencyProject+"other.ts", `export const value = "unused";`)
			dependencyEvent(sys, watcher, fswatch.EventUpdate, dependencyProject+"other.ts")
			assert.Equal(t, sys.getOutput(false), "")
		})
	}
}

func TestBuildWatchDependencyReferences(t *testing.T) {
	t.Parallel()
	for _, composite := range []bool{false, true} {
		t.Run(fmt.Sprintf("composite=%v", composite), func(t *testing.T) {
			t.Parallel()
			files := dependencyFiles()
			files[dependencyProject+"tsconfig.json"] = `{"files":[],"references":[{"path":"./child"}]}`
			files[dependencyProject+"child/tsconfig.json"] = fmt.Sprintf(`{"compilerOptions":{"outDir":"out","composite":%v},"files":["index.ts","other.ts"]}`, composite)
			if !composite {
				files[dependencyProject+"child/tsconfig.json"] = `{"compilerOptions":{"outDir":"out"},"files":["index.ts"]}`
			}
			files[dependencyProject+"child/index.ts"] = `import { value } from "./other.js"; export const result = value;`
			files[dependencyProject+"child/other.ts"] = `export const value = "before";`
			if composite {
				files[dependencyProject+"tsconfig.json"] = `{"files":[],"references":[{"path":"./client"}]}`
				files[dependencyProject+"client/tsconfig.json"] = `{"compilerOptions":{"outDir":"out","composite":true},"files":["index.ts"],"references":[{"path":"../child"}]}`
				files[dependencyProject+"client/index.ts"] = `import { result } from "../child/index.js"; export const propagated = result;`
			}
			sys, watcher := startDependencyWatch(t, files, []string{"--build", "--watch", "--verbose"}, true, "")
			sys.writeFileNoError(dependencyProject+"child/other.ts", `export const value = "after";`)
			dependencyEvent(sys, watcher, fswatch.EventUpdate, dependencyProject+"child/other.ts")
			checkDependencySuccess(t, sys)
			checkDependencyOutput(t, sys, dependencyProject+"child/out/other.js", `"after"`)
			if composite {
				checkDependencyOutput(t, sys, dependencyProject+"child/out/index.d.ts", `"after"`)
				checkDependencyOutput(t, sys, dependencyProject+"client/out/index.d.ts", `"after"`)
				sys.clearOutput()
				sys.writeFileNoError(dependencyProject+"child/other.ts", `export const value = "after"; const implementation = 1;`)
				dependencyEvent(sys, watcher, fswatch.EventUpdate, dependencyProject+"child/other.ts")
				checkDependencySuccess(t, sys)
				assert.Assert(t, !strings.Contains(sys.getOutput(false), "Building project 'client/tsconfig.json'"), "%s", sys.getOutput(false))
			}
		})
	}
}

func TestBuildWatchDependencyReferenceEmitInvalidatesLogicalAlias(t *testing.T) {
	t.Parallel()
	files := FileMap{
		dependencyProject + "tsconfig.json": `{"files":[],"references":[{"path":"./client"}]}`,
		dependencyProject + "child/tsconfig.json": `{
			"compilerOptions":{"outDir":"out","composite":true},
			"files":["index.ts"]
		}`,
		dependencyProject + "child/index.ts": `export const value = "before";`,
		dependencyProject + "client/tsconfig.json": `{
			"compilerOptions":{"outDir":"out","composite":true,"preserveSymlinks":true},
			"files":["index.ts"],
			"references":[{"path":"../child"}]
		}`,
		dependencyProject + "client/index.ts":                       `import { value } from "widget"; export const propagated = value;`,
		dependencyProject + "client/node_modules/widget/index.d.ts": vfstest.Symlink(dependencyProject + "child/out/index.d.ts"),
	}
	sys, watcher := startDependencyWatch(t, files, []string{"--build", "--watch", "--verbose"}, true, "")
	checkDependencyOutput(t, sys, dependencyProject+"client/out/index.d.ts", `"before"`)

	sys.writeFileNoError(dependencyProject+"child/index.ts", `export const value = "after";`)
	sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: dependencyProject + "child/index.ts"}})
	watcher.DoCycle()

	checkDependencySuccess(t, sys)
	checkDependencyOutput(t, sys, dependencyProject+"child/out/index.d.ts", `"after"`)
	checkDependencyOutput(t, sys, dependencyProject+"client/out/index.d.ts", `"after"`)
}

func TestBuildWatchShallowDependencies(t *testing.T) {
	t.Parallel()
	files := FileMap{
		"/app/tsconfig.json": `{"compilerOptions":{"outDir":"out","rootDir":"/"},"files":["index.ts"]}`,
		"/app/index.ts":      `import { value } from "../shared/other.js"; export const result = value;`,
		"/shared/other.ts":   `export const value = "before";`,
	}
	sys := newTestSys(&tscInput{files: files, cwd: "/app"}, false)
	result := execute.CommandLine(t.Context(), sys, []string{"--build", "--watch", "--verbose"}, sys)
	assert.Equal(t, int(result.Status), 0, "%s", sys.getOutput(false))
	assert.Assert(t, result.Watcher != nil)
	assert.Assert(t, isWatched(sys, "/shared"))
	assert.Assert(t, !isWatched(sys, "/"))
	assert.Assert(t, !isWatched(sys, "/home"))
	sys.clearOutput()
	sys.removeNoError("/shared/other.ts")
	dependencyEvent(sys, result.Watcher, fswatch.EventDelete, "/shared/other.ts")
	assert.Assert(t, strings.Contains(sys.getOutput(false), "Cannot find module"))
	sys.clearOutput()
	sys.writeFileNoError("/shared/other.ts", `export const value = "restored";`)
	dependencyEvent(sys, result.Watcher, fswatch.EventUpdate, "/shared/other.ts")
	checkDependencySuccess(t, sys)
	checkDependencyOutput(t, sys, "/app/out/shared/other.js", `"restored"`)
}

func TestBuildWatchDependencyDirectoryRecreation(t *testing.T) {
	t.Parallel()
	files := dependencyFiles()
	files[dependencyProject+"index.ts"] = `import { value } from "../shared/other.js"; export const result = value;`
	sys, watcher := startDependencyWatch(t, files, []string{"--build", "--watch", "--verbose"}, true, "")
	sys.removeNoError(dependencyShared + "other.ts")
	sys.removeNoError(strings.TrimSuffix(dependencyShared, "/"))
	// Deleting a watched directory terminates its watch and causes an overflow recovery.
	sys.mockWatchBackend.SendOverflow()
	watcher.DoCycle()
	assert.Assert(t, strings.Contains(sys.getOutput(false), "Cannot find module"))
	sys.clearOutput()
	sys.writeFileNoError(dependencyShared+"other.ts", `export const value = "directory";`)
	dependencyEvent(sys, watcher, fswatch.EventUpdate, dependencyShared+"other.ts")
	checkDependencySuccess(t, sys)
	checkDependencyOutput(t, sys, dependencyProject+"out/shared/other.js", `"directory"`)
}

func TestBuildWatchDependencyDirectoryReplacement(t *testing.T) {
	t.Parallel()
	for _, incremental := range []bool{false, true} {
		for _, startup := range []string{"live", "restored", "restored-hint"} {
			t.Run(fmt.Sprintf("incremental=%v/%s", incremental, startup), func(t *testing.T) {
				t.Parallel()
				const pkg = dependencyProject + "node_modules/widget"
				const manifest = `{"name":"widget","types":"index.d.ts"}`
				const output = dependencyProject + "out/index.d.ts"
				files := FileMap{
					dependencyProject + "tsconfig.json": fmt.Sprintf(`{"compilerOptions":{"outDir":"out","declaration":true,"incremental":%v,"module":"nodenext","target":"es2022","types":[],"libReplacement":false},"include":["**/*.ts"]}`, incremental),
					dependencyProject + "index.ts":      `import { value } from "widget"; export const result = value;`,
					pkg + "/package.json":               manifest,
					pkg + "/index.d.ts":                 `export const value: 1;`,
				}
				sys, watcher := startDependencyWatch(t, files, []string{"--build", "--watch", "--verbose", "--pretty", "false"}, startup != "live", "")
				checkDependencyOutput(t, sys, output, "result: 1;")
				notify := func() {
					sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: pkg}})
					watcher.DoCycle()
				}
				if startup == "restored-hint" {
					notify()
					assert.Equal(t, sys.getOutput(false), "")
				}

				for _, value := range []int{2, 3} {
					sys.removeNoError(pkg + "/index.d.ts")
					sys.removeNoError(pkg + "/package.json")
					sys.removeNoError(pkg)
					sys.writeFileNoError(pkg+"/package.json", manifest)
					sys.writeFileNoError(pkg+"/index.d.ts", fmt.Sprintf(`export const value: %d;`, value))
					notify()
					checkDependencyOutput(t, sys, output, fmt.Sprintf("result: %d;", value))
					checkDependencySuccess(t, sys)

					sys.clearOutput()
					notify()
					assert.Equal(t, sys.getOutput(false), "")
				}
			})
		}
	}
}

func TestBuildWatchPhysicalInputPrecision(t *testing.T) {
	t.Parallel()
	for _, incremental := range []bool{false, true} {
		for _, preserve := range []bool{false, true} {
			for _, prebuild := range []bool{false, true} {
				for _, ignoreCase := range []bool{false, true} {
					t.Run(fmt.Sprintf("incremental=%v/preserve=%v/prebuild=%v/ignoreCase=%v", incremental, preserve, prebuild, ignoreCase), func(t *testing.T) {
						t.Parallel()
						const physical = "/home/src/dependencies/shared/types.d.ts"
						const logical = dependencyProject + "node_modules/widget/index.d.ts"
						files := FileMap{
							dependencyProject + "tsconfig.json": fmt.Sprintf(`{"compilerOptions":{"outDir":"out","declaration":true,"incremental":%v,"preserveSymlinks":%v,"types":[],"module":"esnext","moduleResolution":"bundler"},"files":["index.ts"]}`, incremental, preserve),
							dependencyProject + "index.ts":      `import { value } from "widget"; export const result = value;`,
							logical:                             vfstest.Symlink(physical),
							physical:                            `export const value: "before";`,
						}
						sys := newTestSys(&tscInput{files: files, ignoreCase: ignoreCase}, false)
						if prebuild {
							result := execute.CommandLine(t.Context(), sys, []string{"--build"}, sys)
							assert.Equal(t, int(result.Status), 0, "%s", sys.getOutput(false))
							sys.clearOutput()
						}
						observer := &dependencyObserver{TestSys: sys}
						result := execute.CommandLine(t.Context(), sys, []string{"--build", "--watch", "--verbose", "--extendedDiagnostics", "--pretty", "false"}, observer)
						assert.Equal(t, int(result.Status), 0, "%s", sys.getOutput(false))
						assert.Assert(t, result.Watcher != nil)
						checkDependencySuccess(t, sys)
						if prebuild {
							assert.Assert(t, strings.Contains(sys.getOutput(false), "is up to date"))
							assert.Assert(t, !strings.Contains(sys.getOutput(false), "Building project"))
						}
						output := tspath.RootedPath(dependencyProject + "out/index.d.ts")
						checkDependencyOutput(t, sys, output.AsString(), `"before"`)
						eventPath := physical
						if ignoreCase {
							eventPath = strings.ToUpper(physical)
						}
						event := fswatch.Event{Kind: fswatch.EventUpdate, Path: eventPath}
						logicalEventPath := logical
						if ignoreCase {
							logicalEventPath = strings.ToUpper(logical)
						}
						logicalEvent := fswatch.Event{Kind: fswatch.EventUpdate, Path: logicalEventPath}
						sys.clearOutput()
						observer.programs = 0
						sys.mockWatchBackend.SendEvents([]fswatch.Event{event})
						result.Watcher.DoCycle()
						assert.Equal(t, observer.programs, 0, "unchanged physical input hints must not construct a program:\n%s", sys.getOutput(false))
						for _, edit := range []struct {
							declaration string
							path        string
						}{
							{`"after"`, eventPath},
							{"number", eventPath},
							{"string", tspath.RootedFilePathFromNormalized(logicalEventPath).Directory().AsString()},
						} {
							changedEvent := fswatch.Event{Kind: fswatch.EventUpdate, Path: edit.path}
							sys.clearOutput()
							sys.writeFileNoError(physical, "export const value: "+edit.declaration+";")
							sys.mockWatchBackend.SendEvents([]fswatch.Event{changedEvent})
							result.Watcher.DoCycle()
							checkDependencySuccess(t, sys)
							assert.Assert(t, strings.Contains(sys.getOutput(false), "Building project"))
							checkDependencyOutput(t, sys, output.AsString(), "result: "+edit.declaration+";")
							before := sys.readFileNoError(output.AsString())
							stamp := sys.fsFromFileMap().Stat(output).ModTime()
							for range 2 {
								sys.clearOutput()
								sys.mockWatchBackend.SendEvents([]fswatch.Event{changedEvent})
								result.Watcher.DoCycle()
								trace := sys.getOutput(false)
								assert.Assert(t, !strings.Contains(trace, "Building project"), "consumed physical event must not rebuild:\n%s", trace)
								assert.Assert(t, !strings.Contains(trace, "Check time:") && !strings.Contains(trace, "Emit time:"), "consumed event must not check or emit:\n%s", trace)
								assert.Equal(t, sys.readFileNoError(output.AsString()), before)
								assert.Assert(t, sys.fsFromFileMap().Stat(output).ModTime().Equal(stamp), "consumed event must not rewrite output timestamps")
							}
							for _, events := range [][]fswatch.Event{{logicalEvent}, {event, logicalEvent}} {
								for range 2 {
									sys.clearOutput()
									sys.mockWatchBackend.SendEvents(events)
									result.Watcher.DoCycle()
									trace := sys.getOutput(false)
									assert.Assert(t, !strings.Contains(trace, "Building project"), "consumed aliases must not rebuild:\n%s", trace)
									assert.Assert(t, !strings.Contains(trace, "Check time:") && !strings.Contains(trace, "Emit time:"), "consumed aliases must not check or emit:\n%s", trace)
									assert.Equal(t, sys.readFileNoError(output.AsString()), before)
									assert.Assert(t, sys.fsFromFileMap().Stat(output).ModTime().Equal(stamp), "consumed aliases must not rewrite output timestamps")
								}
							}
						}
						sys.clearOutput()
						sys.removeNoError(logical)
						sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventDelete, Path: logical}})
						result.Watcher.DoCycle()
						assert.Assert(t, strings.Contains(sys.getOutput(false), "error TS2307"), "%s", sys.getOutput(false))
						sys.clearOutput()
						sys.writeFileNoError(physical, `export const value: "restored";`)
						sys.mapFs().AddSymlink(strings.TrimPrefix(logical, "/"), strings.TrimPrefix(physical, "/"))
						sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: logical}})
						result.Watcher.DoCycle()
						checkDependencySuccess(t, sys)
						checkDependencyOutput(t, sys, output.AsString(), `"restored"`)
						sys.clearOutput()
						const source = dependencyProject + "node_modules/widget/index.ts"
						sys.writeFileNoError(source, `export const value = 99 as const;`)
						sys.mockWatchBackend.SendEvents([]fswatch.Event{event, {Kind: fswatch.EventUpdate, Path: source}})
						result.Watcher.DoCycle()
						checkDependencySuccess(t, sys)
						checkDependencyOutput(t, sys, output.AsString(), "result: 99;")
					})
				}
			}
		}
	}
}

func TestBuildWatchInputAliasIdentity(t *testing.T) {
	t.Parallel()
	for _, incremental := range []bool{false, true} {
		for _, preserve := range []bool{false, true} {
			for _, prebuild := range []bool{false, true} {
				for _, loadedTarget := range []bool{false, true} {
					t.Run(fmt.Sprintf("incremental=%v/preserve=%v/prebuild=%v/loadedTarget=%v", incremental, preserve, prebuild, loadedTarget), func(t *testing.T) {
						t.Parallel()
						const first = "/home/src/dependencies/first/types.d.ts"
						const second = "/home/src/dependencies/second/types.d.ts"
						const logical = dependencyProject + "node_modules/widget/index.d.ts"
						root := `import { value } from "widget"; export const result = value;`
						if loadedTarget {
							root += `import { value as other } from "../../dependencies/second/types.js"; export const alreadyLoaded = other;`
						}
						files := FileMap{
							dependencyProject + "tsconfig.json": fmt.Sprintf(`{"compilerOptions":{"outDir":"out","declaration":true,"incremental":%v,"preserveSymlinks":%v,"types":[],"module":"esnext","moduleResolution":"bundler"},"files":["index.ts"]}`, incremental, preserve),
							dependencyProject + "index.ts":      root,
							logical:                             vfstest.Symlink(first),
							first:                               `export const value: 1;`,
							second:                              `export const value: 2;`,
						}
						sys, watcher := startDependencyWatch(t, files, []string{"--build", "--watch", "--verbose", "--pretty", "false"}, prebuild, "")
						checkDependencyOutput(t, sys, dependencyProject+"out/index.d.ts", "result: 1;")
						sys.writeFileNoError(first, `export const value: 3;`)
						dependencyEvent(sys, watcher, fswatch.EventUpdate, first)
						checkDependencySuccess(t, sys)
						checkDependencyOutput(t, sys, dependencyProject+"out/index.d.ts", "result: 3;")
						output := tspath.RootedPath(dependencyProject + "out/index.d.ts")
						assert.Assert(t, sys.fsFromFileMap().Stat(tspath.RootedPath(second)).ModTime().Before(sys.fsFromFileMap().Stat(output).ModTime()), "retarget must not be rescued by a newer target timestamp")
						sys.clearOutput()
						sys.mapFs().AddSymlink(strings.TrimPrefix(logical, "/"), strings.TrimPrefix(second, "/"))
						assert.Equal(t, sys.readFileNoError(logical), `export const value: 2;`)
						assert.Equal(t, sys.readFileNoError(first), `export const value: 3;`)
						dependencyEvent(sys, watcher, fswatch.EventUpdate, logical)
						checkDependencySuccess(t, sys)
						assert.Assert(t, strings.Contains(sys.getOutput(false), "Building project"))
						checkDependencyOutput(t, sys, output.AsString(), "result: 2;")
						before := sys.readFileNoError(output.AsString())
						stamp := sys.fsFromFileMap().Stat(output).ModTime()
						for range 2 {
							sys.clearOutput()
							sys.mockWatchBackend.SendEvents([]fswatch.Event{
								{Kind: fswatch.EventUpdate, Path: logical},
								{Kind: fswatch.EventUpdate, Path: second},
							})
							watcher.DoCycle()
							assert.Assert(t, !strings.Contains(sys.getOutput(false), "Building project"), "%s", sys.getOutput(false))
							assert.Equal(t, sys.readFileNoError(output.AsString()), before)
							assert.Assert(t, sys.fsFromFileMap().Stat(output).ModTime().Equal(stamp))
						}
						sys.clearOutput()
						sys.writeFileNoError(second, `export const value: 4;`)
						dependencyEvent(sys, watcher, fswatch.EventUpdate, logical)
						checkDependencySuccess(t, sys)
						checkDependencyOutput(t, sys, output.AsString(), "result: 4;")
						sys.clearOutput()
						sys.removeNoError(logical)
						assert.Equal(t, sys.readFileNoError(second), `export const value: 4;`)
						dependencyEvent(sys, watcher, fswatch.EventDelete, logical)
						assert.Assert(t, strings.Contains(sys.getOutput(false), "error TS2307"), "%s", sys.getOutput(false))
						sys.clearOutput()
						sys.mapFs().AddSymlink(strings.TrimPrefix(logical, "/"), strings.TrimPrefix(first, "/"))
						dependencyEvent(sys, watcher, fswatch.EventUpdate, logical)
						checkDependencySuccess(t, sys)
						checkDependencyOutput(t, sys, output.AsString(), "result: 3;")
					})
				}
			}
		}
	}
}

func TestBuildWatchCoalescedPhysicalPackageLookup(t *testing.T) {
	t.Parallel()
	for _, incremental := range []bool{false, true} {
		for _, preserve := range []bool{false, true} {
			t.Run(fmt.Sprintf("incremental=%v/preserve=%v", incremental, preserve), func(t *testing.T) {
				t.Parallel()
				const physical = "/home/src/dependencies/shared/types.d.ts"
				const manifest = dependencyProject + "node_modules/widget/package.json"
				files := FileMap{
					dependencyProject + "tsconfig.json":                  fmt.Sprintf(`{"compilerOptions":{"outDir":"out","declaration":true,"incremental":%v,"preserveSymlinks":%v,"types":[]},"files":["index.ts"]}`, incremental, preserve),
					dependencyProject + "index.ts":                       `import { value } from "widget"; export const result = value;`,
					manifest:                                             `{"types":"first.d.ts"}`,
					dependencyProject + "node_modules/widget/first.d.ts": vfstest.Symlink(physical),
					physical: `export const value: 1;`,
					dependencyProject + "node_modules/widget/next.d.ts": `export const value: 2;`,
				}
				sys, watcher := startDependencyWatch(t, files, []string{"--build", "--watch", "--verbose"}, true, "")
				checkDependencyOutput(t, sys, dependencyProject+"out/index.d.ts", "result: 1;")
				sys.writeFileNoError(manifest, `{"types":"next.d.ts"}`)
				sys.mockWatchBackend.SendEvents([]fswatch.Event{
					{Kind: fswatch.EventUpdate, Path: physical},
					{Kind: fswatch.EventUpdate, Path: manifest},
				})
				watcher.DoCycle()
				checkDependencySuccess(t, sys)
				checkDependencyOutput(t, sys, dependencyProject+"out/index.d.ts", "result: 2;")
			})
		}
	}
}

func configurationAliasFiles(incremental, preserve, extended bool) (FileMap, string, string) {
	const first = "/home/src/dependencies/first/types.d.ts"
	const second = "/home/src/dependencies/second/types.d.ts"
	text := fmt.Sprintf(`{"compilerOptions":{"outDir":"out","declaration":true,"incremental":%v,"preserveSymlinks":%v,"types":[],"module":"esnext","moduleResolution":"bundler"},"files":["index.ts"]}`, incremental, preserve)
	config := dependencyProject + "tsconfig.json"
	files := FileMap{
		config: text,
		dependencyProject + "index.ts": `import { value } from "widget";
import { value as first } from "../../dependencies/first/types.js";
import { value as second } from "../../dependencies/second/types.js";
export const result = value; export const other = first; export const extra = second;`,
		dependencyProject + "node_modules/widget/index.d.ts": vfstest.Symlink(first),
		first:  `export const value: 1;`,
		second: `export const value: 2;`,
	}
	if extended {
		files[config] = `{"extends":"./settings/base.json","compilerOptions":{"outDir":"out"},"files":["index.ts"]}`
		config = dependencyProject + "settings/base.json"
		files[config] = text
	}
	return files, config, text
}

func TestBuildWatchConfigurationAliasChanges(t *testing.T) {
	t.Parallel()
	for _, incremental := range []bool{false, true} {
		for _, preserve := range []bool{false, true} {
			for _, extended := range []bool{false, true} {
				for _, mode := range []string{"alias-only", "duplicate-config", "rewritten-config"} {
					t.Run(fmt.Sprintf("incremental=%v/preserve=%v/extended=%v/%s", incremental, preserve, extended, mode), func(t *testing.T) {
						t.Parallel()
						files, config, text := configurationAliasFiles(incremental, preserve, extended)
						sys, watcher := startDependencyWatch(t, files, []string{"--build", "--watch", "--verbose", "--pretty", "false"}, true, "")
						cycle := func(events ...fswatch.Event) {
							sys.clearOutput()
							if mode != "alias-only" {
								if mode == "rewritten-config" {
									sys.writeFileNoError(config, text)
								}
								events = append(events, fswatch.Event{Kind: fswatch.EventUpdate, Path: config})
							}
							sys.mockWatchBackend.SendEvents(events)
							watcher.DoCycle()
						}
						const output = dependencyProject + "out/index.d.ts"
						checkDependencyOutput(t, sys, output, "result: 1;")
						if mode != "alias-only" {
							before := sys.readFileNoError(output)
							cycle()
							checkDependencySuccess(t, sys)
							assert.Equal(t, sys.readFileNoError(output), before)
							if mode == "duplicate-config" {
								assert.Assert(t, !strings.Contains(sys.getOutput(false), "Building project"), "%s", sys.getOutput(false))
							}
						}
						const logical = dependencyProject + "node_modules/widget/index.d.ts"
						sys.mapFs().AddSymlink(strings.TrimPrefix(logical, "/"), "home/src/dependencies/second/types.d.ts")
						cycle(fswatch.Event{Kind: fswatch.EventUpdate, Path: logical})
						checkDependencySuccess(t, sys)
						checkDependencyOutput(t, sys, output, "result: 2;")
						assert.Equal(t, sys.readFileNoError("/home/src/dependencies/first/types.d.ts"), `export const value: 1;`)
						sys.removeNoError(logical)
						cycle(fswatch.Event{Kind: fswatch.EventDelete, Path: logical})
						assert.Assert(t, strings.Contains(sys.getOutput(false), "error TS2307"), "%s", sys.getOutput(false))
						assert.Equal(t, sys.readFileNoError("/home/src/dependencies/second/types.d.ts"), `export const value: 2;`)
						sys.mapFs().AddSymlink(strings.TrimPrefix(logical, "/"), "home/src/dependencies/first/types.d.ts")
						cycle(fswatch.Event{Kind: fswatch.EventUpdate, Path: logical})
						checkDependencySuccess(t, sys)
						checkDependencyOutput(t, sys, output, "result: 1;")
						stamp := sys.fsFromFileMap().Stat(output).ModTime()
						for range 2 {
							sys.clearOutput()
							sys.mockWatchBackend.SendEvents([]fswatch.Event{
								{Kind: fswatch.EventUpdate, Path: logical},
								{Kind: fswatch.EventUpdate, Path: config},
							})
							watcher.DoCycle()
							assert.Assert(t, !strings.Contains(sys.getOutput(false), "Building project"), "consumed invalidation must not survive recovery:\n%s", sys.getOutput(false))
							assert.Assert(t, sys.fsFromFileMap().Stat(output).ModTime().Equal(stamp))
						}
					})
				}
			}
		}
	}
}

func TestBuildWatchConfigurationAliasRecovery(t *testing.T) {
	t.Parallel()
	for _, incremental := range []bool{false, true} {
		for _, extended := range []bool{false, true} {
			for _, invalid := range []string{"missing", "malformed"} {
				for _, coalesced := range []bool{false, true} {
					t.Run(fmt.Sprintf("incremental=%v/extended=%v/%s/coalesced=%v", incremental, extended, invalid, coalesced), func(t *testing.T) {
						t.Parallel()
						files, config, text := configurationAliasFiles(incremental, false, extended)
						sys, watcher := startDependencyWatch(t, files, []string{"--build", "--watch", "--verbose", "--pretty", "false"}, true, "")
						const logical = dependencyProject + "node_modules/widget/index.d.ts"
						if invalid == "missing" {
							sys.removeNoError(config)
						} else {
							sys.writeFileNoError(config, `{"compilerOptions":`)
						}
						events := []fswatch.Event{{Kind: fswatch.EventUpdate, Path: config}}
						if coalesced {
							sys.removeNoError(logical)
							events = append(events, fswatch.Event{Kind: fswatch.EventDelete, Path: logical})
						}
						sys.mockWatchBackend.SendEvents(events)
						watcher.DoCycle()
						assert.Assert(t, strings.Contains(sys.getOutput(false), "error TS"), "invalid configuration must be reported:\n%s", sys.getOutput(false))
						if !coalesced {
							sys.clearOutput()
							sys.removeNoError(logical)
							sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventDelete, Path: logical}})
							watcher.DoCycle()
						}
						sys.clearOutput()
						sys.writeFileNoError(config, text)
						sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: config}})
						watcher.DoCycle()
						assert.Assert(t, strings.Contains(sys.getOutput(false), "error TS2307"), "configuration recovery must retain the missing-alias invalidation:\n%s", sys.getOutput(false))
						sys.clearOutput()
						sys.mapFs().AddSymlink(strings.TrimPrefix(logical, "/"), "home/src/dependencies/second/types.d.ts")
						dependencyEvent(sys, watcher, fswatch.EventUpdate, logical)
						checkDependencySuccess(t, sys)
						checkDependencyOutput(t, sys, dependencyProject+"out/index.d.ts", "result: 2;")
					})
				}
			}
		}
	}
}

func TestBuildWatchLegacyDependencyInventory(t *testing.T) {
	t.Parallel()
	for _, kind := range []string{"delete", "change", "unchanged", "empty"} {
		t.Run(kind, func(t *testing.T) {
			t.Parallel()
			files := dependencyFiles()
			files[dependencyProject+"tsconfig.json"] = `{"compilerOptions":{"outDir":"out","module":"nodenext","target":"es2022"},"files":["index.ts"]}`
			if kind == "empty" {
				files[dependencyProject+"index.ts"] = `export const result = "root";`
			}
			sys := newTestSys(&tscInput{files: files, cwd: strings.TrimSuffix(dependencyProject, "/")}, false)
			result := execute.CommandLine(t.Context(), sys, []string{"--build"}, sys)
			assert.Equal(t, int(result.Status), 0, "%s", sys.getOutput(false))
			info := dependencyProject + "out/tsconfig.tsbuildinfo"
			sys.writeFileNoError(info, `{"version":"FakeTSVersion","root":["../index.ts"],"packageJsons":["../package.json"]}`)
			if kind == "delete" {
				sys.removeNoError(dependencyProject + "other.ts")
			}
			if kind == "change" {
				sys.writeFileNoError(dependencyProject+"other.ts", `export const value = "changed";`)
			}
			sys.clearOutput()
			result = execute.CommandLine(t.Context(), sys, []string{"--build", "--watch", "--verbose"}, sys)
			assert.Assert(t, result.Watcher != nil)
			assert.Assert(t, strings.Contains(sys.getOutput(false), "Building project"), "legacy metadata must be refreshed:\n%s", sys.getOutput(false))
			if kind == "delete" {
				assert.Assert(t, int(result.Status) != 0)
				assert.Assert(t, strings.Contains(sys.getOutput(false), "Cannot find module"))
			} else {
				assert.Equal(t, int(result.Status), 0, "%s", sys.getOutput(false))
				checkDependencySuccess(t, sys)
				if kind == "change" {
					checkDependencyOutput(t, sys, dependencyProject+"out/other.js", `"changed"`)
				}
			}

			var metadata map[string]json.Value
			assert.NilError(t, json.Unmarshal([]byte(sys.readFileNoError(info)), &metadata))
			_, known := metadata["nonIncrementalFileNames"]
			assert.Assert(t, known, "refresh must persist the inventory even when empty")
			if kind != "empty" {
				sys.clearOutput()
				sys.writeFileNoError(dependencyProject+"other.ts", `export const value = "recovered";`)
				dependencyEvent(sys, result.Watcher, fswatch.EventUpdate, dependencyProject+"other.ts")
				checkDependencySuccess(t, sys)
				checkDependencyOutput(t, sys, dependencyProject+"out/other.js", `"recovered"`)
			}
			for range 2 {
				sys.clearOutput()
				result = execute.CommandLine(t.Context(), sys, []string{"--build", "--watch", "--verbose"}, sys)
				assert.Equal(t, int(result.Status), 0, "%s", sys.getOutput(false))
				assert.Assert(t, strings.Contains(sys.getOutput(false), "is up to date"))
				assert.Assert(t, !strings.Contains(sys.getOutput(false), "Building project"), "known inventory must not refresh repeatedly:\n%s", sys.getOutput(false))
			}
		})
	}
}

func TestBuildDependencyReferenceTimestamps(t *testing.T) {
	t.Parallel()
	for _, watch := range []bool{false, true} {
		t.Run(fmt.Sprintf("watch=%v", watch), func(t *testing.T) {
			t.Parallel()
			files := dependencyFiles()
			files[dependencyProject+"tsconfig.json"] = `{"files":[],"references":[{"path":"./client"}]}`
			files[dependencyProject+"child/tsconfig.json"] = `{"compilerOptions":{"outDir":"out","composite":true},"files":["index.ts"]}`
			files[dependencyProject+"child/index.ts"] = `export const value: string = "before";`
			files[dependencyProject+"client/tsconfig.json"] = `{"compilerOptions":{"outDir":"out","declaration":true},"files":["index.ts"],"references":[{"path":"../child"}]}`
			files[dependencyProject+"client/index.ts"] = `import { value } from "../child/index.js"; export const result = value;`
			sys := newTestSys(&tscInput{files: files, cwd: strings.TrimSuffix(dependencyProject, "/")}, false)
			result := execute.CommandLine(t.Context(), sys, []string{"--build"}, sys)
			assert.Equal(t, int(result.Status), 0, "%s", sys.getOutput(false))
			sys.writeFileNoError(dependencyProject+"child/index.ts", `export const value: string = "after";`)
			sys.clearOutput()
			result = execute.CommandLine(t.Context(), sys, []string{"--build", "child"}, sys)
			assert.Equal(t, int(result.Status), 0, "%s", sys.getOutput(false))
			sys.clearOutput()
			args := []string{"--build", "--verbose"}
			if watch {
				args = append(args, "--watch")
			}
			result = execute.CommandLine(t.Context(), sys, args, sys)
			assert.Equal(t, int(result.Status), 0, "%s", sys.getOutput(false))
			assert.Assert(t, !strings.Contains(sys.getOutput(false), "Building project 'client/tsconfig.json'"), "unchanged referenced declarations must not recompile the consumer:\n%s", sys.getOutput(false))
			checkDependencyOutput(t, sys, dependencyProject+"client/out/index.d.ts", "result: string")
			if watch {
				sys.clearOutput()
				sys.writeFileNoError(dependencyProject+"child/index.ts", `export const value: number = 42;`)
				dependencyEvent(sys, result.Watcher, fswatch.EventUpdate, dependencyProject+"child/index.ts")
				checkDependencySuccess(t, sys)
				checkDependencyOutput(t, sys, dependencyProject+"client/out/index.d.ts", "result: number")
				sys.clearOutput()
				dependencyEvent(sys, result.Watcher, fswatch.EventUpdate, dependencyProject+"child/out/index.d.ts")
				assert.Assert(t, !strings.Contains(sys.getOutput(false), "Building project"), "a delayed event for a consumed declaration must not rebuild:\n%s", sys.getOutput(false))
			}
		})
	}
}

func TestBuildWatchReplacementLibraryOrder(t *testing.T) {
	t.Parallel()
	for _, incremental := range []bool{false, true} {
		t.Run(fmt.Sprintf("incremental=%v", incremental), func(t *testing.T) {
			t.Parallel()
			names := []string{"es2015", "es2016", "es2017", "es2018", "es2019", "es2020", "es2021", "es2022", "es2023", "es2024", "es2025", "esnext", "dom", "scripthost"}
			files := FileMap{
				dependencyProject + "tsconfig.json": fmt.Sprintf(`{"compilerOptions":{"outDir":"out","lib":["es5","%s"],"libReplacement":true,"incremental":%v},"files":["index.ts"]}`, strings.Join(names, `","`), incremental),
				dependencyProject + "index.ts":      `declare const lib: Library; export const result: "scripthost" = lib.which();`,
			}
			for _, name := range names {
				files[dependencyProject+"node_modules/@typescript/lib-"+name+"/index.d.ts"] = fmt.Sprintf(`interface Library { which(): "%s"; }`, name)
			}
			sys, watcher := startDependencyWatch(t, files, []string{"--build", "--watch", "--verbose"}, true, "")
			path := dependencyProject + "node_modules/@typescript/lib-scripthost/index.d.ts"
			sys.writeFileNoError(path, `interface Library { which(): "changed"; }`)
			dependencyEvent(sys, watcher, fswatch.EventUpdate, path)
			assert.Assert(t, strings.Contains(sys.getOutput(false), `Type '"changed"' is not assignable to type '"scripthost"'`), "%s", sys.getOutput(false))
			sys.clearOutput()
			sys.writeFileNoError(path, `interface Library { which(): "scripthost"; }`)
			dependencyEvent(sys, watcher, fswatch.EventUpdate, path)
			checkDependencySuccess(t, sys)
		})
	}
}

func TestBuildWatchCoalescedDependencyLookups(t *testing.T) {
	t.Parallel()
	files := dependencyFiles()
	delete(files, dependencyProject+"other.ts")
	files[dependencyProject+"other.d.ts"] = `export const value: "declaration";`
	files[dependencyProject+"tsconfig.json"] = `{"compilerOptions":{"outDir":"out","declaration":true},"files":["index.ts"]}`
	sys, watcher := startDependencyWatch(t, files, []string{"--build", "--watch", "--verbose"}, true, "")
	sys.writeFileNoError(dependencyProject+"other.ts", `export const value = "source";`)
	sys.mockWatchBackend.SendChangedPaths([]fsbaselineutil.FileChange{
		{Path: dependencyProject + "other.d.ts"},
		{Path: dependencyProject + "other.ts"},
	})
	watcher.DoCycle()
	checkDependencySuccess(t, sys)
	checkDependencyOutput(t, sys, dependencyProject+"out/other.js", `"source"`)
}

func TestBuildWatchSolutionDependencyPrecision(t *testing.T) {
	t.Parallel()
	files := dependencyFiles()
	files[dependencyProject+"tsconfig.json"] = `{"files":[],"references":[{"path":"./child"},{"path":"./sibling"}]}`
	files[dependencyProject+"child/tsconfig.json"] = `{"compilerOptions":{"outDir":"out","declaration":true},"files":["index.ts"]}`
	files[dependencyProject+"child/index.ts"] = `import { value } from "./other"; export const result = value;`
	files[dependencyProject+"child/other.d.ts"] = `export const value: 1;`
	files[dependencyProject+"sibling/tsconfig.json"] = `{"compilerOptions":{"outDir":"out"},"files":["index.ts"]}`
	files[dependencyProject+"sibling/index.ts"] = `export const value = 1;`
	sys, watcher := startDependencyWatch(t, files, []string{"--build", "--watch", "--verbose"}, true, "")
	for _, path := range []string{dependencyProject + "unused", dependencyProject + "out"} {
		sys.writeFileNoError(path+"/note.txt", "unrelated")
		dependencyEvent(sys, watcher, fswatch.EventUpdate, path)
		assert.Equal(t, sys.getOutput(false), "", "an unrelated directory must not invalidate a solution: %s", path)
	}

	sys.writeFileNoError(dependencyProject+"child/other.d.ts", `export const value: 2;`)
	sys.writeFileNoError(dependencyProject+"sibling/index.ts", `export const value = 2;`)
	sys.mockWatchBackend.SendEvents([]fswatch.Event{
		{Kind: fswatch.EventUpdate, Path: dependencyProject + "child"},
		{Kind: fswatch.EventUpdate, Path: dependencyProject + "sibling/index.ts"},
	})
	watcher.DoCycle()
	checkDependencyOutput(t, sys, dependencyProject+"child/out/index.d.ts", "result: 2;")
	checkDependencyOutput(t, sys, dependencyProject+"sibling/out/index.js", "value = 2;")
	checkDependencySuccess(t, sys)
}

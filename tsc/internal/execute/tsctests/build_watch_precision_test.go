package tsctests

import (
	"fmt"
	"regexp"
	"slices"
	"strings"
	"sync"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/execute"
	"github.com/microsoft/TypeScript/tsc/internal/execute/build"
	"github.com/microsoft/TypeScript/tsc/internal/execute/incremental"
	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

type dependencyWrites struct {
	vfs.FS
	mu           sync.Mutex
	writes       map[string]int
	restoreFile  tspath.RootedFilePath
	restore      func()
	restoreAfter int
	afterWrite   func(tspath.RootedFilePath)
}

type dependencyReads struct {
	vfs.FS
	mu    sync.Mutex
	reads map[tspath.RootedFilePath]int
}

func (f *dependencyReads) ReadFile(path tspath.RootedFilePath) (string, bool) {
	f.mu.Lock()
	f.reads[path]++
	f.mu.Unlock()
	return f.FS.ReadFile(path)
}

func (f *dependencyWrites) FileExists(path tspath.RootedFilePath) bool {
	exists := f.FS.FileExists(path)
	f.mu.Lock()
	var restore func()
	if !exists && path == f.restoreFile {
		f.restoreAfter--
		if f.restoreAfter == 0 {
			restore, f.restore = f.restore, nil
		}
	}
	f.mu.Unlock()
	if restore != nil {
		restore()
	}
	return exists
}

func (f *dependencyWrites) WriteFile(path tspath.RootedFilePath, text string) error {
	f.mu.Lock()
	f.writes[path.AsString()]++
	f.mu.Unlock()
	err := f.FS.WriteFile(path, text)
	if err == nil && f.afterWrite != nil {
		f.afterWrite(path)
	}
	return err
}

func TestBuildWatchDetectsOfflineAliasRetarget(t *testing.T) {
	t.Parallel()
	for _, incremental := range []bool{false, true} {
		for _, preserve := range []bool{false, true} {
			t.Run(fmt.Sprintf("incremental=%v/preserve=%v", incremental, preserve), func(t *testing.T) {
				t.Parallel()
				files, _, _ := configurationAliasFiles(incremental, preserve, false)
				const logical = dependencyProject + "node_modules/widget/index.d.ts"
				const second = "/home/src/dependencies/second/types.d.ts"
				const output = dependencyProject + "out/index.d.ts"
				sys := newTestSys(&tscInput{files: files}, false)
				result := execute.CommandLine(t.Context(), sys, []string{"--build", "--pretty", "false"}, sys)
				assert.Equal(t, int(result.Status), 0)
				checkDependencyOutput(t, sys, output, "result: 1;")

				sys.mapFs().AddSymlink(strings.TrimPrefix(logical, "/"), strings.TrimPrefix(second, "/"))
				files[logical] = vfstest.Symlink(second)
				sys.clearOutput()
				observer := &dependencyObserver{TestSys: sys}
				result = execute.CommandLine(t.Context(), sys, []string{"--build", "--watch", "--verbose", "--pretty", "false"}, observer)
				assert.Equal(t, int(result.Status), 0)
				assert.Equal(t, observer.programs, 1)
				checkDependencyOutput(t, sys, output, "result: 2;")
			})
		}
	}
}

func TestBuildWatchIncrementalStartupUsesBuildInfo(t *testing.T) {
	t.Parallel()
	files, _, _ := configurationAliasFiles(true, false, false)
	const logical = dependencyProject + "node_modules/widget/index.d.ts"
	const first = "/home/src/dependencies/first/types.d.ts"
	const second = "/home/src/dependencies/second/types.d.ts"
	root := tspath.RootedFilePath(dependencyProject + "index.ts")
	sys := newTestSys(&tscInput{files: files}, false)
	result := execute.CommandLine(t.Context(), sys, []string{"--build", "--pretty", "false"}, sys)
	assert.Equal(t, int(result.Status), 0)
	var buildInfo incremental.BuildInfo
	assert.NilError(t, json.Unmarshal([]byte(sys.readFileNoError(dependencyProject+"out/tsconfig.tsbuildinfo")), &buildInfo))
	watchDirectories := slices.Collect(buildInfo.GetWatchDirectories(tspath.RootedDirectoryPath(dependencyProject + "out")))
	assert.Assert(t, !slices.Contains(watchDirectories, tspath.RootedDirectoryPath("/home/src/dependencies/first")))
	assert.Assert(t, !slices.Contains(watchDirectories, tspath.RootedDirectoryPath("/home/src/dependencies/second")))

	reads := &dependencyReads{FS: sys.fs.FS, reads: make(map[tspath.RootedFilePath]int)}
	sys.fs.FS = reads
	sys.clearOutput()
	observer := &dependencyObserver{TestSys: sys}
	result = execute.CommandLine(t.Context(), sys, []string{"--build", "--watch", "--verbose", "--pretty", "false"}, observer)
	assert.Equal(t, int(result.Status), 0)
	assert.Equal(t, observer.programs, 0)
	for _, path := range []tspath.RootedFilePath{root, logical, first, second} {
		assert.Equal(t, reads.reads[path], 0, "unexpected source read for %s", path)
	}
}

func TestBuildWatchEmptyInventoryStartup(t *testing.T) {
	t.Parallel()
	for _, mode := range []string{"plain", "incremental", "composite"} {
		t.Run(mode, func(t *testing.T) {
			t.Parallel()
			files := FileMap{
				dependencyProject + "tsconfig.json": fmt.Sprintf(`{"compilerOptions":{"outDir":"out","module":"commonjs","types":[],"libReplacement":false,"incremental":%v,"composite":%v},"files":["index.ts"]}`, mode != "plain", mode == "composite"),
				dependencyProject + "index.ts":      `export const result = 1;`,
			}
			sys := newTestSys(&tscInput{files: files}, false)
			result := execute.CommandLine(t.Context(), sys, []string{"--build"}, sys)
			assert.Equal(t, int(result.Status), 0)
			var info incremental.BuildInfo
			assert.NilError(t, json.Unmarshal([]byte(sys.readFileNoError(dependencyProject+"out/tsconfig.tsbuildinfo")), &info))
			assert.Assert(t, info.WatchDirectories != nil && len(info.WatchDirectories) == 0)
			reads := &dependencyReads{FS: sys.fs.FS, reads: make(map[tspath.RootedFilePath]int)}
			sys.fs.FS = reads
			sys.clearOutput()
			observer := &dependencyObserver{TestSys: sys}
			result = execute.CommandLine(t.Context(), sys, []string{"--build", "--watch", "--verbose"}, observer)
			assert.Equal(t, int(result.Status), 0)
			assert.Assert(t, strings.Contains(sys.getOutput(false), "is up to date"))
			assert.Equal(t, observer.programs, 0)
			assert.Equal(t, reads.reads[dependencyProject+"index.ts"], 0, "current empty inventories must not parse sources on restart")
		})
	}
}

func TestBuildWatchDependencyResolutionHints(t *testing.T) {
	t.Parallel()
	for _, incrementalOption := range []bool{false, true} {
		for _, prebuild := range []bool{false, true} {
			for _, hint := range []string{"none", "input", "alias", "config", "local", "descendant"} {
				t.Run(fmt.Sprintf("incremental=%v/prebuild=%v/%s", incrementalOption, prebuild, hint), func(t *testing.T) {
					t.Parallel()
					files := FileMap{
						dependencyProject + "tsconfig.json": fmt.Sprintf(`{
							"compilerOptions":{"outDir":"out","rootDir":"..","declaration":true,"incremental":%v,"types":[],"libReplacement":false,"module":"commonjs",
								"paths":{"pkg":["./watch/generated/deep/index.d.ts","../fallback/index.d.ts"]}},
							"files":["index.ts"],"include":["watch/**/entry.ts"]}`, incrementalOption),
						dependencyProject + "index.ts": `import { value } from "./other"; import { fallback } from "pkg"; import { fixed } from "widget";
							export const result = value; export const alternative = fallback; export const unchanged = fixed;`,
						dependencyProject + "other.d.ts":                     `export const value: 1;`,
						dependencyProject + "node_modules/widget/index.d.ts": vfstest.Symlink("/home/src/dependencies/fixed/index.d.ts"),
						"/home/src/dependencies/fixed/index.d.ts":            `export const fixed: 10;`,
						"/home/src/workspaces/fallback/index.d.ts":           `export const fallback: 11;`,
						dependencyProject + "watch/generated/placeholder":    "",
					}
					sys := newTestSys(&tscInput{files: files}, false)
					if prebuild {
						result := execute.CommandLine(t.Context(), sys, []string{"--build"}, sys)
						assert.Equal(t, int(result.Status), 0, sys.getOutput(false))
						var info incremental.BuildInfo
						const infoDirectory = dependencyProject + "out/project"
						assert.NilError(t, json.Unmarshal([]byte(sys.readFileNoError(infoDirectory+"/tsconfig.tsbuildinfo")), &info))
						assert.DeepEqual(t, slices.Collect(info.GetWatchDirectories(tspath.RootedDirectoryPath(infoDirectory))), []tspath.RootedDirectoryPath{
							dependencyProject + "node_modules",
							dependencyProject + "watch/generated",
							dependencyProject + "watch/generated/deep",
						})
					}
					reads := &dependencyReads{FS: sys.fs.FS, reads: make(map[tspath.RootedFilePath]int)}
					sys.fs.FS = reads
					observer := &dependencyObserver{TestSys: sys}
					result := execute.CommandLine(t.Context(), sys, []string{"--build", "--watch", "--verbose", "--pretty", "false"}, observer)
					assert.Equal(t, int(result.Status), 0)
					if prebuild {
						assert.Equal(t, observer.programs, 0)
						assert.Equal(t, reads.reads[dependencyProject+"index.ts"], 0)
					}
					assert.Assert(t, isWatched(sys, dependencyProject+"watch"))

					sys.clearOutput()
					const generated = dependencyProject + "watch/generated/deep"
					events := []fswatch.Event{{Kind: fswatch.EventUpdate, Path: generated}}
					expected := "alternative: 12;"
					if hint == "local" {
						sys.writeFileNoError(dependencyProject+"other.ts", `export const value = 2 as const;`)
						events[0].Path = dependencyProject + "other.ts"
						expected = "result: 2;"
					} else {
						sys.writeFileNoError(generated+"/index.d.ts", `export const fallback: 12;`)
						hints := map[string]string{
							"input":  "/home/src/workspaces/fallback/index.d.ts",
							"alias":  dependencyProject + "node_modules/widget/index.d.ts",
							"config": dependencyProject + "tsconfig.json",
						}
						if path := hints[hint]; path != "" {
							events = append(events, fswatch.Event{Kind: fswatch.EventUpdate, Path: path})
						}
						if hint == "descendant" {
							sys.writeFileNoError(generated+"/note.txt", "unrelated")
							events = append(events, fswatch.Event{Kind: fswatch.EventUpdate, Path: generated + "/note.txt"})
						}
					}
					sys.mockWatchBackend.SendEvents(events)
					result.Watcher.DoCycle()
					checkDependencySuccess(t, sys)
					checkDependencyOutput(t, sys, dependencyProject+"out/project/index.d.ts", expected)
				})
			}
		}
	}
}

func TestBuildWatchIncrementalStartupDetectsLogicalAliasSibling(t *testing.T) {
	t.Parallel()
	for _, preserve := range []bool{false, true} {
		t.Run(fmt.Sprintf("preserve=%v", preserve), func(t *testing.T) {
			t.Parallel()
			files, _, _ := configurationAliasFiles(true, preserve, false)
			const logicalDirectory = dependencyProject + "node_modules/widget"
			const sibling = logicalDirectory + "/index.ts"
			const output = dependencyProject + "out/index.d.ts"
			sys := newTestSys(&tscInput{files: files}, false)
			result := execute.CommandLine(t.Context(), sys, []string{"--build", "--pretty", "false"}, sys)
			assert.Equal(t, int(result.Status), 0)
			checkDependencyOutput(t, sys, output, "result: 1;")

			sys.clearOutput()
			observer := &dependencyObserver{TestSys: sys}
			result = execute.CommandLine(t.Context(), sys, []string{"--build", "--watch", "--verbose", "--pretty", "false"}, observer)
			assert.Equal(t, int(result.Status), 0)
			assert.Equal(t, observer.programs, 0)
			assert.Assert(t, isWatched(sys, logicalDirectory))

			files[sibling] = `export const value = 3;`
			sys.writeFileNoError(sibling, files[sibling].(string))
			sys.clearOutput()
			sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: sibling}})
			result.Watcher.DoCycle()
			checkDependencySuccess(t, sys)
			checkDependencyOutput(t, sys, output, "result = 3;")
		})
	}
}

func TestBuildWatchCoalescesAliasChangesDuringEmit(t *testing.T) {
	t.Parallel()
	for _, preserve := range []bool{false, true} {
		t.Run(fmt.Sprintf("preserve=%v", preserve), func(t *testing.T) {
			t.Parallel()
			files, _, _ := configurationAliasFiles(true, preserve, false)
			const logical = dependencyProject + "node_modules/widget/index.d.ts"
			const target = "/home/src/dependencies/second/types.d.ts"
			sys := newTestSys(&tscInput{files: files}, false)
			writes := &dependencyWrites{FS: sys.fs.FS, writes: make(map[string]int)}
			sys.fs.FS = writes
			observer := &dependencyObserver{TestSys: sys}
			r := execute.CommandLine(t.Context(), sys, []string{"--build", "--watch", "--pretty", "false"}, observer)
			assert.Equal(t, int(r.Status), 0)
			var mutate sync.Once
			writes.afterWrite = func(path tspath.RootedFilePath) {
				if path == dependencyProject+"out/index.js" {
					mutate.Do(func() {
						sys.mapFs().AddSymlink(strings.TrimPrefix(logical, "/"), strings.TrimPrefix(target, "/"))
						files[logical] = vfstest.Symlink(target)
						sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: logical}})
					})
				}
			}
			root := dependencyProject + "index.ts"
			source := sys.readFileNoError(root) + "\nexport const tick = 1;"
			files[root] = source
			sys.writeFileNoError(root, source)
			sys.clearOutput()
			observer.programs = 0
			dependencyEvent(sys, r.Watcher, fswatch.EventUpdate, root)
			assert.Equal(t, observer.programs, 2)
			trace := sys.getOutput(false)
			lastCompilation := strings.LastIndex(trace, "File change detected.")
			if lastCompilation < 0 {
				t.Fatalf("expected an incremental compilation: %s", trace)
			}
			assert.Assert(t, !strings.Contains(trace[lastCompilation:], "error TS"), "%s", trace)
			cold := newTestSys(&tscInput{files: files}, false)
			execute.CommandLine(t.Context(), cold, []string{"--build", "--force", "--pretty", "false"}, cold)
			assert.DeepEqual(t, dependencyDiagnosticCodes(cold), []string{})
			for _, name := range []string{"index.js", "index.d.ts"} {
				assert.Equal(t, sys.readFileNoError(dependencyProject+"out/"+name), cold.readFileNoError(dependencyProject+"out/"+name))
			}
			sys.clearOutput()
			observer.programs = 0
			writes.writes = make(map[string]int)
			r.Watcher.DoCycle()
			assert.Equal(t, observer.programs, 0)
			assert.Equal(t, len(writes.writes), 0)
			assert.Equal(t, sys.getOutput(false), "")
		})
	}
}

type dependencyObserver struct {
	*TestSys
	programs int
	owners   []string
}

func (o *dependencyObserver) OnProgram(p *incremental.Program) {
	o.programs++
	o.owners = nil
	for _, file := range p.GetProgram().GetSourceFiles() {
		o.owners = append(o.owners, file.FileName().AsString())
	}
	slices.Sort(o.owners)
	o.TestSys.OnProgram(p)
}

func dependencyDiagnosticCodes(sys *TestSys) []string {
	codes := []string{}
	for _, match := range regexp.MustCompile(`error TS(\d+)`).FindAllStringSubmatch(sys.getOutput(false), -1) {
		codes = append(codes, match[1])
	}
	slices.Sort(codes)
	return codes
}

func TestBuildWatchAliasCreatedDuringProbe(t *testing.T) {
	t.Parallel()
	for _, incremental := range []bool{false, true} {
		for _, preserve := range []bool{false, true} {
			for _, probe := range []string{"classification", "before-resolution", "resolution"} {
				t.Run(fmt.Sprintf("incremental=%v/preserve=%v/%s", incremental, preserve, probe), func(t *testing.T) {
					t.Parallel()
					files, _, _ := configurationAliasFiles(incremental, preserve, false)
					const logical = dependencyProject + "node_modules/widget/index.d.ts"
					const parent = dependencyProject + "node_modules/widget"
					sys := newTestSys(&tscInput{files: files}, false)
					writes := &dependencyWrites{FS: sys.fs.FS, writes: make(map[string]int)}
					sys.fs.FS = writes
					observer := &dependencyObserver{TestSys: sys}
					r := execute.CommandLine(t.Context(), sys, []string{"--build", "--watch", "--verbose", "--pretty", "false"}, observer)
					assert.Equal(t, int(r.Status), 0)
					sys.removeNoError(logical)
					sys.removeNoError(parent)
					sys.clearOutput()
					dependencyEvent(sys, r.Watcher, fswatch.EventDelete, parent)
					assert.DeepEqual(t, dependencyDiagnosticCodes(sys), []string{"2307"})
					sys.writeFileNoError(parent+"/placeholder", "")
					sys.removeNoError(parent + "/placeholder")
					writes.restoreFile = logical
					writes.restoreAfter = 1
					if probe == "before-resolution" {
						writes.restoreAfter = 2
					}
					if probe == "resolution" {
						writes.restoreAfter = 3
					}
					// The parent notification can precede creation of its child and installation of its watch.
					writes.restore = func() {
						sys.mapFs().AddSymlink(strings.TrimPrefix(logical, "/"), "home/src/dependencies/first/types.d.ts")
					}
					sys.clearOutput()
					observer.programs = 0
					writes.writes = make(map[string]int)
					dependencyEvent(sys, r.Watcher, fswatch.EventUpdate, parent)
					assert.Assert(t, writes.restore == nil, "the missing-file observation must precede restoration")
					trace := sys.getOutput(false)
					final := trace[strings.LastIndex(trace, "File change detected."):]
					assert.Assert(t, !strings.Contains(final, "error TS"), "%s", trace)
					assert.Assert(t, strings.Contains(final, "Found 0 errors"), "%s", trace)
					expectedPrograms := 1
					if probe == "resolution" {
						expectedPrograms = 2
					} else {
						assert.DeepEqual(t, dependencyDiagnosticCodes(sys), []string{})
					}
					assert.Equal(t, observer.programs, expectedPrograms)
					expectedWrites := 1
					if !incremental && probe == "resolution" {
						expectedWrites = 2
					}
					assert.Equal(t, writes.writes[dependencyProject+"out/index.d.ts"], expectedWrites)
					cold := newTestSys(&tscInput{files: files}, false)
					coldObserver := &dependencyObserver{TestSys: cold}
					execute.CommandLine(t.Context(), cold, []string{"--build", "--force", "--pretty", "false"}, coldObserver)
					assert.DeepEqual(t, dependencyDiagnosticCodes(cold), []string{})
					for _, name := range []string{"index.js", "index.d.ts"} {
						assert.Equal(t, sys.readFileNoError(dependencyProject+"out/"+name), cold.readFileNoError(dependencyProject+"out/"+name))
					}
					assert.DeepEqual(t, observer.owners, coldObserver.owners)
					sys.clearOutput()
					observer.programs = 0
					writes.writes = make(map[string]int)
					dependencyEvent(sys, r.Watcher, fswatch.EventUpdate, logical)
					assert.Equal(t, observer.programs, 0)
					assert.Equal(t, len(writes.writes), 0)
				})
			}
		}
	}
}

func TestBuildWatchAliasRecoveryPrecision(t *testing.T) {
	t.Parallel()
	for _, incremental := range []bool{false, true} {
		for _, preserve := range []bool{false, true} {
			for _, prebuild := range []bool{false, true} {
				for _, mode := range []string{"file", "parent", "parent-config", "overflow"} {
					t.Run(fmt.Sprintf("incremental=%v/preserve=%v/prebuild=%v/%s", incremental, preserve, prebuild, mode), func(t *testing.T) {
						t.Parallel()
						files, config, _ := configurationAliasFiles(incremental, preserve, false)
						const logical = dependencyProject + "node_modules/widget/index.d.ts"
						const parent = dependencyProject + "node_modules/widget"
						const first = "/home/src/dependencies/first/types.d.ts"
						const second = "/home/src/dependencies/second/types.d.ts"
						const output = dependencyProject + "out/index.d.ts"
						sys := newTestSys(&tscInput{files: files}, false)
						if prebuild {
							r := execute.CommandLine(t.Context(), sys, []string{"--build"}, sys)
							assert.Equal(t, int(r.Status), 0)
						}
						writes := &dependencyWrites{FS: sys.fs.FS, writes: make(map[string]int)}
						sys.fs.FS = writes
						observer := &dependencyObserver{TestSys: sys}
						r := execute.CommandLine(t.Context(), sys, []string{"--build", "--watch", "--verbose", "--pretty", "false"}, observer)
						assert.Equal(t, int(r.Status), 0)
						assert.Assert(t, r.Watcher != nil)
						cycle := func(events ...fswatch.Event) {
							t.Helper()
							sys.clearOutput()
							writes.writes = make(map[string]int)
							observer.programs = 0
							if mode == "parent-config" {
								events = append(events, fswatch.Event{Kind: fswatch.EventUpdate, Path: config})
							}
							if mode == "overflow" {
								sys.mockWatchBackend.SendOverflow()
							} else {
								sys.mockWatchBackend.SendEvents(events)
							}
							r.Watcher.DoCycle()
						}
						check := func(codes []string, declaration string) {
							t.Helper()
							assert.DeepEqual(t, dependencyDiagnosticCodes(sys), codes)
							assert.Equal(t, sys.readFileNoError(output), declaration)
							cold := newTestSys(&tscInput{files: files}, false)
							coldObserver := &dependencyObserver{TestSys: cold}
							execute.CommandLine(t.Context(), cold, []string{"--build", "--force", "--pretty", "false"}, coldObserver)
							assert.DeepEqual(t, dependencyDiagnosticCodes(sys), dependencyDiagnosticCodes(cold))
							assert.Equal(t, sys.readFileNoError(output), cold.readFileNoError(output))
							assert.Equal(t, sys.readFileNoError(dependencyProject+"out/index.js"), cold.readFileNoError(dependencyProject+"out/index.js"))
							assert.DeepEqual(t, observer.owners, coldObserver.owners)
						}
						for _, target := range []string{first, second} {
							sys.removeNoError(logical)
							delete(files, logical)
							eventPath := logical
							if mode != "file" {
								sys.removeNoError(parent)
								eventPath = parent
							}
							cycle(fswatch.Event{Kind: fswatch.EventDelete, Path: eventPath})
							check([]string{"2307"}, "export declare const result: any;\nexport declare const other: 1;\nexport declare const extra: 2;\n")
							assert.Equal(t, observer.programs, 1)
							assert.Equal(t, writes.writes[output], 1)
							assert.Equal(t, writes.writes[dependencyProject+"out/index.js"], 1)
							assert.Equal(t, writes.writes[dependencyProject+"out/tsconfig.tsbuildinfo"], 1)
							sys.writeFileNoError(parent+"/placeholder", "")
							sys.removeNoError(parent + "/placeholder")
							sys.mapFs().AddSymlink(strings.TrimPrefix(logical, "/"), strings.TrimPrefix(target, "/"))
							files[logical] = vfstest.Symlink(target)
							cycle(fswatch.Event{Kind: fswatch.EventUpdate, Path: eventPath})
							value := "1"
							if target == second {
								value = "2"
							}
							check([]string{}, "export declare const result: "+value+";\nexport declare const other: 1;\nexport declare const extra: 2;\n")
							assert.Equal(t, observer.programs, 1)
							assert.Equal(t, writes.writes[output], 1)
							assert.Equal(t, writes.writes[dependencyProject+"out/index.js"], 1)
							assert.Equal(t, writes.writes[dependencyProject+"out/tsconfig.tsbuildinfo"], 1)
							for range 2 {
								cycle(fswatch.Event{Kind: fswatch.EventUpdate, Path: logical}, fswatch.Event{Kind: fswatch.EventUpdate, Path: first}, fswatch.Event{Kind: fswatch.EventUpdate, Path: second})
								assert.DeepEqual(t, dependencyDiagnosticCodes(sys), []string{})
								assert.Equal(t, observer.programs, 0)
								assert.Equal(t, len(writes.writes), 0)
							}
						}
						sys.removeNoError(logical)
						sys.removeNoError(parent)
						cycle(fswatch.Event{Kind: fswatch.EventDelete, Path: parent})
						root := `import { value } from "../../dependencies/first/types.js"; export const result = value;`
						sys.writeFileNoError(dependencyProject+"index.ts", root)
						files[dependencyProject+"index.ts"] = root
						delete(files, logical)
						cycle(fswatch.Event{Kind: fswatch.EventUpdate, Path: dependencyProject + "index.ts"})
						check([]string{}, "export declare const result: 1;\n")
						assert.Assert(t, !isWatched(sys, dependencyProject+"node_modules"))
						sys.writeFileNoError(parent+"/placeholder", "")
						sys.removeNoError(parent + "/placeholder")
						sys.mapFs().AddSymlink(strings.TrimPrefix(logical, "/"), strings.TrimPrefix(first, "/"))
						cycle(fswatch.Event{Kind: fswatch.EventUpdate, Path: parent})
						assert.Equal(t, observer.programs, 0)
						assert.Equal(t, len(writes.writes), 0)
					})
				}
			}
		}
	}
}

func TestBuildWatchMissingAliasRecovery(t *testing.T) {
	t.Parallel()
	for _, incremental := range []bool{false, true} {
		for _, preserve := range []bool{false, true} {
			for _, prebuild := range []bool{false, true} {
				t.Run(fmt.Sprintf("incremental=%v/preserve=%v/prebuild=%v", incremental, preserve, prebuild), func(t *testing.T) {
					t.Parallel()
					files, _, _ := configurationAliasFiles(incremental, preserve, false)
					const logical = dependencyProject + "node_modules/widget/index.d.ts"
					target := files[logical]
					delete(files, logical)
					sys := newTestSys(&tscInput{files: files}, false)
					if prebuild {
						r := execute.CommandLine(t.Context(), sys, []string{"--build"}, sys)
						assert.Assert(t, int(r.Status) != 0)
					}
					sys.clearOutput()
					writes := &dependencyWrites{FS: sys.fs.FS, writes: make(map[string]int)}
					sys.fs.FS = writes
					observer := &dependencyObserver{TestSys: sys}
					r := execute.CommandLine(t.Context(), sys, []string{"--build", "--watch", "--verbose", "--pretty", "false"}, observer)
					assert.Assert(t, int(r.Status) != 0)
					assert.DeepEqual(t, dependencyDiagnosticCodes(sys), []string{"2307"})
					sys.writeFileNoError(dependencyProject+"node_modules/widget/placeholder", "")
					sys.removeNoError(dependencyProject + "node_modules/widget/placeholder")
					sys.mapFs().AddSymlink(strings.TrimPrefix(logical, "/"), "home/src/dependencies/first/types.d.ts")
					files[logical] = target
					sys.clearOutput()
					observer.programs = 0
					writes.writes = make(map[string]int)
					dependencyEvent(sys, r.Watcher, fswatch.EventUpdate, dependencyProject+"node_modules/widget")
					assert.DeepEqual(t, dependencyDiagnosticCodes(sys), []string{})
					assert.Equal(t, observer.programs, 1)
					assert.Equal(t, writes.writes[dependencyProject+"out/index.d.ts"], 1)
					cold := newTestSys(&tscInput{files: files}, false)
					coldObserver := &dependencyObserver{TestSys: cold}
					result := execute.CommandLine(t.Context(), cold, []string{"--build", "--force", "--pretty", "false"}, coldObserver)
					assert.Equal(t, int(result.Status), 0)
					for _, name := range []string{"index.js", "index.d.ts"} {
						assert.Equal(t, sys.readFileNoError(dependencyProject+"out/"+name), cold.readFileNoError(dependencyProject+"out/"+name))
					}
					assert.DeepEqual(t, observer.owners, coldObserver.owners)
				})
			}
		}
	}
}

func TestBuildWatchOrdinaryHintPrecision(t *testing.T) {
	t.Parallel()
	for _, incremental := range []bool{false, true} {
		for _, prebuild := range []bool{false, true} {
			for _, order := range []string{"manifest", "root", "unrelated", "root-manifest", "manifest-root", "directory-unrelated"} {
				t.Run(fmt.Sprintf("incremental=%v/prebuild=%v/%s", incremental, prebuild, order), func(t *testing.T) {
					t.Parallel()
					files := FileMap{
						dependencyProject + "tsconfig.json":  fmt.Sprintf(`{"compilerOptions":{"outDir":"out","declaration":true,"incremental":%v,"module":"nodenext","target":"es2022","types":[]},"files":["index.ts"]}`, incremental),
						dependencyProject + "package.json":   `{"type":"module"}`,
						dependencyProject + "index.ts":       `import {value} from "./other.js"; export const result=value;`,
						dependencyProject + "other.d.ts":     `export const value: 42;`,
						dependencyProject + "unrelated.json": `{"unused":true}`,
					}
					sys := newTestSys(&tscInput{files: files}, false)
					if prebuild {
						r := execute.CommandLine(t.Context(), sys, []string{"--build"}, sys)
						assert.Equal(t, int(r.Status), 0)
					}
					writes := &dependencyWrites{FS: sys.fs.FS, writes: make(map[string]int)}
					sys.fs.FS = writes
					observer := &dependencyObserver{TestSys: sys}
					r := execute.CommandLine(t.Context(), sys, []string{"--build", "--watch", "--verbose", "--pretty", "false"}, observer)
					assert.Equal(t, int(r.Status), 0)
					events := []fswatch.Event{}
					paths := map[string]string{
						"root":      dependencyProject + "index.ts",
						"manifest":  dependencyProject + "package.json",
						"unrelated": dependencyProject + "unrelated.json",
						"directory": strings.TrimSuffix(dependencyProject, "/"),
					}
					for name := range strings.SplitSeq(order, "-") {
						events = append(events, fswatch.Event{Kind: fswatch.EventUpdate, Path: paths[name]})
					}
					if order == "unrelated" {
						events = append(events, fswatch.Event{Kind: fswatch.EventUpdate, Path: dependencyProject + "index.ts"})
					}
					cycle := func() {
						sys.clearOutput()
						observer.programs = 0
						writes.writes = make(map[string]int)
						sys.mockWatchBackend.SendEvents(events)
						r.Watcher.DoCycle()
					}
					for range 2 {
						cycle()
						assert.DeepEqual(t, dependencyDiagnosticCodes(sys), []string{})
						assert.Equal(t, sys.readFileNoError(dependencyProject+"out/index.d.ts"), "export declare const result: 42;\n")
						assert.Equal(t, observer.programs, 0, sys.getOutput(false))
						assert.Equal(t, len(writes.writes), 0)
						if order == "directory-unrelated" {
							assert.Equal(t, sys.getOutput(false), "")
						}
					}
					if order == "root-manifest" || order == "manifest-root" {
						for _, edit := range []string{"root", "manifest", "both"} {
							if edit != "manifest" {
								files[dependencyProject+"index.ts"] = `import {value} from "./other.js"; export const ` + edit + `=value;`
								sys.writeFileNoError(dependencyProject+"index.ts", files[dependencyProject+"index.ts"].(string))
							}
							if edit != "root" {
								moduleType := "commonjs"
								if edit == "both" {
									moduleType = "module"
								}
								files[dependencyProject+"package.json"] = `{"type":"` + moduleType + `"}`
								sys.writeFileNoError(dependencyProject+"package.json", files[dependencyProject+"package.json"].(string))
							}
							cycle()
							assert.Equal(t, observer.programs, 1)
							assert.Assert(t, len(writes.writes) > 0)
							assert.DeepEqual(t, dependencyDiagnosticCodes(sys), []string{})
							cold := newTestSys(&tscInput{files: files}, false)
							coldObserver := &dependencyObserver{TestSys: cold}
							execute.CommandLine(t.Context(), cold, []string{"--build", "--force", "--pretty", "false"}, coldObserver)
							assert.DeepEqual(t, dependencyDiagnosticCodes(cold), []string{})
							for _, name := range []string{"index.js", "index.d.ts"} {
								assert.Equal(t, sys.readFileNoError(dependencyProject+"out/"+name), cold.readFileNoError(dependencyProject+"out/"+name))
							}
							assert.DeepEqual(t, observer.owners, coldObserver.owners)
							cycle()
							assert.Equal(t, observer.programs, 0)
							assert.Equal(t, len(writes.writes), 0)
						}
					}
				})
			}
		}
	}
}

func TestBuildDependencyAliasBuildReuse(t *testing.T) {
	t.Parallel()
	for _, incremental := range []bool{false, true} {
		t.Run(fmt.Sprintf("incremental=%v", incremental), func(t *testing.T) {
			t.Parallel()
			files, _, _ := configurationAliasFiles(incremental, false, false)
			files[dependencyProject+"node_modules/extra/index.d.ts"] = vfstest.Symlink("/home/src/dependencies/extra/types.d.ts")
			files["/home/src/dependencies/extra/types.d.ts"] = `export const extra: 3;`
			sys := newTestSys(&tscInput{files: files}, false)
			command := tsoptions.ParseBuildCommandLine([]string{"--build", "--verbose"}, sys.FS(), sys.GetCurrentDirectory())
			orchestrator := build.NewOrchestrator(build.Options{Sys: sys, Command: command})
			run := func(projectsBuilt int) {
				t.Helper()
				sys.clearOutput()
				result := orchestrator.Build(t.Context(), "")
				assert.Equal(t, int(result.Result.Status), 0, sys.getOutput(false))
				assert.Equal(t, result.Statistics.ProjectsBuilt, projectsBuilt, sys.getOutput(false))
			}
			run(1)
			run(0)
			sys.writeFileNoError(dependencyProject+"index.ts", files[dependencyProject+"index.ts"].(string)+`
				import { extra as additional } from "extra"; export const added = additional;`)
			run(1)
			for range 2 {
				run(0)
			}
		})
	}
}

package incremental

import (
	"fmt"
	"maps"
	"slices"
	"strconv"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestBuildInfoPathJSONRoundTrip(t *testing.T) {
	t.Parallel()

	buildInfo := &BuildInfo{
		Root:                 []*BuildInfoRoot{{NonIncremental: "./src/root.ts"}},
		PackageJsons:         []BuildInfoPath{"./package.json"},
		MissingPackageJsons:  []BuildInfoPath{"../package.json"},
		FileNames:            []BuildInfoPath{"./src/root.ts", "lib.es5.d.ts"},
		LatestChangedDtsFile: "./dist/root.d.ts",
	}

	data, err := json.Marshal(buildInfo)
	assert.NilError(t, err)
	assert.Equal(
		t,
		string(data),
		`{"root":["./src/root.ts"],"packageJsons":["./package.json"],"missingPackageJsons":["../package.json"],"fileNames":["./src/root.ts","lib.es5.d.ts"],"latestChangedDtsFile":"./dist/root.d.ts"}`,
	)

	var roundTripped BuildInfo
	assert.NilError(t, json.Unmarshal(data, &roundTripped))
	assert.DeepEqual(t, roundTripped.Root, buildInfo.Root)
	assert.DeepEqual(t, roundTripped.PackageJsons, buildInfo.PackageJsons)
	assert.DeepEqual(t, roundTripped.MissingPackageJsons, buildInfo.MissingPackageJsons)
	assert.DeepEqual(t, roundTripped.FileNames, buildInfo.FileNames)
	assert.Equal(t, roundTripped.LatestChangedDtsFile, buildInfo.LatestChangedDtsFile)
}

const deletionTestLib = `interface Array<T> {}
interface Boolean {}
interface CallableFunction {}
interface Function {}
interface IArguments {}
interface NewableFunction {}
interface Number {}
interface Object {}
interface RegExp {}
interface String {}
`

func newDeletionTestProgram(files map[string]string, roots []string, options *core.CompilerOptions, old *Program) *Program {
	files = maps.Clone(files)
	files["/lib/"+tsoptions.GetDefaultLibFileName(options)] = files["/lib/lib.d.ts"]
	host := compiler.NewCompilerHost(vfstest.FromMap(files, tspath.CaseSensitive), "/lib", nil, nil, nil)
	paths := core.Map(roots, func(name string) tspath.RootedFilePath {
		return tspath.ToRootedFilePath(name, "/project")
	})
	config := tsoptions.NewParsedCommandLine(options, paths, nil, "/project", tspath.CaseSensitive)
	program := compiler.NewProgram(compiler.ProgramOptions{Config: config, Host: host})
	return NewProgram(program, old, CreateHost(host), nil, false)
}

func TestDeletedGlobalInvalidatesAllSourceFiles(t *testing.T) {
	t.Parallel()
	current := newDeletionTestProgram(map[string]string{
		"/lib/lib.d.ts":        deletionTestLib,
		"/project/consumer.ts": "export const unchanged = 1;",
	}, []string{"consumer.ts"}, &core.CompilerOptions{Incremental: core.TSTrue, NoEmit: core.TSTrue}, nil)
	old := &Program{snapshot: &snapshot{}}
	current.snapshot.fileInfos.Range(func(path tspath.PathKey, info *FileInfo) bool {
		old.snapshot.fileInfos.Store(path, info)
		return true
	})
	for _, path := range []tspath.PathKey{"/project/first.d.ts", "/project/second.d.ts"} {
		old.snapshot.fileInfos.Store(path, &FileInfo{})
	}
	deletedOrder := func() []tspath.PathKey {
		var paths []tspath.PathKey
		old.snapshot.fileInfos.Range(func(path tspath.PathKey, _ *FileInfo) bool {
			if _, retained := current.snapshot.fileInfos.Load(path); !retained {
				paths = append(paths, path)
			}
			return true
		})
		return paths
	}
	order := deletedOrder()
	if !slices.Equal(order, deletedOrder()) {
		t.Fatal("file iteration changed without writes")
	}
	info, _ := old.snapshot.fileInfos.Load(order[len(order)-1])
	info.affectsGlobalScope = true
	to := &toProgramSnapshot{program: current.program, snapshot: current.snapshot, oldProgram: old}
	to.handleFileDelete()
	if !to.globalFileRemoved || !current.snapshot.changedFilesSet.Has("/project/consumer.ts") {
		t.Fatalf("global deletion after non-global deletion did not invalidate consumer: global=%t changed=%t",
			to.globalFileRemoved, current.snapshot.changedFilesSet.Has("/project/consumer.ts"))
	}
}

func TestGlobalDeletionInvalidatesRetainedLibraryDiagnostics(t *testing.T) {
	t.Parallel()
	for _, single := range []core.Tristate{core.TSFalse, core.TSTrue} {
		for _, kind := range []string{"new error", "cleared error", "scope loss"} {
			t.Run(fmt.Sprintf("%v/%s", single, kind), func(t *testing.T) {
				t.Parallel()
				options := &core.CompilerOptions{
					Incremental: core.TSTrue, NoEmit: core.TSTrue,
					SingleThreaded: single, TsBuildInfoFile: "/project/state.tsbuildinfo",
				}
				library := deletionTestLib + "interface LibraryConsumer { property: RemovedGlobal; }"
				global := "interface RemovedGlobal { x: string; }"
				if kind == "cleared error" {
					library = deletionTestLib + "interface Shared<T> {}"
					global = "interface Shared<T, U> {}"
				}
				files := map[string]string{
					"/lib/lib.d.ts":        library,
					"/project/global.d.ts": global,
					"/project/consumer.ts": "export const unchanged = 1;",
					"/project/module.d.ts": "export interface Unrelated {}",
				}
				old := newDeletionTestProgram(files, []string{"global.d.ts", "consumer.ts", "module.d.ts"}, options, nil)
				old.GetSemanticDiagnostics(t.Context(), nil)
				old.Emit(t.Context(), compiler.EmitOptions{})
				roots := []string{"consumer.ts"}
				if kind == "scope loss" {
					files["/project/global.d.ts"] = "export " + global
					roots = append(roots, "global.d.ts")
				} else {
					delete(files, "/project/global.d.ts")
				}
				delete(files, "/project/module.d.ts")
				current := newDeletionTestProgram(files, roots, options, old)
				cold := newDeletionTestProgram(files, roots, options, nil)
				actual := current.GetSemanticDiagnostics(t.Context(), nil)
				expected := cold.GetSemanticDiagnostics(t.Context(), nil)
				if kind == "cleared error" {
					if len(expected) != 0 {
						t.Fatalf("cold build should have no errors: %v", expected)
					}
				} else if len(expected) != 1 || expected[0].Code() != 2304 {
					t.Fatalf("cold build should report one TS2304: %v", expected)
				}
				if len(actual) != len(expected) {
					t.Fatalf("incremental diagnostics=%d, cold=%d", len(actual), len(expected))
				}
				if len(actual) != 0 && actual[0].Code() != expected[0].Code() {
					t.Fatalf("incremental diagnostic=%d, cold=%d", actual[0].Code(), expected[0].Code())
				}
			})
		}
	}
}

func TestEmptyProgramDeletionEmitsBuildInfo(t *testing.T) {
	t.Parallel()
	for flags := range 8 {
		for _, roots := range [][]string{{"global.d.ts"}, {"module.d.ts"}, {"global.d.ts", "module.d.ts"}} {
			t.Run(fmt.Sprintf("%d/%v", flags, roots), func(t *testing.T) {
				t.Parallel()
				options := &core.CompilerOptions{
					Incremental: core.TSTrue, TsBuildInfoFile: "/project/state.tsbuildinfo",
					NoCheck:   core.IfElse(flags&1 != 0, core.TSTrue, core.TSFalse),
					NoEmit:    core.IfElse(flags&2 != 0, core.TSTrue, core.TSFalse),
					Composite: core.IfElse(flags&4 != 0, core.TSTrue, core.TSFalse),
				}
				files := map[string]string{
					"/lib/lib.d.ts":        deletionTestLib,
					"/project/global.d.ts": "interface RemovedGlobal {}",
					"/project/module.d.ts": "export interface Unrelated {}",
				}
				old := newDeletionTestProgram(files, roots, options, nil)
				old.GetSemanticDiagnostics(t.Context(), nil)
				old.Emit(t.Context(), compiler.EmitOptions{})
				if old.snapshot.buildInfoEmitPending.Load() {
					t.Fatal("initial build info was not emitted")
				}
				delete(files, "/project/global.d.ts")
				delete(files, "/project/module.d.ts")
				current := newDeletionTestProgram(files, nil, options, old)
				if len(current.GetSourceFiles()) != 0 {
					t.Fatal("new program is not empty")
				}
				writes := 0
				current.Emit(t.Context(), compiler.EmitOptions{
					WriteFile: func(name tspath.RootedFilePath, text string, _ *compiler.WriteFileData) error {
						if name.ExtensionIs(tspath.ExtensionTsBuildInfo) {
							writes++
							var info struct {
								FileNames                []string     `json:"fileNames"`
								FileInfos                []json.Value `json:"fileInfos"`
								ChangeFileSet            []int        `json:"changeFileSet"`
								AffectedFilesPendingEmit []json.Value `json:"affectedFilesPendingEmit"`
							}
							if err := json.Unmarshal([]byte(text), &info); err != nil {
								t.Fatal(err)
							}
							if len(info.FileNames) != 0 || len(info.FileInfos) != 0 || len(info.ChangeFileSet) != 0 || len(info.AffectedFilesPendingEmit) != 0 {
								t.Fatalf("empty program persisted removed state: %+v", info)
							}
						}
						return nil
					},
				})
				if writes != 1 {
					t.Fatalf("build-info writes after deleting every source = %d, want 1", writes)
				}
			})
		}
	}
}

func TestUncheckedDeletedFilesDiscardPendingState(t *testing.T) {
	t.Parallel()
	options := &core.CompilerOptions{
		Incremental: core.TSTrue, NoEmit: core.TSTrue, NoCheck: core.TSTrue,
		TsBuildInfoFile: "/project/state.tsbuildinfo",
	}
	files := map[string]string{
		"/lib/lib.d.ts":      deletionTestLib,
		"/project/stable.ts": "export const stable = 1;",
	}
	old := newDeletionTestProgram(files, []string{"stable.ts"}, options, nil)
	old.Emit(t.Context(), compiler.EmitOptions{})
	files["/project/first.ts"] = "export const first = 1;"
	files["/project/second.ts"] = "export const second = 1;"
	added := newDeletionTestProgram(files, []string{"stable.ts", "first.ts", "second.ts"}, options, old)
	added.Emit(t.Context(), compiler.EmitOptions{})
	for _, path := range []tspath.PathKey{"/project/first.ts", "/project/second.ts"} {
		if !added.snapshot.changedFilesSet.Has(path) {
			t.Fatalf("new unchecked file %s not pending", path)
		}
		added.snapshot.affectedFilesPendingEmit.Store(path, FileEmitKindJs)
	}
	delete(files, "/project/first.ts")
	delete(files, "/project/second.ts")
	current := newDeletionTestProgram(files, []string{"stable.ts"}, options, added)
	for _, path := range []tspath.PathKey{"/project/first.ts", "/project/second.ts"} {
		if current.snapshot.changedFilesSet.Has(path) {
			t.Errorf("removed unchecked file %s still in change set", path)
		}
		if _, pending := current.snapshot.affectedFilesPendingEmit.Load(path); pending {
			t.Errorf("removed file %s still pending emit", path)
		}
	}
	info, err := snapshotToBuildInfo(current.snapshot, current.program, options.TsBuildInfoFile)
	if err != nil {
		t.Fatal(err)
	}
	if len(info.FileNames) != len(info.FileInfos) || len(info.ChangeFileSet) != 0 {
		t.Fatalf("invalid build-info file state: names=%d infos=%d changes=%v", len(info.FileNames), len(info.FileInfos), info.ChangeFileSet)
	}
}

func TestModuleDeletionPreservesUnrelatedCachedDiagnostics(t *testing.T) {
	t.Parallel()
	for _, skip := range []core.Tristate{core.TSFalse, core.TSTrue} {
		t.Run(fmt.Sprint(skip), func(t *testing.T) {
			t.Parallel()
			options := &core.CompilerOptions{
				Incremental: core.TSTrue, NoEmit: core.TSTrue, SkipDefaultLibCheck: skip,
				TsBuildInfoFile: "/project/state.tsbuildinfo",
			}
			files := map[string]string{
				"/lib/lib.d.ts":        deletionTestLib,
				"/project/consumer.ts": "export const unchanged = 1;",
				"/project/module.d.ts": "export interface Unrelated {}",
			}
			old := newDeletionTestProgram(files, []string{"consumer.ts", "module.d.ts"}, options, nil)
			old.GetSemanticDiagnostics(t.Context(), nil)
			old.Emit(t.Context(), compiler.EmitOptions{})
			delete(files, "/project/module.d.ts")
			current := newDeletionTestProgram(files, []string{"consumer.ts"}, options, old)
			if current.snapshot.changedFilesSet.Has("/project/consumer.ts") {
				t.Fatal("unrelated module deletion invalidated consumer")
			}
			for _, file := range current.GetSourceFiles() {
				previous, ok := old.snapshot.semanticDiagnosticsPerFile.Load(file.PathKey())
				if !ok {
					t.Fatalf("initial diagnostics for %s were not cached", file.FileName())
				}
				cached, ok := current.snapshot.semanticDiagnosticsPerFile.Load(file.PathKey())
				if !ok || cached != previous {
					t.Fatalf("unrelated cached diagnostics for %s not reused", file.FileName())
				}
			}
		})
	}
}

func TestDeletedFilesCleanupAfterGlobalDeletion(t *testing.T) {
	t.Parallel()
	current := newDeletionTestProgram(map[string]string{"/lib/lib.d.ts": deletionTestLib}, nil,
		&core.CompilerOptions{Incremental: core.TSTrue}, nil)
	old := &Program{snapshot: &snapshot{}}
	deleted := []tspath.PathKey{"/project/first.d.ts", "/project/second.d.ts", "/project/third.d.ts"}
	for _, path := range deleted {
		old.snapshot.fileInfos.Store(path, &FileInfo{affectsGlobalScope: true})
		current.snapshot.changedFilesSet.Add(path)
		current.snapshot.affectedFilesPendingEmit.Store(path, FileEmitKindJs)
	}
	to := &toProgramSnapshot{program: current.program, snapshot: current.snapshot, oldProgram: old}
	to.handleFileDelete()
	for _, path := range deleted {
		if current.snapshot.changedFilesSet.Has(path) {
			t.Errorf("removed path %s still in change set", path)
		}
		if _, pending := current.snapshot.affectedFilesPendingEmit.Load(path); pending {
			t.Errorf("removed path %s still pending emit", path)
		}
	}
	if !current.snapshot.buildInfoEmitPending.Load() {
		t.Error("global deletion did not mark build info pending")
	}
}

func TestRemovedPendingPathsWithoutFileInfo(t *testing.T) {
	t.Parallel()
	options := &core.CompilerOptions{
		Incremental: core.TSTrue, NoCheck: core.TSTrue, NoEmit: core.TSTrue,
		TsBuildInfoFile: "/project/state.tsbuildinfo",
	}
	files := map[string]string{
		"/lib/lib.d.ts":      deletionTestLib,
		"/project/stable.ts": "export const stable = 1;",
	}
	old := newDeletionTestProgram(files, []string{"stable.ts"}, options, nil)
	old.Emit(t.Context(), compiler.EmitOptions{})
	old.snapshot.changedFilesSet.Add("/project/missing.ts")
	old.snapshot.affectedFilesPendingEmit.Store("/project/missing.ts", FileEmitKindJs)
	current := newDeletionTestProgram(files, []string{"stable.ts"}, options, old)
	if current.snapshot.changedFilesSet.Has("/project/missing.ts") {
		t.Error("removed pending path without file info was retained")
	}
	if _, pending := current.snapshot.affectedFilesPendingEmit.Load("/project/missing.ts"); pending {
		t.Error("removed pending emit path without file info was retained")
	}
	if !current.snapshot.buildInfoEmitPending.Load() {
		t.Error("discarding obsolete pending state did not mark build info pending")
	}
	info, err := snapshotToBuildInfo(current.snapshot, current.program, options.TsBuildInfoFile)
	if err != nil {
		t.Fatal(err)
	}
	if len(info.FileNames) != len(info.FileInfos) {
		t.Fatalf("invalid cached file state: names=%d infos=%d", len(info.FileNames), len(info.FileInfos))
	}
}

func TestForEachDeletedFileVisitsEveryRemovedPath(t *testing.T) {
	t.Parallel()
	order := []tspath.PathKey{"/first.ts", "/second.ts", "/third.ts", "/fourth.ts"}
	var visitOrders func(int)
	visitOrders = func(index int) {
		if index != len(order) {
			for next := index; next < len(order); next++ {
				order[index], order[next] = order[next], order[index]
				visitOrders(index + 1)
				order[index], order[next] = order[next], order[index]
			}
			return
		}
		for retained := range 16 {
			for global := range 16 {
				var current collections.SyncMap[tspath.PathKey, *FileInfo]
				infos := make(map[tspath.PathKey]*FileInfo)
				var expected []tspath.PathKey
				for i, path := range order {
					infos[path] = &FileInfo{affectsGlobalScope: global&(1<<i) != 0}
					if retained&(1<<i) != 0 {
						current.Store(path, &FileInfo{})
					} else {
						expected = append(expected, path)
					}
				}
				current.Store("/new.ts", &FileInfo{})
				var actual []tspath.PathKey
				forEachDeletedFile(func(callback func(tspath.PathKey, *FileInfo) bool) {
					for _, path := range order {
						if !callback(path, infos[path]) {
							t.Fatal("deleted-file enumeration stopped early")
						}
					}
				}, &current, func(path tspath.PathKey, info *FileInfo) {
					if info != infos[path] {
						t.Fatal("deleted-file callback lost old metadata")
					}
					actual = append(actual, path)
				})
				if !slices.Equal(actual, expected) {
					t.Fatalf("order=%v retained=%d global=%d: callbacks=%v, want %v", order, retained, global, actual, expected)
				}
			}
		}
	}
	visitOrders(0)
}

func TestGlobalDeletionPreservesSkippedLibraryDiagnostics(t *testing.T) {
	t.Parallel()
	for _, skipDefault := range []bool{false, true} {
		t.Run(strconv.FormatBool(skipDefault), func(t *testing.T) {
			t.Parallel()
			options := &core.CompilerOptions{Incremental: core.TSTrue, NoEmit: core.TSTrue}
			if skipDefault {
				options.SkipDefaultLibCheck = core.TSTrue
			} else {
				options.SkipLibCheck = core.TSTrue
			}
			files := map[string]string{
				"/lib/lib.d.ts":        deletionTestLib + "interface LibraryConsumer { property: RemovedGlobal; }",
				"/project/global.d.ts": "interface RemovedGlobal {}",
				"/project/consumer.ts": "export const unchanged = 1;",
			}
			old := newDeletionTestProgram(files, []string{"consumer.ts", "global.d.ts"}, options, nil)
			old.GetSemanticDiagnostics(t.Context(), nil)
			old.Emit(t.Context(), compiler.EmitOptions{})
			delete(files, "/project/global.d.ts")
			current := newDeletionTestProgram(files, []string{"consumer.ts"}, options, old)
			for _, file := range current.GetSourceFiles() {
				if !current.program.IsSourceFileDefaultLibrary(file.PathKey()) {
					continue
				}
				previous, ok := old.snapshot.semanticDiagnosticsPerFile.Load(file.PathKey())
				cached, reused := current.snapshot.semanticDiagnosticsPerFile.Load(file.PathKey())
				if !ok || !reused || cached != previous {
					t.Fatalf("skipped library diagnostics for %s not reused", file.FileName())
				}
				if current.snapshot.changedFilesSet.Has(file.PathKey()) {
					t.Fatalf("global removal marked skipped library %s changed", file.FileName())
				}
			}
			if diagnostics := current.GetSemanticDiagnostics(t.Context(), nil); len(diagnostics) != 0 {
				t.Fatalf("skipped library produced diagnostics: %v", diagnostics)
			}
		})
	}
}

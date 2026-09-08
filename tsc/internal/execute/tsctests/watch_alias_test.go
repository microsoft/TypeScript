package tsctests

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
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
)

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

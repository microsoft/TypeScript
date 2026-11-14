package tsctests

import (
	"context"
	"fmt"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/execute"
	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestWatchWildcardFiltersFiles(t *testing.T) {
	t.Parallel()
	for _, allowJS := range []bool{false, true} {
		t.Run(fmt.Sprintf("allowJs=%v", allowJS), func(t *testing.T) {
			t.Parallel()
			sys := newTestSys(&tscInput{
				cwd: "/app",
				files: FileMap{
					"/app/tsconfig.json": fmt.Sprintf(`{"compilerOptions":{"allowJs":%v,"declaration":true,"sourceMap":true,"outDir":"out","noLib":true},"include":["**/*"]}`, allowJS),
					"/app/index.ts":      `export const x = 1;`,
				},
			}, false)
			result := execute.CommandLine(t.Context(), sys, []string{"--watch"}, sys)
			w := result.Watcher.(*execute.Watcher)
			for _, name := range []string{"index.js", "index.d.ts", "index.js.map"} {
				assert.Assert(t, sys.fsFromFileMap().FileExists(tspath.RootedFilePathFromNormalized("/app/out/"+name)))
			}
			checkIgnored := func(path string, kind fswatch.EventKind) {
				t.Helper()
				builds := w.FullBuilds() + w.FastPathBuilds()
				sys.clearOutput()
				sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: kind, Path: path}})
				w.DoCycle(t.Context())
				if got := w.FullBuilds() + w.FastPathBuilds(); got != builds {
					t.Errorf("unexpected rebuild for %s (%s): builds changed from %d to %d", path, kind, builds, got)
				}
				if strings.Contains(sys.getOutput(false), "File change detected") {
					t.Errorf("unexpected compilation for %s (%s)", path, kind)
				}
			}
			for _, path := range []string{"/app/build.log", "/app/out/index.js", "/app/out/index.d.ts", "/app/out/index.js.map"} {
				sys.writeFileNoError(path, "unrelated")
				checkIgnored(path, fswatch.EventUpdate)
				sys.removeNoError(path)
				checkIgnored(path, fswatch.EventDelete)
			}
			if !allowJS {
				sys.writeFileNoError("/app/unrelated.js", "const unrelated = 1;")
				checkIgnored("/app/unrelated.js", fswatch.EventUpdate)
			}

			extension := ".ts"
			if allowJS {
				extension = ".js"
			}
			path := "/app/new" + extension
			sys.writeFileNoError(path, "export const added = 2;")
			sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: path}})
			w.DoCycle(t.Context())
			assert.Assert(t, strings.Contains(sys.readFileNoError("/app/out/new.js"), "added = 2"))

			sys.writeFileNoError("/app/index.ts", "export const x = 3;")
			sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: "/app/index.ts"}})
			w.DoCycle(t.Context())
			assert.Assert(t, strings.Contains(sys.readFileNoError("/app/out/index.js"), "x = 3"))
		})
	}
}

func TestWatchWildcardDirectoryEvents(t *testing.T) {
	t.Parallel()
	sys := newTestSys(&tscInput{
		cwd: "/app",
		files: FileMap{
			"/app/tsconfig.json": `{"compilerOptions":{"outDir":"out","noLib":true,"listFiles":true},"include":["**/*"]}`,
			"/app/index.ts":      `export const x = 1;`,
		},
	}, false)
	result := execute.CommandLine(t.Context(), sys, []string{"--watch"}, sys)
	w := result.Watcher.(*execute.Watcher)

	// Deliver only the directory event, as when a populated directory is moved into the project.
	sys.writeFileNoError("/app/generated.log/added.ts", "export const added = 2;")
	sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: "/app/generated.log"}})
	w.DoCycle(t.Context())
	assert.Assert(t, strings.Contains(sys.readFileNoError("/app/out/generated.log/added.js"), "added = 2"))
	assert.Assert(t, strings.Contains(sys.getOutput(false), "/app/generated.log/added.ts"))

	sys.removeNoError("/app/generated.log/added.ts")
	sys.removeNoError("/app/generated.log")
	builds := w.FullBuilds()
	sys.clearOutput()
	sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventDelete, Path: "/app/generated.log"}})
	w.DoCycle(t.Context())
	assert.Equal(t, w.FullBuilds(), builds+1)
	assert.Assert(t, !strings.Contains(sys.getOutput(false), "/app/generated.log/added.ts"),
		"the removed directory's source must no longer belong to the program")
}

func TestWatchWildcardFiltersSameDirectoryOutputs(t *testing.T) {
	t.Parallel()
	sys := newTestSys(&tscInput{
		cwd: "/app",
		files: FileMap{
			"/app/tsconfig.json": `{"compilerOptions":{"allowJs":true,"declaration":true},"include":["**/*"]}`,
			"/app/index.ts":      `export const value = 1;`,
		},
	}, false)
	result := execute.CommandLine(t.Context(), sys, []string{"--watch"}, sys)
	w := result.Watcher.(*execute.Watcher)
	for _, path := range []string{"/app/index.js", "/app/index.d.ts"} {
		assert.Assert(t, sys.fsFromFileMap().FileExists(tspath.RootedFilePathFromNormalized(path)))
		for _, kind := range []fswatch.EventKind{fswatch.EventUpdate, fswatch.EventDelete} {
			builds := w.FullBuilds() + w.FastPathBuilds()
			sys.clearOutput()
			if kind == fswatch.EventDelete {
				sys.removeNoError(path)
			}
			sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: kind, Path: path}})
			w.DoCycle(t.Context())
			if got := w.FullBuilds() + w.FastPathBuilds(); got != builds {
				t.Errorf("unexpected compilation for %s (%s): builds changed from %d to %d", path, kind, builds, got)
			}
			if strings.Contains(sys.getOutput(false), "File change detected") {
				t.Errorf("unexpected compilation status for %s (%s)", path, kind)
			}
		}
	}
}

func TestWatchWildcardUnwrittenDeclarationIsInput(t *testing.T) {
	t.Parallel()
	sys := newTestSys(&tscInput{
		cwd: "/app",
		files: FileMap{
			"/app/tsconfig.json": `{
				"compilerOptions":{"declaration":true,"declarationDir":"types","rootDir":"src","noEmitOnError":true,"listFiles":true},
				"include":["src","types"],"exclude":[]
			}`,
			"/app/src/a.ts":       `export const value: number = "error";`,
			"/app/types/keep.txt": "",
		},
	}, false)
	result := execute.CommandLine(t.Context(), sys, []string{"--watch"}, sys)
	w := result.Watcher.(*execute.Watcher)
	assert.Assert(t, strings.Contains(sys.getOutput(false), "TS2322"))
	assert.Assert(t, !sys.fsFromFileMap().FileExists("/app/types/a.d.ts"))

	sys.writeFileNoError("/app/types/a.d.ts", "declare const suppliedExternally: true;")
	sys.clearOutput()
	builds := w.FullBuilds()
	sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: "/app/types/a.d.ts"}})
	w.DoCycle(t.Context())
	assert.Equal(t, w.FullBuilds(), builds+1, "an unwritten potential output must be accepted as a new input")
	assert.Assert(t, strings.Contains(sys.getOutput(false), "/app/types/a.d.ts"))
}

func TestWatchWildcardTracksFirstFastPathOutputs(t *testing.T) {
	t.Parallel()
	sys := newTestSys(&tscInput{
		cwd: "/app",
		files: FileMap{
			"/app/tsconfig.json": `{"compilerOptions":{"allowJs":true,"declaration":true,"noEmitOnError":true},"include":["**/*"]}`,
			"/app/index.ts":      `export const value: number = "error";`,
		},
	}, false)
	result := execute.CommandLine(t.Context(), sys, []string{"--watch"}, sys)
	w := result.Watcher.(*execute.Watcher)
	assert.Assert(t, strings.Contains(sys.getOutput(false), "TS2322"))
	assert.Assert(t, !sys.fsFromFileMap().FileExists("/app/index.js"))
	assert.Assert(t, !sys.fsFromFileMap().FileExists("/app/index.d.ts"))

	sys.writeFileNoError("/app/index.ts", "export const value: number = 2;")
	sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: "/app/index.ts"}})
	w.DoCycle(t.Context())
	assert.Equal(t, w.FastPathBuilds(), 1)
	assert.Assert(t, strings.Contains(sys.readFileNoError("/app/index.js"), "value = 2"))
	assert.Assert(t, strings.Contains(sys.readFileNoError("/app/index.d.ts"), "value: number"))
	for _, path := range []string{"/app/index.js", "/app/index.d.ts"} {
		sys.clearOutput()
		builds := w.FullBuilds() + w.FastPathBuilds()
		sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: path}})
		w.DoCycle(t.Context())
		assert.Equal(t, w.FullBuilds()+w.FastPathBuilds(), builds)
		assert.Assert(t, !strings.Contains(sys.getOutput(false), "File change detected"))
	}
}

func TestWatchWildcardRetiresRemovedSourceOutputs(t *testing.T) {
	t.Parallel()
	sys := newTestSys(&tscInput{
		cwd: "/app",
		files: FileMap{
			"/app/tsconfig.json": `{"compilerOptions":{"composite":true,"emitDeclarationOnly":true,"listFiles":true},"include":["**/*"]}`,
			"/app/a.ts":          "export const a = 1;",
			"/app/b.ts":          "export const b = 2;",
		},
	}, false)
	result := execute.CommandLine(t.Context(), sys, []string{"--watch"}, sys)
	w := result.Watcher.(*execute.Watcher)
	assert.Assert(t, sys.fsFromFileMap().FileExists("/app/a.d.ts"))
	bModTime := sys.FS().Stat("/app/b.d.ts").ModTime()

	sys.removeNoError("/app/a.ts")
	sys.removeNoError("/app/a.d.ts")
	sys.clearOutput()
	sys.mockWatchBackend.SendEvents([]fswatch.Event{
		{Kind: fswatch.EventDelete, Path: "/app/a.ts"},
		{Kind: fswatch.EventDelete, Path: "/app/a.d.ts"},
	})
	w.DoCycle(t.Context())
	assert.Assert(t, !strings.Contains(sys.getOutput(false), "/app/a.ts"))
	assert.Equal(t, sys.FS().Stat("/app/b.d.ts").ModTime(), bModTime, "unchanged declarations must not be rewritten")

	sys.clearOutput()
	builds := w.FullBuilds() + w.FastPathBuilds()
	sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: "/app/b.d.ts"}})
	w.DoCycle(t.Context())
	assert.Equal(t, w.FullBuilds()+w.FastPathBuilds(), builds, "a skipped but still active output must remain ignored")
	assert.Assert(t, !strings.Contains(sys.getOutput(false), "File change detected"))

	sys.writeFileNoError("/app/a.d.ts", "declare const suppliedExternally: true;")
	sys.clearOutput()
	builds = w.FullBuilds()
	sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: "/app/a.d.ts"}})
	w.DoCycle(t.Context())
	assert.Equal(t, w.FullBuilds(), builds+1, "an old output must become discoverable after its source is removed")
	assert.Assert(t, strings.Contains(sys.getOutput(false), "/app/a.d.ts"))
}

func TestWatchWildcardRetiresReconfiguredOutputs(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name    string
		options string
	}{
		{name: "moved declaration directory", options: `"declarationDir":"next"`},
		{name: "disabled emission", options: `"declarationDir":"types","noEmit":true`},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			config := func(options string) string {
				return `{"compilerOptions":{"declaration":true,"emitDeclarationOnly":true,"rootDir":"src","listFiles":true,` + options + `},"include":["src","types"],"exclude":[]}`
			}
			sys := newTestSys(&tscInput{
				cwd: "/app",
				files: FileMap{
					"/app/tsconfig.json": config(`"declarationDir":"types"`),
					"/app/src/a.ts":      "export const a = 1;",
				},
			}, false)
			result := execute.CommandLine(t.Context(), sys, []string{"--watch"}, sys)
			w := result.Watcher.(*execute.Watcher)
			assert.Assert(t, sys.fsFromFileMap().FileExists("/app/types/a.d.ts"))

			sys.removeNoError("/app/types/a.d.ts")
			sys.writeFileNoError("/app/tsconfig.json", config(test.options))
			sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: "/app/tsconfig.json"}})
			w.DoCycle(t.Context())

			sys.writeFileNoError("/app/types/a.d.ts", "declare const suppliedExternally: true;")
			sys.clearOutput()
			builds := w.FullBuilds()
			sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: "/app/types/a.d.ts"}})
			w.DoCycle(t.Context())
			assert.Equal(t, w.FullBuilds(), builds+1, "a retired output must become discoverable after reconfiguration")
			assert.Assert(t, strings.Contains(sys.getOutput(false), "/app/types/a.d.ts"))
		})
	}
}

func TestWatchReplacedDirectoryMixedUpdate(t *testing.T) {
	t.Parallel()
	sys := newTestSys(&tscInput{
		cwd: "/app",
		files: FileMap{
			"/app/tsconfig.json": `{"compilerOptions":{"outDir":"out"},"include":["**/*"]}`,
			"/app/main.ts":       `import { value } from "./lib/value"; export const main = value;`,
			"/app/lib/value.ts":  "export const value = 1;",
		},
	}, false)
	result := execute.CommandLine(t.Context(), sys, []string{"--watch"}, sys)
	w := result.Watcher.(*execute.Watcher)
	modTime := sys.FS().Stat("/app/lib/value.ts").ModTime()
	sys.removeNoError("/app/lib/value.ts")
	sys.removeNoError("/app/lib")
	sys.writeFileNoError("/app/lib/value.ts", "export const value = 2;")
	assert.NilError(t, sys.FS().Chtimes("/app/lib/value.ts", modTime, modTime))
	sys.writeFileNoError("/app/main.ts", `import { value } from "./lib/value"; export const updated = value;`)
	builds := w.FullBuilds()
	sys.mockWatchBackend.SendEvents([]fswatch.Event{
		{Kind: fswatch.EventUpdate, Path: "/app/lib"},
		{Kind: fswatch.EventUpdate, Path: "/app/main.ts"},
	})
	w.DoCycle(t.Context())
	assert.Assert(t, strings.Contains(sys.readFileNoError("/app/out/lib/value.js"), "value = 2"),
		"replacing a directory with preserved timestamps must invalidate its cached sources")
	assert.Equal(t, w.FullBuilds(), builds+1)
}

func TestWatchDirectoryReplacedByFile(t *testing.T) {
	t.Parallel()
	for _, directory := range []string{"lib", "lib.ts"} {
		for _, roots := range []struct {
			name   string
			config string
		}{
			{name: "wildcard", config: `"include":["**/*"]`},
			{name: "explicit", config: `"files":["main.ts"]`},
		} {
			for _, mixed := range []bool{false, true} {
				t.Run(fmt.Sprintf("%s/%s/mixed=%v", directory, roots.name, mixed), func(t *testing.T) {
					t.Parallel()
					source := "/app/" + directory + "/nested/value.ts"
					main := fmt.Sprintf(`import { value } from "./%s/nested/value"; export const main = value;`, directory)
					sys := newTestSys(&tscInput{
						cwd: "/app",
						files: FileMap{
							"/app/tsconfig.json": `{"compilerOptions":{"outDir":"out","listFiles":true},` + roots.config + `}`,
							"/app/main.ts":       main,
							source:               "export const value = 1;",
							"/app/" + directory + "/nested/package.json": `{"type":"commonjs"}`,
						},
					}, false)
					result := execute.CommandLine(t.Context(), sys, []string{"--watch"}, sys)
					w := result.Watcher.(*execute.Watcher)
					assert.Assert(t, strings.Contains(sys.getOutput(false), source))
					assert.Assert(t, strings.Contains(sys.getOutput(false), "Found 0 errors"), sys.getOutput(false))

					sys.removeNoError(source)
					sys.removeNoError("/app/" + directory + "/nested/package.json")
					sys.removeNoError("/app/" + directory + "/nested")
					sys.removeNoError("/app/" + directory)
					sys.writeFileNoError("/app/"+directory, "export const replacement = 2;")
					events := []fswatch.Event{{Kind: fswatch.EventUpdate, Path: "/app/" + directory}}
					if mixed {
						sys.writeFileNoError("/app/main.ts", main+"\nexport const updated = true;")
						events = append(events, fswatch.Event{Kind: fswatch.EventUpdate, Path: "/app/main.ts"})
					}
					sys.clearOutput()
					sys.mockWatchBackend.SendEvents(events)
					w.DoCycle(t.Context())
					assert.Assert(t, strings.Contains(sys.getOutput(false), "TS2307"),
						"replacing an imported directory with a file must invalidate module resolution")
					assert.Assert(t, !strings.Contains(sys.getOutput(false), source),
						"the removed directory's source must no longer belong to the program")
					if directory == "lib.ts" && roots.name == "wildcard" {
						assert.Assert(t, strings.Contains(sys.getOutput(false), "/app/lib.ts\n"),
							"the replacement source file must be discovered")
					}
				})
			}
		}
	}
}

func TestWatchExcludedBuildDirectoryEvents(t *testing.T) {
	t.Parallel()
	for _, exclude := range []string{"build", "build/**", "build/**/*"} {
		t.Run(exclude, func(t *testing.T) {
			t.Parallel()
			sys := newTestSys(&tscInput{
				cwd: "/app",
				files: FileMap{
					"/app/tsconfig.json": fmt.Sprintf(`{
				"compilerOptions":{"incremental":true,"outDir":"out","tsBuildInfoFile":"./build/tsconfig.tsbuildinfo"},
				"include":["**/*"],"exclude":[%q,"out"]
			}`, exclude),
					"/app/main.ts": "export const main = 1;",
				},
			}, false)
			result := execute.CommandLine(t.Context(), sys, []string{"--watch"}, sys)
			w := result.Watcher.(*execute.Watcher)
			assert.Assert(t, sys.fsFromFileMap().FileExists("/app/build/tsconfig.tsbuildinfo"))
			sys.clearOutput()
			builds := w.FullBuilds() + w.FastPathBuilds()
			sys.mockWatchBackend.SendEvents([]fswatch.Event{
				{Kind: fswatch.EventUpdate, Path: "/app/build"},
				{Kind: fswatch.EventUpdate, Path: "/app/build/tsconfig.tsbuildinfo"},
			})
			w.DoCycle(t.Context())
			assert.Equal(t, w.FullBuilds()+w.FastPathBuilds(), builds)
			assert.Assert(t, !strings.Contains(sys.getOutput(false), "File change detected"))

			sys.writeFileNoError("/app/build-other/new.ts", "export const added = 2;")
			sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: "/app/build-other"}})
			w.DoCycle(t.Context())
			assert.Assert(t, strings.Contains(sys.readFileNoError("/app/out/build-other/new.js"), "added = 2"))
		})
	}
}

func TestWatchExcludedDirectoryKeepsImportedDependencies(t *testing.T) {
	t.Parallel()
	sys := newTestSys(&tscInput{
		cwd: "/app",
		files: FileMap{
			"/app/tsconfig.json": `{
				"compilerOptions":{"incremental":true,"outDir":"out","tsBuildInfoFile":"./build/tsconfig.tsbuildinfo"},
				"include":["**/*"],"exclude":["build","out"]
			}`,
			"/app/main.ts":             `export { value } from "./build/dependency";`,
			"/app/build/dependency.ts": "export const value = 1;",
		},
	}, false)
	result := execute.CommandLine(t.Context(), sys, []string{"--watch"}, sys)
	w := result.Watcher.(*execute.Watcher)
	sys.writeFileNoError("/app/build/dependency.ts", "export const value = 2;")
	sys.mockWatchBackend.SendEvents([]fswatch.Event{
		{Kind: fswatch.EventUpdate, Path: "/app/build"},
		{Kind: fswatch.EventUpdate, Path: "/app/build/tsconfig.tsbuildinfo"},
	})
	w.DoCycle(t.Context())
	assert.Assert(t, strings.Contains(sys.readFileNoError("/app/out/build/dependency.js"), "value = 2"))
}

func TestWatchRestoredDeclarationOutputEvents(t *testing.T) {
	t.Parallel()
	sys := newTestSys(&tscInput{
		cwd: "/app",
		files: FileMap{
			"/app/tsconfig.json": `{"compilerOptions":{"composite":true,"emitDeclarationOnly":true}}`,
			"/app/main.ts":       "export const main = 1;",
		},
	}, false)
	prebuild := execute.CommandLine(t.Context(), sys, nil, sys)
	assert.Equal(t, int(prebuild.Status), 0)
	modTime := sys.FS().Stat("/app/main.d.ts").ModTime()
	assert.Assert(t, sys.fsFromFileMap().FileExists("/app/tsconfig.tsbuildinfo"))
	result := execute.CommandLine(t.Context(), sys, []string{"--watch"}, sys)
	w := result.Watcher.(*execute.Watcher)
	assert.Equal(t, sys.FS().Stat("/app/main.d.ts").ModTime(), modTime, "restart must skip unchanged declaration writes")

	sys.clearOutput()
	builds := w.FullBuilds() + w.FastPathBuilds()
	sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: "/app/main.d.ts"}})
	w.DoCycle(t.Context())
	assert.Equal(t, w.FullBuilds()+w.FastPathBuilds(), builds)
	assert.Assert(t, !strings.Contains(sys.getOutput(false), "File change detected"))
}

func TestWatchRestoredUnwrittenDeclarationIsInput(t *testing.T) {
	t.Parallel()
	sys := newTestSys(&tscInput{
		cwd: "/app",
		files: FileMap{
			"/app/tsconfig.json": `{
				"compilerOptions":{"composite":true,"noEmitOnError":true,"rootDir":"src","declarationDir":"types","listFiles":true},
				"include":["src","types"],"exclude":[]
			}`,
			"/app/src/a.ts":       `export const value: number = "error";`,
			"/app/types/keep.txt": "",
		},
	}, false)
	prebuild := execute.CommandLine(t.Context(), sys, nil, sys)
	assert.Equal(t, int(prebuild.Status), 1)
	assert.Assert(t, sys.fsFromFileMap().FileExists("/app/tsconfig.tsbuildinfo"))
	assert.Assert(t, !sys.fsFromFileMap().FileExists("/app/types/a.d.ts"))
	result := execute.CommandLine(t.Context(), sys, []string{"--watch"}, sys)
	w := result.Watcher.(*execute.Watcher)

	sys.writeFileNoError("/app/types/a.d.ts", "declare const suppliedExternally: true;")
	sys.clearOutput()
	builds := w.FullBuilds()
	sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: "/app/types/a.d.ts"}})
	w.DoCycle(t.Context())
	assert.Equal(t, w.FullBuilds(), builds+1)
	assert.Assert(t, strings.Contains(sys.getOutput(false), "/app/types/a.d.ts"))
}

// shallowProjectFiles is a project close to the filesystem root (a common Docker WORKDIR) that imports a file from a
// sibling directory which is not part of "include", plus a bare import whose failed lookups walk up to /node_modules.
func shallowProjectFiles(compilerOptions string) FileMap {
	return FileMap{
		"/app/tsconfig.json": `{"compilerOptions":{` + compilerOptions + `"rootDir":"..","outDir":"out","noLib":true},"include":["*.ts"]}`,
		"/app/index.ts": `import { s } from "../shared/s";
// @ts-ignore
import "missing-package";
export const x = s;`,
		"/shared/s.ts": `export const s = 1;`,
	}
}

// isWatched reports whether dir has an open watch. The mock keeps closed watches in Dirs, so a nil check is not enough.
func isWatched(sys *TestSys, dir tspath.RootedDirectoryPath) bool {
	w := sys.mockWatchBackend.Dirs[dir]
	return w != nil && !w.Closed
}

func assertShallowProjectWatches(t *testing.T, sys *TestSys) {
	t.Helper()
	assert.Assert(t, isWatched(sys, "/app"), "the tsconfig directory /app must be watched")
	assert.Assert(t, isWatched(sys, "/shared"), "the directory of the imported program file /shared/s.ts must be watched")
	// Failed lookups of "missing-package" reach /node_modules. They must not turn into a watch on /.
	assert.Assert(t, !isWatched(sys, "/"), "/ must never be watched")
}

func editShallowProjectFiles(t *testing.T, sys *TestSys, w interface{ DoCycle(ctx context.Context) }) {
	t.Helper()
	fs := sys.fsFromFileMap()

	sys.writeFileNoError("/shared/s.ts", `export const s = 2;`)
	sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: "/shared/s.ts"}})
	w.DoCycle(t.Context())
	out, _ := fs.ReadFile("/app/out/shared/s.js")
	assert.Assert(t, strings.Contains(out, "s = 2"), "editing /shared/s.ts must rebuild, got:\n%s", out)

	sys.writeFileNoError("/app/index.ts", `import { s } from "../shared/s"; export const y = s;`)
	sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: "/app/index.ts"}})
	w.DoCycle(t.Context())
	out, _ = fs.ReadFile("/app/out/app/index.js")
	assert.Assert(t, strings.Contains(out, "y = "), "editing /app/index.ts must rebuild, got:\n%s", out)
}

// TestWatchShallowProjectWithImportedFile verifies that tsc --watch rebuilds a project that lives close to the
// filesystem root, both for its own files and for a file it imports from outside "include".
func TestWatchShallowProjectWithImportedFile(t *testing.T) {
	t.Parallel()
	sys := newTestSys(&tscInput{files: shallowProjectFiles(""), cwd: "/app"}, false)
	result := execute.CommandLine(context.Background(), sys, []string{"--watch"}, sys)
	assert.Assert(t, result.Watcher != nil)

	assertShallowProjectWatches(t, sys)
	editShallowProjectFiles(t, sys, result.Watcher)
}

// TestBuildWatchShallowProjectWithImportedFile is the tsc -b --watch variant of
// TestWatchShallowProjectWithImportedFile.
func TestBuildWatchShallowProjectWithImportedFile(t *testing.T) {
	t.Parallel()
	sys := newTestSys(&tscInput{files: shallowProjectFiles(`"composite":true,`), cwd: "/app"}, false)
	ctx, cancel := context.WithCancel(t.Context())
	defer cancel()
	result := execute.CommandLine(ctx, sys, []string{"--build", "--watch"}, sys)
	assert.Assert(t, result.Watcher != nil)

	assertShallowProjectWatches(t, sys)
	editShallowProjectFiles(t, sys, result.Watcher)
}

// shallowRootFileProjectFiles is a project in /app whose "files" list a root file in the sibling directory /shared.
func shallowRootFileProjectFiles(compilerOptions string) FileMap {
	return FileMap{
		"/app/tsconfig.json": `{"compilerOptions":{` + compilerOptions + `"rootDir":"..","outDir":"out","noLib":true},"files":["index.ts","../shared/root.ts"]}`,
		"/app/index.ts":      `export const x = 1;`,
		"/shared/root.ts":    `export const r = 1;`,
	}
}

// deleteAndRecreateShallowRootFile deletes /shared/root.ts and writes it back. While the file is missing it is not
// part of the program, but it is still a root file, so /shared must stay watched for the rebuild on recreation.
func deleteAndRecreateShallowRootFile(t *testing.T, sys *TestSys, w interface{ DoCycle(ctx context.Context) }) {
	t.Helper()
	fs := sys.fsFromFileMap()
	assert.Assert(t, isWatched(sys, "/shared"), "the directory of the root file /shared/root.ts must be watched")

	sys.removeNoError("/shared/root.ts")
	sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventDelete, Path: "/shared/root.ts"}})
	w.DoCycle(t.Context())
	assert.Assert(t, isWatched(sys, "/shared"), "/shared must stay watched while the root file /shared/root.ts is missing")
	assert.Assert(t, !isWatched(sys, "/"), "/ must never be watched")

	sys.writeFileNoError("/shared/root.ts", `export const r = 2;`)
	sys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: "/shared/root.ts"}})
	w.DoCycle(t.Context())
	out, _ := fs.ReadFile("/app/out/shared/root.js")
	assert.Assert(t, strings.Contains(out, "r = 2"), "recreating /shared/root.ts must rebuild, got:\n%s", out)
}

// TestWatchShallowProjectRecreatedRootFile verifies that tsc --watch rebuilds when a root file near the filesystem
// root is deleted and created again.
func TestWatchShallowProjectRecreatedRootFile(t *testing.T) {
	t.Parallel()
	sys := newTestSys(&tscInput{files: shallowRootFileProjectFiles(""), cwd: "/app"}, false)
	result := execute.CommandLine(context.Background(), sys, []string{"--watch"}, sys)
	assert.Assert(t, result.Watcher != nil)

	deleteAndRecreateShallowRootFile(t, sys, result.Watcher)
}

// TestBuildWatchShallowProjectRecreatedRootFile is the tsc -b --watch variant of
// TestWatchShallowProjectRecreatedRootFile.
func TestBuildWatchShallowProjectRecreatedRootFile(t *testing.T) {
	t.Parallel()
	sys := newTestSys(&tscInput{files: shallowRootFileProjectFiles(`"composite":true,`), cwd: "/app"}, false)
	ctx, cancel := context.WithCancel(t.Context())
	defer cancel()
	result := execute.CommandLine(ctx, sys, []string{"--build", "--watch"}, sys)
	assert.Assert(t, result.Watcher != nil)

	deleteAndRecreateShallowRootFile(t, sys, result.Watcher)
}

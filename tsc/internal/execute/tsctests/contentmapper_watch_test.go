package tsctests

import (
	"context"
	"io"
	"strings"
	"sync"
	"sync/atomic"
	"testing"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/execute"
	"github.com/microsoft/TypeScript/tsc/internal/execute/tsc"
	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/contentmappertest"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

type recordingContentMapperSystem struct {
	*TestSys
	spawner *recordingContentMapperSpawner
}

func (s *recordingContentMapperSystem) Spawn(command []string, dir string, stderr io.Writer) (io.ReadWriteCloser, error) {
	return s.spawner.Spawn(command, dir, stderr)
}

type recordingContentMapperSpawner struct {
	inner  contentmapper.Spawner
	spawns atomic.Int32
	closes atomic.Int32
	closed chan<- struct{}
}

func (s *recordingContentMapperSpawner) Spawn(command []string, dir string, stderr io.Writer) (io.ReadWriteCloser, error) {
	process, err := s.inner.Spawn(command, dir, stderr)
	if err != nil {
		return nil, err
	}
	s.spawns.Add(1)
	return &recordingContentMapperProcess{ReadWriteCloser: process, closes: &s.closes, closed: s.closed}, nil
}

type recordingContentMapperProcess struct {
	io.ReadWriteCloser
	closes *atomic.Int32
	closed chan<- struct{}
	once   sync.Once
}

func (p *recordingContentMapperProcess) Close() error {
	var err error
	p.once.Do(func() {
		p.closes.Add(1)
		err = p.ReadWriteCloser.Close()
		if p.closed != nil {
			p.closed <- struct{}{}
		}
	})
	return err
}

func TestContentMapperBuildLifecycle(t *testing.T) {
	t.Parallel()
	input := &tscInput{files: FileMap{
		"/home/src/workspaces/project/tsconfig.json": `{
			"compilerOptions": { "composite": true },
			"contentMappers": [{ "package": "mapper", "extensions": [".vue"] }]
		}`,
		"/home/src/workspaces/project/app.vue":                          `export const app = 1;`,
		"/home/src/workspaces/project/node_modules/mapper/package.json": contentmappertest.PackageJSON(contentmappertest.VerbatimMapper),
	}}
	testSys := newTestSys(input, false)
	spawner := &recordingContentMapperSpawner{inner: contentmappertest.NewSpawner()}
	sys := &recordingContentMapperSystem{TestSys: testSys, spawner: spawner}

	result := execute.CommandLine(t.Context(), sys, []string{"--build", "--runExternalCode"}, testSys)
	assert.Assert(t, result.Watcher == nil)
	assert.Equal(t, spawner.spawns.Load(), int32(1))
	assert.Equal(t, spawner.closes.Load(), int32(1))
}

func TestContentMapperSupplementalDiagnosticUsesOriginalFileName(t *testing.T) {
	t.Parallel()
	input := &tscInput{files: FileMap{
		"/home/src/workspaces/project/tsconfig.json": `{
			"compilerOptions": { "noEmit": true },
			"contentMappers": [{ "package": "mapper", "extensions": [".astro"] }]
		}`,
		"/home/src/workspaces/project/app.astro":                        `const value: string = 1;`,
		"/home/src/workspaces/project/node_modules/mapper/package.json": contentmappertest.PackageJSON(contentmappertest.SupplementalDiagnosticsMapper),
	}}
	testSys := newTestSys(input, false)
	sys := &recordingContentMapperSystem{
		TestSys: testSys,
		spawner: &recordingContentMapperSpawner{inner: contentmappertest.NewSpawner()},
	}

	result := execute.CommandLine(t.Context(), sys, []string{"--pretty", "false", "--runExternalCode"}, testSys)
	assert.Equal(t, result.Status, tsc.ExitStatusDiagnosticsPresent_OutputsGenerated)
	output := testSys.currentWrite.String()
	assert.Assert(t, strings.Contains(output, "app.astro(1,1): error TS2304"), output)
	assert.Assert(t, strings.Contains(output, "app.astro(1,7): error TS2322"), output)
	assert.Assert(t, !strings.Contains(output, "app.astro.0.ts"), output)
}

func TestContentMapperBuildDetectsNewPhysicalSupplementalFile(t *testing.T) {
	t.Parallel()
	const supplementalFileName = "/home/src/workspaces/project/app.vue.0.ts"
	input := &tscInput{files: FileMap{
		"/home/src/workspaces/project/tsconfig.json": `{
			"compilerOptions": { "incremental": true },
			"files": ["app.vue"],
			"contentMappers": [{ "package": "mapper", "extensions": [".vue"] }]
		}`,
		"/home/src/workspaces/project/app.vue":                          `declare const value: number;`,
		"/home/src/workspaces/project/node_modules/mapper/package.json": contentmappertest.PackageJSON(contentmappertest.SupplementalMapper),
	}}
	testSys := newTestSys(input, false)
	sys := &recordingContentMapperSystem{
		TestSys: testSys,
		spawner: &recordingContentMapperSpawner{inner: contentmappertest.NewSpawner()},
	}
	args := []string{"--build", "--pretty", "false", "--runExternalCode"}
	result := execute.CommandLine(t.Context(), sys, args, testSys)
	assert.Equal(t, result.Status, tsc.ExitStatusSuccess, testSys.currentWrite.String())

	testSys.clearOutput()
	testSys.writeFileNoError(supplementalFileName, "export {};\n")
	result = execute.CommandLine(t.Context(), sys, args, testSys)
	assert.Equal(t, result.Status, tsc.ExitStatusDiagnosticsPresent_OutputsGenerated)
	assert.Assert(t, strings.Contains(testSys.currentWrite.String(), "TS100025"), testSys.currentWrite.String())
	assert.Assert(t, strings.Contains(testSys.currentWrite.String(), "conflicts with an existing file"), testSys.currentWrite.String())
}

func TestContentMapperBuildIdentityFailureExitStatus(t *testing.T) {
	t.Parallel()
	const packageJSONPath = "/home/src/workspaces/project/node_modules/mapper/package.json"
	input := &tscInput{files: FileMap{
		"/home/src/workspaces/project/tsconfig.json": `{
			"compilerOptions": { "composite": true },
			"contentMappers": [{ "package": "mapper", "extensions": [".vue"] }]
		}`,
		"/home/src/workspaces/project/app.vue": `export const app = 1;`,
		packageJSONPath:                        contentmappertest.PackageJSON(contentmappertest.DynamicVerbatimMapper),
	}}
	testSys := newTestSys(input, false)
	sys := &recordingContentMapperSystem{
		TestSys: testSys,
		spawner: &recordingContentMapperSpawner{inner: contentmappertest.NewSpawner()},
	}
	args := []string{"--build", "--runExternalCode"}
	result := execute.CommandLine(t.Context(), sys, args, testSys)
	assert.Equal(t, result.Status, tsc.ExitStatusSuccess)

	testSys.writeFileNoError(packageJSONPath, `{
		"name": "mapper",
		"version": "1.0.0",
		"typescript": { "contentMapper": { "exec": ["missing-mapper"], "dynamicConfig": true } }
	}`)
	result = execute.CommandLine(t.Context(), sys, args, testSys)
	assert.Equal(t, result.Status, tsc.ExitStatusDiagnosticsPresent_OutputsSkipped)
}

func TestContentMapperWatchLifecycle(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name string
		args []string
	}{
		{name: "watch", args: []string{"--watch", "--runExternalCode"}},
		{name: "build watch", args: []string{"--build", "--watch", "--runExternalCode"}},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			const configFileName = "/home/src/workspaces/project/tsconfig.json"
			input := &tscInput{files: FileMap{
				configFileName: `{
					"compilerOptions": { "composite": true },
					"contentMappers": [{ "package": "mapper-a", "extensions": [".vue"] }]
				}`,
				"/home/src/workspaces/project/app.vue":                            `export const app = 1;`,
				"/home/src/workspaces/project/node_modules/mapper-a/package.json": contentmappertest.PackageJSON(contentmappertest.VerbatimMapper),
				"/home/src/workspaces/project/node_modules/mapper-b/package.json": strings.Replace(contentmappertest.PackageJSON(contentmappertest.VerbatimMapper), `"version": "1.0.0"`, `"version": "2.0.0"`, 1),
			}}
			testSys := newTestSys(input, false)
			closed := make(chan struct{}, 3)
			spawner := &recordingContentMapperSpawner{inner: contentmappertest.NewSpawner(), closed: closed}
			sys := &recordingContentMapperSystem{TestSys: testSys, spawner: spawner}
			ctx, cancel := context.WithCancel(t.Context())
			defer cancel()

			result := execute.CommandLine(ctx, sys, test.args, testSys)
			assert.Assert(t, result.Watcher != nil)
			assert.Equal(t, spawner.spawns.Load(), int32(1))
			assert.Equal(t, spawner.closes.Load(), int32(0))

			testSys.writeFileNoError(configFileName, `{
				"compilerOptions": { "composite": true },
				"contentMappers": [{ "package": "mapper-b", "extensions": [".vue"] }]
			}`)
			testSys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: configFileName}})
			result.Watcher.DoCycle()

			assert.Equal(t, spawner.spawns.Load(), int32(2))
			assert.Equal(t, spawner.closes.Load(), int32(1))
			<-closed

			testSys.writeFileNoError(configFileName, `{ "compilerOptions": { "composite": true } }`)
			testSys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: configFileName}})
			result.Watcher.DoCycle()

			assert.Equal(t, spawner.closes.Load(), int32(2))
			<-closed

			testSys.writeFileNoError(configFileName, `{
				"compilerOptions": { "composite": true },
				"contentMappers": [{ "package": "mapper-a", "extensions": [".vue"] }]
			}`)
			testSys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: configFileName}})
			result.Watcher.DoCycle()

			assert.Equal(t, spawner.spawns.Load(), int32(3))
			assert.Equal(t, spawner.closes.Load(), int32(2))
			cancel()
			closedAfterCancellation := false
			select {
			case <-closed:
				closedAfterCancellation = true
			case <-time.After(time.Second):
				closedAfterCancellation = false
			}
			assert.Assert(t, closedAfterCancellation, "content mapper process was not closed after cancellation")
			assert.Equal(t, spawner.closes.Load(), int32(3))
		})
	}
}

func TestContentMapperSupplementalCollisionWatch(t *testing.T) {
	t.Parallel()
	const supplementalFileName = "/home/src/workspaces/project/app.vue.0.ts"
	input := &tscInput{files: FileMap{
		"/home/src/workspaces/project/tsconfig.json": `{
			"compilerOptions": { "noLib": true },
			"contentMappers": [{ "package": "mapper", "extensions": [".vue"] }]
		}`,
		"/home/src/workspaces/project/app.vue":                          `declare const value: number;`,
		"/home/src/workspaces/project/node_modules/mapper/package.json": contentmappertest.PackageJSON(contentmappertest.SupplementalMapper),
	}}
	testSys := newTestSys(input, false)
	spawner := &recordingContentMapperSpawner{inner: contentmappertest.NewSpawner()}
	sys := &recordingContentMapperSystem{TestSys: testSys, spawner: spawner}
	ctx, cancel := context.WithCancel(t.Context())
	defer cancel()

	result := execute.CommandLine(ctx, sys, []string{"--watch", "--runExternalCode"}, testSys)
	w := result.Watcher.(*execute.Watcher)
	fullBuilds := w.FullBuilds()

	testSys.writeFileNoError(supplementalFileName, "export {};\n")
	testSys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: supplementalFileName}})
	w.DoCycle()
	assert.Equal(t, w.FullBuilds(), fullBuilds+1, "creating a supplemental filename collision must force a full rebuild")

	assert.NilError(t, testSys.fsFromFileMap().Remove(supplementalFileName))
	testSys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: supplementalFileName}})
	w.DoCycle()
	assert.Equal(t, w.FullBuilds(), fullBuilds+2, "removing a supplemental filename collision must force a full rebuild")
}

func TestDynamicContentMapperWatchDependency(t *testing.T) {
	t.Parallel()
	const mapperConfigFileName = "/home/src/workspaces/project/mapper.config.json"
	input := &tscInput{files: FileMap{
		"/home/src/workspaces/project/tsconfig.json": `{
			"compilerOptions": { "composite": true },
			"contentMappers": [{ "package": "mapper", "extensions": [".vue"] }]
		}`,
		mapperConfigFileName:                                            `{ "version": 1 }`,
		"/home/src/workspaces/project/app.vue":                          `export const app = 1;`,
		"/home/src/workspaces/project/node_modules/mapper/package.json": contentmappertest.PackageJSON(contentmappertest.DynamicVerbatimMapper),
	}}
	testSys := newTestSys(input, false)
	lifecycle := &contentmappertest.ProjectLifecycle{}
	spawner := &recordingContentMapperSpawner{inner: contentmappertest.NewSpawnerWithProjectLifecycle(lifecycle)}
	sys := &recordingContentMapperSystem{TestSys: testSys, spawner: spawner}
	ctx, cancel := context.WithCancel(t.Context())
	defer cancel()

	result := execute.CommandLine(ctx, sys, []string{"--watch", "--runExternalCode"}, testSys)
	w := result.Watcher.(*execute.Watcher)
	fullBuilds := w.FullBuilds()

	testSys.writeFileNoError(mapperConfigFileName, `{ "version": 2 }`)
	testSys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: mapperConfigFileName}})
	w.DoCycle()

	assert.Equal(t, w.FullBuilds(), fullBuilds+1)
	assert.Equal(t, lifecycle.Opens.Load(), int32(2))
	assert.Equal(t, lifecycle.Closes.Load(), int32(1))
	assert.Equal(t, spawner.spawns.Load(), int32(1))
	assert.Equal(t, spawner.closes.Load(), int32(0))
}

func TestContentMapperMixedWatchBatchForcesFullRebuild(t *testing.T) {
	t.Parallel()
	const (
		mappedFileName = "/home/src/workspaces/project/app.vue"
		mainFileName   = "/home/src/workspaces/project/main.ts"
	)
	input := &tscInput{files: FileMap{
		"/home/src/workspaces/project/tsconfig.json": `{
			"compilerOptions": { "noLib": true },
			"contentMappers": [{ "package": "mapper", "extensions": [".vue"] }]
		}`,
		mappedFileName: `export const marker = 1 as const;`,
		mainFileName:   `import { marker } from "./app.vue"; const check: 1 = marker;`,
		"/home/src/workspaces/project/node_modules/mapper/package.json": contentmappertest.PackageJSON(contentmappertest.VerbatimMapper),
	}}
	testSys := newTestSys(input, false)
	testSys.currentWrite.Reset()
	sys := &recordingContentMapperSystem{
		TestSys: testSys,
		spawner: &recordingContentMapperSpawner{inner: contentmappertest.NewSpawner()},
	}
	ctx, cancel := context.WithCancel(t.Context())
	defer cancel()

	result := execute.CommandLine(ctx, sys, []string{"--watch", "--pretty", "false", "--runExternalCode"}, testSys)
	w := result.Watcher.(*execute.Watcher)
	fastBuilds, fullBuilds := w.FastPathBuilds(), w.FullBuilds()
	testSys.currentWrite.Reset()
	testSys.writeFileNoError(mappedFileName, `export const marker = 2 as const;`)
	testSys.writeFileNoError(mainFileName, `import { marker } from "./app.vue"; const check: 2 = marker;`)
	testSys.mockWatchBackend.SendEvents([]fswatch.Event{
		{Kind: fswatch.EventUpdate, Path: mappedFileName},
		{Kind: fswatch.EventUpdate, Path: mainFileName},
	})
	w.DoCycle()

	assert.Equal(t, w.FullBuilds(), fullBuilds+1)
	assert.Equal(t, w.FastPathBuilds(), fastBuilds)
	assert.Assert(t, !strings.Contains(testSys.currentWrite.String(), "Type '1' is not assignable to type '2'"), testSys.currentWrite.String())
}

func TestDynamicContentMapperBuildWatchDependency(t *testing.T) {
	t.Parallel()
	const mapperConfigFileName = "/home/src/workspaces/project/mapper.config.json"
	input := &tscInput{files: FileMap{
		"/home/src/workspaces/project/tsconfig.json": `{
			"compilerOptions": { "composite": true },
			"contentMappers": [{ "package": "mapper", "extensions": [".vue"] }]
		}`,
		mapperConfigFileName:                                            `{ "version": 1 }`,
		"/home/src/workspaces/project/app.vue":                          `export const app = 1;`,
		"/home/src/workspaces/project/node_modules/mapper/package.json": contentmappertest.PackageJSON(contentmappertest.DynamicVerbatimMapper),
	}}
	testSys := newTestSys(input, false)
	lifecycle := &contentmappertest.ProjectLifecycle{}
	spawner := &recordingContentMapperSpawner{inner: contentmappertest.NewSpawnerWithProjectLifecycle(lifecycle)}
	sys := &recordingContentMapperSystem{TestSys: testSys, spawner: spawner}
	ctx, cancel := context.WithCancel(t.Context())
	defer cancel()

	result := execute.CommandLine(ctx, sys, []string{"--build", "--watch", "--runExternalCode"}, testSys)
	assert.Equal(t, lifecycle.Opens.Load(), int32(1))

	testSys.writeFileNoError(mapperConfigFileName, `{ "version": 2 }`)
	testSys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: mapperConfigFileName}})
	result.Watcher.DoCycle()

	assert.Equal(t, lifecycle.Opens.Load(), int32(2))
	assert.Equal(t, lifecycle.Closes.Load(), int32(1))
	assert.Equal(t, spawner.spawns.Load(), int32(1))
	assert.Equal(t, spawner.closes.Load(), int32(0))
}

func TestContentMapperBuildWatchSymlinkedManifestChange(t *testing.T) {
	t.Parallel()
	const manifestTarget = "/home/src/workspaces/mapper/package.json"
	input := &tscInput{files: FileMap{
		"/home/src/workspaces/project/tsconfig.json": `{
			"compilerOptions": { "composite": true },
			"contentMappers": [{ "package": "mapper", "extensions": [".vue"] }]
		}`,
		"/home/src/workspaces/project/app.vue":             `export const app = 1;`,
		"/home/src/workspaces/project/node_modules/mapper": vfstest.Symlink("/home/src/workspaces/mapper"),
		manifestTarget: contentmappertest.PackageJSON(contentmappertest.VerbatimMapper),
	}}
	testSys := newTestSys(input, false)
	spawner := &recordingContentMapperSpawner{inner: contentmappertest.NewSpawner()}
	sys := &recordingContentMapperSystem{TestSys: testSys, spawner: spawner}
	ctx, cancel := context.WithCancel(t.Context())
	defer cancel()

	result := execute.CommandLine(ctx, sys, []string{"--build", "--watch", "--runExternalCode"}, testSys)
	assert.Equal(t, spawner.spawns.Load(), int32(1))
	assert.Equal(t, spawner.closes.Load(), int32(0))

	updatedManifest := strings.Replace(contentmappertest.PackageJSON(contentmappertest.VerbatimMapper), `"version": "1.0.0"`, `"version": "2.0.0"`, 1)
	testSys.writeFileNoError(manifestTarget, updatedManifest)
	testSys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: manifestTarget}})
	result.Watcher.DoCycle()

	assert.Equal(t, spawner.spawns.Load(), int32(2))
	assert.Equal(t, spawner.closes.Load(), int32(1))
}

func TestContentMapperWatchManifestChangeIgnoresCase(t *testing.T) {
	t.Parallel()
	const (
		manifestTarget = "/home/src/workspaces/Mapper/package.json"
		manifestEvent  = "/home/src/workspaces/mapper/package.json"
	)
	input := &tscInput{
		ignoreCase: true,
		files: FileMap{
			"/home/src/workspaces/project/tsconfig.json": `{
				"contentMappers": [{ "package": "mapper", "extensions": [".vue"] }]
			}`,
			"/home/src/workspaces/project/app.vue":             `export const app = 1;`,
			"/home/src/workspaces/project/node_modules/mapper": vfstest.Symlink("/home/src/workspaces/Mapper"),
			manifestTarget: contentmappertest.PackageJSON(contentmappertest.VerbatimMapper),
		},
	}
	testSys := newTestSys(input, false)
	spawner := &recordingContentMapperSpawner{inner: contentmappertest.NewSpawner()}
	sys := &recordingContentMapperSystem{TestSys: testSys, spawner: spawner}
	ctx, cancel := context.WithCancel(t.Context())
	defer cancel()

	result := execute.CommandLine(ctx, sys, []string{"--watch", "--runExternalCode"}, testSys)
	assert.Equal(t, spawner.spawns.Load(), int32(1))
	assert.Equal(t, spawner.closes.Load(), int32(0))

	updatedManifest := strings.Replace(contentmappertest.PackageJSON(contentmappertest.VerbatimMapper), `"version": "1.0.0"`, `"version": "2.0.0"`, 1)
	testSys.writeFileNoError(manifestEvent, updatedManifest)
	testSys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: manifestEvent}})
	result.Watcher.DoCycle()

	assert.Equal(t, spawner.spawns.Load(), int32(2))
	assert.Equal(t, spawner.closes.Load(), int32(1))
}

func TestContentMapperBuildWatchSymlinkedManifestDelete(t *testing.T) {
	t.Parallel()
	const manifestTarget = "/home/src/workspaces/mapper/package.json"
	input := &tscInput{files: FileMap{
		"/home/src/workspaces/project/tsconfig.json": `{
			"compilerOptions": { "composite": true },
			"contentMappers": [{ "package": "mapper", "extensions": [".vue"] }]
		}`,
		"/home/src/workspaces/project/app.vue":             `export const app = 1;`,
		"/home/src/workspaces/project/node_modules/mapper": vfstest.Symlink("/home/src/workspaces/mapper"),
		manifestTarget: contentmappertest.PackageJSON(contentmappertest.VerbatimMapper),
	}}
	testSys := newTestSys(input, false)
	spawner := &recordingContentMapperSpawner{inner: contentmappertest.NewSpawner()}
	sys := &recordingContentMapperSystem{TestSys: testSys, spawner: spawner}
	ctx, cancel := context.WithCancel(t.Context())
	defer cancel()

	result := execute.CommandLine(ctx, sys, []string{"--build", "--watch", "--runExternalCode"}, testSys)
	assert.Equal(t, spawner.spawns.Load(), int32(1))
	assert.Equal(t, spawner.closes.Load(), int32(0))

	testSys.clearOutput()
	assert.NilError(t, testSys.fsFromFileMap().Remove(manifestTarget))
	testSys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventDelete, Path: manifestTarget}})
	result.Watcher.DoCycle()

	assert.Equal(t, spawner.spawns.Load(), int32(1))
	assert.Equal(t, spawner.closes.Load(), int32(1))
	assert.Assert(t, strings.Contains(testSys.currentWrite.String(), "The content mapper package 'mapper' could not be resolved."), testSys.currentWrite.String())
}

func TestContentMapperBuildWatchSharedLifecycle(t *testing.T) {
	t.Parallel()
	const mapperConfig = `{
		"compilerOptions": { "composite": true },
		"contentMappers": [{ "package": "mapper", "extensions": [".vue"] }]
	}`
	input := &tscInput{files: FileMap{
		"/home/src/workspaces/project/tsconfig.json": `{
			"files": [],
			"references": [{ "path": "a" }, { "path": "b" }]
		}`,
		"/home/src/workspaces/project/a/tsconfig.json":                  mapperConfig,
		"/home/src/workspaces/project/a/app.vue":                        `export const a = 1;`,
		"/home/src/workspaces/project/b/tsconfig.json":                  mapperConfig,
		"/home/src/workspaces/project/b/app.vue":                        `export const b = 1;`,
		"/home/src/workspaces/project/node_modules/mapper/package.json": contentmappertest.PackageJSON(contentmappertest.VerbatimMapper),
	}}
	testSys := newTestSys(input, false)
	spawner := &recordingContentMapperSpawner{inner: contentmappertest.NewSpawner()}
	sys := &recordingContentMapperSystem{TestSys: testSys, spawner: spawner}
	ctx, cancel := context.WithCancel(t.Context())
	defer cancel()

	result := execute.CommandLine(ctx, sys, []string{"--build", "--watch", "--runExternalCode"}, testSys)
	assert.Assert(t, result.Watcher != nil)
	assert.Equal(t, spawner.spawns.Load(), int32(1))
	assert.Equal(t, spawner.closes.Load(), int32(0))

	for _, project := range []string{"a", "b"} {
		configFileName := "/home/src/workspaces/project/" + project + "/tsconfig.json"
		testSys.writeFileNoError(configFileName, `{ "compilerOptions": { "composite": true } }`)
		testSys.mockWatchBackend.SendEvents([]fswatch.Event{{Kind: fswatch.EventUpdate, Path: configFileName}})
		result.Watcher.DoCycle()
		if project == "a" {
			assert.Equal(t, spawner.closes.Load(), int32(0))
		} else {
			assert.Equal(t, spawner.closes.Load(), int32(1))
		}
	}
}

package api

import (
	"context"
	"errors"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

type failingModuleResolutionConn struct {
	calls int
}

func (c *failingModuleResolutionConn) Run(context.Context) error {
	return nil
}

func (c *failingModuleResolutionConn) Call(context.Context, string, any) (json.Value, error) {
	c.calls++
	return nil, errors.New("callback error")
}

func (c *failingModuleResolutionConn) Notify(context.Context, string, any) error {
	return nil
}

func TestModuleResolverUsesSnapshotFileSystem(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/home/projects/p/node_modules/pkg/package.json": `{"name":"pkg","version":"1.0.0","exports":{".":{"types":"./index.d.ts","default":"./index.js"}}}`,
		"/home/projects/p/node_modules/pkg/index.d.ts":   `export declare const value: string;`,
		"/home/projects/p/node_modules/pkg/index.js":     `exports.value = "value";`,
	})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	snapshot, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{})
	assert.NilError(t, err)
	resolver, err := session.handleCreateModuleResolver(&CreateModuleResolverParams{
		CompilerOptions: core.CompilerOptions{
			Module:           core.ModuleKindNodeNext,
			ModuleResolution: core.ModuleResolutionKindNodeNext,
			TraceResolution:  core.TSTrue,
		},
	})
	assert.NilError(t, err)
	result, resolutionErr := session.handleResolveModuleName(context.Background(), &ResolveModuleNameParams{
		Snapshot:            snapshot.Snapshot,
		Resolver:            resolver,
		ModuleName:          "pkg",
		ContainingDirectory: DocumentIdentifier{FileName: "/home/projects/p/src"},
	})
	assert.NilError(t, resolutionErr)
	assert.Equal(t, result.ResolvedModule.ResolvedFileName, "/home/projects/p/node_modules/pkg/index.d.ts")
	assert.Equal(t, result.ResolvedModule.PackageId.Name, "pkg")
	assert.Assert(t, len(result.Trace) > 0)
}

func TestStaticModuleResolutionSpecificityAndLifetime(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/home/projects/p/global.d.ts":  `export declare const value: "global";`,
		"/home/projects/p/mode.d.ts":    `export declare const value: "mode";`,
		"/home/projects/p/dir.d.ts":     `export declare const value: "dir";`,
		"/home/projects/p/exact.d.ts":   `export declare const value: "exact";`,
		"/home/projects/p/default.d.ts": `export declare const value: "default";`,
	})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	snapshot, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{})
	assert.NilError(t, err)
	esm := core.ModuleKindESNext
	spec := ModuleResolutionSpec{
		Fallback: ModuleResolutionFallbackUnresolved,
		Entries: []*ModuleResolutionEntry{
			staticResolutionEntry("pkg", "", nil, "/home/projects/p/global.d.ts"),
			staticResolutionEntry("pkg", "", &esm, "/home/projects/p/mode.d.ts"),
			staticResolutionEntry("pkg", "/home/projects/p/src", nil, "/home/projects/p/dir.d.ts"),
			staticResolutionEntry("pkg", "/home/projects/p/src", &esm, "/home/projects/p/exact.d.ts"),
		},
	}
	resolverID, err := session.handleCreateModuleResolver(&CreateModuleResolverParams{
		CompilerOptions:   core.CompilerOptions{ModuleResolution: core.ModuleResolutionKindNodeNext},
		ModuleResolutions: &spec,
	})
	assert.NilError(t, err)

	assertResolution := func(directory string, mode core.ModuleKind, expected string) {
		t.Helper()
		resolutionMode := ResolutionMode(mode)
		result, resolutionErr := session.handleResolveModuleName(context.Background(), &ResolveModuleNameParams{
			Snapshot:            snapshot.Snapshot,
			Resolver:            resolverID,
			ModuleName:          "pkg",
			ContainingDirectory: DocumentIdentifier{FileName: directory},
			ResolutionMode:      &resolutionMode,
		})
		assert.NilError(t, resolutionErr)
		assert.Equal(t, result.ResolvedModule.ResolvedFileName, expected)
		assert.Equal(t, len(result.Trace), 0)
	}
	assertResolution("/home/projects/p/src", core.ModuleKindESNext, "/home/projects/p/exact.d.ts")
	assertResolution("/home/projects/p/src", core.ModuleKindCommonJS, "/home/projects/p/dir.d.ts")
	assertResolution("/home/projects/p/other", core.ModuleKindESNext, "/home/projects/p/mode.d.ts")
	assertResolution("/home/projects/p/other", core.ModuleKindCommonJS, "/home/projects/p/global.d.ts")

	unresolved, err := session.handleResolveModuleName(context.Background(), &ResolveModuleNameParams{
		Snapshot:            snapshot.Snapshot,
		Resolver:            resolverID,
		ModuleName:          "other",
		ContainingDirectory: DocumentIdentifier{FileName: "/home/projects/p/src"},
	})
	assert.NilError(t, err)
	assert.Assert(t, unresolved.ResolvedModule == nil)

	assertResolution("/home/projects/p/src", core.ModuleKindESNext, "/home/projects/p/exact.d.ts")
}

func TestCreateProgramUsesStaticModuleResolutions(t *testing.T) {
	t.Parallel()

	const root = "/home/projects/p/src/index.ts"
	const provided = "/home/projects/p/provided.d.ts"
	projectSession, _ := projecttestutil.Setup(map[string]any{
		root:     `import { value } from "pkg"; export { value };`,
		provided: `export declare const value: string;`,
	})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	resolver, err := session.handleCreateModuleResolver(&CreateModuleResolverParams{
		CompilerOptions: core.CompilerOptions{
			NoLib:            core.TSTrue,
			Module:           core.ModuleKindNodeNext,
			ModuleResolution: core.ModuleResolutionKindNodeNext,
		},
		ModuleResolutions: &ModuleResolutionSpec{
			Fallback: ModuleResolutionFallbackUnresolved,
			Entries: []*ModuleResolutionEntry{
				staticResolutionEntry("pkg", "", nil, provided),
			},
		},
	})
	assert.NilError(t, err)

	response, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{
		SnapshotRequestChangesParams: SnapshotRequestChangesParams{ //nolint:modernize
			CreatePrograms: []*CreateSnapshotProgramParams{{
				RootFiles: []DocumentIdentifier{{FileName: root}},
				CompilerOptions: core.CompilerOptions{
					NoLib:            core.TSTrue,
					Module:           core.ModuleKindNodeNext,
					ModuleResolution: core.ModuleResolutionKindNodeNext,
				},
				Options: &CreateProgramOptions{
					ModuleResolver: resolver,
				},
			}},
		},
	})
	assert.NilError(t, err)
	projectID := (*response.Operation.CreatedPrograms)[0].AsID()
	fileNames, err := session.handleGetSourceFileNames(context.Background(), &GetSourceFileNamesParams{
		Snapshot: response.Snapshot,
		Project:  projectID,
	})
	assert.NilError(t, err)
	assert.DeepEqual(t, fileNames, []string{provided, root})
}

func TestStaticModuleResolutionPreservesStaticIdentity(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	snapshot, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{})
	assert.NilError(t, err)
	resolver, err := session.handleCreateModuleResolver(&CreateModuleResolverParams{
		CompilerOptions: core.CompilerOptions{ModuleResolution: core.ModuleResolutionKindNodeNext},
		ModuleResolutions: &ModuleResolutionSpec{
			Fallback: ModuleResolutionFallbackUnresolved,
			Entries: []*ModuleResolutionEntry{
				{
					ModuleName: "pkg",
					Result: &StaticModuleResolution{
						ResolvedFileName: &DocumentIdentifier{FileName: "/store/pkg/index.d.ts"},
						OriginalPath:     &DocumentIdentifier{FileName: "/node_modules/pkg/index.d.ts"},
						PackageID: &PackageId{
							Name:          "pkg",
							SubModuleName: "",
							Version:       "1.2.3",
						},
					},
				},
			},
		},
	})
	assert.NilError(t, err)
	result, err := session.handleResolveModuleName(context.Background(), &ResolveModuleNameParams{
		Snapshot:            snapshot.Snapshot,
		Resolver:            resolver,
		ModuleName:          "pkg",
		ContainingDirectory: DocumentIdentifier{FileName: "/src"},
	})
	assert.NilError(t, err)
	assert.Equal(t, result.ResolvedModule.OriginalPath, "/node_modules/pkg/index.d.ts")
	assert.Equal(t, result.ResolvedModule.PackageId.Name, "pkg")
	assert.Equal(t, result.ResolvedModule.PackageId.Version, "1.2.3")
	assert.Equal(t, result.ResolvedModule.IsExternalLibraryImport, true)
}

func TestModuleResolutionCallbackErrorsAreReturned(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	conn := &failingModuleResolutionConn{}
	registration := &moduleResolverRegistration{
		id:                        1,
		resolveModuleNameCallback: "resolveModuleName/1",
	}
	factory := &moduleResolverFactory{
		registration:     registration,
		session:          session,
		conn:             conn,
		ctx:              context.Background(),
		currentDirectory: "/",
	}
	provider, cleanup := factory.NewResolver(module.ResolverOptions{
		Host:            session,
		CompilerOptions: core.EmptyCompilerOptions,
	})
	for range 2 {
		_, _, err := provider.ResolveModuleNameFromDirectory("pkg", "/src", core.ResolutionModeESM)
		assert.ErrorContains(t, err, "callback error")
	}
	assert.Equal(t, conn.calls, 2)
	assert.Equal(t, len(session.programResolutionContexts), 1)
	cleanup()
	assert.Equal(t, len(session.programResolutionContexts), 0)
}

func TestModuleResolutionCallbackErrorRejectsLanguageServerUpdate(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/src/index.ts": `import "pkg";`,
	})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	session.conn = &failingModuleResolutionConn{}
	resolver, err := session.handleCreateModuleResolver(&CreateModuleResolverParams{
		CompilerOptions: core.CompilerOptions{
			NoLib:            core.TSTrue,
			Module:           core.ModuleKindNodeNext,
			ModuleResolution: core.ModuleResolutionKindNodeNext,
		},
		ResolveModuleNameCallback: "resolveModuleName/1",
	})
	assert.NilError(t, err)
	baseSnapshot := projectSession.Snapshot()

	_, err = session.handleGetCurrentLanguageServerSnapshot(context.Background(), &GetCurrentLanguageServerSnapshotParams{
		Changes: &LanguageServerSnapshotChanges{SnapshotRequestChangesParams{
			CreatePrograms: []*CreateSnapshotProgramParams{{
				RootFiles: []DocumentIdentifier{{FileName: "/src/index.ts"}},
				CompilerOptions: core.CompilerOptions{
					NoLib:            core.TSTrue,
					Module:           core.ModuleKindNodeNext,
					ModuleResolution: core.ModuleResolutionKindNodeNext,
				},
				Options: &CreateProgramOptions{ModuleResolver: resolver},
			}},
		}},
	})
	assert.ErrorContains(t, err, "callback error")
	assert.Assert(t, projectSession.Snapshot() == baseSnapshot)
	assert.Equal(t, len(projectSession.Snapshot().ProjectCollection.SyntheticProjects()), 0)
}

func staticResolutionEntry(moduleName string, directory string, mode *core.ModuleKind, fileName string) *ModuleResolutionEntry {
	entry := &ModuleResolutionEntry{
		ModuleName: moduleName,
		Result: &StaticModuleResolution{
			ResolvedFileName: &DocumentIdentifier{FileName: fileName},
		},
	}
	if mode != nil {
		resolutionMode := ResolutionMode(*mode)
		entry.ResolutionMode = &resolutionMode
	}
	if directory != "" {
		entry.ContainingDirectory = &DocumentIdentifier{FileName: directory}
	}
	return entry
}

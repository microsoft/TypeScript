package api

import (
	"context"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

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

	snapshot, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{})
	assert.NilError(t, err)
	resolver, err := session.handleCreateModuleResolver(&CreateModuleResolverParams{
		Snapshot: snapshot.Snapshot,
		CompilerOptions: core.CompilerOptions{
			Module:           core.ModuleKindNodeNext,
			ModuleResolution: core.ModuleResolutionKindNodeNext,
			TraceResolution:  core.TSTrue,
		},
	})
	assert.NilError(t, err)
	result, resolutionErr := session.handleResolveModuleName(&ResolveModuleNameParams{
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

func TestProvidedModuleResolutionSpecificityAndLifetime(t *testing.T) {
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

	snapshot, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{})
	assert.NilError(t, err)
	esm := core.ModuleKindESNext
	spec := ModuleResolutionSpec{
		Fallback: ModuleResolutionFallbackUnresolved,
		Entries: []*ModuleResolutionEntry{
			providedResolutionEntry("pkg", "", nil, "/home/projects/p/global.d.ts"),
			providedResolutionEntry("pkg", "", &esm, "/home/projects/p/mode.d.ts"),
			providedResolutionEntry("pkg", "/home/projects/p/src", nil, "/home/projects/p/dir.d.ts"),
			providedResolutionEntry("pkg", "/home/projects/p/src", &esm, "/home/projects/p/exact.d.ts"),
		},
	}
	setID, err := session.handleCreateModuleResolutionSet(&CreateModuleResolutionSetParams{Spec: spec})
	assert.NilError(t, err)
	resolverID, err := session.handleCreateModuleResolver(&CreateModuleResolverParams{
		Snapshot:          snapshot.Snapshot,
		CompilerOptions:   core.CompilerOptions{ModuleResolution: core.ModuleResolutionKindNodeNext},
		ModuleResolutions: &ModuleResolutionSource{Set: setID},
	})
	assert.NilError(t, err)

	assertResolution := func(directory string, mode core.ModuleKind, expected string) {
		t.Helper()
		resolutionMode := ResolutionMode(mode)
		result, resolutionErr := session.handleResolveModuleName(&ResolveModuleNameParams{
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

	unresolved, err := session.handleResolveModuleName(&ResolveModuleNameParams{
		Snapshot:            snapshot.Snapshot,
		Resolver:            resolverID,
		ModuleName:          "other",
		ContainingDirectory: DocumentIdentifier{FileName: "/home/projects/p/src"},
	})
	assert.NilError(t, err)
	assert.Assert(t, unresolved.ResolvedModule == nil)

	_, err = session.handleReleaseModuleResolutionSet(&ReleaseModuleResolutionSetParams{Set: setID})
	assert.NilError(t, err)
	assertResolution("/home/projects/p/src", core.ModuleKindESNext, "/home/projects/p/exact.d.ts")
	_, err = session.handleCreateModuleResolver(&CreateModuleResolverParams{
		Snapshot:          snapshot.Snapshot,
		CompilerOptions:   core.CompilerOptions{ModuleResolution: core.ModuleResolutionKindNodeNext},
		ModuleResolutions: &ModuleResolutionSource{Set: setID},
	})
	assert.ErrorContains(t, err, "not found")
}

func TestCreateProgramUsesProvidedModuleResolutions(t *testing.T) {
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

	response, err := session.handleCreateProgram(context.Background(), &CreateProgramParams{
		RootFiles: []DocumentIdentifier{{FileName: root}},
		CreateProgramOptions: CreateProgramOptions{
			CompilerOptions: core.CompilerOptions{
				NoLib:            core.TSTrue,
				Module:           core.ModuleKindNodeNext,
				ModuleResolution: core.ModuleResolutionKindNodeNext,
			},
			ModuleResolutions: &ModuleResolutionSource{
				Spec: &ModuleResolutionSpec{
					Fallback: ModuleResolutionFallbackUnresolved,
					Entries: []*ModuleResolutionEntry{
						providedResolutionEntry("pkg", "", nil, provided),
					},
				},
			},
		},
	})
	assert.NilError(t, err)
	fileNames, err := session.handleGetSourceFileNames(context.Background(), &GetSourceFileNamesParams{
		Snapshot: response.Snapshot,
		Project:  response.Project.Id,
	})
	assert.NilError(t, err)
	assert.DeepEqual(t, fileNames, []string{provided, root})
}

func TestProvidedModuleResolutionPreservesStaticIdentity(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()

	snapshot, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{})
	assert.NilError(t, err)
	resolver, err := session.handleCreateModuleResolver(&CreateModuleResolverParams{
		Snapshot:        snapshot.Snapshot,
		CompilerOptions: core.CompilerOptions{ModuleResolution: core.ModuleResolutionKindNodeNext},
		ModuleResolutions: &ModuleResolutionSource{Spec: &ModuleResolutionSpec{
			Fallback: ModuleResolutionFallbackUnresolved,
			Entries: []*ModuleResolutionEntry{{
				ModuleName: "pkg",
				Result: &ProvidedModuleResolution{
					ResolvedFileName: &DocumentIdentifier{FileName: "/store/pkg/index.d.ts"},
					OriginalPath:     &DocumentIdentifier{FileName: "/node_modules/pkg/index.d.ts"},
					PackageID: &PackageId{
						Name:          "pkg",
						SubModuleName: "",
						Version:       "1.2.3",
					},
				},
			}},
		}},
	})
	assert.NilError(t, err)
	result, err := session.handleResolveModuleName(&ResolveModuleNameParams{
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

func providedResolutionEntry(moduleName string, directory string, mode *core.ModuleKind, fileName string) *ModuleResolutionEntry {
	entry := &ModuleResolutionEntry{
		ModuleName: moduleName,
		Result: &ProvidedModuleResolution{
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

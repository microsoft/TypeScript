package api

import (
	"context"
	"errors"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
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

type staticModuleResolutionConn struct {
	calls    int
	fileName string
}

func (c *staticModuleResolutionConn) Run(context.Context) error {
	return nil
}

func (c *staticModuleResolutionConn) Call(context.Context, string, any) (json.Value, error) {
	c.calls++
	return json.Marshal(&ProvidedModuleResolution{
		ResolvedFileName: &DocumentIdentifier{FileName: c.fileName},
	})
}

func (c *staticModuleResolutionConn) Notify(context.Context, string, any) error {
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
		Snapshot: snapshot.Snapshot,
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

	snapshot, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{})
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

	response, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{
		SnapshotRequestChangesParams: SnapshotRequestChangesParams{ //nolint:modernize
			CreatePrograms: []*CreateSnapshotProgramParams{{
				RootFiles: []DocumentIdentifier{{FileName: root}},
				Options: CreateProgramOptions{
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
			}},
		},
	})
	assert.NilError(t, err)
	projectID := ProjectID((*response.Operation.CreatedPrograms)[0])
	fileNames, err := session.handleGetSourceFileNames(context.Background(), &GetSourceFileNamesParams{
		Snapshot: response.Snapshot,
		Project:  projectID,
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

	snapshot, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{})
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

	conn := &failingModuleResolutionConn{}
	provider := &callbackModuleResolutionProvider{
		identity:         1,
		conn:             conn,
		ctx:              context.Background(),
		callback:         "resolveModuleName/1",
		currentDirectory: "/",
	}
	for range 2 {
		_, err := provider.ResolveModuleName("pkg", "/src", core.ResolutionModeESM, nil)
		assert.ErrorContains(t, err, "callback error")
	}
	assert.Equal(t, conn.calls, 2)
}

func TestModuleResolutionProviderStateAcrossProgramUpdates(t *testing.T) {
	t.Parallel()

	const root = "/home/projects/p/src/index.ts"
	const providedA = "/home/projects/p/a.d.ts"
	const providedB = "/home/projects/p/b.d.ts"
	projectSession, utils := projecttestutil.Setup(map[string]any{
		root:      `import { value } from "pkg"; export { value };`,
		providedA: `export declare const value: "a";`,
		providedB: `export declare const value: "b";`,
	})
	defer projectSession.Close()
	session := NewLSPSession(projectSession, nil)
	defer session.Close()
	ctx := context.Background()
	spec := func(fileName string) *ModuleResolutionSpec {
		return &ModuleResolutionSpec{
			Fallback: ModuleResolutionFallbackUnresolved,
			Entries: []*ModuleResolutionEntry{
				providedResolutionEntry("pkg", "", nil, fileName),
			},
		}
	}
	createSet := func(fileName string) ModuleResolutionSetID {
		t.Helper()
		id, err := session.handleCreateModuleResolutionSet(&CreateModuleResolutionSetParams{Spec: *spec(fileName)})
		assert.NilError(t, err)
		return id
	}
	setA := createSet(providedA)
	setB := createSet(providedB)
	createOptions := func(source *ModuleResolutionSource) CreateProgramOptions {
		return CreateProgramOptions{
			CompilerOptions: core.CompilerOptions{
				NoLib:            core.TSTrue,
				Module:           core.ModuleKindNodeNext,
				ModuleResolution: core.ModuleResolutionKindNodeNext,
			},
			ModuleResolutions: source,
		}
	}

	response, err := session.handleCreateSnapshot(ctx, &CreateSnapshotParams{
		SnapshotRequestChangesParams: SnapshotRequestChangesParams{ //nolint:modernize
			CreatePrograms: []*CreateSnapshotProgramParams{{
				RootFiles: []DocumentIdentifier{{FileName: root}},
				Options:   createOptions(&ModuleResolutionSource{Set: setA}),
			}},
		},
	})
	assert.NilError(t, err)
	programID := (*response.Operation.CreatedPrograms)[0]
	getProject := func(snapshotID SnapshotID) *project.Project {
		t.Helper()
		sd, snapshotErr := session.getSnapshotData(snapshotID)
		assert.NilError(t, snapshotErr)
		proj := sd.snapshot.ProjectCollection.GetProjectByPath(tspath.Path(programID))
		assert.Assert(t, proj != nil)
		return proj
	}
	initialProject := getProject(response.Snapshot)

	sameSetResponse, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: response.Snapshot,
		Changes: &CreateSnapshotParams{
			SnapshotRequestChangesParams: SnapshotRequestChangesParams{ //nolint:modernize
				ReconfigurePrograms: []*ReconfigureSnapshotProgramParams{{
					Id:        programID,
					RootFiles: []DocumentIdentifier{{FileName: root}},
					Options:   createOptions(&ModuleResolutionSource{Set: setA}),
				}},
			},
		},
	})
	assert.NilError(t, err)
	sameSetProject := getProject(sameSetResponse.Snapshot)
	assert.Assert(t, sameSetProject.Program == initialProject.Program)

	assert.NilError(t, utils.FS().WriteFile(root, `import { value } from "pkg"; export const updated = value;`))
	clonedResponse, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: sameSetResponse.Snapshot,
		Changes: &CreateSnapshotParams{
			SnapshotRequestChangesParams: SnapshotRequestChangesParams{ //nolint:modernize
				ReconfigurePrograms: []*ReconfigureSnapshotProgramParams{{
					Id:        programID,
					RootFiles: []DocumentIdentifier{{FileName: root}},
					Options:   createOptions(&ModuleResolutionSource{Set: setA}),
				}},
			},
			FileNotifications: &FileNotifications{Changed: []DocumentIdentifier{{FileName: root}}},
		},
	})
	assert.NilError(t, err)
	assert.Equal(t, getProject(clonedResponse.Snapshot).ProgramUpdateKind, project.ProgramUpdateKindCloned)

	for _, test := range []struct {
		name     string
		source   *ModuleResolutionSource
		expected project.ProgramUpdateKind
	}{
		{name: "changed set", source: &ModuleResolutionSource{Set: setB}, expected: project.ProgramUpdateKindNewFiles},
		{name: "removed set", expected: project.ProgramUpdateKindNewFiles},
		{name: "inline spec", source: &ModuleResolutionSource{Spec: spec(providedA)}, expected: project.ProgramUpdateKindSameFileNames},
	} {
		updated, updateErr := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
			Snapshot: clonedResponse.Snapshot,
			Changes: &CreateSnapshotParams{
				SnapshotRequestChangesParams: SnapshotRequestChangesParams{ //nolint:modernize
					ReconfigurePrograms: []*ReconfigureSnapshotProgramParams{{
						Id:        programID,
						RootFiles: []DocumentIdentifier{{FileName: root}},
						Options:   createOptions(test.source),
					}},
				},
			},
		})
		assert.NilError(t, updateErr, test.name)
		assert.Equal(t, getProject(updated.Snapshot).ProgramUpdateKind, test.expected, test.name)
	}

	inlineResponse, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: clonedResponse.Snapshot,
		Changes: &CreateSnapshotParams{SnapshotRequestChangesParams: SnapshotRequestChangesParams{ //nolint:modernize
			ReconfigurePrograms: []*ReconfigureSnapshotProgramParams{{
				Id:        programID,
				RootFiles: []DocumentIdentifier{{FileName: root}},
				Options:   createOptions(&ModuleResolutionSource{Spec: spec(providedA)}),
			}},
		}},
	})
	assert.NilError(t, err)
	inlineProgram := getProject(inlineResponse.Snapshot).Program
	repeatedInlineResponse, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: inlineResponse.Snapshot,
		Changes: &CreateSnapshotParams{SnapshotRequestChangesParams: SnapshotRequestChangesParams{ //nolint:modernize
			ReconfigurePrograms: []*ReconfigureSnapshotProgramParams{{
				Id:        programID,
				RootFiles: []DocumentIdentifier{{FileName: root}},
				Options:   createOptions(&ModuleResolutionSource{Spec: spec(providedA)}),
			}},
		}},
	})
	assert.NilError(t, err)
	repeatedInlineProject := getProject(repeatedInlineResponse.Snapshot)
	assert.Equal(t, repeatedInlineProject.ProgramUpdateKind, project.ProgramUpdateKindSameFileNames)
	assert.Assert(t, repeatedInlineProject.Program != inlineProgram)

	callbackConn := &staticModuleResolutionConn{fileName: providedA}
	session.SetConnection(callbackConn)
	callbackResponse, err := session.handleCreateSnapshot(ctx, &CreateSnapshotParams{
		SnapshotRequestChangesParams: SnapshotRequestChangesParams{ //nolint:modernize
			CreatePrograms: []*CreateSnapshotProgramParams{{
				RootFiles: []DocumentIdentifier{{FileName: root}},
				Options: CreateProgramOptions{
					CompilerOptions: core.CompilerOptions{
						NoLib:            core.TSTrue,
						Module:           core.ModuleKindNodeNext,
						ModuleResolution: core.ModuleResolutionKindNodeNext,
					},
					ResolveModuleNameCallback: "resolveModuleName/1",
				},
			}},
		},
	})
	assert.NilError(t, err)
	callbackProgramID := (*callbackResponse.Operation.CreatedPrograms)[0]
	callbackProject := func(snapshotID SnapshotID) *project.Project {
		t.Helper()
		sd, snapshotErr := session.getSnapshotData(snapshotID)
		assert.NilError(t, snapshotErr)
		proj := sd.snapshot.ProjectCollection.GetProjectByPath(tspath.Path(callbackProgramID))
		assert.Assert(t, proj != nil)
		return proj
	}
	initialCallbackProgram := callbackProject(callbackResponse.Snapshot).Program
	updatedCallbackResponse, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		Snapshot: callbackResponse.Snapshot,
		Changes: &CreateSnapshotParams{SnapshotRequestChangesParams: SnapshotRequestChangesParams{ //nolint:modernize
			ReconfigurePrograms: []*ReconfigureSnapshotProgramParams{{
				Id:        callbackProgramID,
				RootFiles: []DocumentIdentifier{{FileName: root}},
				Options: CreateProgramOptions{
					CompilerOptions: core.CompilerOptions{
						NoLib:            core.TSTrue,
						Module:           core.ModuleKindNodeNext,
						ModuleResolution: core.ModuleResolutionKindNodeNext,
					},
					ResolveModuleNameCallback: "resolveModuleName/1",
				},
			}},
		}},
	})
	assert.NilError(t, err)
	updatedCallbackProject := callbackProject(updatedCallbackResponse.Snapshot)
	assert.Equal(t, updatedCallbackProject.ProgramUpdateKind, project.ProgramUpdateKindSameFileNames)
	assert.Assert(t, updatedCallbackProject.Program != initialCallbackProgram)
	assert.Equal(t, callbackConn.calls, 2)
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

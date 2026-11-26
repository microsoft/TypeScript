package api

import (
	"context"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/contentmappertest"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

func newContentMapperBuildSession(t *testing.T, runExternalCode bool) *Session {
	t.Helper()
	files := map[string]any{
		"/home/project/tsconfig.json":                    `{"compilerOptions":{"noEmit":true,"incremental":true},"files":["app.box","main.ts"],"contentMappers":[{"package":"mapper","extensions":[".box"]}]}`,
		"/home/project/node_modules/mapper/package.json": contentmappertest.PackageJSON(contentmappertest.SupplementalMapper),
		"/home/project/app.box":                          "declare const supplementalValue: number;",
		"/home/project/main.ts":                          "const value: string = supplementalValue;",
	}
	init, _ := projecttestutil.GetSessionInitOptions(files, &project.SessionOptions{
		CurrentDirectory:   "/home/project",
		DefaultLibraryPath: bundled.LibPath(),
		RunExternalCode:    runExternalCode,
	}, nil)
	init.Spawner = contentmappertest.NewSpawner()
	session := NewStandaloneSession(init, nil)
	t.Cleanup(session.Close)
	return session
}

func buildWithOrchestrator(t *testing.T, session *Session, compilerOptions *core.CompilerOptions) *BuildResponse {
	t.Helper()
	created, err := session.handleCreateBuildOrchestrator(context.Background(), &CreateBuildOrchestratorParams{
		RootNames:       []string{"tsconfig.json"},
		CompilerOptions: compilerOptions,
	})
	assert.NilError(t, err)
	t.Cleanup(func() {
		_, _ = session.handleDisposeBuildOrchestrator(context.Background(), &DisposeBuildOrchestratorParams{BuildOrchestratorID: created.BuildOrchestratorID})
	})
	response, err := session.handleBuild(context.Background(), &BuildParams{BuildOrchestratorID: created.BuildOrchestratorID})
	assert.NilError(t, err)
	return response
}

type buildDiagnostic struct {
	Code     int32
	Messages []string
}

func buildDiagnostics(response *BuildResponse) []buildDiagnostic {
	result := make([]buildDiagnostic, 0, len(response.Diagnostics))
	for _, diagnostic := range response.Diagnostics {
		messages := []string{diagnostic.Text}
		for _, chain := range diagnostic.MessageChain {
			messages = append(messages, chain.Text)
		}
		result = append(result, buildDiagnostic{Code: diagnostic.Code, Messages: messages})
	}
	return result
}

func TestBuildOrchestratorRunsContentMappers(t *testing.T) {
	t.Parallel()

	expected := []buildDiagnostic{{Code: 2322, Messages: []string{"Type 'number' is not assignable to type 'string'."}}}

	t.Run("inherits runExternalCode from the session", func(t *testing.T) {
		t.Parallel()
		session := newContentMapperBuildSession(t, true)
		assert.DeepEqual(t, buildDiagnostics(buildWithOrchestrator(t, session, nil)), expected)
		// A later build reuses the incremental build info and reports the same diagnostics.
		assert.DeepEqual(t, buildDiagnostics(buildWithOrchestrator(t, session, nil)), expected)
	})

	t.Run("runs mappers when runExternalCode is set explicitly", func(t *testing.T) {
		t.Parallel()
		session := newContentMapperBuildSession(t, true)
		response := buildWithOrchestrator(t, session, &core.CompilerOptions{RunExternalCode: core.TSTrue})
		assert.DeepEqual(t, buildDiagnostics(response), expected)
	})

	t.Run("respects runExternalCode disabled by the orchestrator", func(t *testing.T) {
		t.Parallel()
		session := newContentMapperBuildSession(t, true)
		response := buildWithOrchestrator(t, session, &core.CompilerOptions{RunExternalCode: core.TSFalse})
		assert.Assert(t, hasBuildDiagnostic(response, 18068))
	})

	t.Run("does not inherit runExternalCode from an untrusted session", func(t *testing.T) {
		t.Parallel()
		session := newContentMapperBuildSession(t, false)
		response := buildWithOrchestrator(t, session, nil)
		assert.Assert(t, hasBuildDiagnostic(response, 18068))
	})

	t.Run("does not spawn mappers for an untrusted session", func(t *testing.T) {
		t.Parallel()
		session := newContentMapperBuildSession(t, false)
		response := buildWithOrchestrator(t, session, &core.CompilerOptions{RunExternalCode: core.TSTrue})
		assert.DeepEqual(t, buildDiagnostics(response), []buildDiagnostic{{Code: 18099, Messages: []string{
			"The content mapper 'mapper' could not be initialized.",
			"The content mapper command 'supplemental-mapper' could not be started: the API session does not allow running external code",
		}}})
	})
}

func hasBuildDiagnostic(response *BuildResponse, code int32) bool {
	for _, diagnostic := range response.Diagnostics {
		if diagnostic.Code == code {
			return true
		}
	}
	return false
}

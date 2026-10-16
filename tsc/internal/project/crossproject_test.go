package project_test

import (
	"context"
	"iter"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/ls"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

type referencesTestOrchestrator struct {
	session         *project.Session
	defaultProject  ls.Project
	initialProjects []ls.Project
	definitionLoads int
	treeLoads       int
}

func (o *referencesTestOrchestrator) GetDefaultProject() ls.Project {
	return o.defaultProject
}

func (o *referencesTestOrchestrator) GetAllProjectsForInitialRequest() []ls.Project {
	return o.initialProjects
}

func (o *referencesTestOrchestrator) GetLanguageServiceForProjectWithFile(ctx context.Context, p ls.Project, uri lsproto.DocumentUri) *ls.LanguageService {
	return o.session.GetLanguageServiceForProjectWithFile(ctx, p.(*project.Project), uri)
}

func (o *referencesTestOrchestrator) GetProjectsForFile(ctx context.Context, uri lsproto.DocumentUri) ([]ls.Project, error) {
	o.definitionLoads++
	return o.session.GetProjectsForFile(ctx, uri)
}

func (o *referencesTestOrchestrator) GetProjectsLoadingProjectTree(ctx context.Context, requestedProjectTrees *collections.Set[tspath.Path]) iter.Seq[ls.Project] {
	o.treeLoads++
	return func(yield func(ls.Project) bool) {
		o.session.WithSnapshotLoadingProjectTree(ctx, requestedProjectTrees, func(snapshot *project.Snapshot) {
			for _, p := range snapshot.ProjectCollection.LanguageServiceProjects() {
				if !yield(p) {
					return
				}
			}
		})
	}
}

func TestReferencesLoadDefinitionProjectOncePerRequest(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	files := map[string]any{
		"/root/tsconfig.json":     `{ "include": ["src"], "exclude": ["src/test.ts"] }`,
		"/root/src/utils/noop.ts": "export default function noop() {}\n",
		"/root/src/test.ts":       "import noop from './utils/noop';\n",
		"/root/src/form.ts":       "import noop from './utils/noop';\nnoop();\n",
		"/root/app/tsconfig.json": `{ "include": ["src"] }`,
		"/root/app/src/form.ts":   "export {};\n",
	}
	session, _ := projecttestutil.Setup(files)
	t.Cleanup(session.Close)
	ctx := t.Context()
	const testURI = lsproto.DocumentUri("file:///root/src/test.ts")
	session.DidOpenFile(ctx, testURI, 1, files[testURI.FileName()].(string), lsproto.LanguageKindTypeScript)
	session.DidOpenFile(ctx, "file:///root/app/src/form.ts", 1, files["/root/app/src/form.ts"].(string), lsproto.LanguageKindTypeScript)

	for range 2 {
		defaultProject, service, projects, err := session.GetLanguageServiceAndProjectsForFile(ctx, testURI)
		assert.NilError(t, err)
		assert.Equal(t, defaultProject.Kind, project.KindInferred)
		orchestrator := &referencesTestOrchestrator{session: session, defaultProject: defaultProject, initialProjects: projects}
		resp, err := service.ProvideReferences(ctx, &lsproto.ReferenceParams{
			TextDocument: lsproto.TextDocumentIdentifier{Uri: testURI},
			Position:     lsproto.Position{Line: 0, Character: 14}, // from
			Context:      &lsproto.ReferenceContext{IncludeDeclaration: true},
		}, orchestrator)
		assert.NilError(t, err)
		assert.Assert(t, resp.Locations != nil)
		assert.Equal(t, len(*resp.Locations), 4)
		// Expanding into the configured project requires another work-loop pass.
		// Each closed-file load rebuilds the snapshot, even if the project is loaded.
		assert.Assert(t, orchestrator.treeLoads > 1)
		assert.Equal(t, orchestrator.definitionLoads, 1)
	}
}

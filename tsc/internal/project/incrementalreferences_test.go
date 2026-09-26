package project

import (
	"context"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/project/logging"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

const referencesMain = "file:///src/main.ts"

func referencesFiles() map[string]any {
	return map[string]any{
		"/src/tsconfig.json": `{ "compilerOptions": { "strict": true } }`,
		"/src/dep.ts":        "export const dep: number = 1;\n",
		"/src/main.ts":       "import { dep } from './dep';\nexport const main = dep;\n",
	}
}

func referencesSession(t *testing.T) *Session {
	t.Helper()
	fs := bundled.WrapFS(vfstest.FromMap(referencesFiles(), false))
	options := &SessionOptions{
		CurrentDirectory:   "/",
		DefaultLibraryPath: bundled.LibPath(),
		PositionEncoding:   lsproto.PositionEncodingKindUTF8,
		WatchEnabled:       false,
		LoggingEnabled:     false,
	}
	options.workspaceDiagnosticsEnabled.Store(true)
	session := NewSession(&SessionInit{
		BackgroundCtx: context.Background(),
		Options:       options,
		FS:            fs,
		Logger:        logging.NewTestLogger(),
	})
	t.Cleanup(session.Close)
	return session
}

func referencesProject(t *testing.T, session *Session) (*Snapshot, *Project) {
	t.Helper()
	// Asking for the language service is what builds the program; the snapshot alone does not.
	_, err := session.GetLanguageService(context.Background(), referencesMain)
	assert.NilError(t, err)
	snapshot := session.Snapshot()
	project := snapshot.ProjectCollection.ConfiguredProject("/src/tsconfig.json")
	assert.Assert(t, project != nil, "expected the configured project")
	return snapshot, project
}

func builtCheckers(pool *checkerPool) int {
	pool.mu.Lock()
	defer pool.mu.Unlock()
	built := 0
	for _, c := range pool.checkers {
		if c != nil {
			built++
		}
	}
	return built
}

// Working out what each file references means resolving every import in the program through a
// type checker, which on a large project takes minutes and blocks the pull that asked. A program
// cloned from another only replaces a file whose imports, augmentations, ambient module names and
// reference directives are all unchanged, so the answer cannot have moved and is carried over.
func TestIncrementalReferencesAreReusedAcrossAClonedProgram(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	session := referencesSession(t)
	session.DidOpenFile(context.Background(), referencesMain, 1, referencesFiles()["/src/main.ts"].(string), lsproto.LanguageKindTypeScript)

	// The first build has nothing to carry over, so it resolves everything itself.
	snapshot, project := referencesProject(t, session)
	assert.Assert(t, snapshot.IncrementalProgram(project) != nil)

	// The first edit after a load settles the project; the one after it is the ordinary case.
	session.DidChangeFile(context.Background(), referencesMain, 2, []lsproto.TextDocumentContentChangePartialOrWholeDocument{
		{WholeDocument: &lsproto.TextDocumentContentChangeWholeDocument{
			Text: "import { dep } from './dep';\nexport const main = dep + 1;\n",
		}},
	})
	snapshot, project = referencesProject(t, session)
	assert.Assert(t, snapshot.IncrementalProgram(project) != nil)

	// An edit that leaves the imports alone clones the program.
	session.DidChangeFile(context.Background(), referencesMain, 3, []lsproto.TextDocumentContentChangePartialOrWholeDocument{
		{WholeDocument: &lsproto.TextDocumentContentChangeWholeDocument{
			Text: "import { dep } from './dep';\nexport const main: string = dep;\n",
		}},
	})
	snapshot, project = referencesProject(t, session)
	assert.Equal(t, project.ProgramUpdateKind, ProgramUpdateKindCloned, "the edit should have cloned the program")

	before := builtCheckers(project.checkerPool)
	program := snapshot.IncrementalProgram(project)
	assert.Assert(t, program != nil)
	assert.Equal(t, builtCheckers(project.checkerPool), before,
		"carrying the reference map over must not need a type checker")

	// The edit is still seen: main.ts now assigns a number to a string.
	file := project.Program.GetSourceFile("/src/main.ts")
	assert.Assert(t, file != nil)
	ctx := core.WithCheckerLifetime(context.Background(), core.CheckerLifetimeDiagnostics)
	assert.Assert(t, len(program.GetSemanticDiagnostics(ctx, file)) > 0,
		"the edited file is re-checked and its error reported")
}

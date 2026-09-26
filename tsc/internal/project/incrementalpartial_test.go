package project

import (
	"context"
	"fmt"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"gotest.tools/v3/assert"
)

// erroringFiles is a project where every file has a semantic error, so a check that cached
// "clean" for a file it never looked at would be caught by the error going missing.
func erroringFiles(count int) map[string]any {
	files := map[string]any{"/src/tsconfig.json": `{ "compilerOptions": { "strict": true } }`}
	files["/src/index.ts"] = "export const x: string = 1;\n"
	for i := range count {
		files[fmt.Sprintf("/src/f%d.ts", i)] = fmt.Sprintf("export const v%d: string = %d;\n", i, i)
	}
	return files
}

func allSemanticDiagnostics(t *testing.T, snapshot *Snapshot, project *Project, ctx context.Context) map[string]int {
	t.Helper()
	program := snapshot.IncrementalProgram(project)
	counts := map[string]int{}
	for _, file := range project.Program.SourceFiles() {
		if diags := program.GetSemanticDiagnostics(ctx, file); len(diags) > 0 {
			counts[file.FileName()] = len(diags)
		}
	}
	return counts
}

// A check of a large project outlasts the gap between two edits, so it is cancelled part way
// more often than it finishes. What it got through is kept, and keeping it must not cache
// "no errors" for the files it never reached.
func TestIncrementalCancelledCheckKeepsOnlyWhatItFinished(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	files := erroringFiles(30)

	// What the answer is when nothing interrupts it.
	full, fullProject := func() (map[string]int, *Project) {
		session, pool := setupCheckerPoolSessionWithFiles(t, CheckerPoolOptions{}, files)
		t.Cleanup(session.Close)
		snapshot := session.Snapshot()
		project := snapshot.ProjectCollection.ConfiguredProject("/src/tsconfig.json")
		_ = pool
		return allSemanticDiagnostics(t, snapshot, project, context.Background()), project
	}()
	assert.Assert(t, len(full) > 5, "the fixture should have errors in many files, got %d", len(full))

	// Now the same, with the first pass cancelled part way through.
	session, _ := setupCheckerPoolSessionWithFiles(t, CheckerPoolOptions{}, files)
	t.Cleanup(session.Close)
	snapshot := session.Snapshot()
	project := snapshot.ProjectCollection.ConfiguredProject("/src/tsconfig.json")
	assert.Assert(t, project != nil)
	assert.Equal(t, len(project.Program.SourceFiles()), len(fullProject.Program.SourceFiles()))

	program := snapshot.IncrementalProgram(project)
	cancelCtx, cancel := context.WithCancel(core.WithCheckerLifetime(context.Background(), core.CheckerLifetimeDiagnostics))
	cancelCtx = WithCheckProgress(cancelCtx, func(checked, total int) {
		// Stop once it is under way but nowhere near done.
		if checked >= checkProgressBatchFiles {
			cancel()
		}
	})
	_ = program.GetSemanticDiagnostics(cancelCtx, nil)
	cancel()

	// Asking again finishes the job, and the answer matches the run that was never interrupted.
	after := map[string]int{}
	for _, file := range project.Program.SourceFiles() {
		if diags := program.GetSemanticDiagnostics(context.Background(), file); len(diags) > 0 {
			after[file.FileName()] = len(diags)
		}
	}
	assert.DeepEqual(t, after, full)
}

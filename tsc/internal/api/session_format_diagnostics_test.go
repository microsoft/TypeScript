package api

import (
	"context"
	"fmt"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"github.com/zeebo/xxh3"
	"gotest.tools/v3/assert"
)

func sourceFileHashForText(text string) string {
	hash := xxh3.Hash128([]byte(text))
	return fmt.Sprintf("%016x%016x", hash.Hi, hash.Lo)
}

func setupFormatSession(t *testing.T, files map[string]any, mainFile string) (*Session, SnapshotID, ProjectID) {
	t.Helper()
	projectSession, _ := projecttestutil.Setup(files)
	t.Cleanup(projectSession.Close)
	session := NewSession(projectSession, nil)
	t.Cleanup(session.Close)

	ctx := context.Background()
	snap, err := session.handleUpdateSnapshot(ctx, &UpdateSnapshotParams{
		OpenFiles: []DocumentIdentifier{{FileName: mainFile}},
	})
	assert.NilError(t, err)
	proj, err := session.handleGetDefaultProjectForFile(ctx, &GetDefaultProjectForFileParams{
		Snapshot: snap.Snapshot,
		File:     DocumentIdentifier{FileName: mainFile},
	})
	assert.NilError(t, err)
	assert.Assert(t, proj != nil, "file should resolve to a default project")
	return session, snap.Snapshot, proj.Id
}

func formatDiagnosticsParams(snapshot SnapshotID, project ProjectID, diagnostics []*DiagnosticResponse) *FormatDiagnosticsParams {
	return &FormatDiagnosticsParams{
		Snapshot:    snapshot,
		Project:     project,
		Diagnostics: diagnostics,
		NewLine:     "\n",
	}
}

func TestFormatDiagnostics(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const fileName = "/home/projects/p/src/index.ts"
	const content = "const x: number = \"oops\";\n"
	session, snapshot, project := setupFormatSession(t, map[string]any{
		"/home/projects/p/tsconfig.json": `{ "compilerOptions": { "strict": true } }`,
		fileName:                         content,
	}, fileName)
	ctx := context.Background()

	diags, err := session.handleGetSemanticDiagnostics(ctx, &GetDiagnosticsParams{
		Snapshot: snapshot,
		Project:  project,
		Files:    []DocumentIdentifier{{FileName: fileName}},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(diags), 1)

	plain, err := session.handleFormatDiagnostics(ctx, formatDiagnosticsParams(snapshot, project, diags), false /*colorAndContext*/)
	assert.NilError(t, err)
	assert.Equal(t, plain.Output,
		"home/projects/p/src/index.ts(1,7): error TS2322: Type 'string' is not assignable to type 'number'.\n")

	color, err := session.handleFormatDiagnostics(ctx, formatDiagnosticsParams(snapshot, project, diags), true /*colorAndContext*/)
	assert.NilError(t, err)
	assert.Assert(t, strings.Contains(color.Output, "home/projects/p/src/index.ts"))
	assert.Assert(t, strings.Contains(color.Output, "error"))
	assert.Assert(t, strings.Contains(color.Output, "TS2322: "))
	assert.Assert(t, strings.Contains(color.Output, "Type 'string' is not assignable to type 'number'."))
	assert.Assert(t, strings.Contains(color.Output, "const x: number = \"oops\";"))
	assert.Assert(t, strings.Contains(color.Output, "~"))
	assert.Assert(t, strings.Contains(color.Output, "\x1b["))
}

func TestFormatDiagnosticsPreservesHostFormattedAbsolutePath(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const fileName = "/home/projects/p/src/index.ts"
	session, snapshot, project := setupFormatSession(t, map[string]any{
		"/home/projects/p/tsconfig.json": `{ "compilerOptions": { "strict": true } }`,
		fileName:                         `const x: number = "oops";`,
	}, fileName)
	ctx := context.Background()

	diags, err := session.handleGetSemanticDiagnostics(ctx, &GetDiagnosticsParams{
		Snapshot: snapshot,
		Project:  project,
		Files:    []DocumentIdentifier{{FileName: fileName}},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(diags), 1)
	diags[0].DisplayFileName = "/different/root/index.ts"

	params := formatDiagnosticsParams(snapshot, project, diags)
	plain, err := session.handleFormatDiagnostics(ctx, params, false)
	assert.NilError(t, err)
	assert.Assert(t, strings.HasPrefix(plain.Output, "/different/root/index.ts(1,7): "))

	color, err := session.handleFormatDiagnostics(ctx, params, true)
	assert.NilError(t, err)
	assert.Assert(t, strings.Contains(color.Output, "\x1b[96m/different/root/index.ts\x1b[0m:"))
}

func TestFormatDiagnosticsConfigFileContext(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const configFileName = "/home/projects/p/tsconfig.json"
	const config = "{ \"compilerOptions\": { \"target\": \"invalid\" } }"
	const mainFile = "/home/projects/p/src/index.ts"
	session, snapshot, project := setupFormatSession(t, map[string]any{
		configFileName: config,
		mainFile:       "export const x = 1;\n",
	}, mainFile)
	ctx := context.Background()

	diags, err := session.handleGetConfigFileParsingDiagnostics(ctx, &GetProjectDiagnosticsParams{
		Snapshot: snapshot, Project: project,
	})
	assert.NilError(t, err)
	assert.Equal(t, len(diags), 1)
	assert.Equal(t, diags[0].FileName, configFileName)

	plain, err := session.handleFormatDiagnostics(ctx, formatDiagnosticsParams(snapshot, project, diags), false)
	assert.NilError(t, err)
	assert.Assert(t, strings.HasPrefix(plain.Output, "home/projects/p/tsconfig.json(1,34): error TS6046: "))

	color, err := session.handleFormatDiagnostics(ctx, formatDiagnosticsParams(snapshot, project, diags), true)
	assert.NilError(t, err)
	assert.Assert(t, strings.Contains(color.Output, "\"target\": \"invalid\""))
	assert.Assert(t, strings.Contains(color.Output, "~~~~~~~~~"))
}

func TestFormatDiagnosticsWithoutFile(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const fileName = "/home/projects/p/src/index.ts"
	session, snapshot, project := setupFormatSession(t, map[string]any{
		"/home/projects/p/tsconfig.json": `{ "compilerOptions": { "strict": true } }`,
		fileName:                         "export const x = 1;\n",
	}, fileName)
	ctx := context.Background()

	fileless := []*DiagnosticResponse{{
		Code:     1234,
		Category: diagnostics.CategoryError,
		Text:     "Some global problem.",
		RelatedInformation: []*DiagnosticResponse{{
			Code:     5678,
			Category: diagnostics.CategoryMessage,
			Text:     "Additional context.",
		}},
	}}

	plain, err := session.handleFormatDiagnostics(ctx, formatDiagnosticsParams(snapshot, project, fileless), false)
	assert.NilError(t, err)
	assert.Equal(t, plain.Output, "error TS1234: Some global problem.\n")

	color, err := session.handleFormatDiagnostics(ctx, formatDiagnosticsParams(snapshot, project, fileless), true)
	assert.NilError(t, err)
	assert.Equal(t, color.Output,
		"\x1b[91merror\x1b[0m\x1b[90m TS1234: \x1b[0mSome global problem.\n\n    Additional context.\n")
}

func TestFormatDiagnosticsClampsOutOfRangePositions(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const fileName = "/home/projects/p/src/index.ts"
	session, snapshot, project := setupFormatSession(t, map[string]any{
		"/home/projects/p/tsconfig.json": `{ "compilerOptions": { "strict": true } }`,
		fileName:                         "export const x = 1;\n",
	}, fileName)
	ctx := context.Background()

	stale := []*DiagnosticResponse{{
		FileName:       fileName,
		SourceFileHash: sourceFileHashForText("export const x = 1;\n"),
		Pos:            100_000,
		End:            200_000,
		Code:           1234,
		Category:       diagnostics.CategoryError,
		Text:           "Stale diagnostic.",
	}}

	plain, err := session.handleFormatDiagnostics(ctx, formatDiagnosticsParams(snapshot, project, stale), false)
	assert.NilError(t, err)
	assert.Equal(t, plain.Output,
		"home/projects/p/src/index.ts(2,1): error TS1234: Stale diagnostic.\n")

	color, err := session.handleFormatDiagnostics(ctx, formatDiagnosticsParams(snapshot, project, stale), true)
	assert.NilError(t, err)
	assert.Assert(t, strings.Contains(color.Output, "TS1234: "))
	assert.Assert(t, strings.Contains(color.Output, "Stale diagnostic."))
}

func TestFormatDiagnosticsRejectsStaleOrMissingSources(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const fileName = "/home/projects/p/src/index.ts"
	session, snapshot, project := setupFormatSession(t, map[string]any{
		"/home/projects/p/tsconfig.json": `{ "compilerOptions": { "strict": true } }`,
		fileName:                         "export const x = 1;\n",
	}, fileName)
	ctx := context.Background()

	stale := formatDiagnosticsParams(snapshot, project, []*DiagnosticResponse{{
		FileName:       fileName,
		SourceFileHash: sourceFileHashForText("different content"),
		Code:           1234,
		Category:       diagnostics.CategoryError,
		Text:           "Stale diagnostic.",
	}})
	_, err := session.handleFormatDiagnostics(ctx, stale, false)
	assert.ErrorContains(t, err, "diagnostic source file content has changed")

	missing := formatDiagnosticsParams(snapshot, project, []*DiagnosticResponse{{
		FileName: "/home/projects/p/src/missing.ts",
		Code:     1234,
		Category: diagnostics.CategoryError,
		Text:     "Missing source.",
	}})
	_, err = session.handleFormatDiagnostics(ctx, missing, false)
	assert.ErrorContains(t, err, "diagnostic source file not found")
}

func TestFormatDiagnosticsNonASCIIPositions(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const fileName = "/home/projects/p/src/index.ts"
	// "é" is 2 UTF-8 bytes and 1 UTF-16 code unit.
	const content = "const café = 1;\nconst x: number = \"oops\";\n"
	session, snapshot, project := setupFormatSession(t, map[string]any{
		"/home/projects/p/tsconfig.json": `{ "compilerOptions": { "strict": true } }`,
		fileName:                         content,
	}, fileName)
	ctx := context.Background()

	diags, err := session.handleGetSemanticDiagnostics(ctx, &GetDiagnosticsParams{
		Snapshot: snapshot, Project: project, Files: []DocumentIdentifier{{FileName: fileName}},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(diags), 1)

	plain, err := session.handleFormatDiagnostics(ctx, formatDiagnosticsParams(snapshot, project, diags), false)
	assert.NilError(t, err)
	assert.Equal(t, plain.Output,
		"home/projects/p/src/index.ts(2,7): error TS2322: Type 'string' is not assignable to type 'number'.\n")

	color, err := session.handleFormatDiagnostics(ctx, formatDiagnosticsParams(snapshot, project, diags), true)
	assert.NilError(t, err)
	assert.Assert(t, strings.Contains(color.Output, "const x: number = \"oops\";"))
	assert.Assert(t, strings.Contains(color.Output, "~"))
}

func TestFormatDiagnosticsAstralPositions(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const fileName = "/home/projects/p/src/index.ts"
	// "😀" is 4 UTF-8 bytes and 2 UTF-16 code units.
	const content = "const emoji = \"😀\";\nconst x: number = \"oops\";\n"
	session, snapshot, project := setupFormatSession(t, map[string]any{
		"/home/projects/p/tsconfig.json": `{ "compilerOptions": { "strict": true } }`,
		fileName:                         content,
	}, fileName)
	ctx := context.Background()

	diags, err := session.handleGetSemanticDiagnostics(ctx, &GetDiagnosticsParams{
		Snapshot: snapshot, Project: project, Files: []DocumentIdentifier{{FileName: fileName}},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(diags), 1)

	plain, err := session.handleFormatDiagnostics(ctx, formatDiagnosticsParams(snapshot, project, diags), false)
	assert.NilError(t, err)
	assert.Equal(t, plain.Output,
		"home/projects/p/src/index.ts(2,7): error TS2322: Type 'string' is not assignable to type 'number'.\n")

	color, err := session.handleFormatDiagnostics(ctx, formatDiagnosticsParams(snapshot, project, diags), true)
	assert.NilError(t, err)
	assert.Assert(t, strings.Contains(color.Output, "const x: number = \"oops\";"))
	assert.Assert(t, strings.Contains(color.Output, "~"))
}

func TestFormatDiagnosticsMessageChainAndRelatedInformation(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const fileName = "/home/projects/p/src/index.ts"
	const content = "interface Props { callback: (x: string) => void }\nconst p: Props = { callback: (x: number) => {} };\n"
	session, snapshot, project := setupFormatSession(t, map[string]any{
		"/home/projects/p/tsconfig.json": `{ "compilerOptions": { "strict": true } }`,
		fileName:                         content,
	}, fileName)
	ctx := context.Background()

	diags, err := session.handleGetSemanticDiagnostics(ctx, &GetDiagnosticsParams{
		Snapshot: snapshot, Project: project, Files: []DocumentIdentifier{{FileName: fileName}},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(diags), 1)
	assert.Assert(t, len(diags[0].MessageChain) > 0, "expected a message chain")
	assert.Assert(t, len(diags[0].RelatedInformation) > 0, "expected related information")

	color, err := session.handleFormatDiagnostics(ctx, formatDiagnosticsParams(snapshot, project, diags), true)
	assert.NilError(t, err)
	assert.Assert(t, strings.Contains(color.Output, "is not assignable to type"))
	assert.Assert(t, strings.Contains(color.Output, "Types of parameters 'x' and 'x' are incompatible."))
	assert.Assert(t, strings.Contains(color.Output, "The expected type comes from property 'callback'"))
}

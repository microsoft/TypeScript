package project_test

import (
	"context"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

func TestUntitledReferences(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	// First test the URI conversion functions to understand the issue
	untitledURI := lsproto.DocumentUri("untitled:Untitled-2")
	convertedFileName := untitledURI.FileName()
	t.Logf("URI '%s' converts to filename '%s'", untitledURI, convertedFileName)

	backToURI := ls.FileNameToDocumentURI(convertedFileName)
	t.Logf("Filename '%s' converts back to URI '%s'", convertedFileName, backToURI)

	if string(backToURI) != string(untitledURI) {
		t.Errorf("Round-trip conversion failed: '%s' -> '%s' -> '%s'", untitledURI, convertedFileName, backToURI)
	}

	// Create a test case that simulates how untitled files should work
	testContent := `let x = 42;

x

x++;`

	// Use the converted filename that DocumentURIToFileName would produce
	untitledFileName := convertedFileName // "^/untitled/ts-nul-authority/Untitled-2"
	t.Logf("Would use untitled filename: %s", untitledFileName)

	// Set up the file system with an untitled file -
	// But use a regular file first to see the current behavior
	files := map[string]any{
		"/Untitled-2.ts": testContent,
	}

	session, _ := projecttestutil.Setup(files)

	ctx := projecttestutil.WithRequestID(context.Background())
	session.DidOpenFile(ctx, "file:///Untitled-2.ts", 1, testContent, lsproto.LanguageKindTypeScript)

	// Get language service
	languageService, err := session.GetLanguageService(ctx, "file:///Untitled-2.ts")
	assert.NilError(t, err)

	// Test the filename that the source file reports
	program := languageService.GetProgram()
	sourceFile := program.GetSourceFile("/Untitled-2.ts")
	t.Logf("SourceFile.FileName() returns: '%s'", sourceFile.FileName())

	// Call ProvideReferences using the LSP method
	uri := lsproto.DocumentUri("file:///Untitled-2.ts")
	lspPosition := lsproto.Position{Line: 2, Character: 0} // Line 3, character 1 (0-indexed)

	refParams := &lsproto.ReferenceParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
		Position:     lspPosition,
		Context:      &lsproto.ReferenceContext{IncludeDeclaration: true},
	}

	resp, err := languageService.ProvideReferences(ctx, refParams)
	assert.NilError(t, err)

	refs := *resp.Locations

	// Log the results
	t.Logf("Input file URI: %s", uri)
	t.Logf("Number of references found: %d", len(refs))
	for i, ref := range refs {
		t.Logf("Reference %d: URI=%s, Range=%+v", i+1, ref.Uri, ref.Range)
	}

	// We expect to find 3 references
	assert.Assert(t, len(refs) == 3, "Expected 3 references, got %d", len(refs))

	// Also test definition using ProvideDefinition
	definition, err := languageService.ProvideDefinition(ctx, uri, lspPosition)
	assert.NilError(t, err)
	if definition.Locations != nil {
		t.Logf("Definition found: %d locations", len(*definition.Locations))
		for i, loc := range *definition.Locations {
			t.Logf("Definition %d: URI=%s, Range=%+v", i+1, loc.Uri, loc.Range)
		}
	}
}

func TestUntitledFileInInferredProject(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	// Test that untitled files are properly handled in inferred projects
	testContent := `let x = 42;

x

x++;`

	session, _ := projecttestutil.Setup(map[string]any{})

	ctx := projecttestutil.WithRequestID(context.Background())

	// Open untitled files - these should create an inferred project
	session.DidOpenFile(ctx, "untitled:Untitled-1", 1, "x\n\n", lsproto.LanguageKindTypeScript)
	session.DidOpenFile(ctx, "untitled:Untitled-2", 1, testContent, lsproto.LanguageKindTypeScript)

	snapshot, release := session.Snapshot()
	defer release()

	// Should have an inferred project
	assert.Assert(t, snapshot.ProjectCollection.InferredProject() != nil)

	// Get language service for the untitled file
	languageService, err := session.GetLanguageService(ctx, "untitled:Untitled-2")
	assert.NilError(t, err)

	program := languageService.GetProgram()
	untitledFileName := lsproto.DocumentUri("untitled:Untitled-2").FileName()
	sourceFile := program.GetSourceFile(untitledFileName)
	assert.Assert(t, sourceFile != nil)
	assert.Equal(t, sourceFile.Text(), testContent)

	// Test references on 'x' at position 13 (line 3, after "let x = 42;\n\n")
	uri := lsproto.DocumentUri("untitled:Untitled-2")
	lspPosition := lsproto.Position{Line: 2, Character: 0} // Line 3, character 1 (0-indexed)

	refParams := &lsproto.ReferenceParams{
		TextDocument: lsproto.TextDocumentIdentifier{Uri: uri},
		Position:     lspPosition,
		Context:      &lsproto.ReferenceContext{IncludeDeclaration: true},
	}

	resp, err := languageService.ProvideReferences(ctx, refParams)
	assert.NilError(t, err)

	refs := *resp.Locations
	t.Logf("Number of references found: %d", len(refs))
	for i, ref := range refs {
		t.Logf("Reference %d: URI=%s, Range=%+v", i+1, ref.Uri, ref.Range)
		// All URIs should be untitled: URIs, not file: URIs
		assert.Assert(t, strings.HasPrefix(string(ref.Uri), "untitled:"),
			"Expected untitled: URI, got %s", ref.Uri)
	}

	// We expect to find 4 references
	assert.Assert(t, len(refs) == 4, "Expected 4 references, got %d", len(refs))
}

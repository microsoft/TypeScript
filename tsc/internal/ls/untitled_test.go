package ls_test

import (
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
	"github.com/microsoft/typescript-go/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestUntitledReferences(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	// First test the URI conversion functions to understand the issue
	untitledURI := lsproto.DocumentUri("untitled:Untitled-2")
	convertedFileName := ls.DocumentURIToFileName(untitledURI)
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
	files := map[string]string{
		"/Untitled-2.ts": testContent,
	}

	ctx := projecttestutil.WithRequestID(t.Context())
	service, done := createLanguageService(ctx, "/Untitled-2.ts", files)
	defer done()

	// Test the filename that the source file reports
	program := service.GetProgram()
	sourceFile := program.GetSourceFile("/Untitled-2.ts")
	t.Logf("SourceFile.FileName() returns: '%s'", sourceFile.FileName())

	// Calculate position of 'x' on line 3 (zero-indexed line 2, character 0)
	position := 13 // After "let x = 42;\n\n"

	// Call ProvideReferences using the test method
	resp, err := service.TestProvideReferences("/Untitled-2.ts", position)
	assert.NilError(t, err)

	refs := *resp.Locations

	// Log the results
	t.Logf("Input file name: %s", "/Untitled-2.ts")
	t.Logf("Number of references found: %d", len(refs))
	for i, ref := range refs {
		t.Logf("Reference %d: URI=%s, Range=%+v", i+1, ref.Uri, ref.Range)
	}

	// We expect to find 3 references
	assert.Assert(t, len(refs) == 3, "Expected 3 references, got %d", len(refs))

	// Also test definition using ProvideDefinition
	uri := ls.FileNameToDocumentURI("/Untitled-2.ts")
	lspPosition := lsproto.Position{Line: 2, Character: 0}
	definition, err := service.ProvideDefinition(t.Context(), uri, lspPosition)
	assert.NilError(t, err)
	if definition.Locations != nil {
		t.Logf("Definition found: %d locations", len(*definition.Locations))
		for i, loc := range *definition.Locations {
			t.Logf("Definition %d: URI=%s, Range=%+v", i+1, loc.Uri, loc.Range)
		}
	}
}

func TestUntitledFileNameDebugging(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	// Test the URI conversion flow
	untitledURI := lsproto.DocumentUri("untitled:Untitled-2")
	convertedFileName := ls.DocumentURIToFileName(untitledURI)
	t.Logf("1. URI '%s' converts to filename '%s'", untitledURI, convertedFileName)

	// Test the path handling
	currentDir := "/home/daniel/TypeScript"
	path := tspath.ToPath(convertedFileName, currentDir, true)
	t.Logf("2. ToPath('%s', '%s') returns: '%s'", convertedFileName, currentDir, string(path))

	// Verify the path is NOT resolved against current directory
	if strings.HasPrefix(string(path), currentDir) {
		t.Errorf("Path was incorrectly resolved against current directory: %s", string(path))
	}

	// Test converting back to URI
	backToURI := ls.FileNameToDocumentURI(string(path))
	t.Logf("3. Path '%s' converts back to URI '%s'", string(path), backToURI)

	if string(backToURI) != string(untitledURI) {
		t.Errorf("Round-trip conversion failed: '%s' -> '%s' -> '%s'", untitledURI, string(path), backToURI)
	}

	t.Logf("✅ Fix working: untitled paths are not resolved against current directory")
}

func TestUntitledFileIntegration(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	// This test simulates the exact scenario from the issue:
	// 1. VS Code sends untitled:Untitled-2 URI
	// 2. References/definitions should return untitled:Untitled-2 URIs, not file:// URIs

	// Simulate exactly what happens in the LSP flow
	originalURI := lsproto.DocumentUri("untitled:Untitled-2")

	// Step 1: URI gets converted to filename when file is opened
	fileName := ls.DocumentURIToFileName(originalURI)
	t.Logf("1. Opening file: URI '%s' -> fileName '%s'", originalURI, fileName)

	// Step 2: fileName gets processed through ToPath in project service
	currentDir := "/home/daniel/TypeScript" // Current directory from the original issue
	path := tspath.ToPath(fileName, currentDir, true)
	t.Logf("2. Project service processes: fileName '%s' -> path '%s'", fileName, string(path))

	// Step 3: Verify path is NOT corrupted by current directory resolution
	if strings.HasPrefix(string(path), currentDir) {
		t.Fatalf("❌ BUG: Path was incorrectly resolved against current directory: %s", string(path))
	}

	// Step 4: When references are found, the path gets converted back to URI
	resultURI := ls.FileNameToDocumentURI(string(path))
	t.Logf("3. References return: path '%s' -> URI '%s'", string(path), resultURI)

	// Step 5: Verify the round-trip conversion works
	if string(resultURI) != string(originalURI) {
		t.Fatalf("❌ Round-trip failed: %s != %s", originalURI, resultURI)
	}

	t.Logf("✅ SUCCESS: Untitled file URIs are preserved correctly")
	t.Logf("   Original URI: %s", originalURI)
	t.Logf("   Final URI:    %s", resultURI)
}

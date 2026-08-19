package ast

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestDiagnosticsCollectionDeduplicatesExactDiagnosticsOnAdd(t *testing.T) {
	t.Parallel()

	var collection DiagnosticsCollection
	first := NewCompilerDiagnostic(diagnostics.Cannot_find_name_0, "x").
		AddRelatedInfo(NewCompilerDiagnostic(diagnostics.X_0_is_declared_here, "first"))
	second := NewCompilerDiagnostic(diagnostics.Cannot_find_name_0, "x").
		AddRelatedInfo(NewCompilerDiagnostic(diagnostics.X_0_is_declared_here, "first"))
	different := NewCompilerDiagnostic(diagnostics.Cannot_find_name_0, "x").
		AddRelatedInfo(NewCompilerDiagnostic(diagnostics.X_0_is_declared_here, "second"))

	if got := collection.Add(first); got != first {
		t.Fatalf("first Add() returned %p, want %p", got, first)
	}
	canonical := collection.Add(second)
	if canonical != first {
		t.Fatalf("second Add() returned %p, want canonical %p", canonical, first)
	}
	if got := collection.Add(different); got != different {
		t.Fatalf("different Add() returned %p, want %p", got, different)
	}

	canonical.AddRelatedInfo(NewCompilerDiagnostic(diagnostics.X_0_is_declared_here, "third"))
	collected := collection.GetGlobalDiagnostics()
	if len(collected) != 2 {
		t.Fatalf("GetGlobalDiagnostics() returned %d diagnostics, want 2", len(collected))
	}
	if got := len(first.RelatedInformation()); got != 2 {
		t.Fatalf("canonical diagnostic has %d related diagnostics, want 2", got)
	}
}

func TestDiagnosticsCollectionPreservesDistinctAdHocMessages(t *testing.T) {
	t.Parallel()

	var collection DiagnosticsCollection
	first := NewCompilerDiagnostic(diagnostics.NewAdHocMessage("first"))
	second := NewCompilerDiagnostic(diagnostics.NewAdHocMessage("second"))

	collection.Add(first)
	collection.Add(second)
	collected := collection.GetGlobalDiagnostics()
	if len(collected) != 2 {
		t.Fatalf("GetGlobalDiagnostics() returned %d diagnostics, want 2", len(collected))
	}
}

func TestDiagnosticsCollectionGetsDiagnosticsForEquivalentSourceFile(t *testing.T) {
	t.Parallel()

	path := tspath.Path("/src/file.ts")
	diagnosticFile := &SourceFile{
		parseOptions: SourceFileParseOptions{FileName: string(path), Path: path},
	}
	requestedFile := &SourceFile{
		parseOptions: SourceFileParseOptions{FileName: string(path), Path: path},
	}
	diagnostic := NewDiagnostic(diagnosticFile, core.TextRange{}, diagnostics.Cannot_find_name_0, "x")

	var collection DiagnosticsCollection
	collection.Add(diagnostic)

	collected := collection.GetDiagnosticsForFile(requestedFile)
	if len(collected) != 1 || collected[0] != diagnostic {
		t.Fatalf("GetDiagnosticsForFile() returned %v, want diagnostic for equivalent source file", collected)
	}
}

func TestExternalDiagnosticIdentity(t *testing.T) {
	t.Parallel()
	file := &SourceFile{parseOptions: SourceFileParseOptions{FileName: "/src/file.vue", Path: "/src/file.vue"}}
	loc := core.NewTextRange(1, 2)
	first := NewExternalDiagnostic(file, loc, "mapper-a", diagnostics.CategoryError, 0, "first")
	diagnostics := []*Diagnostic{
		first,
		NewExternalDiagnostic(file, loc, "mapper-a", diagnostics.CategoryError, 0, "second"),
		NewExternalDiagnostic(file, loc, "mapper-b", diagnostics.CategoryError, 0, "first"),
		NewExternalDiagnostic(file, loc, "mapper-a", diagnostics.CategoryWarning, 0, "first"),
	}

	var collection DiagnosticsCollection
	for _, diagnostic := range diagnostics {
		assert.Assert(t, !EqualDiagnosticsNoRelatedInfo(first, diagnostic) || diagnostic == first)
		assert.Assert(t, CompareDiagnostics(first, diagnostic) != 0 || diagnostic == first)
		collection.Add(diagnostic)
	}
	assert.Equal(t, len(collection.GetDiagnostics()), len(diagnostics))
}

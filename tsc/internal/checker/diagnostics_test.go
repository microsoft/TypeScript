package checker

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"gotest.tools/v3/assert"
)

func TestAddDiagnosticRejectsMessageCategory(t *testing.T) {
	t.Parallel()

	c := &Checker{}
	diagnostic := ast.NewCompilerDiagnostic(diagnostics.File_is_included_via_import_here)
	defer func() {
		assert.Equal(t, recover(), "Debug failure. False expression: Cannot report a Message-category diagnostic as an error.")
		assert.Equal(t, len(c.diagnostics.GetDiagnostics()), 0)
	}()
	c.addDiagnostic(diagnostic)
}

func TestAddDiagnosticAllowsMessageRelatedInformation(t *testing.T) {
	t.Parallel()

	c := &Checker{}
	related := ast.NewCompilerDiagnostic(diagnostics.File_is_included_via_import_here)
	diagnostic := ast.NewCompilerDiagnostic(diagnostics.Cannot_find_name_0, "x").AddRelatedInfo(related)

	assert.Equal(t, c.addDiagnostic(diagnostic), diagnostic)
	collected := c.diagnostics.GetDiagnostics()
	assert.Equal(t, len(collected), 1)
	assert.Equal(t, collected[0], diagnostic)
	assert.Equal(t, diagnostic.RelatedInformation()[0].Category(), diagnostics.CategoryMessage)
}

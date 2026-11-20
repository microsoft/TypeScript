package estransforms_test

import (
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/printer"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/emittestutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/parsetestutil"
	"github.com/microsoft/TypeScript/tsc/internal/transformers"
	"github.com/microsoft/TypeScript/tsc/internal/transformers/estransforms"
	"gotest.tools/v3/assert"
)

// When a static property initializer is moved into a `static {}` block, SetOriginal copies the
// property's synthetic comments to both the block and the statement inside it, so the transform
// must keep them on the block only.
func TestStaticPropertySyntheticCommentsAreEmittedOnce(t *testing.T) {
	t.Parallel()
	file := parsetestutil.ParseTypeScript("class C { static x = 1; }", false /*jsx*/)
	parsetestutil.CheckDiagnostics(t, file)
	property := file.Statements.Nodes[0].Members()[0]
	emitContext := printer.NewEmitContext()
	emitContext.AddSyntheticLeadingComment(property, ast.KindMultiLineCommentTrivia, "leading", false /*hasTrailingNewLine*/)
	emitContext.AddSyntheticTrailingComment(property, ast.KindMultiLineCommentTrivia, "trailing", false /*hasTrailingNewLine*/)
	compilerOptions := &core.CompilerOptions{Target: core.ScriptTargetES2022, UseDefineForClassFields: core.TSFalse}
	opts := &transformers.TransformOptions{CompilerOptions: compilerOptions, Context: emitContext}
	file = estransforms.GetESTransformer(opts).TransformSourceFile(file)
	output := emittestutil.Emit(t, emitContext, file)
	assert.Assert(t, strings.Contains(output, "static {"), output)
	assert.Equal(t, strings.Count(output, "/*leading*/"), 1, output)
	assert.Equal(t, strings.Count(output, "/*trailing*/"), 1, output)
}

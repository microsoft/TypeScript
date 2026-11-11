package printer_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/printer"
	"gotest.tools/v3/assert"
)

func syntheticCommentTexts(comments []printer.SynthesizedComment) []string {
	texts := make([]string, len(comments))
	for i, comment := range comments {
		texts[i] = comment.Text
	}
	return texts
}

func TestSetOriginalCopiesSyntheticComments(t *testing.T) {
	t.Parallel()
	emitContext := printer.NewEmitContext()
	factory := emitContext.Factory

	original := factory.NewIdentifier("a")
	emitContext.AddSyntheticLeadingComment(original, ast.KindMultiLineCommentTrivia, "leading", false /*hasTrailingNewLine*/)
	emitContext.AddSyntheticTrailingComment(original, ast.KindMultiLineCommentTrivia, "trailing", false /*hasTrailingNewLine*/)

	node := factory.NewIdentifier("b")
	emitContext.AddSyntheticLeadingComment(node, ast.KindMultiLineCommentTrivia, "existing", false /*hasTrailingNewLine*/)
	emitContext.SetOriginal(node, original)

	// The original node's comments are prepended to the ones the node already has.
	assert.DeepEqual(t, syntheticCommentTexts(emitContext.GetSyntheticLeadingComments(node)), []string{"leading", "existing"})
	assert.DeepEqual(t, syntheticCommentTexts(emitContext.GetSyntheticTrailingComments(node)), []string{"trailing"})
}

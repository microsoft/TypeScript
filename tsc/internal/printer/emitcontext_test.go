package printer_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/printer"
	"gotest.tools/v3/assert"
)

func TestEmitContext_CopyFrom_PreservesSyntheticComments(t *testing.T) {
	t.Parallel()
	ctx := printer.NewEmitContext()
	orig := &ast.Node{Kind: ast.KindIdentifier}
	ctx.SetSyntheticLeadingComments(orig, []printer.SynthesizedComment{
		{Text: "/*leading*/"},
	})
	ctx.SetSyntheticTrailingComments(orig, []printer.SynthesizedComment{
		{Text: "/*trailing*/"},
	})

	newNode := &ast.Node{Kind: ast.KindIdentifier}
	ctx.SetOriginal(newNode, orig)

	leading := ctx.GetSyntheticLeadingComments(newNode)
	trailing := ctx.GetSyntheticTrailingComments(newNode)
	assert.Assert(t, len(leading) == 1)
	assert.Equal(t, "/*leading*/", leading[0].Text)
	assert.Assert(t, len(trailing) == 1)
	assert.Equal(t, "/*trailing*/", trailing[0].Text)

	// Verify independent slice clone semantics: mutating newNode comments doesn't mutate orig
	ctx.SetSyntheticLeadingComments(newNode, nil)
	assert.Assert(t, len(ctx.GetSyntheticLeadingComments(orig)) == 1)
}

func TestEmitContext_CopyFrom_MergesWithExistingComments(t *testing.T) {
	t.Parallel()
	ctx := printer.NewEmitContext()
	orig := &ast.Node{Kind: ast.KindIdentifier}
	ctx.SetSyntheticLeadingComments(orig, []printer.SynthesizedComment{
		{Text: "/*source-leading*/"},
	})
	ctx.SetSyntheticTrailingComments(orig, []printer.SynthesizedComment{
		{Text: "/*source-trailing*/"},
	})

	newNode := &ast.Node{Kind: ast.KindIdentifier}
	ctx.SetSyntheticLeadingComments(newNode, []printer.SynthesizedComment{
		{Text: "/*dest-leading*/"},
	})
	ctx.SetSyntheticTrailingComments(newNode, []printer.SynthesizedComment{
		{Text: "/*dest-trailing*/"},
	})

	ctx.SetOriginal(newNode, orig)

	leading := ctx.GetSyntheticLeadingComments(newNode)
	trailing := ctx.GetSyntheticTrailingComments(newNode)
	assert.Assert(t, len(leading) == 2)
	assert.Equal(t, "/*source-leading*/", leading[0].Text)
	assert.Equal(t, "/*dest-leading*/", leading[1].Text)
	assert.Assert(t, len(trailing) == 2)
	assert.Equal(t, "/*source-trailing*/", trailing[0].Text)
	assert.Equal(t, "/*dest-trailing*/", trailing[1].Text)
}

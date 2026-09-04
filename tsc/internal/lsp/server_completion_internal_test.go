package lsp

import (
	"context"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestCompletionItemResolveRejectsRelativeFileName(t *testing.T) {
	t.Parallel()

	server := &Server{}
	_, err := server.handleCompletionItemResolve(context.Background(), &lsproto.CompletionItem{
		Data: &lsproto.CompletionItemData{FileName: tspath.RootedFilePath("relative.ts")},
	}, nil)
	assert.Error(t, err, "completion item data fileName must be absolute")
}

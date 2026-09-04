package lsp

import (
	"context"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"gotest.tools/v3/assert"
)

func TestCompletionItemResolveRejectsRelativeFileName(t *testing.T) {
	t.Parallel()

	server := &Server{}
	_, err := server.handleCompletionItemResolve(context.Background(), &lsproto.CompletionItem{
		Data: &lsproto.CompletionItemData{FileName: "relative.ts"},
	}, nil)
	assert.Error(t, err, "completion item data fileName must be absolute")
}

func TestCompletionItemResolveRejectsMalformedDynamicFileName(t *testing.T) {
	t.Parallel()

	for _, fileName := range []string{
		"^/invalid",
		"^/~ts-uri~/scheme/authority/~ts-uri-escape~zz~",
	} {
		server := &Server{}
		_, err := server.handleCompletionItemResolve(context.Background(), &lsproto.CompletionItem{
			Data: &lsproto.CompletionItemData{FileName: fileName},
		}, nil)
		assert.Error(t, err, "completion item data fileName must be a valid dynamic path")
	}
}

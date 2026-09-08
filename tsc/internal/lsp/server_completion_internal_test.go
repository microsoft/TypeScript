package lsp

import (
	"context"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"gotest.tools/v3/assert"
)

func TestCompletionItemResolveRejectsInvalidFileName(t *testing.T) {
	t.Parallel()

	for _, test := range []struct {
		fileName string
		message  string
	}{
		{"relative.ts", "completion item data fileName must be absolute"},
		{"^/invalid", "completion item data fileName must be a valid dynamic path"},
		{"^/~ts-uri~/scheme/authority/~ts-uri-escape~zz~", "completion item data fileName must be a valid dynamic path"},
	} {
		t.Run(test.fileName, func(t *testing.T) {
			t.Parallel()
			server := &Server{}
			_, err := server.handleCompletionItemResolve(context.Background(), &lsproto.CompletionItem{
				Data: &lsproto.CompletionItemData{FileName: test.fileName},
			}, nil)
			assert.Error(t, err, test.message)
		})
	}
}

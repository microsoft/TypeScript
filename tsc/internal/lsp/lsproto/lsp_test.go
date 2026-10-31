package lsproto

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestUnmarshalCompletionItem(t *testing.T) {
	t.Parallel()

	const message = `{
    "label": "pageXOffset",
    "insertTextFormat": 1,
    "textEdit": {
        "newText": "pageXOffset",
        "insert": {
            "start": {
                "line": 4,
                "character": 0
            },
            "end": {
                "line": 4,
                "character": 4
            }
        },
        "replace": {
            "start": {
                "line": 4,
                "character": 0
            },
            "end": {
                "line": 4,
                "character": 4
            }
        }
    },
    "kind": 6,
    "sortText": "15",
    "commitCharacters": [
        ".",
        ",",
        ";"
    ]
}`

	var result CompletionItem
	err := json.Unmarshal([]byte(message), &result)
	assert.NilError(t, err)

	assert.DeepEqual(t, result, CompletionItem{
		Label:            "pageXOffset",
		InsertTextFormat: new(InsertTextFormatPlainText),
		TextEdit: &TextEditOrInsertReplaceEdit{
			InsertReplaceEdit: &InsertReplaceEdit{
				NewText: "pageXOffset",
				Insert: Range{
					Start: Position{
						Line:      4,
						Character: 0,
					},
					End: Position{
						Line:      4,
						Character: 4,
					},
				},
				Replace: Range{
					Start: Position{
						Line:      4,
						Character: 0,
					},
					End: Position{
						Line:      4,
						Character: 4,
					},
				},
			},
		},
		Kind:             new(CompletionItemKindVariable),
		SortText:         new("15"),
		CommitCharacters: new([]string{".", ",", ";"}),
	})
}

func TestTryDynamicFileNameToDocumentUri(t *testing.T) {
	t.Parallel()

	uri := DocumentUri("untitled://wsl+ubuntu/home/user/file.ts?version=1")
	path := uri.Path()
	roundTrip, ok := TryDynamicFileNameToDocumentUri(path)
	assert.Assert(t, ok)
	assert.Equal(t, roundTrip, uri)

	for _, malformed := range []tspath.RootedPath{
		"^/invalid",
		"^/~ts-uri~//authority/path",
		"^/~ts-uri~/scheme/~ts-uri-escape~zz~/path",
		"^/~ts-uri~/scheme/authority/~ts-uri-escape~zz~",
		"^/~ts-uri~/scheme/authority/~ts-uri-no-path~zz~",
	} {
		_, ok := TryDynamicFileNameToDocumentUri(malformed)
		assert.Assert(t, !ok, "expected %q to be rejected", malformed)
	}
}

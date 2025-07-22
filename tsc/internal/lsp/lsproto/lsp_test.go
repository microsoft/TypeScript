package lsproto

import (
	"encoding/json"
	"testing"

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
		InsertTextFormat: ptrTo(InsertTextFormatPlainText),
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
		Kind:             ptrTo(CompletionItemKindVariable),
		SortText:         ptrTo("15"),
		CommitCharacters: ptrTo([]string{".", ",", ";"}),
	})
}

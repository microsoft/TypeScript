package ls_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

var defaultCommitCharacters = []string{".", ",", ";"}

type testCase struct {
	name     string
	content  string
	position int
	expected *lsproto.CompletionList
}

func TestCompletions(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		// Without embedding, we'd need to read all of the lib files out from disk into the MapFS.
		// Just skip this for now.
		t.Skip("bundled files are not embedded")
	}
	testCases := []testCase{
		{
			name: "basicInterfaceMembers",
			content: `export {};
interface Point {
    x: number;
    y: number;
}
declare const p: Point;
p.`,
			position: 87,
			expected: &lsproto.CompletionList{
				IsIncomplete: false,
				ItemDefaults: &lsproto.CompletionItemDefaults{
					CommitCharacters: &defaultCommitCharacters,
				},
				Items: []*lsproto.CompletionItem{
					{
						Label:            "x",
						Kind:             ptrTo(lsproto.CompletionItemKindField),
						SortText:         ptrTo(string(ls.SortTextLocationPriority)),
						InsertTextFormat: ptrTo(lsproto.InsertTextFormatPlainText),
					},
					{
						Label:            "y",
						Kind:             ptrTo(lsproto.CompletionItemKindField),
						SortText:         ptrTo(string(ls.SortTextLocationPriority)),
						InsertTextFormat: ptrTo(lsproto.InsertTextFormatPlainText),
					},
				},
			},
		},
		{
			name: "objectLiteralType",
			content: `export {};
let x = { foo: 123 };
x.`,
			position: 35,
			expected: &lsproto.CompletionList{
				IsIncomplete: false,
				ItemDefaults: &lsproto.CompletionItemDefaults{
					CommitCharacters: &defaultCommitCharacters,
				},
				Items: []*lsproto.CompletionItem{
					{
						Label:            "foo",
						Kind:             ptrTo(lsproto.CompletionItemKindField),
						SortText:         ptrTo(string(ls.SortTextLocationPriority)),
						InsertTextFormat: ptrTo(lsproto.InsertTextFormatPlainText),
					},
				},
			},
		},
	}
	for _, testCase := range testCases {
		t.Run(testCase.name, func(t *testing.T) {
			t.Parallel()
			runTest(t, testCase.content, testCase.position, testCase.expected)
		})
	}
}

func runTest(t *testing.T, content string, position int, expected *lsproto.CompletionList) {
	files := map[string]string{
		"/index.ts": content,
	}
	languageService := createLanguageService("/index.ts", files)
	context := &lsproto.CompletionContext{
		TriggerKind: lsproto.CompletionTriggerKindInvoked,
	}
	capabilities := &lsproto.CompletionClientCapabilities{
		CompletionItem: &lsproto.ClientCompletionItemOptions{
			SnippetSupport:          ptrTo(true),
			CommitCharactersSupport: ptrTo(true),
			PreselectSupport:        ptrTo(true),
			LabelDetailsSupport:     ptrTo(true),
		},
		CompletionList: &lsproto.CompletionListCapabilities{
			ItemDefaults: &[]string{"commitCharacters"},
		},
	}
	preferences := &ls.UserPreferences{}
	completionList := languageService.ProvideCompletion(
		"/index.ts",
		position,
		context,
		capabilities,
		preferences)
	assert.DeepEqual(t, completionList, expected)
}

func createLanguageService(fileName string, files map[string]string) *ls.LanguageService {
	projectService, _ := projecttestutil.Setup(files)
	projectService.OpenFile(fileName, files[fileName], core.ScriptKindTS, "")
	project := projectService.Projects()[0]
	return project.LanguageService()
}

func ptrTo[T any](v T) *T {
	return &v
}

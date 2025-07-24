package ls_test

import (
	"context"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

func TestHover(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		// Without embedding, we'd need to read all of the lib files out from disk into the MapFS.
		// Just skip this for now.
		t.Skip("bundled files are not embedded")
	}

	testCases := []struct {
		title    string
		input    string
		expected map[string]*lsproto.Hover
	}{
		{
			title: "JSDocLinksPanic",
			input: `
// @filename: index.ts
/**
 * A function with JSDoc links that previously caused panic
 * {@link console.log} and {@linkcode Array.from} and {@linkplain Object.keys}
 */
function myFunction() {
    return "test";
}

/*marker*/myFunction();`,
			expected: map[string]*lsproto.Hover{
				"marker": {
					Contents: lsproto.MarkupContentOrStringOrMarkedStringWithLanguageOrMarkedStrings{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "```tsx\nfunction myFunction(): string\n```\nA function with JSDoc links that previously caused panic\n`console.log` and `Array.from` and `Object.keys`",
						},
					},
				},
			},
		},
		{
			title: "JSDocParamHoverFunctionDeclaration",
			input: `
// @filename: index.js
/**
 * @param {string} param - the greatest of days
 */
function /*marker*/myFunction(param) {
    return "test" + param;
}

myFunction();`,
			expected: map[string]*lsproto.Hover{
				"marker": {
					Contents: lsproto.MarkupContentOrStringOrMarkedStringWithLanguageOrMarkedStrings{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "```tsx\nfunction myFunction(param: string): string\n```\n\n\n*@param* `param` - the greatest of days\n",
						},
					},
				},
			},
		},
		{
			title: "JSDocParamHoverFunctionCall",
			input: `
// @filename: index.js
/**
 * @param {string} param - the greatest of days
 */
function myFunction(param) {
    return "test" + param;
}

/*marker*/myFunction();`,
			expected: map[string]*lsproto.Hover{
				"marker": {
					Contents: lsproto.MarkupContentOrStringOrMarkedStringWithLanguageOrMarkedStrings{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "```tsx\nfunction myFunction(param: string): string\n```\n\n\n*@param* `param` - the greatest of days\n",
						},
					},
				},
			},
		},
		{
			title: "JSDocParamHoverParameter",
			input: `
// @filename: index.js
/**
 * @param {string} param - the greatest of days
 */
function myFunction(/*marker*/param) {
    return "test" + param;
}

myFunction();`,
			expected: map[string]*lsproto.Hover{
				"marker": {
					Contents: lsproto.MarkupContentOrStringOrMarkedStringWithLanguageOrMarkedStrings{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "```tsx\n(parameter) param: string\n```\n- the greatest of days\n",
						},
					},
				},
			},
		},
		{
			title: "JSDocParamHoverTagIdentifier",
			input: `
// @filename: index.js
/**
 * @param {string} /*marker*/param - the greatest of days
 */
function myFunction(param) {
    return "test" + param;
}

myFunction();`,
			expected: map[string]*lsproto.Hover{
				// TODO: Should have same result as hovering on the parameter itself.
				"marker": nil,
			},
		},
	}

	for _, testCase := range testCases {
		t.Run(testCase.title, func(t *testing.T) {
			t.Parallel()
			runHoverTest(t, testCase.input, testCase.expected)
		})
	}
}

func runHoverTest(t *testing.T, input string, expected map[string]*lsproto.Hover) {
	testData := fourslash.ParseTestData(t, input, "/mainFile.ts")
	file := testData.Files[0].FileName()
	markerPositions := testData.MarkerPositions
	ctx := projecttestutil.WithRequestID(t.Context())
	languageService, done := createLanguageServiceForHover(ctx, file, map[string]any{
		file: testData.Files[0].Content,
	})
	defer done()

	for markerName, expectedResult := range expected {
		marker, ok := markerPositions[markerName]
		if !ok {
			t.Fatalf("No marker found for '%s'", markerName)
		}
		result, err := languageService.ProvideHover(
			ctx,
			ls.FileNameToDocumentURI(file),
			marker.LSPosition)
		assert.NilError(t, err)
		if expectedResult == nil {
			assert.Assert(t, result == nil)
		} else {
			assert.Assert(t, result != nil)
			assert.DeepEqual(t, result, expectedResult)
		}
	}
}

func createLanguageServiceForHover(ctx context.Context, fileName string, files map[string]any) (*ls.LanguageService, func()) {
	projectService, _ := projecttestutil.Setup(files, nil)
	projectService.OpenFile(fileName, files[fileName].(string), core.GetScriptKindFromFileName(fileName), "")
	project := projectService.Projects()[0]
	return project.GetLanguageServiceForRequest(ctx)
}

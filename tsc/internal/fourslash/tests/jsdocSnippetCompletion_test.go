package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
	"gotest.tools/v3/assert"
)

func TestJSDocSnippetCompletionForFunction(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*completion*/ */
function abcdef(x, y) { }
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "completion")
	f.Insert(t, "/**")

	list := f.GetCompletions(t, nil /*userPreferences*/)
	assert.Assert(t, list != nil)
	assert.Equal(t, len(list.Items), 1)

	item := list.Items[0]
	assert.Equal(t, item.Label, "/** */")
	assert.DeepEqual(t, item.Kind, new(lsproto.CompletionItemKindText))
	assert.DeepEqual(t, item.Detail, new("JSDoc comment"))
	assert.DeepEqual(t, item.SortText, new("\x00"))
	assert.DeepEqual(t, item.CommitCharacters, &[]string{})
	assert.DeepEqual(t, item.InsertTextFormat, new(lsproto.InsertTextFormatSnippet))
	assert.Assert(t, item.TextEdit != nil)
	assert.Assert(t, item.TextEdit.InsertReplaceEdit != nil)
	assert.Equal(t, item.TextEdit.InsertReplaceEdit.NewText, "/**\n * $0\n * @param x ${1}\n * @param y ${2}\n */")
	assert.DeepEqual(t, item.TextEdit.InsertReplaceEdit.Insert, lsproto.Range{
		Start: lsproto.Position{Line: 0, Character: 0},
		End:   lsproto.Position{Line: 0, Character: 6},
	})
	assert.DeepEqual(t, item.TextEdit.InsertReplaceEdit.Replace, lsproto.Range{
		Start: lsproto.Position{Line: 0, Character: 0},
		End:   lsproto.Position{Line: 0, Character: 6},
	})
}

func TestJSDocSnippetCompletionForReturn(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*completion*/ */
function abcdef(x) { return x; }
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "completion")
	f.Insert(t, "/**")

	list := f.GetCompletions(t, nil /*userPreferences*/)
	assert.Assert(t, list != nil)
	assert.Equal(t, len(list.Items), 1)
	assert.Equal(t, list.Items[0].TextEdit.InsertReplaceEdit.NewText, "/**\n * $0\n * @param x ${1}\n * @returns ${2}\n */")
}

func TestJSDocSnippetCompletionPreservesCRLF(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = "/*completion*/ */\r\nfunction abcdef(x) { return x; }\r\n"
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "completion")
	f.Insert(t, "/**")

	userPreferences := lsutil.NewDefaultUserPreferences()
	userPreferences.FormatCodeSettings.NewLineCharacter = "\r\n"
	list := f.GetCompletions(t, &userPreferences)
	assert.Assert(t, list != nil)
	assert.Equal(t, len(list.Items), 1)
	assert.Equal(t, list.Items[0].TextEdit.InsertReplaceEdit.NewText, "/**\r\n * $0\r\n * @param x ${1}\r\n * @returns ${2}\r\n */")
}

func TestJSDocSnippetCompletionRespectsGenerateReturnPreference(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*completion*/ */
function abcdef(x) { return x; }
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "completion")
	f.Insert(t, "/**")

	userPreferences := lsutil.NewDefaultUserPreferences()
	userPreferences.GenerateReturnInDocTemplate = core.TSFalse
	list := f.GetCompletions(t, &userPreferences)
	assert.Assert(t, list != nil)
	assert.Equal(t, len(list.Items), 1)
	assert.Equal(t, list.Items[0].TextEdit.InsertReplaceEdit.NewText, "/**\n * $0\n * @param x ${1}\n */")
}

func TestJSDocSnippetCompletionRespectsEnabledPreference(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*completion*/ */
function abcdef(x) { }
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "completion")
	f.Insert(t, "/**")

	userPreferences := lsutil.NewDefaultUserPreferences()
	userPreferences.EnableJSDocCompletions = core.TSFalse
	list := f.GetCompletions(t, &userPreferences)
	if list != nil {
		for _, item := range list.Items {
			assert.Assert(t, item.Label != "/** */")
		}
	}
}

func TestJSDocSnippetCompletionForClass(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*completion*/
class C {
}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "completion")
	f.Insert(t, "/**")

	list := f.GetCompletions(t, nil /*userPreferences*/)
	assert.Assert(t, list != nil)
	assert.Equal(t, len(list.Items), 1)
	assert.Equal(t, list.Items[0].TextEdit.InsertReplaceEdit.NewText, "/**\n * $0\n */")
}

func TestJSDocSnippetCompletionNotInNonEmptyComment(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/** text /*completion*/ */
function abcdef(x) { }
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.VerifyCompletions(t, "completion", nil)
}

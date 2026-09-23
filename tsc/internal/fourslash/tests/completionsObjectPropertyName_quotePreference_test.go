package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/ls"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

// The name of an object literal property that is not an identifier is completed as a string literal, which has to
// follow the quote preference. The preference is configured for the whole session, rather than per request,
// so that resolving a completion item sees the same preference as the completion request did.
func configureQuotePreference(t *testing.T, f *fourslash.FourslashTest, quotePreference lsutil.QuotePreference) {
	t.Helper()
	opts := f.GetOptions()
	opts.QuotePreference = quotePreference
	f.Configure(t, opts)
}

// requiredKey is the completion of a required property, whose name is `name` (already quoted).
func requiredKey(name string) *lsproto.CompletionItem {
	return &lsproto.CompletionItem{Label: name}
}

// optionalKey is the completion of an optional property, whose name is `name` (already quoted).
func optionalKey(name string) *lsproto.CompletionItem {
	return &lsproto.CompletionItem{
		Label:      name + "?",
		InsertText: new(name),
		FilterText: new(name),
		SortText:   new(string(ls.SortTextOptionalMember)),
	}
}

func verifyObjectLiteralKeyCompletions(t *testing.T, f *fourslash.FourslashTest, items ...*lsproto.CompletionItem) {
	t.Helper()
	expected := make([]fourslash.CompletionsExpectedItem, len(items))
	for i, item := range items {
		expected[i] = item
	}
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{Exact: expected},
	})
}

const objectPropertyNameContent = `interface Options {
    "a-b": number;
    "c d"?: string;
    "it's"?: number;
    'say "hi"'?: number;
    plain: boolean;
}
const o: Options = {
    /**/
};`

func TestCompletionsObjectPropertyName_quotePreferenceSingle(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type TableName = 't1' | 't2';
type ColumnName = 'id' | 'value';
type TableColumn = ` + "`${TableName}.${ColumnName}`" + `;

type Join = {
  on: Partial<Record<TableColumn, TableColumn>>;
};

const test: Join = {
  on: {
    /**/
  }
};`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	configureQuotePreference(t, f, lsutil.QuotePreferenceSingle)
	verifyObjectLiteralKeyCompletions(t, f,
		optionalKey(`'t1.id'`),
		optionalKey(`'t1.value'`),
		optionalKey(`'t2.id'`),
		optionalKey(`'t2.value'`),
	)
}

func TestCompletionsObjectPropertyName_quotePreferenceSingleEscaping(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, objectPropertyNameContent)
	defer done()
	configureQuotePreference(t, f, lsutil.QuotePreferenceSingle)
	// Resolving an item finds its symbol by name, so the detail checks that the name matches with the preference too.
	spaced := optionalKey(`'c d'`)
	spaced.Detail = new(`(property) Options["c d"]?: string | undefined`)
	verifyObjectLiteralKeyCompletions(t, f,
		requiredKey(`'a-b'`),
		requiredKey(`plain`),
		spaced,
		optionalKey(`'it\'s'`),
		optionalKey(`'say "hi"'`),
	)
}

func TestCompletionsObjectPropertyName_quotePreferenceDouble(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, objectPropertyNameContent)
	defer done()
	configureQuotePreference(t, f, lsutil.QuotePreferenceDouble)
	verifyObjectLiteralKeyCompletions(t, f,
		requiredKey(`"a-b"`),
		requiredKey(`plain`),
		optionalKey(`"c d"`),
		optionalKey(`"it's"`),
		optionalKey(`"say \"hi\""`),
	)
}

func TestCompletionsObjectPropertyName_quotePreferenceAuto(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @filename: /a.ts
export const a = 1;
// @filename: /b.ts
import { a } from './a';

interface Options {
    "a-b"?: number;
}
const o: Options = {
    /**/
};`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/b.ts")
	configureQuotePreference(t, f, lsutil.QuotePreferenceAuto)
	verifyObjectLiteralKeyCompletions(t, f, optionalKey(`'a-b'`))
}

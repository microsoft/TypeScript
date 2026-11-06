package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/ls"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCompletionsObjectLiteralInGenericTupleConstraint(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
type AllPartialObject = {
  component?: string
}

declare function extendTheme1<Extensions extends [AllPartialObject]>(
  extensions: Extensions
): void

extendTheme1([
  {
    /*1*/
  },
])

declare function extendTheme2<
  Extensions extends [AllPartialObject & Record<string, unknown>],
>(extensions: Extensions): void

extendTheme2([
  {
    /*2*/
  },
])

type PartialWithRequiredObject = {
  component?: string
  requiredField: string
}

declare function extendTheme3<
  Extensions extends [PartialWithRequiredObject & Record<string, unknown>],
>(extensions: Extensions): void

extendTheme3([
  {
    /*3*/
  },
])

extendTheme3([
  {
    requiredField: 'foo',
    /*4*/
  },
])

declare function extendTheme4<Extensions extends [PartialWithRequiredObject]>(
  extensions: Extensions
): Extensions

extendTheme4([
  {
    requiredField: 'foo',
    /*5*/
  },
])

declare function extendTheme5<
  Extensions extends AllPartialObject & Record<string, unknown>,
>(extensions: [Extensions]): Extensions

extendTheme5([
  {
    /*6*/
  },
])

declare function extendTheme6<Extensions extends PartialWithRequiredObject[]>(
  extensions: Extensions
): Extensions

extendTheme6([
  {
    requiredField: 'foo',
    /*7*/
  },
])

declare function extendTheme7<Extensions extends AllPartialObject[]>(
  options: { extensions: Extensions }
): Extensions

extendTheme7({
  extensions: [
    {
      /*8*/
    },
  ],
})`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	component := &lsproto.CompletionItem{
		Label:      "component?",
		InsertText: new("component"),
		FilterText: new("component"),
		SortText:   new(string(ls.SortTextOptionalMember)),
	}
	requiredField := &lsproto.CompletionItem{
		Label:    "requiredField",
		SortText: new(string(ls.SortTextLocationPriority)),
	}
	// Contextual types that include `Record<string, unknown>` make the position a new identifier location,
	// which has no commit characters.
	noCommitCharacters := []string{}

	// Without a string index signature in the constraint.
	f.VerifyCompletions(t, []string{"1", "5", "7", "8"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{component},
		},
	})
	// With a string index signature in the constraint.
	f.VerifyCompletions(t, []string{"2", "4", "6"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &noCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{component},
		},
	})
	f.VerifyCompletions(t, "3", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &noCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{requiredField, component},
		},
	})
}

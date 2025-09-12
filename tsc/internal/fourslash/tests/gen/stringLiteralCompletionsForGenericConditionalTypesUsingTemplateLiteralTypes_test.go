package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestStringLiteralCompletionsForGenericConditionalTypesUsingTemplateLiteralTypes(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type PathOf<T, K extends string, P extends string = ""> =
  K extends ` + "`" + `${infer U}.${infer V}` + "`" + `
    ? U extends keyof T ? PathOf<T[U], V, ` + "`" + `${P}${U}.` + "`" + `> : ` + "`" + `${P}${keyof T & (string | number)}` + "`" + `
    : K extends keyof T ? ` + "`" + `${P}${K}` + "`" + ` : ` + "`" + `${P}${keyof T & (string | number)}` + "`" + `;

declare function consumer<K extends string>(path: PathOf<{a: string, b: {c: string}}, K>) : number;

consumer('b./*ts*/')`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"ts"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"a",
				"b",
				"b.c",
			},
		},
	})
}

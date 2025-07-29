package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestStringCompletionsFromGenericConditionalTypesUsingTemplateLiteralTypes(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
type keyword = "foo" | "bar" | "baz"

type validateString<s> = s extends keyword
    ? s
    : s extends ` + "`" + `${infer left extends keyword}|${infer right}` + "`" + `
    ? right extends keyword
        ? s
        : ` + "`" + `${left}|${keyword}` + "`" + `
    : keyword

type isUnknown<t> = unknown extends t
    ? [t] extends [{}]
        ? false
        : true
    : false

type validate<def> = def extends string
    ? validateString<def>
    : isUnknown<def> extends true
    ? keyword
    : {
          [k in keyof def]: validate<def[k]>
      }
const parse = <def>(def: validate<def>) => def
const shallowExpression = parse("foo|/*ts*/")
const nestedExpression = parse({ prop: "foo|/*ts2*/" })`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"ts"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"bar",
				"baz",
				"foo",
				"foo|bar",
				"foo|baz",
				"foo|foo",
			},
		},
	})
	f.VerifyCompletions(t, []string{"ts2"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"foo|bar",
				"foo|baz",
				"foo|foo",
			},
		},
	})
}

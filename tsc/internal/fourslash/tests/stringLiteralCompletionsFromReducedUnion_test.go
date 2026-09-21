package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestStringLiteralCompletionsFromReducedUnion(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
declare function direct(value: "a" | "b" | string): void;
direct("/*direct*/");
type Choice = "a" | "b" | string;
declare function aliased(value: Choice): void;
aliased("/*alias*/");
declare function optional(value: { choice?: Choice }): void;
optional({ choice: "/*optional*/" });
declare function plain(value: string): void;
plain("/*plain*/");
declare function other(value: "c" | string): void;
other("/*other*/");
declare function mixed(value: Choice | number): void;
mixed("/*mixed*/");
declare function merged(value: Choice | "c" | string): void;
merged("/*merged*/");
type Open<Value extends string> = Value | string;
declare function generic(value: Open<"a" | "b">): void;
generic("/*generic*/");
declare function branded(value: "a" | "b" | (string & { brand: true })): void;
branded("/*branded*/");
type OptionalChoice = Choice | undefined;
declare function nullable(value: OptionalChoice | null): void;
nullable("/*nullable*/");
declare function constrained<Value extends Choice>(value: Value): void;
constrained("a/*constrained*/");`
	f, done := fourslash.NewFourslash(t, nil, content)
	defer done()
	expected := &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{"a", "b"},
		},
	}
	f.VerifyCompletions(t, []string{"direct", "alias", "generic", "constrained"}, expected)
	expected.ItemDefaults.CommitCharacters = &DefaultCommitCharacters
	f.VerifyCompletions(t, []string{"mixed", "nullable"}, expected)
	expected.ItemDefaults.CommitCharacters = &[]string{}
	expected.Items.Exact = []fourslash.CompletionsExpectedItem{"a", "b", "c"}
	f.VerifyCompletions(t, "merged", expected)
	expected.Items.Exact = []fourslash.CompletionsExpectedItem{"a", "b"}
	expected.ItemDefaults.CommitCharacters = &DefaultCommitCharacters
	f.VerifyCompletions(t, []string{"optional", "branded"}, expected)
	f.VerifyCompletions(t, "plain", nil)
	f.VerifyCompletions(t, "other", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{"c"},
		},
	})
}

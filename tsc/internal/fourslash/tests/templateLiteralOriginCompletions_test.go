package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestTemplateLiteralOriginCompletions(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = "// @strict: true\n" + "type Pattern = `${string}Downcast`;\n" + `
type Choice = "dataDowncast" | "editingDowncast" | Pattern;
declare function choose(value: Choice): void;
choose("/*alias*/");
declare function legacy(value: "dataDowncast" | "editingDowncast" | ({} & Pattern)): void;
legacy("/*legacy*/");
declare function optional(value: { choice?: Choice }): void;
optional({ choice: "/*optional*/" });
type Generic<Value extends string> = Value | Pattern;
declare function generic(value: Generic<"dataDowncast" | "editingDowncast">): void;
generic("/*generic*/");
declare function merged(value: Choice | "otherDowncast" | Pattern): void;
merged("/*merged*/");
declare function plain(value: Pattern): void;
plain("/*plain*/");
declare function other(value: "otherDowncast" | Pattern): void;
other("/*other*/");
declare function mapped(value: "DATADOWNCAST" | "EDITINGDOWNCAST" | Uppercase<Pattern>): void;
mapped("/*mapped*/");
declare function uppercase(value: "DATADOWNCAST" | "EDITINGDOWNCAST" | Uppercase<string>): void;
uppercase("/*uppercase*/");
declare function constrained<Value extends Choice>(value: Value): void;
constrained("dataDowncast/*constrained*/");
declare let choice/*hover*/: Choice;
if (choice === "dataDowncast") {
    choice/*narrowed*/;
}`
	f, done := fourslash.NewFourslash(t, nil, content)
	defer done()
	expected := &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{"dataDowncast", "editingDowncast"},
		},
	}
	f.VerifyCompletions(t, []string{"alias", "legacy", "optional", "generic", "constrained"}, expected)
	expected.Items.Exact = []fourslash.CompletionsExpectedItem{"dataDowncast", "editingDowncast", "otherDowncast"}
	f.VerifyCompletions(t, "merged", expected)
	f.VerifyCompletions(t, "plain", nil)
	expected.Items.Exact = []fourslash.CompletionsExpectedItem{"otherDowncast"}
	f.VerifyCompletions(t, "other", expected)
	expected.Items.Exact = []fourslash.CompletionsExpectedItem{"DATADOWNCAST", "EDITINGDOWNCAST"}
	f.VerifyCompletions(t, []string{"mapped", "uppercase"}, expected)
	f.VerifyQuickInfoAt(t, "hover", "let choice: Choice (origin: \"dataDowncast\" | \"editingDowncast\" | `${string}Downcast`)", "")
	f.VerifyQuickInfoAt(t, "narrowed", `let choice: "dataDowncast"`, "")
}

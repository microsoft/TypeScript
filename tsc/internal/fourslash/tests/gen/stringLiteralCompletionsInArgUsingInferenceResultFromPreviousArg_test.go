package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestStringLiteralCompletionsInArgUsingInferenceResultFromPreviousArg(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
// https://github.com/microsoft/TypeScript/issues/55545
enum myEnum {
  valA = "valA",
  valB = "valB",
}

interface myEnumParamMapping {
  ["valA"]: "1" | "2";
  ["valB"]: "3" | "4";
}

function myFunction<K extends keyof typeof myEnum>(
  a: K,
  b: myEnumParamMapping[K],
) {}

myFunction("valA", "/*ts1*/");
myFunction("valA", ` + "`" + `/*ts2*/` + "`" + `);

function myFunction2<K extends keyof typeof myEnum>(
  a: K,
  { b }: { b: myEnumParamMapping[K] },
) {}

myFunction2("valA", { b: "/*ts3*/" });
myFunction2("valA", { b: ` + "`" + `/*ts4*/` + "`" + ` });`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"ts1", "ts2", "ts3", "ts4"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"1",
				"2",
			},
		},
	})
}

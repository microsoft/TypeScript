package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoAssertionNodeNotReusedWhenTypeNotEquivalent1(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
type Wrapper<T> = {
  _type: T;
};

function stringWrapper(): Wrapper<string> {
  return { _type: "" };
}

function objWrapper<T extends Record<string, Wrapper<any>>>(
  obj: T,
): Wrapper<T> {
  return { _type: obj };
}

const value = objWrapper({
  prop1: stringWrapper() as Wrapper<"hello">,
});

type Unwrap<T extends Wrapper<any>> = T["_type"] extends Record<
  string,
  Wrapper<any>
>
  ? { [Key in keyof T["_type"]]: Unwrap<T["_type"][Key]> }
  : T["_type"];

type Test/*1*/ = Unwrap<typeof value>;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "type Test = {\n    prop1: \"hello\";\n}", "")
}

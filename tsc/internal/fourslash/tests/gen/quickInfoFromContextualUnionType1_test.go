package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoFromContextualUnionType1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
// based on https://github.com/microsoft/TypeScript/issues/55495
type X =
  | {
      name: string;
      [key: string]: any;
    }
  | {
      name: "john";
      someProp: boolean;
    };

const obj = { name: "john", /*1*/someProp: "foo" } satisfies X;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(property) someProp: string", "")
}

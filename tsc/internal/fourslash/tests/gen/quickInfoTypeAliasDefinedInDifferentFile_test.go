package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoTypeAliasDefinedInDifferentFile(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.ts
export type X = { x: number };
export function f(x: X): void {}
// @Filename: /b.ts
import { f } from "./a";
/**/f({ x: 1 });`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "", "(alias) f(x: X): void\nimport f", "")
}

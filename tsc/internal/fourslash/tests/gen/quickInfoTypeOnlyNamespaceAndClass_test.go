package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoTypeOnlyNamespaceAndClass(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.ts
export namespace ns {
  export class Box<T> {}
}
// @Filename: /b.ts
import type { ns } from './a';
let x: /*1*/ns./*2*/Box<string>;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(alias) namespace ns\nimport ns", "")
	f.VerifyQuickInfoAt(t, "2", "class ns.Box<T>", "")
}

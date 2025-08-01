package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoOnValueSymbolWithoutExportWithSameNameExportSymbol(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true

declare function num(): number
const /*1*/Unit = num()
export type Unit = number
const value = /*2*/Unit

function Fn() {}
export type Fn = () => void
/*3*/Fn()

// repro from #41897
const /*4*/X = 1;
export interface X {}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "const Unit: number", "")
	f.VerifyQuickInfoAt(t, "2", "const Unit: number", "")
	f.VerifyQuickInfoAt(t, "3", "function Fn(): void", "")
	f.VerifyQuickInfoAt(t, "4", "const X: 1", "")
}

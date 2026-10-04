package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGetOccurrencesAbstract01(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `[|abstract|] class Animal {
    [|abstract|] prop1; // Does not compile
    [|abstract|] abstract();
    [|abstract|] walk(): void;
    [|abstract|] makeSound(): void;
}
// Abstract class below should not get highlighted
abstract class Foo {
    abstract foo(): void;
    abstract bar(): void;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, ToAny(f.Ranges())...)
}

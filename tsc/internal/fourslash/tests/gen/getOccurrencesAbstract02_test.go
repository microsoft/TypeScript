package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetOccurrencesAbstract02(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// Not valid TS (abstract methods can only appear in abstract classes)
class Animal {
    [|abstract|] walk(): void;
    [|abstract|] makeSound(): void;
}
// abstract cannot appear here, won't get highlighted
let c = /*1*/abstract class Foo {
    /*2*/abstract foo(): void;
    abstract bar(): void;
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, "1", "2")
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, ToAny(f.Ranges())...)
}

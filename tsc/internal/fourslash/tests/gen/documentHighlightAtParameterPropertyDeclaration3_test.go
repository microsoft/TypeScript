package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestDocumentHighlightAtParameterPropertyDeclaration3(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: file1.ts
class Foo {
    // This is not valid syntax: parameter property can't be binding pattern
    constructor(private [[|privateParam|]]: number,
        public [[|publicParam|]]: string,
        protected [[|protectedParam|]]: boolean) {

        let localPrivate = [|privateParam|];
        this.privateParam += 10;

        let localPublic = [|publicParam|];
        this.publicParam += " Hello!";

        let localProtected = [|protectedParam|];
        this.protectedParam = false;
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, ToAny(f.Ranges())...)
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestReferenceInParameterPropertyDeclaration(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: file1.ts
class Foo {
    constructor(private /*1*/privateParam: number,
        public /*2*/publicParam: string,
        protected /*3*/protectedParam: boolean) {

        let localPrivate = privateParam;
        this.privateParam += 10;

        let localPublic = publicParam;
        this.publicParam += " Hello!";

        let localProtected = protectedParam;
        this.protectedParam = false;
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineFindAllReferences(t, "1", "2", "3")
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestOrganizeImports2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import {
    Foo   
 , Bar   
} from "foo"

console.log(Foo, Bar);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import {
    Bar,
    Foo
} from "foo";

console.log(Foo, Bar);`,
		lsproto.CodeActionKindSourceOrganizeImports,
		nil,
	)
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestReferencesForMergedDeclarations7(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Foo { }
namespace Foo {
    export interface /*1*/Bar { }
    export module /*2*/Bar { export interface Baz { } }
    export function /*3*/Bar() { }
}

// module, value and type
import a2 = Foo./*4*/Bar;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "1", "2", "3", "4")
}

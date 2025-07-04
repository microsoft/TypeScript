package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTypeCheckObjectInArrayLiteral(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare function create<T>(initialValues);
create([{}]);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToPosition(t, 0)
	f.Insert(t, "")
}

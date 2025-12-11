package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGenericInterfaceWithInheritanceEdit1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface ChainedObject<T> {
    values(): ChainedArray<any>;
    pairs(): ChainedArray<any[]>;
    extend(...sources: any[]): ChainedObject<T>;

    value(): T;
}
interface ChainedArray<T> extends ChainedObject<Array<T>> {

    extend(...sources: any[]): ChainedArray<T>;
}
 /*1*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.GoToMarker(t, "1")
	f.Insert(t, " ")
	f.VerifyNoErrors(t)
}

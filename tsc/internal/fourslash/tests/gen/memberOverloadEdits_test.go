package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestMemberOverloadEdits(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `namespace M {
    export class A {
        public m(n: number) {
            return 0;
        }
        public n() {
            return this.m(0);
        }
    }
    export class B extends A { /*1*/ }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.GoToMarker(t, "1")
	f.Insert(t, "public m(n: number) { return 0; }")
	f.VerifyNoErrors(t)
}

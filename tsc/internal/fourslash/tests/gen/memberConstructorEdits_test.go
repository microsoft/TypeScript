package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestMemberConstructorEdits(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = ` namespace M {
     export class A {
		 constructor(a: string) {}
         public m(n: number) {
             return 0;
         }
         public n() {
             return this.m(0);
         }
     }
     export class B extends A {
     	constructor(a: string) {
			super(a);
		}
		/*1*/
	 }
	 var a = new A("s");
	 var b = new B("s");
 }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.GoToMarker(t, "1")
	f.Insert(t, "public m(n: number) { return 0; }")
	f.VerifyNoErrors(t)
}

package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestReferencesForStaticsAndMembersWithSameNames(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `module FindRef4 {
	module MixedStaticsClassTest {
		export class Foo {
			/*1*/bar: Foo;
			/*2*/static /*3*/bar: Foo;

			/*4*/public /*5*/foo(): void {
			}
			/*6*/public static /*7*/foo(): void {
			}
		}
	}

	function test() {
		// instance function
		var x = new MixedStaticsClassTest.Foo();
		x./*8*/foo();
		x./*9*/bar;

		// static function
		MixedStaticsClassTest.Foo./*10*/foo();
		MixedStaticsClassTest.Foo./*11*/bar;
	}
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11")
}

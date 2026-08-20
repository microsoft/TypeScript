package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixInferFromFunctionThisUsageObjectPropertyShorthandParameter(t *testing.T) {
	t.Skip("Known failing fourslash test")
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @noImplicitThis: true
function returnThisMember([| |]suffix: string) {
     return this.member + suffix;
 }

 interface Container {
     member: string;
     returnThisMember(suffix: string): string;
 }

 const container: Container = {
     member: "sample",
     returnThisMember,
 };

 container.returnThisMember("");`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyRangeAfterCodeFix(t, `this: Container, `, false, 0, 0)
}

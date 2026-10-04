package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixInferFromFunctionThisUsageObjectProperty(t *testing.T) {
	t.Skip("Known failing fourslash test")
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @noImplicitThis: true
function returnThisMember([| |]) {
     return this.member;
 }

 interface Container {
     member: string;
     returnThisMember(): string;
 }

 const container: Container = {
     member: "sample",
     returnThisMember: returnThisMember,
 };

 container.returnThisMember();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyRangeAfterCodeFix(t, `this: Container`, false, 0, 0)
}

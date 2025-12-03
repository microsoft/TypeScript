package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListForNonExportedMemberInAmbientModuleWithExportAssignment1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: completionListForNonExportedMemberInAmbientModuleWithExportAssignment1_file0.ts
var x: Date;
export = x;
// @Filename: completionListForNonExportedMemberInAmbientModuleWithExportAssignment1_file1.ts
///<reference path='completionListForNonExportedMemberInAmbientModuleWithExportAssignment1_file0.ts'/>
 import test = require("completionListForNonExportedMemberInAmbientModuleWithExportAssignment1_file0");
 test./**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "", nil)
}

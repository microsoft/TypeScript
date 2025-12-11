package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoFormattingOnPasting(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `module TestModule {
/**/
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.Paste(t, " class TestClass{\nprivate   foo;\npublic testMethod( )\n{}\n}")
	f.VerifyCurrentFileContentIs(t, "module TestModule {\n    class TestClass {\n        private foo;\n        public testMethod() { }\n    }\n}")
}

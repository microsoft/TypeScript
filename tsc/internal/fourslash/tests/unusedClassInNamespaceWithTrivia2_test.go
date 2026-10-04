package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestUnusedClassInNamespaceWithTrivia2(t *testing.T) {
	t.Skip("Known failing fourslash test")
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @noUnusedLocals: true
[| namespace greeter {
  // Do not remove
  /**
   * JSDoc Comment
   */
  class /* comment2 */ class1 {
  }
} |]`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyRangeAfterCodeFix(t, `namespace greeter {
   // Do not remove
}`, false, 0, 0)
}

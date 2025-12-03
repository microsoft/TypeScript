package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestReferencesBloomFilters2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: declaration.ts
var container = { /*1*/42: 1 };
// @Filename: expression.ts
function blah() { return (container[42]) === 2;  };
// @Filename: stringIndexer.ts
function blah2() { container["42"] };
// @Filename: redeclaration.ts
container = { "42" : 18 };`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "1")
}

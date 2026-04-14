package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRenameFilePackageJson(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /src/example.ts
import brushPackageJson from './visx-brush//*rename*/package.json';
// @Filename: /src/visx-brush/package.json
{ "name": "brush" }`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyRename(t, "rename", "package2.json", map[string]string{
		"/src/example.ts":               `import brushPackageJson from './visx-brush/package2.json';`,
		"/src/visx-brush/package2.json": `{ "name": "brush" }`,
	})
}

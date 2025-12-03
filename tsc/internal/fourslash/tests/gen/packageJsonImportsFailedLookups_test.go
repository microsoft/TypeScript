package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestPackageJsonImportsFailedLookups(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a/b/c/d/e/tsconfig.json
{ "compilerOptions": { "module": "nodenext" } }
// @Filename: /a/b/c/d/e/package.json
{
  "name": "app",
  "imports": {
    "#utils": "lodash"
  }
}
// @Filename: /a/b/node_modules/lodash/index.d.ts
export function add(a: number, b: number): number;
// @Filename: /a/b/c/d/e/index.ts
import { add } from "#utils";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.GoToFile(t, "/a/b/c/d/e/index.ts")
}

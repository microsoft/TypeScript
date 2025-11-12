package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFixNewImportNodeModules6(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `[|f1/*0*/('');|]
// @Filename: package.json
{ "dependencies": { "package-name": "latest" } }
// @Filename: node_modules/package-name/bin/lib/index.d.ts
export function f1(text: string): string;
// @Filename: node_modules/package-name/bin/lib/index.js
function f1(text) { }
exports.f1 = f1;
// @Filename: node_modules/package-name/package.json
{
  "main": "bin/lib/index.js",
  "types": "bin/lib/index.d.ts"
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyImportFixAtPosition(t, []string{
		`import { f1 } from "package-name";

f1('');`,
	}, nil /*preferences*/)
}

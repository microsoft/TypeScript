package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRenameNamespaceImport(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/lib/tsconfig.json
{ "compilerOptions": { "lib": ["es5"] } }
// @Filename: /home/src/workspaces/project/lib/index.ts
const unrelatedLocalVariable = 123;
export const someExportedVariable = unrelatedLocalVariable;
// @Filename: /home/src/workspaces/project/src/tsconfig.json
{ "compilerOptions": { "lib": ["es5"] } }
// @Filename: /home/src/workspaces/project/src/index.ts
import * as /*i*/lib from '../lib/index';
lib.someExportedVariable;
// @Filename: /home/src/workspaces/project/tsconfig.json
{ "compilerOptions": { "lib": ["es5"] } }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.GoToFile(t, "/home/src/workspaces/project/lib/index.ts")
	f.GoToFile(t, "/home/src/workspaces/project/src/index.ts")
	f.VerifyBaselineRename(t, nil /*preferences*/, "i")
}

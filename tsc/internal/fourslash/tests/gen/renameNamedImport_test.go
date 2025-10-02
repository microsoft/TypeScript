package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRenameNamedImport(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/lib/tsconfig.json
{}
// @Filename: /home/src/workspaces/project/lib/index.ts
const unrelatedLocalVariable = 123;
export const someExportedVariable = unrelatedLocalVariable;
// @Filename: /home/src/workspaces/project/src/tsconfig.json
{}
// @Filename: /home/src/workspaces/project/src/index.ts
import { /*i*/someExportedVariable } from '../lib/index';
someExportedVariable;
// @Filename: /home/src/workspaces/project/tsconfig.json
{}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToFile(t, "/home/src/workspaces/project/lib/index.ts")
	f.GoToFile(t, "/home/src/workspaces/project/src/index.ts")
	f.VerifyBaselineRename(t, &ls.UserPreferences{UseAliasesForRename: core.TSTrue}, "i")
}

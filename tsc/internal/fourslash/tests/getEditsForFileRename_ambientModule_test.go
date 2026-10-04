package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGetEditsForFileRename_ambientModule(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /tsconfig.json
{}
// @Filename: /sub/types.d.ts
// @Symlink: /node_modules/sub/types.d.ts
declare module "sub" {
    declare export const abc: number
}
// @Filename: /sub/package.json
// @Symlink: /node_modules/sub/package.json
{ "types": "types.d.ts" }
// @Filename: /a.ts
import { abc } from "sub";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyWillRenameFilesEdits(t, "/a.ts", "/b.ts", map[string]string{}, nil /*preferences*/)
}

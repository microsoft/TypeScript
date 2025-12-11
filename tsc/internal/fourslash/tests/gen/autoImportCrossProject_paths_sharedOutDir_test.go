package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportCrossProject_paths_sharedOutDir(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/tsconfig.base.json
{
  "compilerOptions": {
    "module": "commonjs",
    "baseUrl": ".",
    "paths": {
      "packages/*": ["./packages/*"]
    }
  }
}
// @Filename: /home/src/workspaces/project/packages/app/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": { "outDir": "../../dist/packages/app" },
  "references": [{ "path": "../dep" }]
}
// @Filename: /home/src/workspaces/project/packages/app/index.ts
dep/**/
// @Filename: /home/src/workspaces/project/packages/app/utils.ts
import "packages/dep";
// @Filename: /home/src/workspaces/project/packages/dep/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": { "outDir": "../../dist/packages/dep" }
}
// @Filename: /home/src/workspaces/project/packages/dep/index.ts
import "./sub/folder";
// @Filename: /home/src/workspaces/project/packages/dep/sub/folder/index.ts
export const dep = 0;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.GoToMarker(t, "")
	f.VerifyImportFixAtPosition(t, []string{
		`import { dep } from "packages/dep/sub/folder";

dep`,
	}, nil /*preferences*/)
}

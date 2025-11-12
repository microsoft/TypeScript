package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportCrossProject_paths_toDist(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/packages/app/package.json
{ "name": "app", "dependencies": { "dep": "*" } }
// @Filename: /home/src/workspaces/project/packages/app/tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
    "outDir": "dist",
    "rootDir": "src",
    "baseUrl": ".",
    "paths": {
      "dep": ["../dep/src/main"],
      "dep/dist/*": ["../dep/src/*"]
    }
  }
  "references": [{ "path": "../dep" }]
}
// @Filename: /home/src/workspaces/project/packages/app/src/index.ts
dep1/*1*/;
// @Filename: /home/src/workspaces/project/packages/app/src/utils.ts
dep2/*2*/;
// @Filename: /home/src/workspaces/project/packages/app/src/a.ts
import "dep";
// @Filename: /home/src/workspaces/project/packages/dep/package.json
{ "name": "dep", "main": "dist/main.js", "types": "dist/main.d.ts" }
// @Filename: /home/src/workspaces/project/packages/dep/tsconfig.json
{
  "compilerOptions": { "outDir": "dist", "rootDir": "src", "module": "commonjs" }
}
// @Filename: /home/src/workspaces/project/packages/dep/src/main.ts
import "./sub/folder";
export const dep1 = 0;
// @Filename: /home/src/workspaces/project/packages/dep/src/sub/folder/index.ts
export const dep2 = 0;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "1")
	f.VerifyImportFixAtPosition(t, []string{
		`import { dep1 } from "dep";

dep1;`,
	}, nil /*preferences*/)
	f.GoToMarker(t, "2")
	f.VerifyImportFixAtPosition(t, []string{
		`import { dep2 } from "dep/dist/sub/folder";

dep2;`,
	}, nil /*preferences*/)
}

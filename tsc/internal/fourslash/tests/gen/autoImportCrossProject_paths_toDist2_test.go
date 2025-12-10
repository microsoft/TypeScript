package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportCrossProject_paths_toDist2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/common/tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
    "outDir": "dist",
    "composite": true
  },
  "include": ["src"]
}
// @Filename: /home/src/workspaces/project/common/src/MyModule.ts
export function square(n: number) {
  return n * 2;
}
// @Filename: /home/src/workspaces/project/web/tsconfig.json
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "node",
    "noEmit": true,
    "paths": {
      "@common/*": ["../common/dist/src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "../common" }]
}
// @Filename: /home/src/workspaces/project/web/src/MyApp.ts
import { square } from "@common/MyModule";
// @Filename: /home/src/workspaces/project/web/src/Helper.ts
export function saveMe() {
  square/**/(2);
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.GoToFile(t, "/home/src/workspaces/project/web/src/Helper.ts")
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"@common/MyModule"}, &lsutil.UserPreferences{ImportModuleSpecifierPreference: "non-relative"})
}

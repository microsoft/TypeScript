package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportCrossProject_baseUrl_toDist(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/common/tsconfig.json
{
  "compilerOptions": {
    "lib": ["es5"],
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
    "lib": ["es5"],
    "module": "esnext",
    "moduleResolution": "node",
    "noEmit": true,
    "baseUrl": "."
  },
  "include": ["src"],
  "references": [{ "path": "../common" }]
}
// @Filename: /home/src/workspaces/project/web/src/MyApp.ts
import { square } from "../../common/dist/src/MyModule";
// @Filename: /home/src/workspaces/project/web/src/Helper.ts
export function saveMe() {
  square/**/(2);
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.GoToFile(t, "/home/src/workspaces/project/web/src/Helper.ts")
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"../../common/src/MyModule"}, &lsutil.UserPreferences{ImportModuleSpecifierPreference: "non-relative"})
}

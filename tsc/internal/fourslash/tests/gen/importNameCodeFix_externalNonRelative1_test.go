package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFix_externalNonRelative1(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/tsconfig.base.json
{
  "compilerOptions": {
    "module": "commonjs",
    "lib": ["es5"],
    "paths": {
      "pkg-1/*": ["./packages/pkg-1/src/*"],
      "pkg-2/*": ["./packages/pkg-2/src/*"]
    }
  }
}
// @Filename: /home/src/workspaces/project/packages/pkg-1/package.json
{ "dependencies": { "pkg-2": "*" } }
// @Filename: /home/src/workspaces/project/packages/pkg-1/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "references": [
    { "path": "../pkg-2" }
  ]
}
// @Filename: /home/src/workspaces/project/packages/pkg-1/src/index.ts
Pkg2/*external*/
// @Filename: /home/src/workspaces/project/packages/pkg-2/package.json
{ "types": "dist/index.d.ts" }
// @Filename: /home/src/workspaces/project/packages/pkg-2/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": { "outDir": "dist", "rootDir": "src", "composite": true, "lib": ["es5"] }
}
// @Filename: /home/src/workspaces/project/packages/pkg-2/src/index.ts
import "./utils";
// @Filename: /home/src/workspaces/project/packages/pkg-2/src/utils.ts
export const Pkg2 = {};
// @Filename: /home/src/workspaces/project/packages/pkg-2/src/blah/foo/data.ts
Pkg2/*internal*/
// @link: /home/src/workspaces/project/packages/pkg-2 -> /home/src/workspaces/project/packages/pkg-1/node_modules/pkg-2`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	opts1534 := f.GetOptions()
	opts1534.FormatCodeSettings.NewLineCharacter = "\n"
	f.Configure(t, opts1534)
	f.GoToMarker(t, "external")
	f.VerifyImportFixAtPosition(t, []string{
		`import { Pkg2 } from "pkg-2/utils";

Pkg2`,
	}, &lsutil.UserPreferences{ImportModuleSpecifierPreference: "project-relative"})
	f.GoToMarker(t, "internal")
	f.VerifyImportFixAtPosition(t, []string{
		`import { Pkg2 } from "../../utils";

Pkg2`,
	}, &lsutil.UserPreferences{ImportModuleSpecifierPreference: "project-relative"})
}
